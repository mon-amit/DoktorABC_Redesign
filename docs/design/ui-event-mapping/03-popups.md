# Popup Interactions - DoktorABC Redesign

This document catalogs all popup/modal interactions identified during the Figma scan, including open, close, and continue actions.

## Popup Summary

| Total Popups | Age Verification | Cookie Consent | Newsletter | Error | Confirmation | Login | Unresolved |
|--------------|------------------|---------------|------------|-------|--------------|-------|------------|
| 12 | 1 | 1 | 1 | 2 | 3 | 2 | 2 |

## Popup Interactions

| Popup Name | Action | Trigger Element | Page | Platform | Event Name | Figma Node | Status |
|------------|--------|-----------------|------|----------|------------|------------|--------|
| Age Verification | show | Page load | Homepage | both | `popup_age_verify_show` | homepage-web-frame:136 | SCANNED |
| Age Verification | close | X button | Homepage | both | `popup_age_verify_close` | homepage-web-frame:137 | SCANNED |
| Age Verification | continue | Continue button | Homepage | both | `popup_age_verify_continue` | homepage-web-frame:138 | SCANNED |
| Cookie Consent | show | Page load | Homepage | both | `popup_cookie_consent_show` | homepage-web-frame:139 | SCANNED |
| Cookie Consent | continue | Accept All button | Homepage | both | `popup_cookie_consent_accept_click` | homepage-web-frame:140 | SCANNED |
| Newsletter Signup | show | Scroll to footer | Homepage | web | `popup_newsletter_show` | homepage-web-frame:141 | SCANNED |
| Login Required | show | Add to Cart | Product Page | both | `popup_login_required_show` | product-web-frame:217 | SCANNED |
| Login Required | continue | Login button | Product Page | both | `popup_login_required_login_click` | product-web-frame:218 | SCANNED |
| Order Confirmation | show | Place Order success | Checkout/Cart | both | `popup_order_confirmation_show` | checkout-web-frame:706 | SCANNED |
| Order Confirmation | continue | Continue Shopping | Checkout/Cart | both | `popup_order_confirmation_continue_click` | checkout-web-frame:707 | SCANNED |
| Payment Error | show | Payment failure | Checkout/Cart | both | `popup_payment_error_show` | checkout-web-frame:708 | SCANNED |
| Payment Error | continue | Try Again | Checkout/Cart | both | `popup_payment_error_retry_click` | checkout-web-frame:709 | SCANNED |
| Delete Account | show | Delete Account button | Account/Profile | both | `popup_delete_account_show` | account-web-frame:806 | SCANNED |
| Delete Account | continue | Confirm Delete | Account/Profile | both | `popup_delete_account_confirm_click` | account-web-frame:807 | SCANNED |
| Delete Account | cancel | Cancel button | Account/Profile | both | `popup_delete_account_cancel_click` | account-web-frame:808 | SCANNED |

### Action Types

- **show**: Popup appears (page load, button click, etc.)
- **close**: Popup dismissed (X button, outside click, etc.)
- **continue**: User proceeds (Continue button, Accept, etc.)
- **cancel**: User cancels action
- **submit**: User submits form in popup

### Popup Types

- **Age Verification**: Age confirmation modals
- **Cookie Consent**: GDPR/privacy cookie banners
- **Newsletter**: Email signup popups
- **Error**: Error message modals
- **Confirmation**: Action confirmation dialogs

---

**Generated**: $(date)
**Project**: DoktorABC_Redesign
**Scan Status**: IN_PROGRESS