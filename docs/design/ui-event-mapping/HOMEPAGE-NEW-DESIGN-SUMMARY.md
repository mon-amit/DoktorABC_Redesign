# Homepage New Design - Extraction Summary

**Date**: 2025-01-27  
**Figma Node**: 10810:10533  
**Design Source**: UI UX Redesign - Homepage

---

## Deliverables

### 1. Design Variables & Styles
**File**: `/docs/design/design-system/homepage-design-variables.json`

Extracted design tokens from Figma including:
- **Colors**: Primary (#269c6e), Secondary (#7aba47), Text hierarchy, Surface colors, Borders, Icons
- **Typography**: Poppins (headers/titles), Roboto (body), complete size/weight/line-height system
- **Spacing**: 8px base unit system with gaps (8, 12, 16, 24, 32, 60, 110)
- **Components**: Button styles, Input styles, Border radius values
- **Effects**: Drop shadows, Background blur

### 2. Complete Event Mapping
**File**: `/docs/design/ui-event-mapping/homepage-new-design-events.md`

Comprehensive event documentation with:
- **81 total events** mapped from homepage design
- Full event table with properties, triggers, pre-events, and RCA
- Event categorization by section
- Implementation notes

### 3. Review Table (PM-Friendly)
**File**: `/docs/design/ui-event-mapping/final-tables/review-table-homepage-new-design-web.md`

Condensed event table format ready for:
- Excel/Google Sheets import
- PM review and approval
- Developer implementation reference

---

## Event Breakdown by Section

| Section | Event Count | Key Events |
|---------|-------------|------------|
| Top Bar & Header | 9 | Navigation links, Search, Cart, Profile |
| Hero Section | 13 | Get Started CTA, 12 category icons, Trust indicators |
| How It Works | 3 | Step 1, 2, 3 CTAs |
| Trusted Care | 3 | Video play, Feature cards |
| Why Choose Us | 6 | Main CTA, 4 benefit icons |
| Conditions We Treat | 4 | Anxiety, Chronic Pain, Insomnia, Depression |
| Holistic Wellness | 2 | Mindfulness, Nutrition |
| Weight Management | 3 | Plan cards, Shop now |
| Sexual Health | 3 | ED, Premature Ejaculation, Low Libido |
| Women's Health | 2 | Menopause, PCOS |
| Men's Health | 2 | Hair Loss, Testosterone |
| Online Pharmacy | 9 | 6 features, Product carousel |
| Medical Advisory Board | 1 | Doctor profile clicks |
| Self Pickup | 1 | Find location CTA |
| FAQ | 2 | Expand, Collapse |
| Newsletter | 2 | Email submit, Subscribe |
| Footer | 9 | Navigation links, Social icons |
| Payment Icons | 5 | Visa, Mastercard, PayPal, Apple Pay, Google Pay |
| Engagement Tracking | 2 | Scroll section view, Page view |
| **TOTAL** | **81** | |

---

## Key Conversion Events

### Primary CTAs
1. `web_homepage_hero_cta_get_started_click` - Main hero conversion
2. `web_homepage_how_it_works_step1_click` - Consultation booking
3. `web_homepage_how_it_works_step2_click` - Product browsing
4. `web_homepage_newsletter_subscribe_click` - Lead generation

### Category Interest
- 12 hero category icons (Flower, Oils, Vapes, Edibles, etc.)
- 4 condition cards (Anxiety, Chronic Pain, Insomnia, Depression)
- 3 sexual health solutions
- 2 women's health solutions
- 2 men's health solutions

### Product Engagement
- Product carousel interactions (next/prev/item clicks)
- Weight management shop now
- Pharmacy feature exploration

---

## Design System Highlights

### Color Palette
- **Primary Green**: #269c6e (main brand color)
- **Secondary Green**: #7aba47 (accents)
- **Text Hierarchy**: #08080a (primary), #616975 (secondary), #99a3b2 (tertiary)
- **Surface Colors**: #ffffff (background), #f5f6f7 (cards), #f7faef (green surface)

### Typography
- **Headers**: Poppins SemiBold/Medium (52px H2, 40px H3, 32px H4, 26px H5)
- **Display**: Poppins SemiBold/Medium (90px XL, 80px MD)
- **Body**: Roboto Regular (18px L, 16px M, 14px SM, 12px XS)

### Component Styles
- **Buttons**: 999px border radius (fully rounded), 22px font size, 32px/20px padding
- **Inputs**: 1px border (#c2c9d6), 16px font size, 16px/18px padding
- **Icons**: 24px standard size

---

## Next Steps

1. **PM Review**: Review event mapping for business alignment
2. **Developer Handoff**: Provide design variables JSON for implementation
3. **Analytics Setup**: Configure tracking in Mixpanel/analytics platform
4. **Testing**: Verify all 81 events fire correctly
5. **Documentation**: Update main event mapping index

---

## Files Created

1. `docs/design/design-system/homepage-design-variables.json` - Design tokens
2. `docs/design/ui-event-mapping/homepage-new-design-events.md` - Full event documentation
3. `docs/design/ui-event-mapping/final-tables/review-table-homepage-new-design-web.md` - Review table
4. `docs/design/ui-event-mapping/HOMEPAGE-NEW-DESIGN-SUMMARY.md` - This summary

---

**Status**: Complete  
**Ready for**: PM review and implementation

