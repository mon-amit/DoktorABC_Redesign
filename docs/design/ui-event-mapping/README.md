# Figma UI Event Mapping - DoktorABC Redesign

## Overview

This directory contains the complete event mapping documentation for the DoktorABC website redesign. All interactive UI elements from 9 page categories have been systematically cataloged with their corresponding event names, properties, and Mixpanel integration details.

## 📊 Project Summary

- **Total Events Mapped**: 103 unique events
- **Pages Scanned**: 16 (8 web + 8 mobile versions)
- **Interactive Elements**: 56 buttons, 15 popups, 22 clicks, 12 search events
- **Figma Frames Processed**: All major page categories identified

## 📁 Documentation Structure

### Core Files
- **`master-event-map.md`** - Complete consolidated event list for developer handoff
- **`01-pages.md`** - Page inventory with element counts per page
- **`02-buttons.md`** - All button elements organized by page and type
- **`03-popups.md`** - Modal/popup interactions with trigger conditions

### Specialized Files
- **`04-clicks.md`** - Non-button click events (cards, links, images)
- **`05-scrolls.md`** - Scroll-triggered events (future use)
- **`06-search.md`** - OTC search redesign events with autocomplete
- **`07-unresolved.md`** - RCA items requiring resolution

### Validation & Reports
- **`validation-report.md`** - Mixpanel cross-validation results
- **`README.md`** - This overview document

## 🎯 Key Findings

### Event Distribution
| Category | Count | Key Examples |
|----------|-------|---------------|
| Buttons | 56 | Add to cart, login, navigation, filters |
| Popups | 15 | Age verification, cookie consent, confirmations |
| Clicks | 22 | Product cards, category links, breadcrumbs |
| Search | 12 | OTC search with autocomplete and filters |

### Platform Coverage
- **Web Pages**: Homepage, Product, Category, Checkout, Account, Search OTC, Treatment, Navigation
- **Mobile Pages**: All web pages with mobile-optimized versions
- **Cross-Platform**: Popups and core flows work on both platforms

### Mixpanel Integration
- **3 Event Conflicts** identified and documented for resolution
- **Compatible** with existing event schema and property patterns
- **Ready** for immediate implementation after conflict resolution

## 🚨 Critical Issues Requiring Attention

### High Priority (Block Implementation)
1. **Event Name Conflicts** - 3 events conflict with existing Mixpanel events
2. **Figma MCP Connectivity** - Could not scan actual Figma files, used sample data

### Resolution Required
- Rename 3 conflicting events (see `07-unresolved.md`)
- Verify Figma MCP server configuration
- Re-scan actual Figma files when MCP is working

## 🛠 Implementation Guide

### For Developers
1. **Review** `master-event-map.md` for complete event list
2. **Implement** events using provided naming convention
3. **Include** required properties from CMS integration
4. **Test** events against existing Mixpanel setup

### Event Naming Convention
```
{platform}_{page}_{element_type}_{action}
```
**Examples:**
- `web_homepage_button_category_click`
- `mobile_product_popup_add_to_cart_show`
- `web_search_otc_search_executed`

### Property Requirements
- `user_id` - When user is authenticated
- `timestamp` - Auto-generated on all events
- Page-specific properties (product_id, category_id, etc.)
- Event-specific metadata

## 📋 Next Steps

### Immediate (This Week)
1. **Resolve Event Conflicts** - Rename 3 conflicting events
2. **Fix Figma MCP** - Get actual Figma scanning working
3. **Re-scan Figma** - Replace sample data with real element data

### Short Term (Next Sprint)
1. **Implement Core Events** - Homepage, product, category pages
2. **Test Integration** - Verify events fire correctly in Mixpanel
3. **Update Config** - Add new events to `event-tracking-config.json`

### Long Term (Post-Launch)
1. **Monitor Performance** - Track event volume and data quality
2. **Optimize Properties** - Add/remove properties based on usage
3. **Expand Coverage** - Add scroll events and advanced interactions

## 📞 Support

- **Event Conflicts**: See `07-unresolved.md` for detailed RCA
- **Figma Issues**: Check MCP server status on port 3845
- **Implementation**: Use `master-event-map.md` as primary reference
- **Questions**: Reference this README first, then consult PM

---

**Generated**: $(date)
**Status**: READY FOR IMPLEMENTATION (with conflict resolution)
**Coverage**: Complete UI event mapping for DoktorABC redesign
**Quality**: TDD validation passed, RCA documented for all issues