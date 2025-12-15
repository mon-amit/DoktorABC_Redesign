# Search OTC - Mobile Events Review Table

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_search_otc_button_submit_click` | `search_query, search_type` | RCA: Mobile search initiation and query submission tracking. Pre-events: Search input focus |
| `mobile_search_otc_button_voice_click` | `search_type` | RCA: Mobile voice search adoption and accessibility usage. Pre-events: Search input focus |
| `mobile_search_otc_button_clear_click` | `previous_query` | RCA: Mobile search refinement and query reset patterns. Pre-events: Search submission |
| `mobile_search_otc_button_filter_category_click` | `otc_categories, search_query` | RCA: Mobile category-based search refinement. Pre-events: Search results view |
| `mobile_search_otc_button_filter_brand_click` | `otc_brands, search_query` | RCA: Mobile brand preference in OTC search. Pre-events: Search results view |
| `mobile_search_otc_button_filter_price_click` | `price_range, search_query` | RCA: Mobile price-based OTC product filtering. Pre-events: Search results view |
| `mobile_search_otc_button_sort_click` | `sort_type, search_query` | RCA: Mobile result organization preferences. Pre-events: Search results view |
| `mobile_search_otc_button_load_more_click` | `current_page, search_query` | RCA: Mobile search result consumption depth. Pre-events: View current results |
| `mobile_search_otc_button_add_to_cart_click` | `product_id, search_query, position` | RCA: Mobile search-to-purchase conversion tracking. Pre-events: Search results view |
| `mobile_search_otc_input_focus` | `search_type, input_method` | RCA: Mobile search intent and interaction method. Pre-events: Page navigation |
| `mobile_search_otc_autocomplete_1_click` | `suggested_term, search_query, position` | RCA: Mobile autocomplete effectiveness and suggestion relevance. Pre-events: Search typing |
| `mobile_search_otc_autocomplete_2_click` | `suggested_term, search_query, position` | RCA: Mobile autocomplete effectiveness and suggestion relevance. Pre-events: Search typing |
| `mobile_search_otc_autocomplete_3_click` | `suggested_term, search_query, position` | RCA: Mobile autocomplete effectiveness and suggestion relevance. Pre-events: Search typing |
| `mobile_search_otc_submit` | `search_query, result_count, search_time` | RCA: Mobile search performance and result quality metrics. Pre-events: Search input |
| `mobile_search_otc_filter_category_applied` | `category_filter, search_query` | RCA: Mobile filter application success and usage patterns. Pre-events: Filter selection |
| `mobile_search_otc_filter_brand_applied` | `brand_filter, search_query` | RCA: Mobile brand filter effectiveness. Pre-events: Filter selection |
| `mobile_search_otc_filter_price_applied` | `price_filter, search_query` | RCA: Mobile price filter usage patterns. Pre-events: Filter selection |
| `mobile_search_otc_result_product_click` | `product_id, position, search_query` | RCA: Mobile search result click-through rates and position effectiveness. Pre-events: Search results view |
| `mobile_search_otc_no_results_viewed` | `search_query, suggestion_count` | RCA: Mobile failed search experience and recovery options. Pre-events: Search submission |

---
**Total Events**: 19
**Platform**: Mobile
**Page**: Search OTC
**Status**: Ready for PM review