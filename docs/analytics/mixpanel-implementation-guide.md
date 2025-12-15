# Mixpanel Implementation Propositions - DoktorABC Redesign

## Executive Summary

This guide provides comprehensive recommendations for implementing the 118 tracked events in Mixpanel. The implementation is structured in 3 phases with clear priorities based on business impact.

**Key Statistics:**
- Total Events: 118
- High Priority Events: 77
- Conversion Events: 16
- Estimated Implementation Time: 5-9 weeks

---

## 1. Event Naming Conventions

### Standard Format
```
{platform}_{page}_{action}_{target}
```

### Examples
- `web_product_add_to_cart`
- `mobile_category_filter_applied`
- `web_checkout_payment_completed`

### Current Mapping Examples
- `web_homepage_cta_start_click` → `web_homepage_start_treatment`
- `web_product_button_add_to_cart_click` → `web_product_add_to_cart`
- `web_checkout_button_place_order_click` → `web_checkout_purchase_completed`

---

## 2. Property Structures

### Core Property Groups

#### Product Properties
- `product_id`: string - unique product identifier
- `product_name`: string - human readable name
- `category_id`: string - product category
- `variant_id`: string - product variant (size, strength)
- `price`: number - current price in cents
- `brand`: string - product brand

#### User Context
- `user_id`: string - unique user identifier
- `session_id`: string - current session
- `page_url`: string - current page URL
- `referrer`: string - referring page
- `device_type`: string - desktop, mobile, tablet
- `user_agent`: string - browser/device info

#### Business Metrics
- `cart_value`: number - cart total in cents
- `order_total`: number - order total in cents
- `item_count`: number - number of items
- `discount_amount`: number - discount applied in cents

### Validation Rules
- **Required**: user_id, timestamp, page_url
- **Data Types**: Strict typing - strings, numbers, booleans
- **Naming**: snake_case for all property names

---

## 3. Implementation Phases

### Phase 1: Critical Events (1-2 weeks)
**Focus**: Core conversion funnel and high-value interactions
**Events**: 25
**Effort**: High - affects core business metrics

Key Events:
- `web_homepage_button_view_products_click`
- `web_homepage_button_category_skin_click`
- `web_homepage_button_category_hair_click`
- `web_category_button_apply_filters_click`
- `web_category_button_clear_filters_click`
- `web_category_button_sort_price_low_click`
- `web_category_button_sort_price_high_click`
- `web_category_button_sort_newest_click`
- `web_category_button_sort_rating_click`
- `web_category_button_load_more_click`

### Phase 2: Important Events (2-3 weeks)
**Focus**: Conversion optimization and user engagement
**Events**: 29
**Effort**: Medium - enhances existing flows

### Phase 3: Enhancement Events (2-4 weeks)
**Focus**: UX enhancement and detailed analytics
**Events**: 7
**Effort**: Low - incremental improvements

---

## 4. User Properties Setup

### Demographic Properties
- `age_group`: 18-24, 25-34, 35-44, 45-54, 55+
- `gender`: male, female, other, prefer_not_to_say
- `location_country`: ISO country code
- `language`: browser language preference

### Behavioral Properties
- `user_type`: new, returning, premium
- `registration_date`: YYYY-MM-DD
- `last_login_date`: YYYY-MM-DD
- `total_orders`: number
- `lifetime_value`: number in cents
- `preferred_categories`: array of category_ids

### Technical Properties
- `device_type`: desktop, mobile, tablet
- `browser_name`: Chrome, Safari, Firefox, etc.
- `operating_system`: iOS, Android, Windows, macOS
- `screen_resolution`: 1920x1080
- `timezone`: UTC offset

---

## 5. Key Funnels to Track

### Primary Conversion Funnel
**Steps:**
1. `web_homepage_start_treatment`
1. `web_treatment_consultation_started`
1. `web_treatment_consultation_completed`
1. `web_product_add_to_cart`
1. `web_checkout_purchase_completed`

**Focus**: Homepage CTA to purchase completion

### Product Discovery Funnel
**Steps:**
1. `web_homepage_view`
1. `web_category_browse`
1. `web_product_view`
1. `web_product_add_to_cart`

### Search to Purchase Funnel
**Steps:**
1. `web_search_performed`
1. `web_search_results_viewed`
1. `web_product_view`
1. `web_product_add_to_cart`
1. `web_checkout_purchase_completed`

---

## 6. Dashboard Recommendations

### Executive Dashboard
**KPIs:**
- Total Revenue
- Conversion Rate
- Average Order Value
- User Acquisition Cost
- Customer Lifetime Value

### Product Dashboard
**Focus**: Product performance and catalog optimization
**Key Metrics:**
- Product View to Purchase Rate
- Top Performing Categories
- Cart Abandonment Rate
- Search Conversion Rate

---

## 7. Technical Implementation

### Mixpanel Configuration
```javascript
mixpanel.init('vkFfPe1vI5wMr9KIOtjSvalW8rAmUCNz', {
  api_host: 'https://api-eu.mixpanel.com',
  cross_domain_tracking: true
});
```

### Implementation Options

#### Option 1: CDN Integration
<!-- Mixpanel CDN -->
<script src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"></script>
<script>
  mixpanel.init('YOUR_TOKEN');
  mixpanel.track('Event Name', { property: 'value' });
</script>

#### Option 2: NPM Package (Recommended)
// npm install mixpanel-browser
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_TOKEN');
mixpanel.track('web_product_add_to_cart', {
  product_id: 'prod_123',
  quantity: 2,
  price: 2999
});

### Error Handling
- **Fallback**: Graceful degradation if Mixpanel unavailable
- **Retry Logic**: Retry failed events
- **Offline Support**: Queue events when offline

---

## 8. Testing & Validation

### QA Checklist
- [ ] All required properties present
- [ ] Data types match schema
- [ ] Event names follow conventions
- [ ] No PII in event data
- [ ] Performance impact < 100ms

### Data Quality Assurance
- **Validation**: Implement event schema validation
- **Sampling**: Use 100% tracking for critical events
- **Privacy**: GDPR compliance with consent management

---

## Success Metrics

### Implementation Success
- ✅ All Phase 1 events implemented and tested
- ✅ Event data flowing to Mixpanel dashboards
- ✅ No PII leakage in event data
- ✅ Performance impact < 100ms per page

### Business Success
- ✅ Revenue tracking accuracy > 99%
- ✅ User journey visibility complete
- ✅ A/B testing framework operational
- ✅ Stakeholder dashboards delivering insights

---

*This implementation guide provides the foundation for comprehensive analytics tracking in the DoktorABC redesign. Follow the phased approach to ensure quality and minimize business disruption.*