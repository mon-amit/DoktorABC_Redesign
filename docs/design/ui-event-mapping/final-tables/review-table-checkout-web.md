# Checkout/Cart - Web Events Review Table

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `web_checkout_button_place_order_click` | `order_total, payment_method, item_count` | RCA: Final conversion completion tracking. Pre-events: Payment method selection |
| `web_checkout_button_continue_payment_click` | `cart_total, shipping_method` | RCA: Checkout funnel progression to payment. Pre-events: Shipping selection |
| `web_checkout_button_promo_apply_click` | `promo_code, cart_total` | RCA: Discount code usage and price optimization. Pre-events: Cart view |
| `web_checkout_button_remove_item_click` | `product_id, quantity_removed` | RCA: Cart abandonment and product removal reasons. Pre-events: Cart view |
| `web_checkout_button_update_quantity_click` | `product_id, old_quantity, new_quantity` | RCA: Cart optimization and purchase intent adjustment. Pre-events: Cart view |
| `popup_order_confirmation_show` | `order_id, order_total` | RCA: Successful purchase confirmation display. Pre-events: Place order click |
| `popup_order_confirmation_continue_click` | `order_id` | RCA: Post-purchase engagement and next steps. Pre-events: Order confirmation display |
| `popup_payment_error_show` | `error_type, order_total` | RCA: Payment failure identification and recovery tracking. Pre-events: Payment attempt |
| `popup_payment_error_retry_click` | `error_type` | RCA: Payment error recovery success rate. Pre-events: Payment error display |

---
**Total Events**: 9
**Platform**: Web
**Page**: Checkout/Cart
**Status**: Ready for PM review