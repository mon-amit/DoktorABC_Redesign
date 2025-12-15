# 📊 Google Sheets Import Guide

## Quick Import to Google Sheets (3 minutes)

### Step 1: Upload CSV Files
1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **"Create"** → **"File Upload"**
3. Upload any CSV file from `excel-files/` folder
4. Click **"Open with Google Sheets"**

### Step 2: Format the Data
1. **Freeze Header Row**: View → Freeze → 1 row
2. **Auto-resize Columns**: Select all → Format → Column width → Auto-resize
3. **Add Filters**: Data → Create a filter

### Step 3: Enhanced Features
1. **Conditional Formatting**: Format → Conditional formatting
   - Green for complete events
   - Yellow for review needed
   - Red for missing data

2. **Data Validation**: Data → Data validation
   - Add dropdown for event types
   - Validate property formats

3. **Multiple Sheets**: Add tabs for Mobile/Web/Summary

---

## Google Sheets Template Features

### Recommended Setup Per File:

**Sheet 1: Web Events**
- Import `review-table-[page]-web.csv`
- Conditional formatting for completion status

**Sheet 2: Mobile Events**
- Import `review-table-[page]-mobile.csv`
- Same formatting as Web sheet

**Sheet 3: Summary Dashboard**
```
A1: Page Summary
A3: Total Events:     =COUNTA(Sheet1!A:A) + COUNTA(Sheet2!A:A)
A4: Web Events:       =COUNTA(Sheet1!A:A)
A5: Mobile Events:    =COUNTA(Sheet2!A:A)
A6: Coverage:         =IF(A3>0, "100%", "0%")
A7: Last Updated:     =TODAY()
```

### Advanced Formulas

**Completion Tracking:**
```
=COUNTIFS(A:A, "<>", C:C, "<>") / COUNTIF(A:A, "<>")  // % complete descriptions
```

**Event Type Analysis:**
```
=COUNTIF(A:A, "*_click")     // Click events
=COUNTIF(A:A, "*_submit")    // Form submissions
=COUNTIF(A:A, "*_show")      // Page/element views
```

---

## Sharing & Collaboration

### For Team Reviews:
1. **Share Sheet**: Click Share button
2. **Set Permissions**: Comment-only for stakeholders, Edit for team
3. **Add Comments**: Right-click cells to add notes
4. **Version History**: File → Version history

### For PM Workflow:
1. **Create Master Sheet**: Combine all page sheets
2. **Add Priority Column**: High/Medium/Low impact
3. **Track Implementation**: Status column (Not Started/In Progress/Complete)
4. **Set Deadlines**: Due date column with conditional formatting

---

## Export Options

**Download as Excel:**
- File → Download → Microsoft Excel (.xlsx)

**Export as PDF:**
- File → Download → PDF document

**Schedule Reports:**
- Use Google Apps Script for automated exports
- Set up recurring email reports

---

## Tips for PM Use

### Daily Workflow:
- Open relevant page sheet
- Filter by priority or status
- Review new events with dev team
- Update implementation status

### Weekly Reporting:
- Generate coverage reports
- Share progress with stakeholders
- Identify bottlenecks in implementation

### Monthly Reviews:
- Full audit of event coverage
- Performance analysis of key events
- Plan for new analytics requirements

---

## Troubleshooting

### Common Issues:

**CSV Import Problems:**
- Ensure CSV uses commas as separators
- Check for special characters in descriptions
- Use UTF-8 encoding for international text

**Formatting Issues:**
- Clear all formatting before importing
- Use plain text for descriptions
- Avoid merged cells

**Sharing Problems:**
- Use organizational Google Workspace
- Check sharing settings
- Enable link sharing for external stakeholders

---

*Google Sheets provides better collaboration than Excel for distributed teams. Use this guide to get started quickly!*