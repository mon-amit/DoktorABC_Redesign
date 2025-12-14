# Search Events - DoktorABC Redesign (OTC Focus)

This document catalogs all search-related interactions identified during the Figma scan, with special focus on the redesigned OTC search functionality.

## Search Events Summary

| Total Search Events | Input Focus | Autocomplete | Submit | Filters | Results | Unresolved |
|---------------------|-------------|--------------|--------|---------|---------|------------|
| 12 | 2 | 3 | 2 | 3 | 2 | 0 |

## Search Events

| Element Name | Type | Page | Platform | Event Name | Properties | Figma Node | Status |
|--------------|------|------|----------|------------|------------|------------|--------|
| OTC Search Input | Input Focus | Search OTC | web | `web_search_otc_input_focus` | `search_type, input_method` | search-otc-web-frame:510 | SCANNED |
| OTC Search Input | Input Focus | Search OTC | mobile | `mobile_search_otc_input_focus` | `search_type, input_method` | search-otc-mobile-frame:601 | SCANNED |
| OTC Autocomplete Item 1 | Autocomplete | Search OTC | web | `web_search_otc_autocomplete_1_click` | `suggested_term, search_query, position` | search-otc-web-frame:511 | SCANNED |
| OTC Autocomplete Item 2 | Autocomplete | Search OTC | web | `web_search_otc_autocomplete_2_click` | `suggested_term, search_query, position` | search-otc-web-frame:512 | SCANNED |
| OTC Autocomplete Item 3 | Autocomplete | Search OTC | web | `web_search_otc_autocomplete_3_click` | `suggested_term, search_query, position` | search-otc-web-frame:513 | SCANNED |
| OTC Search Submit | Submit | Search OTC | web | `web_search_otc_submit` | `search_query, result_count, search_time` | search-otc-web-frame:514 | SCANNED |
| OTC Search Submit | Submit | Search OTC | mobile | `mobile_search_otc_submit` | `search_query, result_count, search_time` | search-otc-mobile-frame:602 | SCANNED |
| OTC Filter Category | Filters | Search OTC | web | `web_search_otc_filter_category_applied` | `category_filter, search_query` | search-otc-web-frame:515 | SCANNED |
| OTC Filter Brand | Filters | Search OTC | web | `web_search_otc_filter_brand_applied` | `brand_filter, search_query` | search-otc-web-frame:516 | SCANNED |
| OTC Filter Price | Filters | Search OTC | web | `web_search_otc_filter_price_applied` | `price_filter, search_query` | search-otc-web-frame:517 | SCANNED |
| OTC Results Product Click | Results | Search OTC | web | `web_search_otc_result_product_click` | `product_id, position, search_query` | search-otc-web-frame:518 | SCANNED |
| OTC No Results State | Results | Search OTC | web | `web_search_otc_no_results_viewed` | `search_query, suggestion_count` | search-otc-web-frame:519 | SCANNED |

### Search Event Types

- **Input Focus**: When user clicks/taps search input
- **Autocomplete**: Dropdown suggestions appear and are clicked
- **Submit**: Search executed (Enter key, search button)
- **Filters**: Filter options applied to search results
- **Results**: Search results displayed and interacted with

### OTC Search Specific Events

- OTC product search initiation and focus tracking
- OTC autocomplete suggestions and selection
- OTC category, brand, and price filtering
- OTC search result interactions and positions
- OTC "no results" state tracking for UX improvement

---

**Generated**: $(date)
**Project**: DoktorABC_Redesign
**Scan Status**: IN_PROGRESS