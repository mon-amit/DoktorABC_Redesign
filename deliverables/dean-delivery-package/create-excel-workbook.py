#!/usr/bin/env python3
"""
Excel Workbook Creator for DoktorABC Analytics Events
Creates one Excel sheet for each CSV file (one tab per CSV).
Fixed version with proper error handling and CSV validation.
"""

import pandas as pd
from pathlib import Path
from datetime import datetime

# Configuration
SCRIPT_DIR = Path(__file__).parent
EXCEL_FILES_DIR = SCRIPT_DIR / "excel-files"
OUTPUT_FILE = SCRIPT_DIR / "DoktorABC_Analytics_Events_Complete.xlsx"

def get_sheet_name_from_filename(filename):
    """Extract clean sheet name from CSV filename."""
    name = filename.replace("review-table-", "").replace(".csv", "")
    if "-" in name:
        parts = name.rsplit("-", 1)
        page = parts[0].replace("-", " ").title()
        platform = parts[1].upper() if len(parts) > 1 else ""
        sheet_name = f"{page} - {platform}" if platform else page
    else:
        sheet_name = name.replace("-", " ").title()
    
    # Excel sheet name limit is 31 characters
    if len(sheet_name) > 31:
        sheet_name = sheet_name[:28] + "..."
    
    return sheet_name

def read_csv_safely(filepath):
    """Read CSV file safely with validation."""
    try:
        df = pd.read_csv(filepath, on_bad_lines='skip', engine='python')
        
        # Validate structure
        if df.empty:
            return None
        
        # Remove duplicate header rows
        if len(df) > 0:
            df = df[df.iloc[:, 0] != "Event Name"].reset_index(drop=True)
        
        # Remove empty rows
        df = df.dropna(how='all').reset_index(drop=True)
        
        # Ensure we have at least Event Name column
        if len(df.columns) == 0 or df.empty:
            return None
        
        # Fix column names if needed
        if len(df.columns) >= 3:
            df.columns = ["Event Name", "Properties", "Short Description of TRIGGER"]
        elif len(df.columns) == 2:
            df.columns = ["Event Name", "Properties"]
            # Add empty description column
            df["Short Description of TRIGGER"] = ""
        elif len(df.columns) == 1:
            # Only one column - likely corrupted
            return None
        
        # Validate Event Name column is not empty
        if df.iloc[:, 0].isna().all() or (df.iloc[:, 0] == "").all():
            return None
        
        return df
        
    except Exception as e:
        print(f"  ⚠ Error reading {filepath.name}: {e}")
        return None

def create_excel_workbook():
    """Create Excel workbook with one sheet per CSV file."""
    
    print("=" * 70)
    print("Creating Excel Workbook")
    print("=" * 70)
    print(f"Source: {EXCEL_FILES_DIR}")
    print(f"Output: {OUTPUT_FILE}")
    print()
    
    # Get all CSV files
    csv_files = sorted(EXCEL_FILES_DIR.glob("review-table-*.csv"))
    
    if not csv_files:
        print("Error: No CSV files found!")
        return False
    
    print(f"Found {len(csv_files)} CSV files")
    print()
    
    # Remove old Excel file if it exists
    if OUTPUT_FILE.exists():
        OUTPUT_FILE.unlink()
        print("Removed old Excel file")
        print()
    
    # Create Excel writer
    with pd.ExcelWriter(OUTPUT_FILE, engine='openpyxl') as writer:
        
        sheets_created = 0
        
        # 1. Create Summary Sheet
        print("Creating Summary sheet...")
        quick_ref_path = SCRIPT_DIR / "quick-reference.csv"
        if quick_ref_path.exists():
            try:
                df_summary = pd.read_csv(quick_ref_path, on_bad_lines='skip', engine='python')
                if not df_summary.empty:
                    df_summary.to_excel(writer, sheet_name="Summary", index=False)
                    print(f"  ✓ Summary ({len(df_summary)} rows)")
                    sheets_created += 1
            except Exception as e:
                print(f"  ⚠ Summary error: {e}")
        
        # 2. Create one sheet for each CSV file
        print("\nCreating CSV sheets...")
        for csv_file in csv_files:
            sheet_name = get_sheet_name_from_filename(csv_file.name)
            df = read_csv_safely(csv_file)
            
            if df is not None and not df.empty:
                try:
                    df.to_excel(writer, sheet_name=sheet_name, index=False)
                    print(f"  ✓ {sheet_name}: {len(df)} events")
                    sheets_created += 1
                except Exception as e:
                    print(f"  ✗ Error writing {sheet_name}: {e}")
            else:
                print(f"  ⚠ Skipped {csv_file.name} (empty or invalid)")
        
        # 3. Create Master Events Sheet
        print("\nCreating Master Events sheet...")
        coverage_path = SCRIPT_DIR / "coverage-dashboard.csv"
        if coverage_path.exists():
            try:
                df_coverage = pd.read_csv(coverage_path, on_bad_lines='skip', engine='python')
                # Filter out duplicate header rows
                df_coverage = df_coverage[df_coverage.iloc[:, 0] != "Event Name"]
                # Remove rows that are just headers
                df_coverage = df_coverage[~df_coverage.apply(
                    lambda x: str(x.iloc[0]) == "Event Name" if len(x) > 0 else False, axis=1
                )]
                df_coverage = df_coverage.dropna(how='all').reset_index(drop=True)
                
                if not df_coverage.empty and len(df_coverage.columns) >= 3:
                    df_coverage.columns = ["Event Name", "Properties", "Short Description of TRIGGER"]
                    df_coverage.to_excel(writer, sheet_name="All Events (Master)", index=False)
                    print(f"  ✓ All Events (Master): {len(df_coverage)} events")
                    sheets_created += 1
            except Exception as e:
                print(f"  ⚠ Master Events error: {e}")
        
        # 4. Create Metadata sheet
        print("\nCreating Metadata sheet...")
        metadata = {
            "Property": [
                "Generated Date",
                "Total CSV Files",
                "Total Sheets",
                "Output File",
                "Source Directory"
            ],
            "Value": [
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                len(csv_files),
                sheets_created,
                OUTPUT_FILE.name,
                str(EXCEL_FILES_DIR)
            ]
        }
        df_metadata = pd.DataFrame(metadata)
        df_metadata.to_excel(writer, sheet_name="Metadata", index=False)
        print(f"  ✓ Metadata")
        sheets_created += 1
        
        if sheets_created == 0:
            raise ValueError("No sheets created!")
    
    print()
    print("=" * 70)
    print(f"✓ Excel workbook created successfully!")
    print(f"  File: {OUTPUT_FILE.name}")
    print(f"  Sheets: {sheets_created}")
    print(f"  Size: {OUTPUT_FILE.stat().st_size / 1024:.2f} KB")
    print("=" * 70)
    
    return True

if __name__ == "__main__":
    try:
        success = create_excel_workbook()
        if not success:
            print("\nFailed to create Excel workbook.")
    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
