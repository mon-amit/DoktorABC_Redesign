# Event Merge Candidates Analysis

This document identifies events that could be consolidated under single event names with differentiating properties.

## Analysis Methodology

Events are analyzed for consolidation opportunities when they share:
- Same base action (click, submit, view, etc.)
- Same page and platform
- Different property values that provide meaningful differentiation

## Identified Merge Candidates

### 1. Category Selection Events

**Base Event**: `web_homepage_button_category_click`

**Current Separate Events**:
- `web_homepage_button_category_skin_click` (category_id: skin-care)
- `web_homepage_button_category_hair_click` (category_id: hair-care)

**Recommended Merged Structure**:
```javascript
web_homepage_button_category_click: {
  category_id: "skin-care" | "hair-care" | "erectile-dysfunction" | "weight-loss" | "medical-cannabis" | "asthma" | "birth-control" | "diabetes" | "testosterone" | "quit-smoking" | "sti-test",
  category_name: string,
  position: number,
  source_section: "categories"
}
```

**Benefits**:
- Single event for all category selections
- Easier trend analysis across categories
- Cleaner analytics dashboard
- Simplified reporting

### 2. Product Card Click Events

**Base Event**: `web_homepage_card_product_click`

**Current Separate Events**:
- `web_homepage_card_acne_cream_click` (product_id, product_name)
- `web_homepage_card_hair_growth_click` (product_id, product_name)
- `web_homepage_card_vitamin_c_click` (product_id, product_name)

**Recommended Merged Structure**:
```javascript
web_homepage_card_product_click: {
  product_id: string,
  product_name: string,
  position: number,
  category: string,
  source_section: "featured_products"
}
```

**Benefits**:
- Unified product interaction tracking
- Position-based performance analysis
- Category cross-selling insights

### 3. Navigation Menu Events

**Base Event**: `web_nav_button_click`

**Current Separate Events**:
- `web_nav_button_products_click` (menu_level: "main")
- `web_nav_button_categories_click` (menu_level: "main")
- `web_nav_button_account_click` (menu_level: "main")

**Recommended Merged Structure**:
```javascript
web_nav_button_click: {
  nav_item: string,
  menu_level: "main" | "submenu" | "footer",
  section: string
}
```

**Benefits**:
- Comprehensive navigation analytics
- User journey mapping
- Content discovery optimization

### 4. Footer Link Events

**Base Event**: `web_footer_link_click`

**Current Separate Events**:
- `web_nav_button_footer_privacy_click` (footer_section: "legal")
- `web_nav_button_footer_terms_click` (footer_section: "legal")
- `web_nav_button_footer_contact_click` (footer_section: "support")

**Recommended Merged Structure**:
```javascript
web_footer_link_click: {
  footer_link: string,
  section: "legal" | "support" | "business" | "social",
  link_destination: string
}
```

**Benefits**:
- Footer engagement optimization
- Legal compliance tracking
- Support funnel analysis

### 5. Product Page Button Events

**Base Event**: `web_product_button_click`

**Potential Consolidations**:
- Add to Cart vs Buy Now (action_type: "add_to_cart" | "buy_now")
- Quantity controls (action_type: "quantity_increase" | "quantity_decrease")

**Recommended Merged Structure**:
```javascript
web_product_button_click: {
  action_type: "add_to_cart" | "buy_now" | "quantity_increase" | "quantity_decrease" | "read_reviews" | "variant_select",
  product_id: string,
  current_quantity?: number,
  variant_id?: string
}
```

## Implementation Priority

### High Priority Merges
1. **Category clicks** - Most frequent, highest business impact
2. **Product card clicks** - Direct revenue impact
3. **Navigation events** - User experience optimization

### Medium Priority Merges
1. **Footer links** - Compliance and support tracking
2. **Product page buttons** - Purchase funnel optimization

### Low Priority Merges
- Events with very different contexts
- Events with unique business logic
- Events with complex property requirements

## Merge Decision Criteria

### Merge When:
- Events share the same user intent
- Property differences provide meaningful segmentation
- Consolidation simplifies analysis without losing insight
- Events occur in similar contexts

### Don't Merge When:
- Events represent fundamentally different user actions
- Property differences indicate separate business logic
- Consolidation would obscure important distinctions
- Events require different tracking triggers

## Expected Outcomes

### Analytics Benefits
- **Simplified dashboards**: Fewer event types to monitor
- **Better trend analysis**: Consolidated metrics across variations
- **Improved reporting**: Clearer insights for stakeholders

### Technical Benefits
- **Reduced complexity**: Fewer event definitions to maintain
- **Better performance**: Fewer distinct events to process
- **Easier testing**: Consolidated validation logic

### Business Benefits
- **Faster insights**: Immediate access to cross-variant trends
- **Better decisions**: Data-driven optimization opportunities
- **Stakeholder satisfaction**: Clear, actionable analytics

## Next Steps

1. **PM Review**: Evaluate merge candidates against business requirements
2. **Implementation Planning**: Update event tracking configuration
3. **Testing**: Validate merged event implementation
4. **Migration**: Gradually transition from separate to merged events
5. **Documentation**: Update analytics documentation

## Decision Log

| Merge Candidate | Decision | Rationale | Date |
|----------------|----------|-----------|------|
| Category clicks | APPROVED | High frequency, clear property differentiation | 2025-12-14 |
| Product cards | APPROVED | Revenue impact, position tracking | 2025-12-14 |
| Navigation | PENDING | Requires UX review for context differences | 2025-12-14 |
| Footer links | APPROVED | Compliance and support tracking | 2025-12-14 |
| Product buttons | PENDING | Complex property variations need analysis | 2025-12-14 |