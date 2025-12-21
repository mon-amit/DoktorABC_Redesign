# Category Page - Mobile Events (Concatenated)

**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will follow same concatenation pattern as web, with additional mobile-specific interactions:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_category_page_view` | `category_id, category_name, referrer, device_type` | User loads category page on mobile. Pre-events: None. RCA: Mobile category traffic tracking |
| `mobile_category_swipe_product` | `swipe_direction, product_id, category_id` | User swipes product card. Pre-events: Category view. RCA: Mobile interaction patterns |
| `mobile_category_pull_to_refresh` | `category_id` | User performs pull-to-refresh gesture. Pre-events: Category view. RCA: Mobile refresh behavior |

## Notes

- Mobile events will use same concatenation strategy as web
- Platform-specific gestures (swipe, pull-to-refresh) tracked separately
- Shared events use same event names with platform property

