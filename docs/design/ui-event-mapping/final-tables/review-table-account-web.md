# Account/Profile - Web Events Review Table

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `web_account_button_login_click` | `login_method` | RCA: Authentication method preference and login funnel entry. Pre-events: Account access need |
| `web_account_button_signup_click` | `signup_method` | RCA: New user acquisition and registration funnel entry. Pre-events: Service interest |
| `web_account_button_forgot_password_click` | `N/A` | RCA: Password reset need identification. Pre-events: Failed login attempt |
| `web_account_button_update_profile_click` | `fields_updated` | RCA: Profile completeness and user engagement depth. Pre-events: Profile view |
| `web_account_button_change_password_click` | `N/A` | RCA: Account security and password management. Pre-events: Profile view |
| `popup_delete_account_show` | `N/A` | RCA: Account churn risk identification. Pre-events: Profile settings access |
| `popup_delete_account_confirm_click` | `N/A` | RCA: Account deletion completion and churn analysis. Pre-events: Delete confirmation display |
| `popup_delete_account_cancel_click` | `N/A` | RCA: Account retention through deletion cancellation. Pre-events: Delete confirmation display |

---
**Total Events**: 8
**Platform**: Web
**Page**: Account/Profile
**Status**: Ready for PM review