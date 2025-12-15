# Sample TRIGGER Column Formats

This document shows the proper format for TRIGGER column descriptions in the review tables.

## Required Format

Each TRIGGER description must include **both** RCA and Pre-events:

```
RCA: [Root Cause Analysis - why this event matters]. Pre-events: [What led to this trigger]
```

## Good Examples

### Conversion Events
```
RCA: Primary revenue-generating action tracking. Pre-events: Product view, price comparison, variant selection
```

### Engagement Events
```
RCA: Content consumption depth and information seeking behavior. Pre-events: Page load, scroll engagement, CTA visibility
```

### Compliance Events
```
RCA: Legal requirement fulfillment and user consent tracking. Pre-events: Page access, age verification requirement
```

### Navigation Events
```
RCA: Information architecture effectiveness and user journey optimization. Pre-events: Current page context, navigation menu interaction
```

## Bad Examples (Don't Use)

### Missing RCA
```
Product browsing intent. Pre-events: Page load
```

### Missing Pre-events
```
RCA: User engagement tracking
```

### Too Vague
```
RCA: Important event. Pre-events: User action
```

### No Structure
```
This tracks when users click the button after seeing the page
```

## Real Examples from Current Tables

### Homepage CTA
```
RCA: Main conversion funnel entry point. Pre-events: Page load
```

### Product Add to Cart
```
RCA: Primary conversion action tracking. Pre-events: Product view, variant selection
```

### Search Submit
```
RCA: Search performance and result quality metrics. Pre-events: Search input
```

### Category Filter
```
RCA: Product discovery efficiency and user intent refinement. Pre-events: Category view, initial results display
```

## TRIGGER Analysis Framework

When writing TRIGGER descriptions, consider:

1. **RCA (Root Cause Analysis)**:
   - Business impact: revenue, engagement, compliance, performance
   - User behavior insight: what does this tell us about user intent?
   - Optimization opportunity: what can we improve based on this event?

2. **Pre-events (Trigger Context)**:
   - User journey stage: where in the funnel is this event?
   - Required conditions: what must happen before this event can fire?
   - Technical triggers: page load, user interaction, time-based, etc.

## Validation Checklist

✅ **Includes "RCA:" prefix**
✅ **Includes "Pre-events:" section**
✅ **RCA explains business value/insights**
✅ **Pre-events describe trigger conditions**
✅ **Clear, specific language**
✅ **No vague terms like "important" or "good"**

## Template

Use this template for new TRIGGER descriptions:

```
RCA: [Specific business impact or user insight this event provides]. Pre-events: [Exact conditions that must be met before this event can trigger]
```