# Events by Page Report - Notes

## Report Location
`docs/presentations/events-by-page-report.html`

## Screenshot Sources

### Available Screenshots (from `exports/full export/`)
- **Homepage**: `Home Page _ Desktop.png`, `Home Page _Mobile.png`
- **Account/Login**: `Login _ Desktop.png`, `Registration _ Desktop.png`
- **Navigation**: `Menu - Ohne Rezept.png`, `Menu- Mit Rezept.png`
- **Mobile**: `Registration Page _ Mobile.png`, `Home Page _Mobile.png`

### Missing Screenshots
The following pages don't have corresponding screenshots in the exports folder:
- Category Page
- Product Page
- Checkout Page
- Search OTC Page
- Treatment Page
- BMI Calculator
- OTC Brand Page
- Information Pages
- Popups/Modals

## Using Figma MCP for Screenshots

If you need screenshots for pages that aren't in the exports folder, you can use the Figma MCP server:

### Option 1: Get Screenshot for Specific Node
```javascript
// Use Figma MCP get_screenshot tool
// Provide nodeId from Figma design
```

### Option 2: Get Design Context
```javascript
// Use Figma MCP get_design_context tool
// This provides full design information including images
```

## CSV File Mapping

### Page Name → CSV File Pattern
- `homepage` → `review-table-homepage-{platform}.csv`
- `category` → `review-table-category-{platform}.csv`
- `product` → `review-table-product-{platform}.csv`
- `checkout` → `review-table-checkout-{platform}.csv`
- `account` → `review-table-account-{platform}.csv`
- `search-otc` → `review-table-search-otc-{platform}.csv`
- `navigation` → `review-table-navigation-{platform}.csv`
- `popups` → `review-table-popups-{platform}.csv`
- `treatment` → `review-table-treatment-{platform}.csv`
- `bmi-calculator` → `review-table-bmi-calculator-{platform}.csv`
- `otc-brand` → `review-table-otc-brand-{platform}.csv`
- `information-pages` → `review-table-information-pages-{platform}.csv`

## Data Issues Found

### Product Page CSV
The `review-table-product-web.csv` file appears to have missing event names in the first column. The CSV structure seems shifted - properties are in the Event Name column.

**Recommendation**: Review and fix the product CSV files to ensure proper event name extraction.

## Report Features

1. **Interactive Tabs**: Switch between Web and Mobile events for each page
2. **Screenshot Display**: Shows available screenshots from exports folder
3. **Event Cards**: Each event shows:
   - Event name (monospace font)
   - Properties (comma-separated)
   - RCA description (Root Cause Analysis + Pre-events)
4. **Table of Contents**: Quick navigation to each page section
5. **Statistics Dashboard**: Overview of total events, pages, platforms

## Next Steps

1. **Fix Product CSV**: Correct the event names in product CSV files
2. **Add Missing Screenshots**: Use Figma MCP to get screenshots for missing pages
3. **Complete Mobile Events**: Some mobile CSV files are empty - verify if events exist
4. **Validate Event Counts**: Ensure event counts match between quick-reference.csv and actual CSV files

## Using Figma MCP to Get Screenshots

If you want to add screenshots for missing pages:

1. **Identify Figma Node IDs**: Find the node IDs for each page in Figma
2. **Use MCP Tool**: Call `mcp_Figma_get_screenshot` with the nodeId
3. **Save Screenshots**: Save screenshots to `exports/full export/` folder
4. **Update Report**: Update the HTML report with new screenshot paths

## Report Structure

The HTML report is organized by:
- Page sections (13 total pages)
- Platform tabs (Web/Mobile)
- Event cards with full details
- Screenshot galleries
- Statistics overview

Each page section includes:
- Page title and event counts
- Available screenshots
- Platform-specific event lists
- Interactive tabs for platform switching
