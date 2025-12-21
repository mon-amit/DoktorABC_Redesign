# Jira Status History Extractor

Extracts complete status change history for **ALL Jira tickets** in your instance and exports to CSV format compatible with Notion database import.

## 🎯 Purpose

This script creates a comprehensive **Status History Log Database** that tracks:
- Every status transition for every ticket
- How long each ticket spent in each status
- Complete workflow analysis across all projects
- Historical assignee information (when available)

**By default, it processes ALL projects** to give you the complete picture of your Jira instance's workflow patterns.

## Setup

### 1. Install Dependencies

```bash
pip install requests pandas python-dotenv
```

### 2. Configure Credentials

Create a `.env.local` file in the `scripts/jira/` directory (or set environment variables):

```bash
JIRA_DOMAIN=doktorabc.atlassian.net
JIRA_EMAIL=amit.y@doktorabc.com
JIRA_API_TOKEN=your_api_token_here
JIRA_PROJECT_KEY=  # Leave empty to fetch ALL projects (recommended for complete status history)
```

**Note**: `.env.local` is gitignored for security. Never commit API tokens to git.

### 3. API Token (Already Configured)

✅ **Your API token is already configured** in `scripts/jira/.env.local`

If you need to generate a new token:
1. Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**
3. Name it (e.g., "Status History Extractor")
4. Copy the token immediately (you won't see it again)
5. Update your `.env.local` file

## Usage

```bash
python scripts/jira/extract-status-history.py
```

### Split for Notion Import (if file > 30KB)

If your CSV exceeds Notion's 30KB limit, split it automatically:

```bash
python scripts/jira/split-csv-for-notion.py
```

This creates multiple files like:
- `jira_status_history_20251215_164158_part1.csv` (24.1KB)
- `jira_status_history_20251215_164158_part2.csv` (24.2KB)
- `jira_status_history_20251215_164158_part3.csv` (5.6KB)

## Output

The script generates a CSV file with timestamp:
- `jira_status_history_YYYYMMDD_HHMMSS.csv`

### CSV Columns

- **Entry Name**: `{Issue Key} - {Status}` (e.g., "HL-1234 - In Progress")
- **Issue Key**: The Jira issue key (e.g., "HL-1234")
- **Issue Summary**: The issue summary/title
- **Status**: The status name
- **Start Date**: When it entered this status (YYYY-MM-DD)
- **End Date**: When it left this status (YYYY-MM-DD), empty if current status
- **Assignee**: Display name of assignee (current assignee, not historical)

## Features

- ✅ Handles pagination (fetches all issues automatically)
- ✅ Rate limiting with exponential backoff
- ✅ Progress tracking
- ✅ Error handling and reporting
- ✅ Retry logic for transient failures
- ✅ Notion-compatible CSV format

## Limitations

**Note on Assignee**: The script uses the current assignee for all status periods. Jira's changelog API doesn't always include assignee information at the time of each status change. To get historical assignees, you would need to:

1. Parse assignee changes from the changelog separately
2. Match assignee changes to status changes by timestamp
3. This is more complex and may not always be accurate

If you need historical assignee data, we can enhance the script to attempt this matching.

## Troubleshooting

### Authentication Errors

- Verify your API token is correct
- Check that your email matches your Jira account
- Ensure the token hasn't expired

### Rate Limiting

The script includes automatic rate limiting. If you hit limits:
- The script will wait automatically
- Increase `RATE_LIMIT_DELAY` in the script if needed

### No Issues Found

- Verify the project key is correct
- Check your JQL query permissions
- Try removing `JIRA_PROJECT_KEY` to fetch all projects

## Notion Import

1. Open your Notion database
2. Click **...** → **Import** → **CSV**
3. Select the generated CSV file
4. Map columns to your Notion properties:
   - Entry Name → Title property
   - Issue Key → Text property
   - Status → Select property
   - Start Date → Date property
   - End Date → Date property
   - Assignee → Person/Text property

## Latest Analysis Results

**Last run:** December 16, 2025
- **API accessible issues:** 100 total
- **Available projects:** CREAT (1), DEVOPS (29), DOK (70)
- **Date range:** 2018-2025
- **HL project access:** ❌ None found

### ⚠️ HL Project Access Issue

The script cannot access HL project issues. This could be due to:
- API token lacking HL project permissions
- HL project having restricted access
- Incorrect project key

**Available alternatives:**
- Use `JIRA_PROJECT_KEY=DEVOPS` for 29 issues (2022-2025)
- Use `JIRA_PROJECT_KEY=DOK` for 70 issues (2018)
- Contact Jira admin for HL project access

### Split Files for Notion (30KB limit)
- **Part 1:** `jira_status_history_20251215_164158_part1.csv` (24.1KB, 214 rows)
- **Part 2:** `jira_status_history_20251215_164158_part2.csv` (24.2KB, 214 rows)
- **Part 3:** `jira_status_history_20251215_164158_part3.csv` (5.6KB, 52 rows)

## Status Examples

The script captures the complete status lifecycle for each ticket:
- `HL-5 - TO DO` → `HL-5 - Done` (ticket completion)
- `HL-9 - In Progress` → `HL-9 - To review` → `HL-9 - Reviewing` → etc. (complex workflow)

Each status transition includes start/end dates for time-tracking and workflow analysis.

