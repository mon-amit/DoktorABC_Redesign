#!/usr/bin/env python3
"""
Split CSV file into multiple parts for Notion import (30KB limit per file)

Usage:
    python split-csv-for-notion.py [input_file] [max_size_kb]

Arguments:
    input_file: Path to CSV file (optional, finds latest if not provided)
    max_size_kb: Maximum size per file in KB (default: 30)
"""

import os
import sys
import glob
import pandas as pd
from pathlib import Path
from typing import List, Tuple

def get_file_size_kb(filepath: str) -> float:
    """Get file size in KB."""
    return os.path.getsize(filepath) / 1024

def split_csv_by_size(input_file: str, max_size_kb: int = 30) -> List[str]:
    """
    Split CSV file into multiple parts, each under max_size_kb.

    Args:
        input_file: Path to input CSV file
        max_size_kb: Maximum size per file in KB

    Returns:
        List of output file paths
    """
    if not os.path.exists(input_file):
        raise FileNotFoundError(f"Input file not found: {input_file}")

    # Read the CSV
    df = pd.read_csv(input_file)
    total_rows = len(df)

    print(f"📄 Splitting {input_file}")
    print(f"   Total rows: {total_rows}")
    print(f"   Target size per file: ≤{max_size_kb}KB")

    # Keep header for all files
    header = df.columns.tolist()

    # Calculate approximate rows per file
    # Start with a conservative estimate
    avg_row_size = len(df.to_csv(index=False)) / total_rows / 1024  # KB per row
    estimated_rows_per_file = int(max_size_kb / avg_row_size * 0.8)  # 80% safety margin

    print(f"   Estimated rows per file: ~{estimated_rows_per_file}")

    output_files = []
    current_row = 0

    while current_row < total_rows:
        file_number = len(output_files) + 1
        remaining_rows = total_rows - current_row
        rows_for_this_file = min(estimated_rows_per_file, remaining_rows)

        # Extract chunk
        chunk = df.iloc[current_row:current_row + rows_for_this_file]

        # Create output filename
        base_name = Path(input_file).stem
        output_file = f"{base_name}_part{file_number}.csv"

        # Save chunk
        chunk.to_csv(output_file, index=False)
        file_size_kb = get_file_size_kb(output_file)

        print(f"   📄 Part {file_number}: {len(chunk)} rows, {file_size_kb:.1f}KB")

        # If this file is still too big, we need to split it further
        if file_size_kb > max_size_kb:
            print(f"   ⚠️  Part {file_number} still too big, splitting further...")
            # Split this chunk into smaller pieces
            sub_chunks = split_chunk(chunk, max_size_kb)
            os.remove(output_file)  # Remove the oversized file

            # Rename the sub-chunks with proper numbering
            for i, sub_chunk in enumerate(sub_chunks):
                sub_file = f"{base_name}_part{file_number}.{i+1}.csv"
                sub_chunk.to_csv(sub_file, index=False)
                sub_size_kb = get_file_size_kb(sub_file)
                print(f"      📄 {sub_file}: {len(sub_chunk)} rows, {sub_size_kb:.1f}KB")
                output_files.append(sub_file)
        else:
            output_files.append(output_file)

        current_row += rows_for_this_file

    return output_files

def split_chunk(chunk: pd.DataFrame, max_size_kb: int) -> List[pd.DataFrame]:
    """Split a DataFrame chunk into smaller pieces under max_size_kb."""
    total_rows = len(chunk)
    sub_chunks = []

    # Binary search for optimal chunk size
    low, high = 1, total_rows

    while low <= high:
        mid = (low + high) // 2
        test_chunk = chunk.iloc[:mid]
        test_csv = test_chunk.to_csv(index=False)
        test_size_kb = len(test_csv.encode('utf-8')) / 1024

        if test_size_kb <= max_size_kb:
            low = mid + 1
        else:
            high = mid - 1

    # Use the largest working size
    optimal_size = high

    # Split into chunks of optimal_size
    for i in range(0, total_rows, optimal_size):
        sub_chunk = chunk.iloc[i:i + optimal_size]
        if not sub_chunk.empty:
            sub_chunks.append(sub_chunk)

    return sub_chunks

def find_latest_csv() -> str:
    """Find the latest Jira status history CSV file."""
    pattern = "jira_status_history_*.csv"
    files = glob.glob(pattern)

    if not files:
        raise FileNotFoundError("No jira_status_history_*.csv files found")

    # Sort by modification time (newest first)
    latest_file = max(files, key=os.path.getmtime)
    return latest_file

def main():
    """Main function."""
    print("=" * 50)
    print("CSV Splitter for Notion Import")
    print("=" * 50)
    print()

    # Parse arguments
    input_file = sys.argv[1] if len(sys.argv) > 1 else None
    max_size_kb = int(sys.argv[2]) if len(sys.argv) > 2 else 30

    # Find input file
    if input_file is None:
        try:
            input_file = find_latest_csv()
            print(f"📂 Using latest CSV: {input_file}")
        except FileNotFoundError as e:
            print(f"❌ {e}")
            print("Usage: python split-csv-for-notion.py [input_file] [max_size_kb]")
            sys.exit(1)
    else:
        if not os.path.exists(input_file):
            print(f"❌ File not found: {input_file}")
            sys.exit(1)

    original_size = get_file_size_kb(input_file)
    print(f"📊 Original file size: {original_size:.1f}KB")
    print(f"🎯 Target size per file: ≤{max_size_kb}KB")
    print()

    try:
        # Split the file
        output_files = split_csv_by_size(input_file, max_size_kb)

        print()
        print("=" * 50)
        print("✅ SPLIT COMPLETE")
        print("=" * 50)

        total_size = sum(get_file_size_kb(f) for f in output_files)
        print(f"📄 Files created: {len(output_files)}")
        print(f"📊 Total size: {total_size:.1f}KB")
        print()

        print("📋 Output files:")
        for i, file in enumerate(output_files, 1):
            size_kb = get_file_size_kb(file)
            rows = len(pd.read_csv(file))
            print(f"   {i}. {file} ({rows} rows, {size_kb:.1f}KB)")

        print()
        print("💡 Next steps:")
        print("   1. Import each file into Notion separately")
        print("   2. Use the same database for all imports")
        print("   3. Notion will merge rows automatically by Entry Name")

    except Exception as e:
        print(f"❌ Error splitting file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

