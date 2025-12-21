# Account/Profile - Mobile Events (Concatenated)

**Platform**: Mobile  
**Date**: 2025-01-27  
**Status**: To be populated from mobile design review

## Mobile-Specific Events

Mobile events will follow same concatenation pattern as web, with additional mobile-specific interactions:

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_account_page_view` | `page_type, user_logged_in, device_type` | User loads account page on mobile. Pre-events: None. RCA: Mobile account access tracking |
| `mobile_account_biometric_auth` | `auth_method` | User uses biometric authentication (Face ID, Touch ID). Pre-events: Login attempt. RCA: Mobile authentication convenience tracking |

## Notes

- Mobile events will use same concatenation strategy as web
- Platform-specific auth methods tracked separately
- Shared events use same event names with platform property

