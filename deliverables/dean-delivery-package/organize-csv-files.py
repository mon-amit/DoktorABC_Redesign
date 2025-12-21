#!/usr/bin/env python3
"""
CSV File Organizer
Consolidates all review-table CSV files from various locations into one organized folder.
Removes duplicates and handles different CSV formats (comma vs semicolon delimited).
"""

import pandas as pd
import shutil
from pathlib import Path
from collections import defaultdict

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent.parent
TARGET_DIR = Path(__file__).parent / "excel-files"
SOURCE_DIRS = [
    PROJECT_ROOT / "docs" / "design" / "ui-event-mapping" / "final-tables",
    PROJECT_ROOT / "exports",
    PROJECT_ROOT / "deliverables" / "dean-delivery-package" / "excel-files",
]

def read_csv_any_format(filepath):
    """Read CSV file handling both comma and semicolon delimiters."""
    try:
        # Try comma first (standard)
        df = pd.read_csv(filepath, on_bad_lines='skip', engine='python')
        if len(df.columns) < 2:
            # Try semicolon
            df = pd.read_csv(filepath, sep=';', on_bad_lines='skip', engine='python')
        return df
    except Exception as e:
        print(f"  ⚠ Error reading {filepath.name}: {e}")
        return None

def normalize_csv(df):
    """Normalize CSV format - ensure consistent column names and format."""
    if df is None or df.empty:
        return None
    
    # Standardize column names
    if len(df.columns) >= 3:
        df.columns = ["Event Name", "Properties", "Short Description of TRIGGER"]
    elif len(df.columns) == 2:
        df.columns = ["Event Name", "Properties"]
    else:
        return None
    
    # Remove duplicate header rows
    df = df[df.iloc[:, 0] != "Event Name"].reset_index(drop=True)
    
    # Remove empty rows
    df = df.dropna(how='all').reset_index(drop=True)
    
    return df

def organize_csv_files():
    """Organize all CSV files into target directory."""
    
    print("=" * 70)
    print("CSV File Organization Script")
    print("=" * 70)
    print()
    
    # Ensure target directory exists
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    
    # Track files found
    files_found = defaultdict(list)
    files_processed = []
    files_skipped = []
    
    # Find all review-table CSV files
    print("Scanning for CSV files...")
    for source_dir in SOURCE_DIRS:
        if source_dir.exists():
            csv_files = list(source_dir.glob("review-table*.csv"))
            for csv_file in csv_files:
                files_found[csv_file.name].append(csv_file)
                print(f"  Found: {csv_file}")
    
    # Also check for the rogue file
    rogue_file = PROJECT_ROOT / "exports" / "redesign-analytics-review-table.csv"
    if rogue_file.exists():
        print(f"  Found rogue file: {rogue_file}")
        # This might be a combined file - we'll handle it separately
    
    print()
    print(f"Found {sum(len(files) for files in files_found.values())} CSV files")
    print(f"Unique filenames: {len(files_found)}")
    print()
    
    # Process each unique filename
    print("Processing files...")
    for filename, file_paths in sorted(files_found.items()):
        target_path = TARGET_DIR / filename
        
        # If multiple files with same name, use the most recent or from deliverables
        if len(file_paths) > 1:
            # Prefer files from deliverables folder
            preferred = [f for f in file_paths if "deliverables" in str(f)]
            if preferred:
                source_file = preferred[0]
            else:
                # Use most recent
                source_file = max(file_paths, key=lambda p: p.stat().st_mtime)
            
            print(f"  {filename}: {len(file_paths)} copies found, using: {source_file.name}")
            for dup in file_paths:
                if dup != source_file:
                    print(f"    (Skipping duplicate: {dup})")
        else:
            source_file = file_paths[0]
        
        # Read and normalize CSV
        df = read_csv_any_format(source_file)
        df_normalized = normalize_csv(df)
        
        if df_normalized is not None and not df_normalized.empty:
            # Save to target location
            df_normalized.to_csv(target_path, index=False)
            files_processed.append(filename)
            print(f"  ✓ Processed: {filename} ({len(df_normalized)} events)")
        else:
            files_skipped.append(filename)
            print(f"  ⚠ Skipped: {filename} (empty or invalid)")
    
    # Handle rogue file if it exists
    if rogue_file.exists():
        print()
        print("Processing rogue file...")
        df_rogue = read_csv_any_format(rogue_file)
        if df_rogue is not None and not df_rogue.empty:
            # Check if it's a combined file
            print(f"  Rogue file contains {len(df_rogue)} rows")
            print(f"  Note: This appears to be a combined/master file")
            print(f"  Consider reviewing: {rogue_file}")
    
    print()
    print("=" * 70)
    print("Summary")
    print("=" * 70)
    print(f"Files processed: {len(files_processed)}")
    print(f"Files skipped: {len(files_skipped)}")
    print(f"Target directory: {TARGET_DIR}")
    print()
    
    if files_skipped:
        print("Skipped files:")
        for f in files_skipped:
            print(f"  - {f}")
        print()
    
    print("✓ CSV files organized successfully!")
    print("=" * 70)
    
    return len(files_processed)

if __name__ == "__main__":
    try:
        count = organize_csv_files()
        print(f"\nReady to create Excel workbook with {count} CSV files.")
    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
