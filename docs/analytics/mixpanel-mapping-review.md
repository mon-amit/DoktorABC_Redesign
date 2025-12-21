# Mixpanel Event Mapping - Manual Review Guide

## Overview

This document lists all event mappings that require manual review before implementation. These mappings have confidence scores below 90% and should be verified by a human analyst to ensure accuracy.

**Generated**: $(date)
**Total Mappings Requiring Review**: {{total_review_mappings}}
**High Priority Reviews**: {{high_priority_reviews}}

---

## Review Criteria

### Decision Matrix

| Decision | Description | Action Required |
|----------|-------------|----------------|
| **✅ Use Existing** | Mapping is correct, use the proposed Mixpanel event | No changes needed |
| **❌ Create New** | CSV event is unique, create new Mixpanel event | Add to new events list |
| **🔄 Merge** | Multiple CSV events should map to one Mixpanel event | Update mapping configuration |
| **⚡ Split** | One CSV event should map to multiple Mixpanel events | Split into separate mappings |

### Review Priority

1. **High Priority** (>80% confidence): Quick verification, likely correct
2. **Medium Priority** (70-79% confidence): Careful review needed
3. **Low Priority** (<70% confidence): Requires detailed analysis

---

## Mappings Requiring Review

{{review_mappings_section}}

---

## Implementation Instructions

### For Each Mapping:

1. **Read the CSV event name and properties**
2. **Review the proposed Mixpanel event match**
3. **Check the confidence score and match source**
4. **Verify business logic alignment**
5. **Make decision using the matrix above**

### After Review:

1. **Update the mapping configuration** in `event-tracking-config.json`
2. **Add new events** to Mixpanel if required
3. **Document any changes** in the implementation notes
4. **Re-run validation tests** to ensure consistency

---

## New Events to Create

If you decide to create new Mixpanel events, add them here:

```javascript
// Template for new event definition
{
  "event_name": "new_event_name",
  "description": "Description of when this event fires",
  "properties": ["property1", "property2", "property3"],
  "required": ["property1"]
}
```

**New Events Identified:**
- [ ] None yet

---

## Common Issues to Watch For

### 1. Platform Mismatches
- CSV event: `web_page_action`
- Mixpanel event: `mobile_page_action`
- **Issue**: Different platforms, should be separate events

### 2. Action Type Confusion
- CSV event: `page_view`
- Mixpanel event: `page_viewed`
- **Issue**: Different action semantics

### 3. Property Schema Mismatches
- CSV properties: `product_id, quantity`
- Mixpanel properties: `item_id, amount`
- **Issue**: Different property semantics

### 4. Context Differences
- CSV event: `checkout_payment`
- Mixpanel event: `payment_completed`
- **Issue**: Different business context

---

## Review Checklist

- [ ] All mappings reviewed
- [ ] Decisions documented
- [ ] New events created if needed
- [ ] Configuration updated
- [ ] Tests pass
- [ ] Documentation updated

---

## Review Notes

*Add your review notes and decisions here:*

| Mapping | Decision | Reason | Action Taken |
|---------|----------|--------|--------------|
| `csv_event_name` | ✅ Use Existing / ❌ Create New / 🔄 Merge / ⚡ Split | Brief explanation | What was done |

---

**Reviewer**: ________________________
**Date**: ________________________
**Status**: ⏳ In Review / ✅ Completed / ❌ Needs Re-review
