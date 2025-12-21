# CSV Usage Guide: DoktorABC Event Mapping Review Tables

**Date:** December 15, 2025
**Files:** 18 CSV files with 118 events total

---

## 📋 **What Are These CSV Files?**

These are the **final deliverables** from the Figma UI Event Mapping project. Each CSV contains:

- **118 total events** (113 web + 5 mobile)
- **18 files** (9 page types × 2 platforms)
- **3-column format** for PM review and implementation

### **CSV Format (3 Columns)**

| Column | Description | Example |
|--------|-------------|---------|
| **Event Name** | Unique technical identifier | `web_homepage_cta_start_click` |
| **Properties** | Data to capture | `treatment_type` |
| **Short Description of TRIGGER** | RCA + Pre-events | `RCA: Main conversion funnel entry point. Pre-events: Page load` |

---

## 🚀 **Quick Start: Open and Review**

### **Method 1: Excel (Recommended for PM Review)**

```bash
# Navigate to the CSV directory
cd deliverables/dean-delivery-package/excel-files/

# Run PowerShell script (Windows)
.\convert-to-excel.ps1
```

**What this creates:**
- 18 `.xlsx` files with professional formatting
- Auto-sized columns
- Table styling
- Data validation for event names
- Conditional formatting
- Auto-filters on headers

### **Method 2: Google Sheets (Collaboration)**

1. **Open Google Sheets**
2. **File → Import → Upload**
3. **Select CSV file**
4. **Import options:**
   - Separator: Comma
   - Convert text to numbers/dates: No
5. **Click "Import data"**

**Pro Tip:** Create a master workbook with tabs for each page type.

### **Method 3: Any Spreadsheet App**

- **LibreOffice Calc**
- **Numbers (Mac)**
- **Excel Online**
- Just open the CSV files directly

---

## 📊 **File Organization**

```
excel-files/
├── review-table-homepage-web.csv      # 20 events
├── review-table-homepage-mobile.csv   # 1 event (mobile-specific)
├── review-table-category-web.csv      # 23 events
├── review-table-product-web.csv       # 18 events
├── review-table-checkout-web.csv      # 5 events
├── review-table-account-web.csv       # 9 events
├── review-table-search-otc-web.csv    # 19 events
├── review-table-navigation-web.csv    # 6 events
├── review-table-popups-web.csv        # 12 events
├── review-table-treatment-web.csv     # 3 events
└── [10 mobile files with minimal mobile-specific events]
```

---

## 👥 **How Different Roles Use These Files**

### **For PM (Dean) - Review & Sign-off**

#### **Review Process:**
1. **Open in Excel/Google Sheets** (use the PowerShell script)
2. **Review by page type** (start with high-impact: homepage, category, product)
3. **Check trigger descriptions** - ensure RCA and pre-events are clear
4. **Validate properties** - do they capture needed business data?
5. **Flag any issues** - use comments or separate sheet for feedback

#### **PM Checklist:**
```markdown
- [ ] Event names are business-meaningful (not just technical)
- [ ] Properties capture required data for dashboards
- [ ] Trigger descriptions include RCA (why track this?)
- [ ] Pre-events are realistic (what happens before?)
- [ ] Coverage is complete (no missing interactions)
- [ ] Mobile events are appropriate (only mobile-specific ones)
```

#### **Example PM Feedback:**
```
Homepage CSV Review:
- Line 3: Add 'button_location' property (hero vs footer)
- Line 7: Change event name to 'web_homepage_newsletter_signup_attempt'
- Line 12: Add 'user_type' property for segmentation
```

### **For Developer - Implementation**

#### **Implementation Process:**
1. **Sort by priority** (PM provides priority ranking)
2. **Map to Mixpanel events** (transform technical names to business names)
3. **Add properties** (extend with custom properties as needed)
4. **Implement tracking** (add to components)

#### **Developer Workflow:**
```javascript
// Example: Homepage CTA Click
mixpanel.track('treatment_journey_started', {
  treatment_type: 'general',
  button_location: 'hero',
  page_url: window.location.pathname,
  user_id: getUserId(),
  timestamp: new Date().toISOString()
});
```

#### **Property Mapping:**
- **treatment_type**: Maps to category selection
- **product_id**: Maps to specific product clicked
- **category_id**: Maps to category browsed
- **button_location**: Where button appears (hero, footer, sidebar)

### **For QA - Testing**

#### **QA Checklist:**
- [ ] All events fire when expected interactions occur
- [ ] Properties contain correct data types
- [ ] Event names match specification
- [ ] No duplicate events
- [ ] Mobile events only fire on mobile
- [ ] Web events only fire on web

#### **Test Case Generation:**
```gherkin
Scenario: Homepage CTA Click
  Given user is on homepage
  When user clicks "Start My Journey" button
  Then event "web_homepage_cta_start_click" fires
  And property "treatment_type" is set
  And trigger description matches specification
```

---

## 🎯 **Advanced Usage**

### **Filtering & Analysis**

#### **Find Events by Type:**
```
# Filter in Excel/Google Sheets
=COUNTIF(A:A, "*cta*")  # Count CTA events
=COUNTIF(A:A, "*mobile*")  # Count mobile events
```

#### **Event Coverage Dashboard:**
Create a summary sheet with:
- Total events per page
- Events with properties defined
- Events needing PM review
- Implementation status

#### **Property Analysis:**
```
Common Properties:
- treatment_type (category selection)
- product_id (specific product)
- category_id (category browsing)
- button_location (hero, footer, sidebar)
- user_type (new, returning, premium)
```

### **Event Name Patterns**

#### **Web Events:**
```
web_{page}_{element_type}_{action}
web_homepage_cta_start_click
web_category_button_filter_click
web_product_card_add_to_cart_click
```

#### **Mobile Events:**
```
mobile_{page}_{element_type}_{action}
mobile_homepage_hamburger_menu_open
```

#### **Property Patterns:**
- **treatment_type**: `erectile-dysfunction`, `weight-loss`, `hair-loss`
- **category_id**: `skin-care`, `hair-growth`, `sexual-health`
- **product_id**: `minoxidil-5mg`, `viagra-50mg`, `birth-control`

### **Trigger Description Standards**

#### **Format:**
```
RCA: [Business reason]. Pre-events: [What happens before]
```

#### **Examples:**
```
RCA: Main conversion funnel entry point. Pre-events: Page load
RCA: Product comparison and selection. Pre-events: Category browse, product view
RCA: Lead generation and marketing opt-in. Pre-events: Page load, newsletter form visible
```

---

## 🛠 **Tools & Scripts**

### **PowerShell Script (Windows)**
```powershell
# Convert all CSVs to Excel format
.\convert-to-excel.ps1
```

**Requires:** `Install-Module -Name ImportExcel`

### **Python Script (Cross-platform)**
```python
import pandas as pd
import glob

# Convert all CSVs to Excel
for csv_file in glob.glob('*.csv'):
    df = pd.read_csv(csv_file)
    excel_file = csv_file.replace('.csv', '.xlsx')
    df.to_excel(excel_file, index=False)
    print(f'Converted {csv_file} to {excel_file}')
```

### **Google Sheets Automation**
```javascript
// Google Apps Script to import CSVs
function importCSVs() {
  const folder = DriveApp.getFolderById('YOUR_FOLDER_ID');
  const files = folder.getFilesByType(MimeType.CSV);

  while (files.hasNext()) {
    const file = files.next();
    const csvData = file.getBlob().getDataAsString();
    const csvArray = Utilities.parseCsv(csvData);

    // Create new sheet and import data
    const spreadsheet = SpreadsheetApp.create(file.getName().replace('.csv', ''));
    const sheet = spreadsheet.getActiveSheet();
    sheet.getRange(1, 1, csvArray.length, csvArray[0].length).setValues(csvArray);
  }
}
```

---

## 📈 **Business Value**

### **Analytics Insights Enabled:**
- **Conversion Funnel Tracking**: CTA clicks → treatment selection → checkout
- **Content Performance**: Which categories/products get most clicks
- **User Journey Mapping**: Pre-event analysis for optimization
- **A/B Testing Foundation**: Event-based experiment tracking
- **Personalization Data**: Treatment preferences and behavior patterns

### **ROI Impact:**
- **Marketing**: Better lead qualification and conversion tracking
- **Product**: Data-driven feature prioritization
- **Growth**: Identify high-value user segments and behaviors
- **Operations**: Monitor system performance and user experience

---

## 🚨 **Common Issues & Solutions**

### **Issue: CSV Opens in Wrong Format**
**Solution:** In Excel, use "Data → From Text/CSV" and specify comma separator

### **Issue: Special Characters in Properties**
**Solution:** Properties are comma-separated strings - use quotes if needed

### **Issue: Missing Properties**
**Solution:** PM can add custom properties during review

### **Issue: Event Name Conflicts**
**Solution:** Use unique identifiers (page + element + action)

### **Issue: Mobile Events**
**Solution:** Only 5 mobile-specific events (hamburger menu, etc.) - rest are platform-agnostic

---

## 🎯 **Next Steps After Review**

### **Immediate (Today):**
1. **PM Review**: Dean reviews CSVs, provides feedback
2. **Event Naming**: Define Mixpanel-friendly event names
3. **Property Extensions**: Add custom properties for business insights
4. **Priority Ranking**: Which events to implement first

### **Short-term (This Week):**
1. **Implementation**: High-priority events in production
2. **Testing**: QA validates event firing and data accuracy
3. **Dashboard Setup**: Mixpanel dashboard configuration
4. **Documentation**: Update implementation guides

### **Long-term (This Month):**
1. **A/B Testing**: Use events for experiment tracking
2. **Performance Monitoring**: Track conversion funnel health
3. **Optimization**: Data-driven UX improvements
4. **Expansion**: Add more properties as business needs evolve

---

**Ready to start?** Open `review-table-homepage-web.csv` first - it's the highest-impact page with 20 events! 🚀