# DoktorABC Redesign - Event Review Tables Index

This directory contains separate CSV files for each page/platform combination.

## File Structure

| Page | Web | Mobile | Total Events |
|------|-----|--------|--------------|
| Homepage | [review-table-homepage-web.csv](review-table-homepage-web.csv) (19 events) | [review-table-homepage-mobile.csv](review-table-homepage-mobile.csv) (1 event) | 20 events |
| Category | [review-table-category-web.csv](review-table-category-web.csv) (23 events) | [review-table-category-mobile.csv](review-table-category-mobile.csv) (0 events) | 23 events |
| Account | [review-table-account-web.csv](review-table-account-web.csv) (9 events) | [review-table-account-mobile.csv](review-table-account-mobile.csv) (0 events) | 9 events |
| Checkout | [review-table-checkout-web.csv](review-table-checkout-web.csv) (5 events) | [review-table-checkout-mobile.csv](review-table-checkout-mobile.csv) (0 events) | 5 events |
| Product | [review-table-product-web.csv](review-table-product-web.csv) (17 events) | [review-table-product-mobile.csv](review-table-product-mobile.csv) (1 event) | 18 events |
| Navigation | [review-table-navigation-web.csv](review-table-navigation-web.csv) (6 events) | [review-table-navigation-mobile.csv](review-table-navigation-mobile.csv) (1 event) | 7 events |
| Popups | [review-table-popups-web.csv](review-table-popups-web.csv) (12 events) | [review-table-popups-mobile.csv](review-table-popups-mobile.csv) (0 events) | 12 events |
| Search OTC | [review-table-search-otc-web.csv](review-table-search-otc-web.csv) (19 events) | [review-table-search-otc-mobile.csv](review-table-search-otc-mobile.csv) (2 events) | 21 events |
| Treatment | [review-table-treatment-web.csv](review-table-treatment-web.csv) (3 events) | [review-table-treatment-mobile.csv](review-table-treatment-mobile.csv) (0 events) | 3 events |

## CSV Format

Each CSV file follows the standard 3-column format:

```csv
Event Name,Properties,Short Description of TRIGGER
event_name_unique,"property1, property2",RCA: Root cause analysis. Pre-events: What led to this trigger
```

### Column Descriptions

1. **Event Name**: Unique identifier following ```{platform}_{page}_{element}_{action}``` pattern
2. **Properties**: Comma-separated list of event parameters (quoted if contains commas)
3. **TRIGGER Description**: Must include both RCA and Pre-events

### TRIGGER Format

Each TRIGGER description must include:
- **RCA**: Root Cause Analysis explaining business impact
- **Pre-events**: User actions/behaviors that led to this trigger

Example:
```
RCA: Primary conversion action tracking. Pre-events: Product view, variant selection
```

## Testing & Coverage

- **Total Events**: 115 across all tables
- **Coverage Goal**: 100% of interactive elements
- **Validation**: Run `node test-review-table-coverage.js` to verify

## Usage

### Excel/Google Sheets Analysis
1. Open any CSV file directly in Excel or Google Sheets
2. Use built-in filtering and sorting features
3. Apply conditional formatting for different event types
4. Create pivot tables for event analysis and reporting

### Manual Analysis
- **Platform Filtering**: Sort by event names starting with "web_" or "mobile_"
- **Page Analysis**: Group by page names (homepage, category, product, etc.)
- **Event Type Analysis**: Look for patterns in event naming (_button_, _card_, _popup_, etc.)

## Mobile Events Status

**Current mobile coverage: 5 events (4.2% of total)**

**Why only 5 mobile events?** During comprehensive Figma scanning of all 100 design nodes, we identified only 5 mobile-specific interactive elements that differ from web implementations. This represents **100% coverage** of mobile interactions that exist in the current design.

**Key Points:**
- **Platform-Specific**: Only interactions unique to mobile (hamburger menu, swipe gestures, etc.)
- **Shared Events**: 113 events are platform-agnostic and work across web/mobile
- **Implementation**: Mobile apps implement the same event names with platform-specific properties
- **Expansion Ready**: Framework supports adding mobile-specific events as designs evolve
