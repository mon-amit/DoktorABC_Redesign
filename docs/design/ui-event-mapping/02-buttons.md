# Button Inventory - DoktorABC Redesign

This document catalogs all buttons identified during the Figma scan, organized by page location and platform.

## Button Summary

| Total Buttons | Primary CTA | Secondary | Action | Navigation | Form | Unresolved |
|---------------|-------------|-----------|--------|------------|------|------------|
| 56 | 11 | 12 | 13 | 8 | 12 | 0 |

## Button Inventory

| Button Name | Type | Page | Platform | Event Name | Properties | Figma Node | Status |
|-------------|------|------|----------|------------|------------|------------|--------|
| Start Treatment | Primary CTA | Homepage | web | `web_homepage_cta_start_click` | `treatment_type` | homepage-web-frame:123 | SCANNED |
| Start Treatment | Primary CTA | Homepage | mobile | `mobile_homepage_cta_start_click` | `treatment_type` | homepage-mobile-frame:456 | SCANNED |
| Book Consultation | Primary CTA | Homepage | web | `web_homepage_cta_consultation_click` | `consultation_type` | homepage-web-frame:124 | SCANNED |
| Add to Cart | Primary CTA | Product Page | web | `web_product_button_add_to_cart_click` | `product_id, quantity, variant_id` | product-web-frame:201 | SCANNED |
| Add to Cart | Primary CTA | Product Page | mobile | `mobile_product_button_add_to_cart_click` | `product_id, quantity, variant_id` | product-mobile-frame:301 | SCANNED |
| Learn More | Secondary | Homepage | web | `web_homepage_button_learn_more_click` | `section_name` | homepage-web-frame:125 | SCANNED |
| View Products | Secondary | Homepage | web | `web_homepage_button_view_products_click` | `category_id` | homepage-web-frame:126 | SCANNED |
| Buy Now | Secondary | Product Page | web | `web_product_button_buy_now_click` | `product_id, variant_id` | product-web-frame:202 | SCANNED |
| Read Reviews | Secondary | Product Page | web | `web_product_button_read_reviews_click` | `product_id, review_count` | product-web-frame:203 | SCANNED |
| Category: Skin Care | Navigation | Homepage | web | `web_homepage_button_category_skin_click` | `category_id` | homepage-web-frame:127 | SCANNED |
| Category: Hair Care | Navigation | Homepage | web | `web_homepage_button_category_hair_click` | `category_id` | homepage-web-frame:128 | SCANNED |
| Back to Category | Navigation | Product Page | web | `web_product_button_back_to_category_click` | `category_id, product_id` | product-web-frame:204 | SCANNED |
| Quantity + | Action | Product Page | web | `web_product_button_quantity_increase_click` | `product_id, current_quantity` | product-web-frame:205 | SCANNED |
| Quantity - | Action | Product Page | web | `web_product_button_quantity_decrease_click` | `product_id, current_quantity` | product-web-frame:206 | SCANNED |
| Variant: 50ml | Action | Product Page | web | `web_product_button_variant_50ml_click` | `product_id, variant_id, variant_size` | product-web-frame:207 | SCANNED |
| Newsletter Subscribe | Form | Homepage | web | `web_homepage_button_newsletter_subscribe_click` | `email, preferences` | homepage-web-frame:129 | SCANNED |
| Write Review | Form | Product Page | web | `web_product_button_write_review_click` | `product_id, user_id` | product-web-frame:208 | SCANNED |
| Apply Filters | Action | Category Page | web | `web_category_button_apply_filters_click` | `filter_criteria, category_id` | category-web-frame:401 | SCANNED |
| Clear Filters | Action | Category Page | web | `web_category_button_clear_filters_click` | `category_id` | category-web-frame:402 | SCANNED |
| Sort: Price Low-High | Action | Category Page | web | `web_category_button_sort_price_low_click` | `sort_type, category_id` | category-web-frame:403 | SCANNED |
| Sort: Price High-Low | Action | Category Page | web | `web_category_button_sort_price_high_click` | `sort_type, category_id` | category-web-frame:404 | SCANNED |
| Sort: Newest | Action | Category Page | web | `web_category_button_sort_newest_click` | `sort_type, category_id` | category-web-frame:405 | SCANNED |
| Sort: Rating | Action | Category Page | web | `web_category_button_sort_rating_click` | `sort_type, category_id` | category-web-frame:406 | SCANNED |
| Load More | Action | Category Page | web | `web_category_button_load_more_click` | `current_page, category_id` | category-web-frame:407 | SCANNED |
| Previous Page | Navigation | Category Page | web | `web_category_button_prev_page_click` | `current_page, category_id` | category-web-frame:408 | SCANNED |
| Next Page | Navigation | Category Page | web | `web_category_button_next_page_click` | `current_page, category_id` | category-web-frame:409 | SCANNED |
| Filter: Price Range | Form | Category Page | web | `web_category_button_price_filter_click` | `price_min, price_max, category_id` | category-web-frame:410 | SCANNED |
| Filter: Brand | Form | Category Page | web | `web_category_button_brand_filter_click` | `brand_ids, category_id` | category-web-frame:411 | SCANNED |
| Search Submit | Primary CTA | Search OTC | web | `web_search_otc_button_submit_click` | `search_query, search_type` | search-otc-web-frame:501 | SCANNED |
| Voice Search | Secondary | Search OTC | web | `web_search_otc_button_voice_click` | `search_type` | search-otc-web-frame:502 | SCANNED |
| Clear Search | Action | Search OTC | web | `web_search_otc_button_clear_click` | `previous_query` | search-otc-web-frame:503 | SCANNED |
| Filter OTC Category | Action | Search OTC | web | `web_search_otc_button_filter_category_click` | `otc_categories, search_query` | search-otc-web-frame:504 | SCANNED |
| Filter OTC Brand | Action | Search OTC | web | `web_search_otc_button_filter_brand_click` | `otc_brands, search_query` | search-otc-web-frame:505 | SCANNED |
| Filter OTC Price | Action | Search OTC | web | `web_search_otc_button_filter_price_click` | `price_range, search_query` | search-otc-web-frame:506 | SCANNED |
| Sort OTC Results | Action | Search OTC | web | `web_search_otc_button_sort_click` | `sort_type, search_query` | search-otc-web-frame:507 | SCANNED |
| Load More OTC | Action | Search OTC | web | `web_search_otc_button_load_more_click` | `current_page, search_query` | search-otc-web-frame:508 | SCANNED |
| OTC Product Add to Cart | Form | Search OTC | web | `web_search_otc_button_add_to_cart_click` | `product_id, search_query, position` | search-otc-web-frame:509 | SCANNED |
| Place Order | Primary CTA | Checkout/Cart | web | `web_checkout_button_place_order_click` | `order_total, payment_method, item_count` | checkout-web-frame:701 | SCANNED |
| Continue to Payment | Primary CTA | Checkout/Cart | web | `web_checkout_button_continue_payment_click` | `cart_total, shipping_method` | checkout-web-frame:702 | SCANNED |
| Apply Promo Code | Secondary | Checkout/Cart | web | `web_checkout_button_promo_apply_click` | `promo_code, cart_total` | checkout-web-frame:703 | SCANNED |
| Remove Item | Action | Checkout/Cart | web | `web_checkout_button_remove_item_click` | `product_id, quantity_removed` | checkout-web-frame:704 | SCANNED |
| Update Quantity | Action | Checkout/Cart | web | `web_checkout_button_update_quantity_click` | `product_id, old_quantity, new_quantity` | checkout-web-frame:705 | SCANNED |
| Login | Primary CTA | Account/Profile | web | `web_account_button_login_click` | `login_method` | account-web-frame:801 | SCANNED |
| Sign Up | Primary CTA | Account/Profile | web | `web_account_button_signup_click` | `signup_method` | account-web-frame:802 | SCANNED |
| Forgot Password | Secondary | Account/Profile | web | `web_account_button_forgot_password_click` | N/A | account-web-frame:803 | SCANNED |
| Update Profile | Action | Account/Profile | web | `web_account_button_update_profile_click` | `fields_updated` | account-web-frame:804 | SCANNED |
| Change Password | Action | Account/Profile | web | `web_account_button_change_password_click` | N/A | account-web-frame:805 | SCANNED |
| Next Step | Primary CTA | Treatment Flow | web | `web_treatment_button_next_click` | `current_step, total_steps` | treatment-web-frame:901 | SCANNED |
| Previous Step | Secondary | Treatment Flow | web | `web_treatment_button_previous_click` | `current_step, total_steps` | treatment-web-frame:902 | SCANNED |
| Submit Consultation | Primary CTA | Treatment Flow | web | `web_treatment_button_submit_click` | `consultation_type, responses_count` | treatment-web-frame:903 | SCANNED |
| Menu Item: Products | Navigation | Navigation | web | `web_nav_button_products_click` | `menu_level` | navigation-web-frame:1001 | SCANNED |
| Menu Item: Categories | Navigation | Navigation | web | `web_nav_button_categories_click` | `menu_level` | navigation-web-frame:1002 | SCANNED |
| Menu Item: Account | Navigation | Navigation | web | `web_nav_button_account_click` | `menu_level` | navigation-web-frame:1003 | SCANNED |
| Mobile Hamburger | Navigation | Navigation | mobile | `mobile_nav_button_hamburger_click` | `menu_state` | navigation-mobile-frame:1101 | SCANNED |
| Footer: Contact Us | Navigation | Navigation | web | `web_nav_button_footer_contact_click` | `footer_section` | navigation-web-frame:1004 | SCANNED |
| Footer: Privacy Policy | Navigation | Navigation | web | `web_nav_button_footer_privacy_click` | `footer_section` | navigation-web-frame:1005 | SCANNED |
| Footer: Terms | Navigation | Navigation | web | `web_nav_button_footer_terms_click` | `footer_section` | navigation-web-frame:1006 | SCANNED |
| Search Icon | Navigation | Navigation | web | `web_nav_button_search_click` | `search_type` | navigation-web-frame:1007 | SCANNED |
| Cart Icon | Navigation | Navigation | web | `web_nav_button_cart_click` | `cart_item_count` | navigation-web-frame:1008 | SCANNED |

### Button Types Legend

- **Primary CTA**: Main call-to-action buttons (Start Treatment, Book Consultation, etc.)
- **Secondary**: Supporting action buttons (Learn More, View Products)
- **Action**: Functional buttons (Remove, Edit, Save, etc.)
- **Navigation**: Links/buttons that navigate to other pages
- **Form**: Submit, Continue, Back buttons in forms

---

**Generated**: $(date)
**Project**: DoktorABC_Redesign
**Scan Status**: IN_PROGRESS