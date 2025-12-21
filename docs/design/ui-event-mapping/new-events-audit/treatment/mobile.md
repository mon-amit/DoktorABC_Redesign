# Treatment Flow - Mobile Events (Concatenated)

**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will follow same pattern as web, with additional mobile-specific interactions:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_treatment_page_view` | `consultation_type, referrer, device_type` | User loads treatment flow page on mobile. Pre-events: None. RCA: Mobile treatment consultation entry |
| `mobile_treatment_swipe_step` | `swipe_direction, current_step` | User swipes to navigate between steps. Pre-events: Step view. RCA: Mobile gesture-based navigation |

## Notes

- Mobile events will use same structure as web
- Platform-specific swipe gestures tracked separately
- Shared events use same event names with platform property

