# Search OTC - Mobile Events (Concatenated)

**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will follow same concatenation pattern as web, with additional mobile-specific interactions:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_search_otc_page_view` | `search_type, referrer, device_type` | User loads OTC search page on mobile. Pre-events: None. RCA: Mobile search traffic tracking |
| `mobile_search_otc_voice_search` | `search_query` | User initiates voice search. Pre-events: Search input focus. RCA: Mobile voice search adoption |

## Notes

- Mobile events will use same concatenation strategy as web
- Platform-specific voice search tracked separately
- Shared events use same event names with platform property

