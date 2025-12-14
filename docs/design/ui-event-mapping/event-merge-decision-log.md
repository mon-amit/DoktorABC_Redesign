# Event Merge Decision Log

This document records decisions made about event consolidation opportunities.

## Decision Framework

### Approval Criteria
- **Business Value**: Consolidation provides clearer insights or simplifies analysis
- **Technical Feasibility**: Properties can be cleanly differentiated
- **User Experience**: Merged events maintain actionable segmentation
- **Stakeholder Alignment**: Benefits outweigh implementation complexity

### Rejection Criteria
- **Lost Granularity**: Important distinctions would be obscured
- **Complex Properties**: Property variations are too diverse
- **Different Contexts**: Events represent fundamentally different user intents
- **Business Logic**: Separate events drive different business processes

## Approved Merges

### 1. Category Selection Events ✅ APPROVED

**Decision Date**: December 14, 2025
**Decision Maker**: PM Review
**Status**: Approved for implementation

**Merge Details**:
- **Base Event**: `web_homepage_button_category_click`
- **Consolidated Properties**:
  - `category_id`: Differentiates treatment categories
  - `category_name`: Human-readable category name
  - `position`: Category position in UI
  - `source_section`: Always "categories"

**Business Rationale**:
- Category selection is the primary conversion funnel entry point
- Need to track popularity across all treatment categories
- Position-based analysis helps optimize category layout
- Single event simplifies conversion funnel reporting

**Technical Rationale**:
- Clean property differentiation with category_id
- Consistent property structure across all variations
- Easy to implement and maintain

**Implementation Notes**:
- Update Figma event mapping to use consolidated event
- Modify Mixpanel event configuration
- Update analytics dashboards
- Maintain backward compatibility during transition

### 2. Product Card Click Events ✅ APPROVED

**Decision Date**: December 14, 2025
**Decision Maker**: PM Review
**Status**: Approved for implementation

**Merge Details**:
- **Base Event**: `web_homepage_card_product_click`
- **Consolidated Properties**:
  - `product_id`: Unique product identifier
  - `product_name`: Display name
  - `position`: Card position on page
  - `source_section`: "featured_products" or specific section

**Business Rationale**:
- Product cards drive direct revenue through featured placements
- Position analysis critical for merchandising optimization
- Need to track cross-category product interest
- Homepage product engagement affects overall conversion

**Technical Rationale**:
- Consistent product data structure
- Position tracking enables A/B testing insights
- Scalable for future product additions

### 3. Footer Link Events ✅ APPROVED

**Decision Date**: December 14, 2025
**Decision Maker**: PM Review
**Status**: Approved for implementation

**Merge Details**:
- **Base Event**: `web_footer_link_click`
- **Consolidated Properties**:
  - `footer_link`: Link identifier ("Privacy Policy", "Contact", etc.)
  - `section`: Footer section ("legal", "support", "business")
  - `link_destination`: Target URL or page

**Business Rationale**:
- Footer engagement indicates trust and support needs
- Legal compliance tracking is critical
- Support funnel starts with footer contact links
- B2B partnership inquiries begin in footer

**Technical Rationale**:
- Section-based organization maintains clarity
- Link destination tracking enables user journey analysis
- Extensible for future footer additions

## Pending Decisions

### 4. Navigation Menu Events ⏳ PENDING

**Decision Date**: December 14, 2025
**Status**: Requires UX review

**Potential Merge**:
- **Base Event**: `web_nav_button_click`
- **Properties**: `nav_item`, `menu_level`, `section`

**Concerns**:
- Main navigation vs. footer navigation may represent different user intents
- Menu level complexity (main, submenu, mobile hamburger)
- Different business contexts for navigation events

**Next Steps**:
- UX review to assess user intent differences
- Analytics review of current navigation patterns
- Stakeholder alignment on navigation event importance

### 5. Product Page Button Events ⏳ PENDING

**Decision Date**: December 14, 2025
**Status**: Requires business logic review

**Potential Merge**:
- **Base Event**: `web_product_button_click`
- **Properties**: `action_type`, `product_id`, `variant_id`, `quantity`

**Concerns**:
- Add to Cart vs Buy Now represent different conversion stages
- Quantity controls have different user intents
- Review/variant buttons serve different purposes

**Next Steps**:
- Product team review of button hierarchy
- Conversion funnel analysis
- User behavior research

## Rejected Merges

### 6. Popup Events ❌ REJECTED

**Decision Date**: December 14, 2025
**Status**: Rejected

**Reason for Rejection**:
- Popups represent distinct user experiences and legal requirements
- Age verification, cookie consent, and error messages have different business contexts
- Each popup type requires separate compliance tracking
- User intent varies significantly between popup types

**Maintained Separate Events**:
- `popup_age_verify_*`
- `popup_cookie_consent_*`
- `popup_payment_error_*`
- `popup_login_required_*`

## Implementation Timeline

### Phase 1: High Priority (Approved Merges)
- **Target Date**: January 2026
- **Events**: Category clicks, Product cards, Footer links
- **Effort**: 2-3 weeks
- **Risk**: Low - clean property structures

### Phase 2: Medium Priority (Pending Decisions)
- **Target Date**: February 2026
- **Events**: Navigation, Product page buttons
- **Effort**: 3-4 weeks
- **Risk**: Medium - requires additional analysis

### Phase 3: Monitoring and Optimization
- **Target Date**: March 2026
- **Activities**: Performance monitoring, dashboard updates
- **Effort**: 1-2 weeks

## Success Metrics

### Analytics Metrics
- **Event Volume**: Maintain or improve event tracking volume
- **Data Quality**: No loss of granular insights
- **Query Performance**: Faster dashboard loading times
- **Report Accuracy**: Consistent metrics across time periods

### Business Metrics
- **Insight Velocity**: Faster identification of trends
- **Decision Quality**: Better data-driven decisions
- **Stakeholder Satisfaction**: Improved analytics experience
- **Maintenance Cost**: Reduced technical debt

### Technical Metrics
- **Implementation Time**: On-time delivery of approved merges
- **Bug Rate**: Minimal issues during transition
- **Performance Impact**: No degradation in tracking performance
- **Documentation Quality**: Complete migration documentation

## Risk Mitigation

### Rollback Plan
- Maintain separate event tracking during transition period
- Gradual rollout with feature flags
- Ability to revert within 24 hours if issues arise

### Testing Strategy
- Unit tests for event property validation
- Integration tests for Mixpanel configuration
- End-to-end tests for dashboard functionality
- User acceptance testing with stakeholders

### Communication Plan
- Weekly updates during implementation
- Stakeholder demos of merged event dashboards
- Documentation updates for all affected teams
- Training sessions for analytics users

## Decision Review Process

This log will be reviewed quarterly to assess:
- Effectiveness of implemented merges
- New merge opportunities discovered
- Changes in business requirements
- Technical improvements or issues

**Next Review Date**: March 15, 2026