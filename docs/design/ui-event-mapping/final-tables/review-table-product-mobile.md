# Product Page - Mobile Events Review Table

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_product_button_add_to_cart_click` | `product_id, quantity, variant_id` | RCA: Mobile primary conversion action tracking. Pre-events: Product view, variant selection |
| `mobile_product_button_buy_now_click` | `product_id, variant_id` | RCA: Mobile direct purchase intent measurement. Pre-events: Product view |
| `mobile_product_button_read_reviews_click` | `product_id, review_count` | RCA: Mobile social proof engagement before purchase. Pre-events: Product view |
| `mobile_product_button_back_to_category_click` | `category_id, product_id` | RCA: Mobile navigation pattern and product abandonment. Pre-events: Product view |
| `mobile_product_button_quantity_increase_click` | `product_id, current_quantity` | RCA: Mobile purchase intent strength (quantity increases). Pre-events: Product view |
| `mobile_product_button_quantity_decrease_click` | `product_id, current_quantity` | RCA: Mobile cart optimization and price sensitivity. Pre-events: Product view, quantity increase |
| `mobile_product_button_variant_50ml_click` | `product_id, variant_id, variant_size` | RCA: Mobile product variant preference tracking. Pre-events: Product view |
| `mobile_product_button_write_review_click` | `product_id, user_id` | RCA: Mobile customer engagement and review funnel entry. Pre-events: Product purchase or view |
| `mobile_product_image_main_click` | `product_id, image_index` | RCA: Mobile product image engagement and detail interest. Pre-events: Product view |
| `mobile_product_image_thumbnail_click` | `product_id, image_index, thumbnail_position` | RCA: Mobile product exploration depth. Pre-events: Product view |
| `mobile_product_card_related_click` | `product_id, related_product_id` | RCA: Mobile cross-selling and product discovery. Pre-events: Product view |
| `mobile_product_link_customer_reviews_click` | `product_id, review_sort` | RCA: Mobile trust signal access patterns. Pre-events: Product view |
| `mobile_product_tab_ingredients_click` | `product_id, tab_name` | RCA: Mobile product information engagement. Pre-events: Product view |
| `mobile_product_tab_usage_click` | `product_id, tab_name` | RCA: Mobile usage instruction access. Pre-events: Product view |
| `mobile_product_tab_reviews_click` | `product_id, tab_name` | RCA: Mobile social proof section access. Pre-events: Product view |
| `mobile_product_link_share_click` | `product_id, share_platform` | RCA: Mobile viral coefficient and social sharing. Pre-events: Product view |

---
**Total Events**: 16
**Platform**: Mobile
**Page**: Product Page
**Status**: Ready for PM review