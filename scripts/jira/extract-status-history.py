#!/usr/bin/env python3
"""
Jira Status History Extractor

Extracts complete status change history for all Jira tickets and exports
to CSV format compatible with Notion database import.

Requirements:
    pip install requests pandas python-dotenv

Usage:
    python extract-status-history.py

Configuration:
    Set environment variables or create .env file:
    - JIRA_DOMAIN=doktorabc.atlassian.net
    - JIRA_EMAIL=your.email@doktorabc.com
    - JIRA_API_TOKEN=your_api_token
    - JIRA_PROJECT_KEY=HL (optional, defaults to all projects)
"""

import os
import sys
import time
import base64
import requests
import pandas as pd
from datetime import datetime
from typing import List, Dict, Optional, Any
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

try:
    from dotenv import load_dotenv
    import pathlib
    # Load .env.local first (gitignored), then .env (may be committed)
    # Check script directory and current directory
    script_dir = pathlib.Path(__file__).parent
    load_dotenv(script_dir / ".env.local")
    load_dotenv(script_dir / ".env")
    load_dotenv(".env.local")  # Also check current working directory
    load_dotenv()  # Standard .env in current directory
except ImportError:
    pass  # dotenv is optional

# === CONFIGURATION ===
JIRA_DOMAIN = os.getenv("JIRA_DOMAIN", "doktorabc.atlassian.net")
JIRA_EMAIL = os.getenv("JIRA_EMAIL", "amit.y@doktorabc.com")
JIRA_API_TOKEN = os.getenv("JIRA_API_TOKEN", "")
JIRA_PROJECT_KEY = os.getenv("JIRA_PROJECT_KEY", "ALL")  # Set to "ALL" to see all accessible projects

# API Configuration
BASE_URL = f"https://{JIRA_DOMAIN}"
API_BASE = f"{BASE_URL}/rest/api/3"
MAX_RESULTS = 100  # Jira API max per page
RATE_LIMIT_DELAY = 0.5  # Seconds between requests
MAX_RETRIES = 3
RETRY_BACKOFF_FACTOR = 2

# === AUTHENTICATION ===
def get_auth_headers() -> Dict[str, str]:
    """Generate Basic Auth headers."""
    if not JIRA_API_TOKEN:
        raise ValueError(
            "JIRA_API_TOKEN environment variable is required. "
            "Set it in .env file or export it."
        )
    
    credentials = f"{JIRA_EMAIL}:{JIRA_API_TOKEN}"
    encoded = base64.b64encode(credentials.encode()).decode()
    
    return {
        "Authorization": f"Basic {encoded}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

# === HTTP SESSION WITH RETRY ===
def create_session() -> requests.Session:
    """Create requests session with retry strategy."""
    session = requests.Session()
    
    retry_strategy = Retry(
        total=MAX_RETRIES,
        backoff_factor=RETRY_BACKOFF_FACTOR,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )
    
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    
    return session

# === JIRA API FUNCTIONS ===
def make_request(
    session: requests.Session,
    endpoint: str,
    params: Optional[Dict] = None,
    headers: Optional[Dict] = None,
    method: str = "GET",
    data: Optional[Dict] = None
) -> Dict[str, Any]:
    """
    Make API request with rate limiting and error handling.

    Args:
        session: Requests session object
        endpoint: API endpoint (relative to API_BASE)
        params: Query parameters
        headers: Request headers
        method: HTTP method (GET, POST, etc.)
        data: Request body data

    Returns:
        JSON response as dictionary

    Raises:
        requests.RequestException: On API errors
    """
    url = f"{API_BASE}/{endpoint.lstrip('/')}"
    default_headers = get_auth_headers()
    if headers:
        default_headers.update(headers)

    try:
        if method.upper() == "GET":
            response = session.get(url, params=params, headers=default_headers, timeout=30)
        elif method.upper() == "POST":
            response = session.post(url, params=params, headers=default_headers, json=data, timeout=30)
        else:
            raise ValueError(f"Unsupported HTTP method: {method}")

        response.raise_for_status()

        # Rate limiting: respect Retry-After header if present
        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 60))
            print(f"⚠️  Rate limited. Waiting {retry_after} seconds...")
            time.sleep(retry_after)
            return make_request(session, endpoint, params, headers, method, data)

        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"   Response: {e.response.text[:200]}")
        raise

def get_all_issues(
    session: requests.Session,
    project_key: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Fetch all issues from Jira with pagination.

    Args:
        session: Requests session object
        project_key: Optional project key filter (e.g., "HL")

    Returns:
        List of issue dictionaries
    """
    all_issues = []
    start_at = 0

    # Build JQL query - get all accessible issues and filter in code
    # The API has permission/filtering issues, so we'll fetch all and filter
    jql = "created >= 2000-01-01 ORDER BY key ASC"

    print(f"🔍 Fetching issues with JQL: {jql}")

    while True:
        # Use GET method with query parameters to /search/jql (updated Jira API)
        params = {
            "jql": jql,
            "startAt": start_at,
            "maxResults": MAX_RESULTS,
            "fields": "key,summary,assignee,status,created"
        }

        try:
            # Use GET method with query parameters (working approach)
            params = {
                "jql": jql,
                "startAt": start_at,
                "maxResults": MAX_RESULTS,
                "fields": "key,summary,assignee,status,created,project"
            }
            data = make_request(session, "/search/jql", params=params)
            issues = data.get("issues", [])
            total = data.get("total", 0)

            all_issues.extend(issues)
            fetched = len(all_issues)

            print(f"   📦 Fetched {fetched}/{total} issues...", end="\r")

            # Check if we've fetched all issues
            if fetched >= total or len(issues) == 0:
                break

            start_at += MAX_RESULTS
            time.sleep(RATE_LIMIT_DELAY)  # Rate limiting

        except Exception as e:
            print(f"\n❌ Error fetching issues: {e}")
            break

    print(f"\n✅ Total issues fetched: {len(all_issues)}")
    return all_issues

def get_issue_changelog(
    session: requests.Session,
    issue_key: str
) -> Dict[str, Any]:
    """
    Fetch changelog for a specific issue.
    
    Args:
        session: Requests session object
        issue_key: Jira issue key (e.g., "HL-1234")
        
    Returns:
        Issue data with changelog
    """
    endpoint = f"/issue/{issue_key}"
    params = {"expand": "changelog"}
    
    return make_request(session, endpoint, params=params)

def extract_status_history(
    issue_data: Dict[str, Any]
) -> List[Dict[str, str]]:
    """
    Extract status transition history from issue changelog.
    
    Args:
        issue_data: Issue data from Jira API with changelog
        
    Returns:
        List of status period dictionaries
    """
    issue_key = issue_data["key"]
    summary = issue_data["fields"].get("summary", "")
    current_assignee = issue_data["fields"].get("assignee")
    assignee_name = current_assignee.get("displayName", "Unassigned") if current_assignee else "Unassigned"
    
    changelog = issue_data.get("changelog", {})
    histories = changelog.get("histories", [])
    
    # Extract all status changes
    status_changes = []
    
    for history in histories:
        created = history.get("created", "")
        author = history.get("author", {})
        
        for item in history.get("items", []):
            if item.get("field") == "status":
                from_status = item.get("fromString", "")
                to_status = item.get("toString", "")
                
                # Get assignee at time of change (if available in history)
                # Note: Jira changelog may not always include assignee changes
                # We'll use the current assignee as fallback
                status_changes.append({
                    "timestamp": created,
                    "from_status": from_status,
                    "to_status": to_status,
                    "author": author.get("displayName", "Unknown")
                })
    
    # Sort by timestamp
    status_changes.sort(key=lambda x: x["timestamp"])
    
    # Build status periods
    periods = []
    
    if not status_changes:
        # No status changes found - use current status
        current_status = issue_data["fields"].get("status", {}).get("name", "Unknown")
        created_date = issue_data["fields"].get("created", "")[:10]
        
        periods.append({
            "Entry Name": f"{issue_key} - {current_status}",
            "Issue Key": issue_key,
            "Issue Summary": summary,
            "Status": current_status,
            "Start Date": created_date,
            "End Date": "",  # Current status, no end date
            "Assignee": assignee_name
        })
    else:
        # Create period for each status transition
        for i, change in enumerate(status_changes):
            start_date = change["timestamp"][:10]  # YYYY-MM-DD
            
            # End date is the start of the next status, or empty if current
            if i + 1 < len(status_changes):
                end_date = status_changes[i + 1]["timestamp"][:10]
            else:
                end_date = ""  # Current status
            
            periods.append({
                "Entry Name": f"{issue_key} - {change['to_status']}",
                "Issue Key": issue_key,
                "Issue Summary": summary,
                "Status": change["to_status"],
                "Start Date": start_date,
                "End Date": end_date,
                "Assignee": assignee_name  # Note: This is current assignee, not historical
            })
    
    return periods

# === MAIN EXECUTION ===
def main():
    """Main execution function."""
    print("=" * 60)
    print("Jira Status History Extractor")
    print("=" * 60)
    print()
    
    # Validate configuration
    if not JIRA_API_TOKEN:
        print("❌ ERROR: JIRA_API_TOKEN not set")
        print()
        print("Set it via:")
        print("  1. Environment variable: export JIRA_API_TOKEN='your_token'")
        print("  2. .env file: Create .env with JIRA_API_TOKEN=your_token")
        print()
        sys.exit(1)
    
    print(f"📋 Configuration:")
    print(f"   Domain: {JIRA_DOMAIN}")
    print(f"   Email: {JIRA_EMAIL}")
    print(f"   Mode: Analyzing all accessible projects")
    print()
    
    # Create session
    session = create_session()
    
    # Fetch HL project issues from 2024-2025
    print(f"🔍 Fetching {JIRA_PROJECT_KEY} project issues from 2024-2025...")
    print("⚠️  This may take a while depending on the number of tickets...")

    try:
        issues = get_all_issues(session, JIRA_PROJECT_KEY if JIRA_PROJECT_KEY else None)
    except Exception as e:
        print(f"❌ Failed to fetch issues: {e}")
        sys.exit(1)

    if not issues:
        print("⚠️  No issues found. Exiting.")
        sys.exit(0)

    # Analyze available projects and date ranges
    print(f"📊 Analyzing {len(issues)} accessible issues...")
    project_stats = {}
    date_stats = {}

    for issue in issues:
        project_key = issue["fields"].get("project", {}).get("key", "Unknown")
        created_date = issue["fields"].get("created", "")
        year_month = created_date[:7] if created_date else "Unknown"

        if project_key not in project_stats:
            project_stats[project_key] = []
        project_stats[project_key].append(created_date)

        if year_month not in date_stats:
            date_stats[year_month] = 0
        date_stats[year_month] += 1

    print("\n📋 Available Projects & Date Ranges:")
    for project, dates in project_stats.items():
        date_range = f"{min(dates)[:7]} to {max(dates)[:7]}" if dates else "No dates"
        print(f"   {project}: {len(dates)} issues ({date_range})")

    print("\n📅 Issues by Year-Month:")
    for year_month in sorted(date_stats.keys()):
        if year_month != "Unknown":
            print(f"   {year_month}: {date_stats[year_month]} issues")

    # Filter for HL project issues from any date (not just 2024-2025)
    hl_issues = [issue for issue in issues if issue["fields"].get("project", {}).get("key") == "HL"]
    recent_hl_issues = [issue for issue in hl_issues if issue["fields"].get("created", "").startswith(("2024-", "2025-"))]

    print(f"\n🎯 HL Project Summary:")
    print(f"   Total HL issues: {len(hl_issues)}")
    print(f"   HL issues 2024-2025: {len(recent_hl_issues)}")

    print("\n💡 RECOMMENDATION:")
    if len(hl_issues) == 0:
        print("   ❌ No access to HL project issues.")
        print("   📋 Available projects: " + ", ".join(sorted(project_stats.keys())))
        print("   🔧 Check:")
        print("      1. API token permissions for HL project")
        print("      2. Project key is correct (case-sensitive)")
        print("      3. You're in the right Jira instance")
        print("   💡 Try: Set JIRA_PROJECT_KEY to one of the available projects")
        sys.exit(0)

    if len(recent_hl_issues) > 0:
        print(f"✅ Found {len(recent_hl_issues)} HL issues from 2024-2025 - proceeding...")
        issues = recent_hl_issues
    else:
        print(f"⚠️  Found {len(hl_issues)} total HL issues, but none from 2024-2025.")
        print("   Processing all available HL issues instead...")
        issues = hl_issues
    
    # Process each issue
    print()
    print(f"🔄 Processing {len(issues)} issues...")
    print()
    
    all_periods = []
    errors = []
    
    for i, issue in enumerate(issues, 1):
        issue_key = issue["key"]
        
        try:
            # Fetch changelog
            issue_data = get_issue_changelog(session, issue_key)
            
            # Extract status history
            periods = extract_status_history(issue_data)
            all_periods.extend(periods)
            
            # Progress indicator
            status_count = len(periods)
            print(f"   [{i}/{len(issues)}] {issue_key}: {status_count} status periods", end="\r")
            
            # Rate limiting
            time.sleep(RATE_LIMIT_DELAY)
            
        except Exception as e:
            error_msg = f"{issue_key}: {str(e)}"
            errors.append(error_msg)
            print(f"   ⚠️  [{i}/{len(issues)}] {error_msg}")
    
    print()  # New line after progress
    
    # Create DataFrame
    if not all_periods:
        print("⚠️  No status periods extracted. Exiting.")
        sys.exit(0)
    
    df = pd.DataFrame(all_periods)
    
    # Ensure proper column order
    column_order = [
        "Entry Name",
        "Issue Key",
        "Issue Summary",
        "Status",
        "Start Date",
        "End Date",
        "Assignee"
    ]
    df = df[column_order]
    
    # Generate filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"jira_status_history_{timestamp}.csv"
    
    # Save to CSV
    df.to_csv(filename, index=False, encoding="utf-8")
    
    # Summary
    print()
    print("=" * 60)
    print("✅ EXTRACTION COMPLETE")
    print("=" * 60)
    print(f"📊 Total status periods: {len(all_periods)}")
    print(f"📄 Output file: {filename}")
    print(f"📈 Unique issues: {df['Issue Key'].nunique()}")
    print(f"📈 Unique statuses: {df['Status'].nunique()}")
    
    if errors:
        print()
        print(f"⚠️  Errors encountered: {len(errors)}")
        for error in errors[:10]:  # Show first 10 errors
            print(f"   - {error}")
        if len(errors) > 10:
            print(f"   ... and {len(errors) - 10} more")
    
    print()
    print("💡 Next steps:")
    print(f"   1. Review {filename}")
    print("   2. Import into Notion database")
    print("   3. Map columns to your Notion properties")
    print()

if __name__ == "__main__":
    main()

