# Account/Profile - Mobile Events Review Table

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `mobile_account_button_login_click` | `login_method` | RCA: Mobile authentication method preference and login funnel entry. Pre-events: Account access need |
| `mobile_account_button_signup_click` | `signup_method` | RCA: Mobile new user acquisition and registration funnel entry. Pre-events: Service interest |
| `mobile_account_button_forgot_password_click` | `N/A` | RCA: Mobile password reset need identification. Pre-events: Failed login attempt |
| `mobile_account_button_update_profile_click` | `fields_updated` | RCA: Mobile profile completeness and user engagement depth. Pre-events: Profile view |
| `mobile_account_button_change_password_click` | `N/A` | RCA: Mobile account security and password management. Pre-events: Profile view |
| `popup_delete_account_show` | `N/A` | RCA: Mobile account churn risk identification. Pre-events: Profile settings access |
| `popup_delete_account_confirm_click` | `N/A` | RCA: Mobile account deletion completion and churn analysis. Pre-events: Delete confirmation display |
| `popup_delete_account_cancel_click` | `N/A` | RCA: Mobile account retention through deletion cancellation. Pre-events: Delete confirmation display |

---
**Total Events**: 8
**Platform**: Mobile
**Page**: Account/Profile
**Status**: Ready for PM review