# Checkout/Cart - Mobile Events (Concatenated)

**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will follow same concatenation pattern as web, with additional mobile-specific interactions:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_checkout_page_view` | `cart_total, item_count, referrer, device_type` | User loads checkout/cart page on mobile. Pre-events: None. RCA: Mobile checkout funnel entry |
| `mobile_checkout_apple_pay_click` | `cart_total` | User clicks Apple Pay button. Pre-events: Cart view. RCA: Mobile payment method preference |
| `mobile_checkout_google_pay_click` | `cart_total` | User clicks Google Pay button. Pre-events: Cart view. RCA: Mobile payment method preference |

## Notes

- Mobile events will use same concatenation strategy as web
- Platform-specific payment methods tracked separately
- Shared events use same event names with platform property

