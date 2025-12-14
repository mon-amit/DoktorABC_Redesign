# Unresolved Items & RCA - DoktorABC Redesign

This document tracks all elements that failed quality gates during the Figma scan, requiring Root Cause Analysis (RCA) before implementation.

## RCA Summary

| Total Unresolved | Platform Issues | CMS Mapping Issues | Duplicate Events | Owner Unknown | MCP Issues |
|------------------|-----------------|-------------------|------------------|---------------|------------|
| 4 | 0 | 0 | 3 | 0 | 1 |

## Unresolved Items Requiring RCA

| Element | Page | Issue Type | RCA Required | Resolution Plan | Status | Figma Node |
|---------|------|------------|--------------|-----------------|--------|------------|
| web_account_button_login_click | Account/Profile | Duplicate Event | Rename event | Change to `web_account_button_login_form_click` | OPEN | account-web-frame:801 |
| web_account_button_signup_click | Account/Profile | Duplicate Event | Rename event | Change to `web_account_button_signup_form_click` | OPEN | account-web-frame:802 |
| web_search_otc_submit | Search OTC | Duplicate Event | Rename event | Change to `web_search_otc_search_executed` | OPEN | search-otc-web-frame:514 |
| Figma MCP Connection | All Pages | MCP Connectivity | Troubleshoot MCP | Check Figma MCP server status, verify port 3845 | OPEN | N/A |

## RCA Categories

### 1. Platform Determination Issues

**Issue**: Cannot determine if element is web/mobile/both
**RCA Steps**:
- Check frame name for platform indicators
- Review parent frame hierarchy
- Check Figma element owner/creator
- Consult design team if unclear

**Resolution**: Either determine platform or document as "both" if truly cross-platform

### 2. CMS Property Mapping Issues

**Issue**: Cannot identify which CMS properties to capture
**RCA Steps**:
- Review existing event config for similar patterns
- Check backend API documentation
- Consult PM for business logic requirements
- Determine if new properties needed

**Resolution**: Define property mapping or escalate to PM for clarification

### 3. Duplicate Event Names

**Issue**: Generated event name conflicts with existing events
**RCA Steps**:
- Compare with Mixpanel existing events
- Review naming convention application
- Determine if events are truly different

**Resolution**: Rename with disambiguation suffix or merge if identical

### 4. Element Owner Unknown

**Issue**: Cannot determine who created/modified the Figma element
**RCA Steps**:
- Check Figma version history
- Review design system documentation
- Consult design team members

**Resolution**: Escalate to design team for clarification

## RCA Status Tracking

- **OPEN**: RCA not started
- **IN_PROGRESS**: Investigating root cause
- **RESOLVED**: RCA complete, resolution implemented
- **ESCALATED**: Requires input from other teams

---

**Generated**: $(date)
**Project**: DoktorABC_Redesign
**RCA Status**: IN_PROGRESS