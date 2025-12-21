# Homepage - Mobile Events (Concatenated)

**Source**: Figma UI UX Redesign  
**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will be mapped separately when mobile design is reviewed. Expected structure:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_homepage_page_view` | `page_url, referrer, user_agent, viewport_width, device_type` | User loads homepage on mobile. Pre-events: None. RCA: Mobile traffic source tracking |
| `mobile_homepage_hamburger_menu_toggle` | `menu_state` | User opens/closes hamburger menu. Pre-events: Page load. RCA: Mobile navigation pattern |
| `mobile_homepage_swipe_gesture` | `swipe_direction, section_name` | User performs swipe gesture on carousel/section. Pre-events: Section view. RCA: Mobile interaction patterns |

## Notes

- Mobile events will follow same concatenation strategy as web
- Platform-specific interactions (swipe, pull-to-refresh) will be tracked separately
- Shared events with web will use same event names with platform property

