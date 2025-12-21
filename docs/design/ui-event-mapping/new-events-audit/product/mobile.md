# Product Page - Mobile Events (Concatenated)

**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will follow same concatenation pattern as web, with additional mobile-specific interactions:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_product_page_view` | `product_id, product_name, category_id, referrer, device_type` | User loads product page on mobile. Pre-events: None. RCA: Mobile product traffic tracking |
| `mobile_product_image_swipe` | `product_id, swipe_direction, current_image_index` | User swipes product image gallery. Pre-events: Product view. RCA: Mobile image interaction patterns |
| `mobile_product_pinch_zoom` | `product_id, zoom_level` | User pinches to zoom product image. Pre-events: Product view. RCA: Mobile image detail engagement |

## Notes

- Mobile events will use same concatenation strategy as web
- Platform-specific gestures (swipe, pinch-zoom) tracked separately
- Shared events use same event names with platform property

