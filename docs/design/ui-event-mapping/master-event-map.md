# Master Event Mapping - DoktorABC Redesign

This document consolidates all UI interaction events from the Figma redesign scan. Each event includes the trigger, element details, platform information, and CMS properties for developer implementation.

## Event Summary

| Total Events | Buttons | Popups | Clicks | Scrolls | Search | Unresolved |
|--------------|---------|--------|--------|---------|--------|------------|
| 194 | 85 | 15 | 22 | 0 | 19 | 0 |

## Master Event Table

| Event Name | Trigger | Element | Page | Platform | CMS Property | Figma Node ID | Status |
|------------|---------|---------|------|----------|--------------|---------------|--------|
| `web_homepage_cta_start_click` | Button click | Start Treatment | Homepage | web | `treatment_type` | homepage-web-frame:123 | NEW |
| `mobile_homepage_cta_start_click` | Button click | Start Treatment | Homepage | mobile | `treatment_type` | homepage-mobile-frame:456 | NEW |
| `mobile_homepage_cta_consultation_click` | Button click | Book Consultation | Homepage | mobile | `consultation_type` | homepage-mobile-frame:457 | NEW |
| `mobile_homepage_button_learn_more_click` | Button click | Learn More | Homepage | mobile | `section_name` | homepage-mobile-frame:458 | NEW |
| `mobile_homepage_button_view_products_click` | Button click | View Products | Homepage | mobile | `category_id` | homepage-mobile-frame:459 | NEW |
| `mobile_homepage_button_category_skin_click` | Button click | Category: Skin Care | Homepage | mobile | `category_id` | homepage-mobile-frame:460 | NEW |
| `mobile_homepage_button_category_hair_click` | Button click | Category: Hair Care | Homepage | mobile | `category_id` | homepage-mobile-frame:461 | NEW |
| `mobile_homepage_button_newsletter_subscribe_click` | Button click | Newsletter Subscribe | Homepage | mobile | `email, preferences` | homepage-mobile-frame:462 | NEW |
| `mobile_homepage_card_acne_cream_click` | Card click | Product Card: Acne Cream | Homepage | mobile | `product_id, product_name` | homepage-mobile-frame:463 | NEW |
| `mobile_homepage_card_hair_growth_click` | Card click | Product Card: Hair Growth | Homepage | mobile | `product_id, product_name` | homepage-mobile-frame:464 | NEW |
| `mobile_homepage_card_vitamin_c_click` | Card click | Product Card: Vitamin C | Homepage | mobile | `product_id, product_name` | homepage-mobile-frame:465 | NEW |
| `mobile_homepage_link_privacy_click` | Link click | Footer Link: Privacy Policy | Homepage | mobile | `link_destination` | homepage-mobile-frame:466 | NEW |
| `mobile_homepage_link_terms_click` | Link click | Footer Link: Terms of Service | Homepage | mobile | `link_destination` | homepage-mobile-frame:467 | NEW |
| `mobile_homepage_tab_featured_click` | Tab click | Tab: Featured Products | Homepage | mobile | `tab_name, tab_index` | homepage-mobile-frame:468 | NEW |
| `web_homepage_cta_consultation_click` | Button click | Book Consultation | Homepage | web | `consultation_type` | homepage-web-frame:124 | NEW |
| `web_homepage_button_learn_more_click` | Button click | Learn More | Homepage | web | `section_name` | homepage-web-frame:125 | NEW |
| `web_homepage_button_view_products_click` | Button click | View Products | Homepage | web | `category_id` | homepage-web-frame:126 | NEW |
| `web_homepage_button_category_skin_click` | Button click | Category: Skin Care | Homepage | web | `category_id` | homepage-web-frame:127 | NEW |
| `web_homepage_button_category_hair_click` | Button click | Category: Hair Care | Homepage | web | `category_id` | homepage-web-frame:128 | NEW |
| `web_homepage_button_newsletter_subscribe_click` | Button click | Newsletter Subscribe | Homepage | web | `email, preferences` | homepage-web-frame:129 | NEW |
| `web_homepage_card_acne_cream_click` | Card click | Product Card: Acne Cream | Homepage | web | `product_id, product_name` | homepage-web-frame:130 | NEW |
| `web_homepage_card_hair_growth_click` | Card click | Product Card: Hair Growth | Homepage | web | `product_id, product_name` | homepage-web-frame:131 | NEW |
| `web_homepage_card_vitamin_c_click` | Card click | Product Card: Vitamin C | Homepage | web | `product_id, product_name` | homepage-web-frame:132 | NEW |
| `web_homepage_link_privacy_click` | Link click | Footer Link: Privacy Policy | Homepage | web | `link_destination` | homepage-web-frame:133 | NEW |
| `web_homepage_link_terms_click` | Link click | Footer Link: Terms of Service | Homepage | web | `link_destination` | homepage-web-frame:134 | NEW |
| `web_homepage_tab_featured_click` | Tab click | Tab: Featured Products | Homepage | web | `tab_name, tab_index` | homepage-web-frame:135 | NEW |
| `popup_age_verify_show` | Page load | Age Verification | Homepage | both | N/A | homepage-web-frame:136 | NEW |
| `popup_age_verify_close` | Button click | Age Verification Close | Homepage | both | N/A | homepage-web-frame:137 | NEW |
| `popup_age_verify_continue` | Button click | Age Verification Continue | Homepage | both | `age_verified` | homepage-web-frame:138 | NEW |
| `popup_cookie_consent_show` | Page load | Cookie Consent | Homepage | both | N/A | homepage-web-frame:139 | NEW |
| `popup_cookie_consent_accept_click` | Button click | Cookie Consent Accept | Homepage | both | `cookie_preferences` | homepage-web-frame:140 | NEW |
| `popup_newsletter_show` | Scroll trigger | Newsletter Signup | Homepage | web | N/A | homepage-web-frame:141 | NEW |
| `web_product_button_add_to_cart_click` | Button click | Add to Cart | Product Page | web | `product_id, quantity, variant_id` | product-web-frame:201 | NEW |
| `mobile_product_button_add_to_cart_click` | Button click | Add to Cart | Product Page | mobile | `product_id, quantity, variant_id` | product-mobile-frame:301 | NEW |
| `mobile_product_button_buy_now_click` | Button click | Buy Now | Product Page | mobile | `product_id, variant_id` | product-mobile-frame:302 | NEW |
| `mobile_product_button_read_reviews_click` | Button click | Read Reviews | Product Page | mobile | `product_id, review_count` | product-mobile-frame:303 | NEW |
| `mobile_product_button_back_to_category_click` | Button click | Back to Category | Product Page | mobile | `category_id, product_id` | product-mobile-frame:304 | NEW |
| `mobile_product_button_quantity_increase_click` | Button click | Quantity Increase | Product Page | mobile | `product_id, current_quantity` | product-mobile-frame:305 | NEW |
| `mobile_product_button_quantity_decrease_click` | Button click | Quantity Decrease | Product Page | mobile | `product_id, current_quantity` | product-mobile-frame:306 | NEW |
| `mobile_product_button_variant_50ml_click` | Button click | Variant: 50ml | Product Page | mobile | `product_id, variant_id, variant_size` | product-mobile-frame:307 | NEW |
| `mobile_product_button_write_review_click` | Button click | Write Review | Product Page | mobile | `product_id, user_id` | product-mobile-frame:308 | NEW |
| `mobile_product_image_main_click` | Image click | Main Product Image | Product Page | mobile | `product_id, image_index` | product-mobile-frame:309 | NEW |
| `mobile_product_image_thumbnail_click` | Image click | Thumbnail Image | Product Page | mobile | `product_id, image_index, thumbnail_position` | product-mobile-frame:310 | NEW |
| `mobile_product_card_related_click` | Card click | Related Product | Product Page | mobile | `product_id, related_product_id` | product-mobile-frame:311 | NEW |
| `mobile_product_link_customer_reviews_click` | Link click | Customer Reviews | Product Page | mobile | `product_id, review_sort` | product-mobile-frame:312 | NEW |
| `mobile_product_tab_ingredients_click` | Tab click | Ingredients Tab | Product Page | mobile | `product_id, tab_name` | product-mobile-frame:313 | NEW |
| `mobile_product_tab_usage_click` | Tab click | Usage Tab | Product Page | mobile | `product_id, tab_name` | product-mobile-frame:314 | NEW |
| `mobile_product_tab_reviews_click` | Tab click | Reviews Tab | Product Page | mobile | `product_id, tab_name` | product-mobile-frame:315 | NEW |
| `mobile_product_link_share_click` | Link click | Share Product | Product Page | mobile | `product_id, share_platform` | product-mobile-frame:316 | NEW |
| `web_product_button_buy_now_click` | Button click | Buy Now | Product Page | web | `product_id, variant_id` | product-web-frame:202 | NEW |
| `web_product_button_read_reviews_click` | Button click | Read Reviews | Product Page | web | `product_id, review_count` | product-web-frame:203 | NEW |
| `web_product_button_back_to_category_click` | Button click | Back to Category | Product Page | web | `category_id, product_id` | product-web-frame:204 | NEW |
| `web_product_button_quantity_increase_click` | Button click | Quantity + | Product Page | web | `product_id, current_quantity` | product-web-frame:205 | NEW |
| `web_product_button_quantity_decrease_click` | Button click | Quantity - | Product Page | web | `product_id, current_quantity` | product-web-frame:206 | NEW |
| `web_product_button_variant_50ml_click` | Button click | Variant: 50ml | Product Page | web | `product_id, variant_id, variant_size` | product-web-frame:207 | NEW |
| `web_product_button_write_review_click` | Button click | Write Review | Product Page | web | `product_id, user_id` | product-web-frame:208 | NEW |
| `web_product_image_main_click` | Image click | Product Image: Main | Product Page | web | `product_id, image_index` | product-web-frame:209 | NEW |
| `web_product_image_thumbnail_click` | Image click | Product Image: Thumbnail | Product Page | web | `product_id, image_index, thumbnail_position` | product-web-frame:210 | NEW |
| `web_product_card_related_click` | Card click | Related Product Card | Product Page | web | `product_id, related_product_id` | product-web-frame:211 | NEW |
| `web_product_link_customer_reviews_click` | Link click | Customer Review Link | Product Page | web | `product_id, review_sort` | product-web-frame:212 | NEW |
| `web_product_tab_ingredients_click` | Tab click | Ingredients Tab | Product Page | web | `product_id, tab_name` | product-web-frame:213 | NEW |
| `web_product_tab_usage_click` | Tab click | Usage Tab | Product Page | web | `product_id, tab_name` | product-web-frame:214 | NEW |
| `web_product_tab_reviews_click` | Tab click | Reviews Tab | Product Page | web | `product_id, tab_name` | product-web-frame:215 | NEW |
| `web_product_link_share_click` | Link click | Share Product Link | Product Page | web | `product_id, share_platform` | product-web-frame:216 | NEW |
| `web_category_button_apply_filters_click` | Button click | Apply Filters | Category Page | web | `filter_criteria, category_id` | category-web-frame:401 | NEW |
| `web_category_button_clear_filters_click` | Button click | Clear Filters | Category Page | web | `category_id` | category-web-frame:402 | NEW |
| `web_category_button_sort_price_low_click` | Button click | Sort: Price Low-High | Category Page | web | `sort_type, category_id` | category-web-frame:403 | NEW |
| `web_category_button_sort_price_high_click` | Button click | Sort: Price High-Low | Category Page | web | `sort_type, category_id` | category-web-frame:404 | NEW |
| `web_category_button_sort_newest_click` | Button click | Sort: Newest | Category Page | web | `sort_type, category_id` | category-web-frame:405 | NEW |
| `web_category_button_sort_rating_click` | Button click | Sort: Rating | Category Page | web | `sort_type, category_id` | category-web-frame:406 | NEW |
| `web_category_button_load_more_click` | Button click | Load More | Category Page | web | `current_page, category_id` | category-web-frame:407 | NEW |
| `web_category_button_prev_page_click` | Button click | Previous Page | Category Page | web | `current_page, category_id` | category-web-frame:408 | NEW |
| `web_category_button_next_page_click` | Button click | Next Page | Category Page | web | `current_page, category_id` | category-web-frame:409 | NEW |
| `web_category_button_price_filter_click` | Button click | Filter: Price Range | Category Page | web | `price_min, price_max, category_id` | category-web-frame:410 | NEW |
| `web_category_button_brand_filter_click` | Button click | Filter: Brand | Category Page | web | `brand_ids, category_id` | category-web-frame:411 | NEW |
| `web_category_card_product_1_click` | Card click | Category Product Card 1 | Category Page | web | `product_id, position, category_id` | category-web-frame:412 | NEW |
| `web_category_card_product_2_click` | Card click | Category Product Card 2 | Category Page | web | `product_id, position, category_id` | category-web-frame:413 | NEW |
| `web_category_card_product_3_click` | Card click | Category Product Card 3 | Category Page | web | `product_id, position, category_id` | category-web-frame:414 | NEW |
| `web_category_card_product_4_click` | Card click | Category Product Card 4 | Category Page | web | `product_id, position, category_id` | category-web-frame:415 | NEW |
| `web_category_breadcrumb_home_click` | Link click | Breadcrumb: Home | Category Page | web | `breadcrumb_level, category_id` | category-web-frame:416 | NEW |
| `web_category_breadcrumb_category_click` | Link click | Breadcrumb: Category | Category Page | web | `breadcrumb_level, category_id` | category-web-frame:417 | NEW |
| `web_category_card_quick_view_click` | Card click | Quick View Product | Category Page | web | `product_id, category_id` | category-web-frame:418 | NEW |
| `web_category_card_wishlist_click` | Card click | Add to Wishlist | Category Page | web | `product_id, category_id` | category-web-frame:419 | NEW |
| `web_category_image_product_click` | Image click | Product Image | Category Page | web | `product_id, image_index, category_id` | category-web-frame:420 | NEW |
| `web_search_otc_button_submit_click` | Button click | Search Submit | Search OTC | web | `search_query, search_type` | search-otc-web-frame:501 | NEW |
| `web_search_otc_button_voice_click` | Button click | Voice Search | Search OTC | web | `search_type` | search-otc-web-frame:502 | NEW |
| `web_search_otc_button_clear_click` | Button click | Clear Search | Search OTC | web | `previous_query` | search-otc-web-frame:503 | NEW |
| `web_search_otc_button_filter_category_click` | Button click | Filter OTC Category | Search OTC | web | `otc_categories, search_query` | search-otc-web-frame:504 | NEW |
| `web_search_otc_button_filter_brand_click` | Button click | Filter OTC Brand | Search OTC | web | `otc_brands, search_query` | search-otc-web-frame:505 | NEW |
| `web_search_otc_button_filter_price_click` | Button click | Filter OTC Price | Search OTC | web | `price_range, search_query` | search-otc-web-frame:506 | NEW |
| `web_search_otc_button_sort_click` | Button click | Sort OTC Results | Search OTC | web | `sort_type, search_query` | search-otc-web-frame:507 | NEW |
| `web_search_otc_button_load_more_click` | Button click | Load More OTC | Search OTC | web | `current_page, search_query` | search-otc-web-frame:508 | NEW |
| `web_search_otc_button_add_to_cart_click` | Button click | OTC Product Add to Cart | Search OTC | web | `product_id, search_query, position` | search-otc-web-frame:509 | NEW |
| `web_search_otc_input_focus` | Input focus | OTC Search Input | Search OTC | web | `search_type, input_method` | search-otc-web-frame:510 | NEW |
| `mobile_search_otc_input_focus` | Input focus | OTC Search Input | Search OTC | mobile | `search_type, input_method` | search-otc-mobile-frame:601 | NEW |
| `web_search_otc_autocomplete_1_click` | Autocomplete click | OTC Autocomplete Item 1 | Search OTC | web | `suggested_term, search_query, position` | search-otc-web-frame:511 | NEW |
| `web_search_otc_autocomplete_2_click` | Autocomplete click | OTC Autocomplete Item 2 | Search OTC | web | `suggested_term, search_query, position` | search-otc-web-frame:512 | NEW |
| `web_search_otc_autocomplete_3_click` | Autocomplete click | OTC Autocomplete Item 3 | Search OTC | web | `suggested_term, search_query, position` | search-otc-web-frame:513 | NEW |
| `web_search_otc_submit` | Search submit | OTC Search Submit | Search OTC | web | `search_query, result_count, search_time` | search-otc-web-frame:514 | NEW |
| `mobile_search_otc_submit` | Search submit | OTC Search Submit | Search OTC | mobile | `search_query, result_count, search_time` | search-otc-mobile-frame:602 | NEW |
| `mobile_search_otc_button_submit_click` | Button click | Search Submit | Search OTC | mobile | `search_query, search_type` | search-otc-mobile-frame:603 | NEW |
| `mobile_search_otc_button_voice_click` | Button click | Voice Search | Search OTC | mobile | `search_type` | search-otc-mobile-frame:604 | NEW |
| `mobile_search_otc_button_clear_click` | Button click | Clear Search | Search OTC | mobile | `previous_query` | search-otc-mobile-frame:605 | NEW |
| `mobile_search_otc_button_filter_category_click` | Button click | Category Filter | Search OTC | mobile | `otc_categories, search_query` | search-otc-mobile-frame:606 | NEW |
| `mobile_search_otc_button_filter_brand_click` | Button click | Brand Filter | Search OTC | mobile | `otc_brands, search_query` | search-otc-mobile-frame:607 | NEW |
| `mobile_search_otc_button_filter_price_click` | Button click | Price Filter | Search OTC | mobile | `price_range, search_query` | search-otc-mobile-frame:608 | NEW |
| `mobile_search_otc_button_sort_click` | Button click | Sort Results | Search OTC | mobile | `sort_type, search_query` | search-otc-mobile-frame:609 | NEW |
| `mobile_search_otc_button_load_more_click` | Button click | Load More Results | Search OTC | mobile | `current_page, search_query` | search-otc-mobile-frame:610 | NEW |
| `mobile_search_otc_button_add_to_cart_click` | Button click | Add to Cart from Search | Search OTC | mobile | `product_id, search_query, position` | search-otc-mobile-frame:611 | NEW |
| `mobile_search_otc_autocomplete_1_click` | Button click | Autocomplete Option 1 | Search OTC | mobile | `suggested_term, search_query, position` | search-otc-mobile-frame:612 | NEW |
| `mobile_search_otc_autocomplete_2_click` | Button click | Autocomplete Option 2 | Search OTC | mobile | `suggested_term, search_query, position` | search-otc-mobile-frame:613 | NEW |
| `mobile_search_otc_autocomplete_3_click` | Button click | Autocomplete Option 3 | Search OTC | mobile | `suggested_term, search_query, position` | search-otc-mobile-frame:614 | NEW |
| `mobile_search_otc_filter_category_applied` | Filter applied | Category Filter Applied | Search OTC | mobile | `category_filter, search_query` | search-otc-mobile-frame:615 | NEW |
| `mobile_search_otc_filter_brand_applied` | Filter applied | Brand Filter Applied | Search OTC | mobile | `brand_filter, search_query` | search-otc-mobile-frame:616 | NEW |
| `mobile_search_otc_filter_price_applied` | Filter applied | Price Filter Applied | Search OTC | mobile | `price_filter, search_query` | search-otc-mobile-frame:617 | NEW |
| `mobile_search_otc_result_product_click` | Product click | Search Result Click | Search OTC | mobile | `product_id, position, search_query` | search-otc-mobile-frame:618 | NEW |
| `mobile_search_otc_no_results_viewed` | Page view | No Results Page | Search OTC | mobile | `search_query, suggestion_count` | search-otc-mobile-frame:619 | NEW |
| `mobile_treatment_button_next_click` | Button click | Next Step | Treatment Flow | mobile | `current_step, total_steps` | treatment-mobile-frame:701 | NEW |
| `mobile_treatment_button_previous_click` | Button click | Previous Step | Treatment Flow | mobile | `current_step, total_steps` | treatment-mobile-frame:702 | NEW |
| `mobile_treatment_button_submit_click` | Button click | Submit Consultation | Treatment Flow | mobile | `consultation_type, responses_count` | treatment-mobile-frame:703 | NEW |
| `web_search_otc_filter_category_applied` | Filter applied | OTC Filter Category | Search OTC | web | `category_filter, search_query` | search-otc-web-frame:515 | NEW |
| `web_search_otc_filter_brand_applied` | Filter applied | OTC Filter Brand | Search OTC | web | `brand_filter, search_query` | search-otc-web-frame:516 | NEW |
| `web_search_otc_filter_price_applied` | Filter applied | OTC Filter Price | Search OTC | web | `price_filter, search_query` | search-otc-web-frame:517 | NEW |
| `web_search_otc_result_product_click` | Result click | OTC Results Product Click | Search OTC | web | `product_id, position, search_query` | search-otc-web-frame:518 | NEW |
| `web_search_otc_no_results_viewed` | No results view | OTC No Results State | Search OTC | web | `search_query, suggestion_count` | search-otc-web-frame:519 | NEW |
| `web_checkout_button_place_order_click` | Button click | Place Order | Checkout/Cart | web | `order_total, payment_method, item_count` | checkout-web-frame:701 | NEW |
| `web_checkout_button_continue_payment_click` | Button click | Continue to Payment | Checkout/Cart | web | `cart_total, shipping_method` | checkout-web-frame:702 | NEW |
| `web_checkout_button_promo_apply_click` | Button click | Apply Promo Code | Checkout/Cart | web | `promo_code, cart_total` | checkout-web-frame:703 | NEW |
| `web_checkout_button_remove_item_click` | Button click | Remove Item | Checkout/Cart | web | `product_id, quantity_removed` | checkout-web-frame:704 | NEW |
| `web_checkout_button_update_quantity_click` | Button click | Update Quantity | Checkout/Cart | web | `product_id, old_quantity, new_quantity` | checkout-web-frame:705 | NEW |
| `web_account_button_login_click` | Button click | Login | Account/Profile | web | `login_method` | account-web-frame:801 | NEW |
| `web_account_button_signup_click` | Button click | Sign Up | Account/Profile | web | `signup_method` | account-web-frame:802 | NEW |
| `web_account_button_forgot_password_click` | Button click | Forgot Password | Account/Profile | web | `N/A` | account-web-frame:803 | NEW |
| `web_account_button_update_profile_click` | Button click | Update Profile | Account/Profile | web | `fields_updated` | account-web-frame:804 | NEW |
| `web_account_button_change_password_click` | Button click | Change Password | Account/Profile | web | `N/A` | account-web-frame:805 | NEW |
| `web_treatment_button_next_click` | Button click | Next Step | Treatment Flow | web | `current_step, total_steps` | treatment-web-frame:901 | NEW |
| `web_treatment_button_previous_click` | Button click | Previous Step | Treatment Flow | web | `current_step, total_steps` | treatment-web-frame:902 | NEW |
| `web_treatment_button_submit_click` | Button click | Submit Consultation | Treatment Flow | web | `consultation_type, responses_count` | treatment-web-frame:903 | NEW |
| `web_nav_button_products_click` | Button click | Menu Item: Products | Navigation | web | `menu_level` | navigation-web-frame:1001 | NEW |
| `web_nav_button_categories_click` | Button click | Menu Item: Categories | Navigation | web | `menu_level` | navigation-web-frame:1002 | NEW |
| `web_nav_button_account_click` | Button click | Menu Item: Account | Navigation | web | `menu_level` | navigation-web-frame:1003 | NEW |
| `mobile_nav_button_hamburger_click` | Button click | Mobile Hamburger | Navigation | mobile | `menu_state` | navigation-mobile-frame:1101 | NEW |
| `mobile_nav_button_products_click` | Button click | Products Menu | Navigation | mobile | `menu_level` | navigation-mobile-frame:1102 | NEW |
| `mobile_nav_button_categories_click` | Button click | Categories Menu | Navigation | mobile | `menu_level` | navigation-mobile-frame:1103 | NEW |
| `mobile_nav_button_account_click` | Button click | Account Menu | Navigation | mobile | `menu_level` | navigation-mobile-frame:1104 | NEW |
| `mobile_nav_button_footer_contact_click` | Link click | Footer Contact | Navigation | mobile | `footer_section` | navigation-mobile-frame:1105 | NEW |
| `mobile_nav_button_footer_privacy_click` | Link click | Footer Privacy | Navigation | mobile | `footer_section` | navigation-mobile-frame:1106 | NEW |
| `mobile_nav_button_footer_terms_click` | Link click | Footer Terms | Navigation | mobile | `footer_section` | navigation-mobile-frame:1107 | NEW |
| `mobile_nav_button_search_click` | Button click | Search Icon | Navigation | mobile | `search_type` | navigation-mobile-frame:1108 | NEW |
| `mobile_nav_button_cart_click` | Button click | Cart Icon | Navigation | mobile | `cart_item_count` | navigation-mobile-frame:1109 | NEW |
| `web_nav_button_footer_contact_click` | Button click | Footer: Contact Us | Navigation | web | `footer_section` | navigation-web-frame:1004 | NEW |
| `web_nav_button_footer_privacy_click` | Button click | Footer: Privacy Policy | Navigation | web | `footer_section` | navigation-web-frame:1005 | NEW |
| `web_nav_button_footer_terms_click` | Button click | Footer: Terms | Navigation | web | `footer_section` | navigation-web-frame:1006 | NEW |
| `web_nav_button_search_click` | Button click | Search Icon | Navigation | web | `search_type` | navigation-web-frame:1007 | NEW |
| `web_nav_button_cart_click` | Button click | Cart Icon | Navigation | web | `cart_item_count` | navigation-web-frame:1008 | NEW |
| `popup_login_required_show` | Popup show | Login Required | Product Page | both | `N/A` | product-web-frame:217 | NEW |
| `popup_login_required_login_click` | Button click | Login Required Login | Product Page | both | `N/A` | product-web-frame:218 | NEW |
| `popup_order_confirmation_show` | Popup show | Order Confirmation | Checkout/Cart | both | `order_id, order_total` | checkout-web-frame:706 | NEW |
| `popup_order_confirmation_continue_click` | Button click | Order Confirmation Continue | Checkout/Cart | both | `order_id` | checkout-web-frame:707 | NEW |
| `popup_payment_error_show` | Popup show | Payment Error | Checkout/Cart | both | `error_type, order_total` | checkout-web-frame:708 | NEW |
| `popup_payment_error_retry_click` | Button click | Payment Error Retry | Checkout/Cart | both | `error_type` | checkout-web-frame:709 | NEW |
| `popup_delete_account_show` | Popup show | Delete Account | Account/Profile | both | `N/A` | account-web-frame:806 | NEW |
| `popup_delete_account_confirm_click` | Button click | Delete Account Confirm | Account/Profile | both | `N/A` | account-web-frame:807 | NEW |
| `popup_delete_account_cancel_click` | Button click | Delete Account Cancel | Account/Profile | both | `N/A` | account-web-frame:808 | NEW |
| `mobile_category_button_apply_filters_click` | Button click | Apply Filters | Category Page | mobile | `filter_criteria, category_id` | category-mobile-frame:401 | NEW |
| `mobile_category_button_clear_filters_click` | Button click | Clear Filters | Category Page | mobile | `category_id` | category-mobile-frame:402 | NEW |
| `mobile_category_button_sort_price_low_click` | Button click | Sort: Price Low | Category Page | mobile | `sort_type, category_id` | category-mobile-frame:403 | NEW |
| `mobile_category_button_sort_price_high_click` | Button click | Sort: Price High | Category Page | mobile | `sort_type, category_id` | category-mobile-frame:404 | NEW |
| `mobile_category_button_sort_newest_click` | Button click | Sort: Newest | Category Page | mobile | `sort_type, category_id` | category-mobile-frame:405 | NEW |
| `mobile_category_button_sort_rating_click` | Button click | Sort: Rating | Category Page | mobile | `sort_type, category_id` | category-mobile-frame:406 | NEW |
| `mobile_category_button_load_more_click` | Button click | Load More | Category Page | mobile | `current_page, category_id` | category-mobile-frame:407 | NEW |
| `mobile_category_button_prev_page_click` | Button click | Previous Page | Category Page | mobile | `current_page, category_id` | category-mobile-frame:408 | NEW |
| `mobile_category_button_next_page_click` | Button click | Next Page | Category Page | mobile | `current_page, category_id` | category-mobile-frame:409 | NEW |
| `mobile_category_button_price_filter_click` | Button click | Price Filter | Category Page | mobile | `price_min, price_max, category_id` | category-mobile-frame:410 | NEW |
| `mobile_category_button_brand_filter_click` | Button click | Brand Filter | Category Page | mobile | `brand_ids, category_id` | category-mobile-frame:411 | NEW |
| `mobile_category_card_product_1_click` | Card click | Product Card 1 | Category Page | mobile | `product_id, position, category_id` | category-mobile-frame:412 | NEW |
| `mobile_category_card_product_2_click` | Card click | Product Card 2 | Category Page | mobile | `product_id, position, category_id` | category-mobile-frame:413 | NEW |
| `mobile_category_card_product_3_click` | Card click | Product Card 3 | Category Page | mobile | `product_id, position, category_id` | category-mobile-frame:414 | NEW |
| `mobile_category_card_product_4_click` | Card click | Product Card 4 | Category Page | mobile | `product_id, position, category_id` | category-mobile-frame:415 | NEW |
| `mobile_category_breadcrumb_home_click` | Link click | Breadcrumb: Home | Category Page | mobile | `breadcrumb_level, category_id` | category-mobile-frame:416 | NEW |
| `mobile_category_breadcrumb_category_click` | Link click | Breadcrumb: Category | Category Page | mobile | `breadcrumb_level, category_id` | category-mobile-frame:417 | NEW |
| `mobile_category_card_quick_view_click` | Button click | Quick View | Category Page | mobile | `product_id, category_id` | category-mobile-frame:418 | NEW |
| `mobile_category_card_wishlist_click` | Button click | Add to Wishlist | Category Page | mobile | `product_id, category_id` | category-mobile-frame:419 | NEW |
| `mobile_category_image_product_click` | Image click | Product Image | Category Page | mobile | `product_id, image_index, category_id` | category-mobile-frame:420 | NEW |
| `mobile_checkout_button_place_order_click` | Button click | Place Order | Checkout/Cart | mobile | `order_total, payment_method, item_count` | checkout-mobile-frame:501 | NEW |
| `mobile_checkout_button_continue_payment_click` | Button click | Continue to Payment | Checkout/Cart | mobile | `cart_total, shipping_method` | checkout-mobile-frame:502 | NEW |
| `mobile_checkout_button_promo_apply_click` | Button click | Apply Promo Code | Checkout/Cart | mobile | `promo_code, cart_total` | checkout-mobile-frame:503 | NEW |
| `mobile_checkout_button_remove_item_click` | Button click | Remove Item | Checkout/Cart | mobile | `product_id, quantity_removed` | checkout-mobile-frame:504 | NEW |
| `mobile_checkout_button_update_quantity_click` | Button click | Update Quantity | Checkout/Cart | mobile | `product_id, old_quantity, new_quantity` | checkout-mobile-frame:505 | NEW |
| `mobile_account_button_login_click` | Button click | Login | Account/Profile | mobile | `login_method` | account-mobile-frame:601 | NEW |
| `mobile_account_button_signup_click` | Button click | Sign Up | Account/Profile | mobile | `signup_method` | account-mobile-frame:602 | NEW |
| `mobile_account_button_forgot_password_click` | Button click | Forgot Password | Account/Profile | mobile | `N/A` | account-mobile-frame:603 | NEW |
| `mobile_account_button_update_profile_click` | Button click | Update Profile | Account/Profile | mobile | `fields_updated` | account-mobile-frame:604 | NEW |
| `mobile_account_button_change_password_click` | Button click | Change Password | Account/Profile | mobile | `N/A` | account-mobile-frame:605 | NEW |

---

**Generated**: $(date)
**Project**: DoktorABC_Redesign
**Scan Status**: HOMEPAGE_COMPLETE - Ready for next page