#!/usr/bin/env python3
"""
Fix Corrupted CSV Files
Restores proper Event Name column and fixes formatting issues.
"""

import pandas as pd
from pathlib import Path

# Configuration
SCRIPT_DIR = Path(__file__).parent
EXCEL_FILES_DIR = SCRIPT_DIR / "excel-files"

# Correct event names for corrupted files
FIXES = {
    "review-table-information-pages-web.csv": [
        "web_information_page_view",
        "web_information_page_cta_click",
        "web_information_page_faq_accordion_open",
        "web_information_page_faq_accordion_close",
        "web_information_page_section_scroll",
        "web_information_page_link_click",
        "web_shipping_page_method_card_click",
        "web_shipping_page_tracking_info_click",
        "web_about_us_section_view",
        "web_about_us_press_mention_click",
        "web_error_page_home_click",
        "web_error_page_help_click",
        "web_error_page_refresh_click"
    ],
    "review-table-information-pages-mobile.csv": [
        "mobile_information_page_view",
        "mobile_information_page_cta_click",
        "mobile_information_page_faq_accordion_open",
        "mobile_information_page_faq_accordion_close",
        "mobile_information_page_section_scroll",
        "mobile_information_page_link_click",
        "mobile_shipping_page_method_card_click",
        "mobile_error_page_home_click",
        "mobile_error_page_help_click"
    ],
    "review-table-otc-brand-web.csv": [
        "web_otc_brand_page_view",
        "web_otc_brand_banner_product_1_click",
        "web_otc_brand_banner_product_2_click",
        "web_otc_brand_banner_product_3_click",
        "web_otc_brand_sale_product_click",
        "web_otc_brand_all_products_load_more_click",
        "web_otc_brand_product_card_click",
        "web_otc_brand_crm_subscribe_click",
        "web_otc_brand_review_carousel_next_click",
        "web_otc_brand_review_carousel_prev_click",
        "web_otc_brand_breadcrumb_home_click",
        "web_otc_brand_breadcrumb_category_click",
        "web_otc_brand_usps_section_view",
        "web_otc_brand_description_section_view"
    ],
    "review-table-otc-brand-mobile.csv": [
        "mobile_otc_brand_page_view",
        "mobile_otc_brand_banner_product_click",
        "mobile_otc_brand_sale_product_click",
        "mobile_otc_brand_all_products_load_more_click",
        "mobile_otc_brand_product_card_click",
        "mobile_otc_brand_crm_subscribe_click",
        "mobile_otc_brand_review_swipe"
    ]
}

def fix_csv_file(filename):
    """Fix a corrupted CSV file."""
    filepath = EXCEL_FILES_DIR / filename
    
    if not filepath.exists():
        print(f"  ⚠ File not found: {filename}")
        return False
    
    if filename not in FIXES:
        print(f"  ✓ {filename} - No fix needed")
        return True
    
    try:
        # Read the corrupted file
        df = pd.read_csv(filepath, on_bad_lines='skip', engine='python')
        
        # Check if Event Name column is missing or corrupted
        if len(df.columns) < 3 or df.columns[0] != "Event Name":
            # Try to fix by reading raw and parsing
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            # Rebuild CSV with correct structure
            fixed_lines = [lines[0]]  # Header
            event_names = FIXES[filename]
            
            for i, line in enumerate(lines[1:], 1):
                if i <= len(event_names):
                    # Parse the line
                    parts = line.strip().split(',', 2)
                    if len(parts) >= 2:
                        # Reconstruct with proper event name
                        event_name = event_names[i-1]
                        properties = parts[0].strip('"')
                        description = ','.join(parts[1:]).strip() if len(parts) > 1 else ""
                        fixed_lines.append(f'{event_name},"{properties}",{description}\n')
            
            # Write fixed file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(fixed_lines)
            
            print(f"  ✓ Fixed: {filename}")
            return True
        else:
            # Check if Event Name column has wrong values
            first_row_event = str(df.iloc[0, 0]) if len(df) > 0 else ""
            if first_row_event.startswith('"') and ',' in first_row_event:
                # Event Name column contains Properties - need to fix
                event_names = FIXES[filename]
                if len(df) <= len(event_names):
                    df.iloc[:, 0] = event_names[:len(df)]
                    df.to_csv(filepath, index=False)
                    print(f"  ✓ Fixed: {filename}")
                    return True
            
            print(f"  ✓ {filename} - Already correct")
            return True
            
    except Exception as e:
        print(f"  ✗ Error fixing {filename}: {e}")
        return False

def fix_coverage_dashboard():
    """Fix coverage-dashboard.csv duplicate headers."""
    filepath = SCRIPT_DIR / "coverage-dashboard.csv"
    
    if not filepath.exists():
        return False
    
    try:
        df = pd.read_csv(filepath, on_bad_lines='skip', engine='python')
        
        # Remove duplicate header rows
        df = df[df.iloc[:, 0] != "Event Name"]
        df = df.dropna(how='all').reset_index(drop=True)
        
        # Remove rows that are just "Event Name,Properties,Short Description of TRIGGER"
        df = df[~df.apply(lambda x: x.astype(str).str.contains('Event Name').any() and 
                          x.astype(str).str.contains('Properties').any(), axis=1)]
        
        # Ensure proper column names
        if len(df.columns) >= 3:
            df.columns = ["Event Name", "Properties", "Short Description of TRIGGER"]
        
        df.to_csv(filepath, index=False)
        print(f"  ✓ Fixed: coverage-dashboard.csv ({len(df)} events)")
        return True
    except Exception as e:
        print(f"  ✗ Error fixing coverage-dashboard.csv: {e}")
        return False

if __name__ == "__main__":
    print("=" * 70)
    print("Fixing Corrupted CSV Files")
    print("=" * 70)
    print()
    
    fixed_count = 0
    
    # Fix individual CSV files
    print("Fixing CSV files...")
    for filename in FIXES.keys():
        if fix_csv_file(filename):
            fixed_count += 1
    
    # Fix coverage dashboard
    print("\nFixing coverage dashboard...")
    if fix_coverage_dashboard():
        fixed_count += 1
    
    print()
    print("=" * 70)
    print(f"✓ Fixed {fixed_count} files")
    print("=" * 70)
