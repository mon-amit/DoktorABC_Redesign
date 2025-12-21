# New Events Audit - Organized by Page

This directory contains the new events audit organized by page, with separate web and mobile implementations. Events have been concatenated where possible to reduce redundancy while maintaining tracking granularity.

## 🎯 **START HERE: How to Use with Figma**

**Confused about how to view events alongside Figma?** Read these guides:

1. **[HOW-TO-USE-WITH-FIGMA.md](HOW-TO-USE-WITH-FIGMA.md)** - Step-by-step guide for viewing events with Figma
2. **[homepage/FIGMA-TO-EVENTS-MAP.md](homepage/FIGMA-TO-EVENTS-MAP.md)** - Visual map showing exactly which Figma elements map to which events

### Quick Start
1. Open Figma design: `https://www.figma.com/design/IhA4sJGAztWKehQ9hFqRfK/UI-UX-Redesign?node-id=10810-10533`
2. Open `homepage/web.md` in this folder
3. Use `homepage/FIGMA-TO-EVENTS-MAP.md` to find which event matches each Figma element

## Structure

```
new-events-audit/
├── homepage/
│   ├── web.md
│   └── mobile.md
├── category/
│   ├── web.md
│   └── mobile.md
├── product/
│   ├── web.md
│   └── mobile.md
├── account/
│   ├── web.md
│   └── mobile.md
├── checkout/
│   ├── web.md
│   └── mobile.md
├── navigation/
│   ├── web.md
│   └── mobile.md
├── popups/
│   ├── web.md
│   └── mobile.md
├── search-otc/
│   ├── web.md
│   └── mobile.md
└── treatment/
    ├── web.md
    └── mobile.md
```

## Concatenation Strategy

Events have been concatenated where:
1. **Similar actions with different targets**: Multiple "Learn more" buttons → `button_learn_more_click` with `section_name` property
2. **Navigation items**: All nav links → `nav_item_click` with `nav_item` property
3. **Category clicks**: All category icons → `category_click` with `category_type` property
4. **Condition cards**: All condition cards → `condition_card_click` with `condition_id` property
5. **Social icons**: All social links → `social_icon_click` with `social_platform` property
6. **Payment icons**: All payment methods → `payment_icon_click` with `payment_method` property

## Event Naming Convention

- **Web**: `web_{page}_{action}_{element}_click`
- **Mobile**: `mobile_{page}_{action}_{element}_click`
- **Shared**: `{page}_{action}_{element}_click` (when platform-agnostic)

## Status

- ✅ **Homepage**: NEW design scanned from Figma (Node 10810:10533) - Events mapped and concatenated (81 → 35 events)
- ⏳ **Other pages**: Placeholder structure - To be populated when pages are scanned from new design

## Current Status

**Only Homepage has been newly scanned.** All other page folders contain placeholder structure and will be populated when those pages are scanned from the new Figma design.

