# Data Collection & Analytics

This directory contains all data collection, analytics, and reporting infrastructure for the DoktorABC_Redesign project.

## 🚀 Quick Navigation

**For Redesign Project Data:**
- **Start Here**: [`data/redesign/MASTER-INDEX.json`](redesign/MASTER-INDEX.json) - Complete navigation hub
- **Project Overview**: [`data/redesign/project-overview.json`](redesign/project-overview.json) - Strategic goals and metrics
- **All PRDs**: [`data/redesign/pages/`](redesign/pages/) - Page-specific requirements
- **Archive Docs**: [`data/redesign/README.md`](redesign/README.md) - Complete archive documentation

**For Analytics:**
- **Event Config**: [`data/analytics/event-tracking-config.json`](analytics/event-tracking-config.json)
- **Collection Utils**: [`data/analytics/data-collection.js`](analytics/data-collection.js)
- **Event Tables**: See [`deliverables/dean-delivery-package/`](deliverables/dean-delivery-package/) - 24 CSV files with 179 events

**For Dean's Confluence Archive:**
- **Content Inventory**: [`data/redesign/deans-space-content.json`](redesign/deans-space-content.json)
- **HTML Archive**: [`data/redesign/deans-space-content/`](redesign/deans-space-content/) - Offline viewing

## 📁 Data Structure

```
data/
├── README.md                    # This overview
├── analytics/                   # Analytics data and configurations
│   ├── event-tracking-config.json  # Event definitions and properties
│   └── data-collection.js       # Data collection utilities
├── redesign/                    # DoktorABC Redesign Project Data [COMPLETE ARCHIVE]
│   ├── MASTER-INDEX.json        # Navigation hub and cross-reference index
│   ├── README.md                # Complete archive documentation
│   ├── project-overview.json    # Strategic goals and rollout phases
│   ├── requirements-index.json  # Comprehensive requirements catalog
│   ├── analytics-summary.json   # Performance metrics and targets
│   ├── deans-space-content.json # Confluence space content inventory
│   ├── prds/                    # Core Product Requirements Documents
│   │   ├── homepage-prd.json    # Main homepage redesign (8 requirements)
│   │   └── rx-category-prd.json # RX category page (13 requirements)
│   ├── pages/                   # Page-specific PRDs organized by type
│   │   ├── homepage/
│   │   │   └── otc-homepage-prd.json        # OTC Homepage (11 requirements)
│   │   ├── category-pages/
│   │   │   ├── category-page-prd.json       # General template (15 requirements)
│   │   │   ├── cannabis-category-prd.json   # Cannabis (21 requirements, 350K visits/mo)
│   │   │   └── otc-category-prd.json        # OTC (16 requirements)
│   │   ├── product-pages/
│   │   │   ├── rx-product-prd.json          # RX product (18 requirements)
│   │   │   ├── otc-product-prd.json         # OTC product (10 requirements)
│   │   │   └── cannabis-product-prd.json    # Cannabis (15 requirements, 277K visits/mo)
│   │   └── information-pages/
│   │       ├── about-us-prd.json            # About Us page
│   │       ├── shipping-page-prd.json       # Shipping info (18.15% conversion)
│   │       ├── error-pages-prd.json         # 404/500/502 handling
│   │       └── information-pages-comprehensive-prd.json  # 9 info pages bundle
│   ├── components/              # Reusable component specifications
│   │   └── bmi-calculator-prd.json          # Interactive BMI widget (12 requirements)
│   ├── analysis/                # Strategic analysis and research
│   │   ├── website-funnel-improvements.json # 26 improvements (9 high-priority)
│   │   └── bloomwell-competitor-analysis.json # Competitor insights
│   ├── deans-space-content/     # HTML archive for offline viewing
│   │   ├── README.md            # Archive overview
│   │   ├── main-redesign-project.html       # Project overview
│   │   ├── homepage-prd.html    # Homepage PRD
│   │   ├── rx-category-prd.html # RX Category PRD
│   │   └── competitive-landscape.html       # Competitive analysis
│   ├── requirements/            # Detailed requirement breakdowns
│   └── analytics/               # Analytics and tracking data
├── events/                      # Raw event data storage
├── users/                       # User profile and segmentation data
└── reports/                     # Generated reports and insights
```

## 🎯 Data Collection Strategy

### Event Tracking
The project implements comprehensive event tracking across user interactions, feature usage, and business metrics using the Mixpanel MCP integration.

### Data Categories

#### User Events
- **Authentication**: Login, signup, logout events
- **Engagement**: Feature views, interactions, and usage patterns
- **Journey**: Onboarding flow and tutorial completion

#### Business Events
- **Page Views**: Navigation and content consumption
- **Search**: Query analysis and result interactions
- **Performance**: Load times, errors, and technical metrics
- **Conversions**: Lead generation, trials, and purchases

#### Redesign Project Data
- **Project Overview**: Strategic goals, success metrics, and rollout phases
- **Product Requirements**: Detailed specifications for all redesigned pages and components
- **Analytics & Metrics**: Performance tracking, conversion goals, and user segmentation
- **Technical Requirements**: Implementation specifications and integration points

## 📊 Analytics Configuration

### Event Definitions
Located in `analytics/event-tracking-config.json`, this file defines:

- **Event Categories**: User, feature, business, and conversion events
- **Required Properties**: Mandatory fields for each event type
- **Validation Rules**: Data quality and consistency checks
- **Integration Settings**: MCP server configurations

### Key Events to Track

```json
{
  "user_login": {
    "description": "User authentication events",
    "properties": ["user_id", "login_method", "device_type"],
    "required": ["user_id", "timestamp"]
  },
  "feature_interacted": {
    "description": "Feature usage and interaction",
    "properties": ["feature_name", "interaction_type", "element_id"],
    "required": ["feature_name", "interaction_type"]
  },
  "page_view": {
    "description": "Content and navigation tracking",
    "properties": ["page_url", "page_title", "referrer"],
    "required": ["page_url"]
  }
}
```

## 🛠️ Data Collection Utilities

### EventTracker Class
Located in `analytics/data-collection.js`, provides:

```javascript
// Initialize tracker
const tracker = new EventTracker();

// Track events
tracker.trackEvent('user_login', { login_method: 'email' }, userId);
tracker.trackPageView('/dashboard', 'Dashboard Page');
tracker.trackFeatureInteraction('search', 'click', userId, 'search-btn');

// Export data
tracker.exportEvents('events_backup.json');
```

### Integration Points

#### Mixpanel MCP
- **Event Tracking**: Real-time event collection and analysis
- **User Profiles**: Demographic and behavioral data
- **Cohort Analysis**: User segmentation and retention tracking
- **Funnel Analysis**: Conversion path optimization

#### HubSpot CRM
- **Contact Sync**: User data synchronization
- **Lead Tracking**: Sales funnel and opportunity management
- **Engagement Scoring**: Interaction and interest measurement
- **Campaign Attribution**: Marketing effectiveness analysis

#### DoktorABC Redesign Project
- **Confluence Integration**: Product requirements documents and design specifications
- **Figma Designs**: Visual design systems and component libraries
- **Analytics Dashboard**: Performance monitoring and conversion tracking
- **A/B Testing Framework**: Iterative optimization and user experience improvements
- **Dean's Space Content**: Complete local archive of 35+ pages including 17 redesign PRDs, competitive analysis, and release notes

## 📈 Reporting & Analytics

### Automated Reports
- **Daily Health Checks**: System performance and error monitoring
- **Weekly User Reports**: Engagement and feature usage analysis
- **Monthly Business Reviews**: KPI tracking and trend analysis
- **Quarterly Strategic Reports**: Business intelligence and forecasting

### Dashboard Integration
- **Real-time Dashboards**: Live metrics and KPI monitoring
- **Custom Reports**: Ad-hoc analysis and deep dives
- **Alert System**: Automated notifications for key events
- **Export Capabilities**: Data export for external analysis

## 🔒 Data Privacy & Security

### Privacy Compliance
- **GDPR Compliance**: Data subject rights and consent management
- **CCPA Compliance**: California privacy law adherence
- **Data Minimization**: Collect only necessary data
- **Purpose Limitation**: Clear data usage policies

### Security Measures
- **Data Encryption**: In-transit and at-rest encryption
- **Access Controls**: Role-based data access permissions
- **Audit Logging**: Comprehensive data access tracking
- **Data Retention**: Automated data lifecycle management

## 🚀 Getting Started

### 1. MCP Server Setup
Ensure all MCP servers are running:
- Mixpanel: Analytics and event tracking
- HubSpot: CRM data synchronization
- Notion: Documentation analytics
- Figma: Design collaboration metrics

### 2. Event Tracking Implementation
```javascript
// Import the data collection utilities
const { eventTracker } = require('./data/analytics/data-collection');

// Start tracking events
eventTracker.trackUserLogin(userId, 'google', 'mobile');
eventTracker.trackPageView('/dashboard', 'User Dashboard');
```

### 3. Data Validation
```javascript
// Validate event configuration
const isValid = eventTracker.validateEvent(eventObject);
if (!isValid) {
  console.error('Invalid event data');
}
```

### 4. Report Generation
```javascript
// Export events for analysis
eventTracker.exportEvents('weekly_events.json');

// Generate automated reports
generateWeeklyReport();
generateMonthlyAnalytics();
```

## 📋 Data Quality Standards

### Validation Rules
- **Required Fields**: All mandatory properties must be present
- **Data Types**: Consistent data type usage
- **Format Standards**: ISO timestamps, snake_case naming
- **Data Integrity**: Referential integrity and consistency checks

### Monitoring & Alerting
- **Data Completeness**: Missing data detection and alerts
- **Quality Metrics**: Data accuracy and consistency scoring
- **Anomaly Detection**: Unusual pattern identification
- **Performance Monitoring**: Data pipeline health checks

## 🔄 Data Pipeline

### Collection → Processing → Storage → Analysis

1. **Collection**: Events captured via MCP integrations
2. **Processing**: Data validation, enrichment, and transformation
3. **Storage**: Structured storage with indexing and partitioning
4. **Analysis**: Real-time and batch analytics processing

### Data Flow
```
User Interaction → MCP Server → Event Validation → Data Enrichment → Storage → Analytics → Reporting
```

## 📚 Resources

### Documentation
- [Event Tracking Guide](analytics/event-tracking-config.json)
- [Data Collection API](analytics/data-collection.js)
- [MCP Integration Guide](../docs/mixpanel/README.md)

### Tools & Technologies
- **Mixpanel**: Analytics and event tracking platform
- **HubSpot**: CRM and marketing automation
- **Node.js**: Data processing and API development
- **Cursor MCP**: AI-assisted development environment

## 🏗️ DoktorABC Redesign Project Data [✅ COMPLETE ARCHIVE]

### Archive Status
**🎉 COMPLETE** - All 16 PRDs, 26 improvement recommendations, and 3 competitive analyses fully documented and organized locally.

### Project Overview
The redesign project data contains comprehensive specifications for the DoktorABC platform redesign, focusing on improving conversion rates, user experience, and trust signals across all major pages and components.

**📍 Quick Start**: Begin with `data/redesign/MASTER-INDEX.json` for complete navigation and cross-references.

### Complete Archive Contents

**📊 Total Documentation:**
- **16 PRDs**: Fully detailed page and component specifications
- **26 Improvements**: Prioritized funnel optimization recommendations  
- **3 Analyses**: Competitive research and strategic insights
- **45+ Requirements**: Cross-referenced technical specifications
- **100% Coverage**: All redesign-related content from Dean's Confluence space

### Data Structure

#### Project Management
- **`MASTER-INDEX.json`**: 🔑 **START HERE** - Complete navigation hub with cross-references, component library, and quick access guides
- **`README.md`**: Complete archive documentation with usage guidelines
- **`project-overview.json`**: Strategic goals, success metrics, rollout phases, and stakeholder information
- **`requirements-index.json`**: Complete catalog of all requirements, components, and technical specifications
- **`analytics-summary.json`**: Current performance metrics, targets, and optimization opportunities
- **`deans-space-content.json`**: Inventory of all 35+ pages in Dean's Confluence space

#### Product Requirements Documents (PRDs)
Located in `redesign/prds/`, containing detailed specifications for:
- **Homepage**: Hero section, navigation, categories, trust signals
- **RX Category Pages**: Medical content, doctor profiles, consultation flow
- **OTC E-commerce**: Product discovery, shopping cart, checkout optimization
- **Cannabis Pages**: Medical cannabis navigation and trust building
- **Information Pages**: About us, shipping, FAQ, and trust content

#### Component Specifications
- **Navigation Systems**: Sticky headers, breadcrumbs, search functionality
- **Trust Signals**: Reviews, certifications, doctor profiles, security badges
- **Conversion Elements**: CTAs, forms, pricing displays, social proof
- **Content Management**: Dynamic content from Back Office (BO) integration

### Key Metrics & Targets

#### Primary KPIs
- **+30%** increase in consultation start conversion
- **+20%** increase in paid order conversion
- **+20%** increase in Average Order Value (AOV)
- **-20%** reduction in cart abandonment
- **≥90** Google PageSpeed score

#### Current Performance Baseline
- **590K** monthly unique visitors to homepage
- **7.31%** conversion rate (view → paid order within 24h)
- **16%** bounce rate
- **10%** scroll depth past "How it works" section

### Implementation Phases

#### Phase 1: CMS Design (Sept 30, 2025)
Complete redesign of core pages with pixel-perfect Figma implementation:
- Homepage, category pages, product pages
- Information pages, error pages, account management
- Mobile-first responsive design with performance optimization

#### Phase 2: Funnel Optimization
Data-driven improvements to conversion funnel:
- A/B testing of key elements
- Analytics integration and tracking
- Iterative optimization based on user behavior

### Technical Architecture

#### Integration Points
- **Confluence**: Requirements documentation and specifications
- **Figma**: Design systems and component libraries
- **Back Office (BO)**: Dynamic content management
- **Database**: Real-time pricing and product data
- **Analytics**: Mixpanel and GA4 event tracking

#### Smart Personalization
- **User Segmentation**: New vs returning visitors, category preferences
- **Dynamic Content**: Personalized hero sections and recommendations
- **CRM Integration**: Coupon displays and lead capture
- **Localization**: German/French market adaptations

### Dean's Confluence Space Content

Dean's personal Confluence space contains the most comprehensive collection of redesign documentation. **Local copies** of key documents are now available in `data/redesign/deans-space-content/`:

#### Local Document Archive
- **`main-redesign-project.html`** - Complete project overview and strategic goals
- **`homepage-prd.html`** - Detailed homepage redesign specification
- **`rx-category-prd.html`** - RX category page complete requirements
- **`competitive-landscape.html`** - Comprehensive competitor analysis
- **`README.md`** - Archive overview and usage guidelines

#### Available Online (35+ pages total)
- **Redesign PRDs**: 17 comprehensive page and feature specifications
- **Product Requirements**: 13 feature development and optimization specs
- **Analysis Documents**: Competitive research, funnel analysis, performance metrics
- **Release Notes**: 5 recent feature deployments and updates

### Usage Guidelines

#### For Developers
```javascript
// Access project specifications
const homepageSpecs = require('./data/redesign/prds/homepage-prd.json');
const requirements = require('./data/redesign/requirements-index.json');
const deansContent = require('./data/redesign/deans-space-content.json');

// Check implementation requirements
const navigationReqs = requirements.design_system_components.find(
  c => c.component === 'Navigation Bar'
);

// Find specific PRDs in Dean's space
const redesignPRDs = deansContent.content_categories.redesign_project;
```

#### For Product Managers
- Use `requirements-index.json` for comprehensive requirement tracking
- Reference `analytics-summary.json` for performance baselines and targets
- Access specific PRDs for detailed page/component specifications

#### For Designers
- Figma links embedded in all PRD documents
- Component specifications in `requirements-index.json`
- Performance constraints and accessibility requirements

---

**Data Lead**: Amit Yogev
**Last Updated**: December 15, 2025
**Data Collection Status**: 🟢 **ACTIVE** - Ready for implementation
**Redesign Project Status**: 🟢 **ACTIVE** - Data collection complete
**Tags**: #analytics #data-collection #mixpanel #tracking #redesign #conversion-optimization
