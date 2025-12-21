# DoktorABC Redesign Project - Complete Local Archive

**Version**: 1.0  
**Last Updated**: December 15, 2025  
**Source**: Dean Gabay's Confluence Personal Space  
**Status**: ✅ COMPLETE - All redesign documentation archived locally

---

## 📁 Archive Structure

This directory contains a complete, organized archive of the DoktorABC platform redesign project documentation, sourced from Confluence and optimized for local access and development use.

```
data/redesign/
├── MASTER-INDEX.json                    # Complete navigation and cross-reference index
├── project-overview.json                # Strategic goals and rollout phases
├── requirements-index.json              # Comprehensive requirements catalog
├── analytics-summary.json               # Performance metrics and targets
├── deans-space-content.json             # Confluence space inventory
│
├── pages/                               # Page-specific PRDs organized by type
│   ├── homepage/
│   │   └── otc-homepage-prd.json       # OTC Homepage specifications
│   ├── category-pages/
│   │   ├── category-page-prd.json      # General category template
│   │   ├── cannabis-category-prd.json  # Cannabis category (350K visits/month)
│   │   └── otc-category-prd.json       # OTC category specifications
│   ├── product-pages/
│   │   ├── rx-product-prd.json         # RX product specifications
│   │   ├── otc-product-prd.json        # OTC e-commerce product page
│   │   └── cannabis-product-prd.json   # Cannabis product (277K visits/month)
│   └── information-pages/
│       ├── about-us-prd.json           # About Us page specifications
│       ├── shipping-page-prd.json      # Shipping information page
│       ├── error-pages-prd.json        # 404/500/502 error handling
│       └── information-pages-comprehensive-prd.json  # 9 info pages bundle
│
├── prds/                                # Core PRDs (legacy location)
│   ├── homepage-prd.json                # Main homepage redesign
│   └── rx-category-prd.json             # RX category page
│
├── components/                          # Reusable component specifications
│   └── bmi-calculator-prd.json          # Interactive BMI calculator widget
│
├── analysis/                            # Strategic analysis and research
│   ├── website-funnel-improvements.json # 26 improvement recommendations
│   └── bloomwell-competitor-analysis.json # Bloomwell competitor insights
│
├── deans-space-content/                 # HTML archive of key documents
│   ├── README.md                        # Archive documentation
│   ├── main-redesign-project.html       # Project overview
│   ├── homepage-prd.html                # Homepage PRD
│   ├── rx-category-prd.html             # RX Category PRD
│   └── competitive-landscape.html       # Competitive analysis
│
├── requirements/                        # (Reserved for detailed breakdowns)
└── analytics/                           # (Reserved for analytics data)
```

---

## 🚀 Quick Start

### For Developers

```bash
# Start with the master index
cat data/redesign/MASTER-INDEX.json | jq '.quick_navigation'

# Find homepage specifications
cat data/redesign/pages/homepage/otc-homepage-prd.json | jq '.development_requirements'

# Check component library
cat data/redesign/MASTER-INDEX.json | jq '.component_library'

# Find integration points
grep -r "from DB" data/redesign/pages/
```

### For Product Managers

1. **Project Overview**: `project-overview.json` - Strategic goals and success metrics
2. **Requirements Tracking**: `requirements-index.json` - Complete requirements catalog
3. **Performance Baseline**: `analytics-summary.json` - Current metrics and targets
4. **Improvement Roadmap**: `analysis/website-funnel-improvements.json` - 26 prioritized items

### For Designers

1. **Figma Links**: All PRD files include direct Figma design links
2. **Component Library**: `MASTER-INDEX.json` → `component_library` section
3. **Design Constraints**: Performance (PageSpeed ≥90) and accessibility requirements

---

## 📊 Project Overview

### Strategic Goals

1. **Build Trust**: Consistent professional design, clear USPs, trust banners
2. **Simplify Navigation**: Zero-friction user journey to treatments
3. **Launch OTC E-commerce**: Full online store (Homepage → Category → Product)
4. **Data-Driven Design**: Complete event mapping (Mixpanel, GA4)

### Success Metrics

**Primary KPIs:**
- **+30%** increase in consultation start conversion
- **+20%** increase in paid order conversion

**OTC Growth:**
- **+20%** increase in Average Order Value (AOV)
- **-20%** reduction in cart abandonment

**Performance:**
- **≥90** Google PageSpeed score across all pages

### Current Performance Baseline

| Page Type | Monthly Visitors | Conversion Rate | Key Metric |
|-----------|------------------|-----------------|------------|
| Homepage | 590K | 7.31% | 16% bounce rate |
| Cannabis Category | 350K | 16.21% | 90K searches/month |
| RX Products | N/A | Target: +20% | <15% bounce target |
| OTC Products | 237.6K views | 2.23% | €19.32 AOV |

---

## 🎯 Content Inventory

### Redesign PRDs (16 Documents)

**Homepage Pages (2)**
- Main Homepage - 8 requirements
- OTC Homepage - 11 requirements

**Category Pages (4)**
- General Category Template - 15 requirements
- RX Category Page - 13 requirements
- Cannabis Category Page - 21 requirements
- OTC Category Page - 16 requirements

**Product Pages (3)**
- RX Product Page - 18 requirements
- OTC Product Page - 10 requirements
- Cannabis Product Page - 15 requirements

**Information Pages (4)**
- About Us Page
- Shipping Page
- Error Pages (404/500/502)
- Information Pages Bundle (9 pages)

**Components & Features (1)**
- BMI Calculator - Interactive widget with 12 requirements

### Strategic Analysis (3 Documents)

- **Competitive Landscape**: Market positioning, Hims/Ro analysis
- **Website & Funnel Improvements**: 26 improvement recommendations (9 high-priority)
- **Bloomwell Competitor Analysis**: Recent competitive insights (Dec 2025)

---

## 🔧 Technical Architecture

### Smart Personalization Engine

**User Segmentation:**
- Gender detection (male/female)
- Category preference (from URL parameters or purchase history)
- Content personalization (hero carousel, category drilldown, CTAs)

**Triggers:**
- Marketing campaign parameters (e.g., `utm_category=ED`)
- Previous purchase history for returning users
- Session behavior and navigation patterns

### Dynamic Content Integration

**Back Office (BO):**
- Category images and descriptions
- Product data and pricing
- FAQ content management
- Doctor profiles
- SEO content widgets
- Banner and promotion management

**Database:**
- Real-time pricing and stock availability
- Product specifications and variants
- Treatment fees and shipping costs
- User purchase history

**CRM (HubSpot):**
- Coupon displays and promotional content
- Lead capture and nurturing
- Email subscription management
- Customer segmentation

**Third-Party APIs:**
- Trusted Shops reviews and ratings
- Trustpilot integration
- Payment provider status

### Localization Framework

**Supported Markets:**
- **Germany (DE)**: Primary market
- **France (FR)**: Full localization

**Translation Scope:**
- All UI text and labels
- Product descriptions
- Legal disclaimers
- FAQs and help content
- Marketing copy and CTAs

**Technical Implementation:**
- Translation files for static content
- CMS fields for dynamic content
- Country-specific configuration
- Currency and date formatting

### Performance Requirements

**Core Web Vitals:**
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **Google PageSpeed Score**: ≥90

**Optimization Strategies:**
- Lazy loading for images and carousels
- Code splitting for faster initial load
- CDN delivery for static assets
- Database query optimization
- Caching strategies for dynamic content

---

## 🔗 Integration Points

### Critical Systems

1. **Back Office (BO)** - `https://bo.doktorabc.com/`
   - Content management
   - Product catalog
   - Banner uploads
   - FAQ management

2. **Database** - Production DB
   - Real-time pricing
   - Stock management
   - User data
   - Purchase history

3. **CRM (HubSpot)** - Marketing automation
   - Lead capture
   - Email campaigns
   - Customer segmentation
   - Analytics

4. **Analytics** - Mixpanel + GA4
   - Event tracking
   - Conversion funnels
   - User behavior
   - A/B testing

### API Integrations

- **Trusted Shops**: Review widget and rating badge
- **Trustpilot**: Customer reviews and testimonials
- **Payment Providers**: Klarna, PayPal, Stripe
- **Shipping Providers**: DHL, Uber Direct

---

## 📖 How to Use This Archive

### Finding Specific Information

#### By Page Name
```bash
# Homepage
cat pages/homepage/otc-homepage-prd.json

# Category pages
cat pages/category-pages/cannabis-category-prd.json

# Product pages
cat pages/product-pages/rx-product-prd.json

# Information pages
cat pages/information-pages/about-us-prd.json
```

#### By Component
```bash
# Search for specific components
grep -r "Trusted Shops" . --include="*.json"
grep -r "Navbar" . --include="*.json"
grep -r "Hero Section" . --include="*.json"
```

#### By Integration Type
```bash
# Find Back Office integrations
grep -r "from BO" . --include="*.json"

# Find database dependencies
grep -r "from DB" . --include="*.json"

# Find CRM integrations
grep -r "HubSpot\|CRM" . --include="*.json"
```

### Understanding Requirements

**Each PRD JSON file contains:**
- `background`: Context and user needs
- `personas`: Target user segments
- `success_metrics`: KPIs and targets
- `design_sections`: Visual requirements
- `development_requirements`: Technical specifications
- `figma_link`: Direct link to designs
- `source`: Confluence page reference

### Cross-Referencing

Use `MASTER-INDEX.json` for:
- **Component reuse**: See which pages share components
- **Integration mapping**: Find all pages using specific integrations
- **User journey mapping**: Understand page-to-page flows
- **Performance requirements**: Global technical constraints

---

## 🎨 Design System

### Global Components (Reusable)

**Navigation:**
- Sticky Navbar (3 variants: Main, OTC, Cannabis)
- Breadcrumb Navigation (dynamic path)
- Anchor Bar / CRM Coupon Strip
- Category Navigation Strip

**Trust Signals:**
- Trusted Shops Widget
- Customer Reviews Carousel
- Medical Advisory Board Cards
- Press Logos Carousel
- Certifications Display
- Privacy Banner

**Conversion Elements:**
- Hero Section (Carousel / Static variants)
- CTA Buttons (Sticky behavior)
- Search Bar (Global / OTC / Cannabis variants)
- FAQ Accordion
- Newsletter / CRM Subscription

**Product Display:**
- Product Cards (RX / OTC / Cannabis variants)
- Price Display (dynamic with discounts)
- Usually Bought Together
- You May Also Like
- Stock Indicators

**Content Sections:**
- How It Works (3-step visual)
- USPs Block (Global / Category-specific)
- Doctor Profile Cards
- Payment Methods Strip
- SEO Content Widget

### Color & Branding

- **Primary Brand Color**: Green (various shades for categories)
- **Trust Colors**: Blue (medical), Green (security)
- **Discount Colors**: Red for strikethrough, Yellow/Orange for badges
- **Category Colors**: Each category has primary and secondary colors defined in BO

---

## 📈 Analytics & Tracking

### Events to Track (Mixpanel / GA4)

**Page Views:**
- Homepage, Category pages, Product pages
- Information pages, Error pages

**User Interactions:**
- CTA clicks, Search queries
- Product card interactions
- Add to cart events
- Consultation starts

**Conversion Funnel:**
- Homepage view
- Category exploration
- Product selection
- Consultation start
- Checkout completion

**Performance Metrics:**
- Page load times
- Core Web Vitals
- Error rates
- Bounce rates

---

## 🔐 Security & Compliance

### Data Privacy

- **GDPR Compliance**: All data collection with user consent
- **Data Encryption**: In-transit and at-rest
- **Access Controls**: Role-based permissions
- **Audit Logging**: Complete data access tracking

### Medical Compliance

- **Prescription Handling**: Secure doctor-patient communication
- **Data Protection**: Medical information confidentiality
- **Regulatory Compliance**: Country-specific medical regulations
- **Certification Display**: LegitScript, PCI, DMCA, BIM

---

## 🛠️ Development Workflow

### Implementation Steps

1. **Review MASTER-INDEX.json** - Understand overall structure
2. **Read project-overview.json** - Grasp strategic context
3. **Select page PRD** - Navigate to specific page folder
4. **Check Figma designs** - Visual reference (link in PRD)
5. **Identify integrations** - Note DB, BO, CRM dependencies
6. **Implement requirements** - Follow development_requirements array
7. **Test against metrics** - Verify success_metrics in PRD
8. **Cross-check components** - Ensure consistency across pages

### Testing Checklist

- [ ] Mobile responsive (iOS & Android)
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Localization (DE & FR complete)
- [ ] Performance (PageSpeed ≥90)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Analytics tracking (all events firing)
- [ ] Integration tests (BO, DB, CRM, APIs)
- [ ] Cross-browser compatibility
- [ ] Error handling
- [ ] Security audit

---

## 📞 Stakeholders & Contacts

**Project Owner**: Dean Gabay  
**Designers**: Lauren Levy, Mariie Mordikova, Roman Gorelik  
**Tech Lead**: Hussein  

**Approvals Required:**
- **Product**: Eran, David
- **ASO Team**: Olexander
- **Marketing**: Miki
- **Dev**: Hussein

---

## 🎯 Success Criteria

### Phase 1: CMS Design (Sept 30, 2025)

**Deliverables:**
- ✅ 2 Homepage variants (Main, OTC)
- ✅ 4 Category page types
- ✅ 3 Product page types
- ✅ 10+ Information pages
- ✅ Error pages (404, 500, 502)
- ✅ Navigation components
- ✅ Interactive components (BMI Calculator)

### Phase 2: Funnel Optimization

**Activities:**
- A/B testing framework
- Analytics integration
- Performance optimization
- Conversion rate improvements

---

## 📚 Additional Resources

### Figma Design Files

- **Main Design**: https://www.figma.com/design/IhA4sJGAztWKehQ9hFqRfK/UI-UX-Redesign
- **Draft/Wireframes**: https://www.figma.com/design/Agry3qSdqxAFhRNRWsKtrG/Dean-Draft

### Google Sheets

- **Requirements Spreadsheet**: https://docs.google.com/spreadsheets/d/1UeeDy-yEtzmrdropRaNAEPH7ChdnfaeALiIHIGiN6WQ/edit

### Confluence Space

- **Dean's Space**: ~7120209ec1fadd43394b5d8cebb1d220ce2353
- **Site**: https://doktorabc.atlassian.net/wiki

---

## 💡 Tips & Best Practices

### Working with This Archive

1. **Start with MASTER-INDEX.json** - Your navigation hub
2. **Check analytics-summary.json** - Understand current performance
3. **Review website-funnel-improvements.json** - See known issues and improvements
4. **Use page-specific PRDs** - Detailed specs for implementation
5. **Cross-reference components** - Ensure consistency across pages

### Common Patterns

- **Navigation**: All pages use sticky navbar with consistent structure
- **Trust Signals**: Trusted Shops widget appears on all major pages
- **CTAs**: Sticky behavior on mobile, in-navbar on desktop
- **USPs**: Global USPs + category-specific variants
- **Footer**: Identical across all pages

### Integration Best Practices

- **Back Office**: Always check for CMS-editable fields
- **Database**: Implement proper caching for performance
- **CRM**: Test lead capture flows thoroughly
- **Analytics**: Verify all event tracking before deployment

---

## 🔄 Maintenance & Updates

### When to Update This Archive

- New PRDs created in Confluence
- Major design changes approved
- Strategic decisions impact project scope
- Analytics show significant performance changes

### How to Sync

```bash
# Use Confluence MCP server to fetch latest content
# Update corresponding JSON files
# Increment version in MASTER-INDEX.json
# Update last_updated timestamp
# Document changes in git commit
```

---

## 📝 Version History

**v1.0** - December 15, 2025
- Initial complete archive of all redesign documentation
- 16 PRDs fully documented and organized
- 3 strategic analysis documents
- Complete component library
- Master index with cross-references
- HTML archive for offline viewing

---

**Archive Maintainer**: Amit Yogev  
**Data Source**: Dean Gabay's Confluence Space  
**Archive Status**: ✅ COMPLETE & CURRENT

*This archive ensures complete offline access to the DoktorABC platform redesign documentation for efficient development, testing, and implementation.*
