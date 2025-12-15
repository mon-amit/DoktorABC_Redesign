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
| Search OTC | [review-table-search-otc-web.csv](review-table-search-otc-web.csv) (16 events) | [review-table-search-otc-mobile.csv](review-table-search-otc-mobile.csv) (2 events) | 18 events |
| Treatment | [review-table-treatment-web.csv](review-table-treatment-web.csv) (3 events) | [review-table-treatment-mobile.csv](review-table-treatment-mobile.csv) (0 events) | 3 events |

## CSV Format

Each CSV file follows the standard 3-column format:

```csv
Event Name;Properties;Short Description of TRIGGER
event_name_unique;"property1, property2";RCA: Root cause analysis. Pre-events: What led to this trigger
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

Use the CSV Filter Tool to analyze events across all tables:

```bash
# Show summary across all tables
node csv-filter-tool.js summary

# Filter by platform
node csv-filter-tool.js filter platform web

# Export high priority events
node csv-filter-tool.js filter priority --export
```

## Mobile Expansion Opportunity

Current mobile coverage: 5 events (4.3% of total)
Recommended: Expand to 50+ mobile-specific events for better mobile UX tracking.
