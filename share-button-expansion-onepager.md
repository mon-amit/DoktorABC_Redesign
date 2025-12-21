# Share Button Expansion to High-Intent Moments

**🔍 Investigating** · **Priority:** High · **Status:** Investigating · **Requested by:** David B. · **Added:** 17/12/2025 · **Owner:** Dean Gabay

---

## Overview

**What:** Expand the existing Share Button (launched Dec 9, 2025 on product pages) to additional touchpoints across the platform to drive organic, incentive-free sharing.

**Why:** Leverage word-of-mouth marketing by making it easy for users to share products/carts with friends and family—without relying on referral incentives.

**Key Question:** How do we drive users to share with no incentive beyond their own motivation?

---

## Expected Impact (Targets to Validate)

| Metric | Target | Source |
|--------|--------|---------|
| **EUR 0** | Per-Acquisition Incentive Cost | no "Give X, Get X" payouts required |
| **2-3x** | Higher Conversion Expected | warm leads from trusted recommendations |
| **5** | New Placements (Prioritized) | P1: OTC Carousel, P2: OTC Pages, P3: Thank You |

---

## Target Areas for Expansion (Priority Order)

| Priority | Area | Current State | Proposed Placement | Notes |
|----------|------|---------------|-------------------|-------|
| **1** | **OTC Carousel** | ❌ Not present | Product carousels | Highest visibility, users browsing multiple products |
| **2** | **OTC Product Pages** | ✅ Live | Individual product pages | Already live—refresh messaging and tracking as priority P2 |
| **3** | **Thank You Pages** | ❌ Not present | Post-payment confirmation | High-intent moment, user just converted. Post-payment only! |
| **4** | **CRM Emails** | ❌ Not present | Order confirmation + Post-delivery | Lower priority - requires email team coordination |
| **5** | **Cart Share (Influencers)** | ❌ Not present | Cart page "Share your cart" | Last priority - niche use case, evaluate after core rollout |
| ✅ | **CMS Product Pages** | ✅ Live | Keep as is | Already implemented by Dean (Dec 9, 2025) |

---

## Persona Analysis

### 👤 FTB (First Time Buyers)
**Motivation:** Want to compare prices, seek assistance from friends/family on choices  
**Behavior:** Still deciding, may need validation before purchase  

**Placement Strategy:**
- ⚠️ **Don't interrupt the funnel** — we don't want to hard-stop them or make them leave
- ✅ Place in **Thank You page** (post-payment) when they've already converted
- ✅ Post-purchase confirmation emails

### 👤 RP (Repeat Purchasers)
**Motivation:** Already trust the platform, may want to recommend to others  
**Behavior:** Familiar with products, likely to share positive experiences  

**Placement Strategy:**
- ✅ Order history / reorder pages
- ✅ Post-delivery follow-up emails
- ✅ Product pages they browse

### 👤 Influencer-types
**Motivation:** Want to share their full cart to show how they're profiting/what they use  
**Behavior:** Active sharers, want visibility and social proof  

**Placement Strategy:**
- ✅ **Cart page** — "Share your cart" feature
- ✅ Order confirmation with full cart summary
- ✅ Account/profile area

---

## Success Metrics

### Feature-Level Metrics (Share Button Performance)

| Metric | Definition | Target | How to Measure |
|--------|------------|--------|----------------|
| **Share Click Rate** | Clicks / Impressions per placement | 2-5% | Mixpanel: `Button Share Clicked` / page views |
| **Share Completion Rate** | Actual shares / Clicks | 60%+ | Native share API callback |
| **Platform Mix** | % by WhatsApp, Email, Copy Link, etc. | Track | Mixpanel property: `share_platform` |
| **Top Performing Placement** | Highest click rate location | Identify | Compare by `share_location` property |
| **Message Engagement** | Do recipients click the link? | 10%+ CTR | UTM: `utm_source=share_button` |

### Company-Wide Metrics (Business Impact)

| Metric | Definition | Target | How to Measure |
|--------|------------|--------|----------------|
| **Referral Traffic** | Sessions from shared links | 16%* MoM | GA/Mixpanel: `utm_source=share_button` |
| **Referred User Conversion** | Orders from shared links / Visits | 3%+ | Funnel: share UTM → purchase |
| **Revenue from Shares** | € from referred conversions | Track | Attribution: share UTM → order value |
| **CAC Impact** | Cost per acquired user via shares | €0 (organic) | Compare to paid CAC |
| **Viral Coefficient** | New users generated per share | 0.1+ | Shares → New signups |
| **NPS Correlation** | Do sharers have higher NPS? | Track | Survey segment |

### Guardrail Metrics (Don't Break These)

| Metric | Concern | Threshold |
|--------|---------|-----------|
| **Funnel Conversion Rate** | Share button distracts users | No change from baseline |
| **Time to Purchase** | Share adds friction | No increase |
| **Bounce Rate** | Users leave to share, don't return | No increase |

---

## Context-Aware Message Templates

Different placements = different user intent. Messages should match context:

| Context | Message Template | Why |
|---------|------------------|-----|
| **Product Page** (browsing) | "Check out this product on DoktorABC!" | Generic discovery |
| **Thank You** (post-purchase) | "I just ordered from DoktorABC — you might like it too!" | Social proof, excitement |
| **OTC Pickup/Shipping** | "Can you pick up my order? Here are the details:" | Practical coordination |
| **Cart Share** (influencers) | "Here's what I'm getting from DoktorABC:" | Show full cart |

---

## Unique Value Proposition

### Why Share Without Incentives?

Most platforms rely on referral programs ("Give €10, Get €10"). We're betting on **organic sharing** driven by:

| User Need | How Share Button Helps | vs. Referral Programs |
|-----------|-------------------------|----------------------|
| **Compare prices** | FTB shares with friend/family to get opinion | No discount needed — just seeking advice |
| **Coordinate logistics** | "Pick up my order" — practical utility | Solves real problem, not incentive-driven |
| **Social proof** | RP shares after positive experience | Authentic recommendation > paid referral |
| **Flex/influence** | Influencers show cart to followers | Brand exposure without affiliate cost |

### The Core Insight

> **People share when it solves a problem or makes them look good — not just for discounts.**

**Our UVP:** A frictionless, context-aware share experience that meets users where they are, with the right message for the right moment.

**Differentiators:**
- 🎯 **Context-aware messaging** — not one-size-fits-all
- 📱 **Native mobile experience** — feels like system share, not clunky widget
- 🚫 **No funnel interruption** — only post-purchase to protect conversion
- 📦 **Practical utility** — pickup coordination is a real use case competitors don't address

---

## Rollout Plan (2 Days) - Priority Order

### Day 1: Implementation (Priority 1-3)
- **P1:** Launch share in OTC carousels (highest visibility)
- **P2:** Refresh share messaging on OTC product pages
- **P3:** Add share to Thank You pages (post-payment)
- Implement context-aware message templates
- Add Mixpanel tracking with location/platform properties
- Fix known issue: `<h3>` to `<span>` markup

### Day 2: Testing & Launch
- QA across all placements (OTC carousel, OTC pages, Thank You)
- Test message templates per context
- Verify tracking events fire correctly
- Deploy to production
- Monitor for funnel impact (guardrail check)

**Later:** CRM emails (P4) and Cart share for influencers (P5) can be added in follow-up sprints after core rollout.

**Note on Referral Traffic:** *May fluctuate downward early in the rollout; we will monitor weekly to confirm rebound.

---

## Current Implementation (Already Live)

**Status:** Share button live on product pages since Dec 9, 2025

**Features:**
- **Mobile:** Native OS share sheet (`navigator.share` API)
- **Desktop:** Custom modal (Facebook, WhatsApp, X, Reddit, Email, Copy Link)
- **UTM tracking:** `?utm_source=share_button`
- **Mixpanel events:** `Share Page Loaded`, `Button Share Clicked`
- **Open Graph meta tags** for link previews (product name, DoktorABC logo)

**Scope:** RX, OTC, and Cannabis product pages in all countries

---

## Decision Requested

Approve Phase 1-2 to begin: baseline metrics collection, message template finalization, and Thank You page implementation with A/B testing and tracking.

---

## Links & References

- **Jira:** [Feature: Add Social Share Button to Product Pages (Mobile Native + Desktop Custom)](https://www.notion.so/Feature-Add-Social-Share-Button-to-Product-Pages-Mobile-Native-Desktop-Custom-2ca8129f8dbd817bb39af173862f145a?pvs=21)
- **Figma:** [Proto – Share Button Experience](https://www.figma.com/proto/IhA4sJGAztWKehQ9hFqRfK/UI-UX-Redesign?node-id=9766-26556&t=tVrFD9nqZ1LKV8mB-1)
- **Confluence PRD:** [Share Button Expansion Strategy Implementation Plan](https://doktorabc.atlassian.net/wiki/spaces/~7120209ec1fadd43394b5d8cebb1d220ce2353/pages/2051145736/Share+Button+Expansion+Strategy+Implementation+Plan+Pending+review?%2Fwiki%2Fspaces%2F%7E7120209ec1fadd43394b5d8cebb1d220ce2353%2Fpages%2F2051145736%2FShare+Button+Expansion+Strategy+Implementation+Plan+Pending+review=&rovoChatPathway=chat&rovoChatConversationId=73b7960f-694f-493d-9290-e608915fe470)
- **Slack:** #general (launch announcement Dec 9), #doktorabc_redesign-kickoff, #cms-redesign-project
- **Analytics:** Mixpanel - events `Share Page Loaded`, `Button Share Clicked`
- **Test tool:** [OpenGraph.xyz](http://OpenGraph.xyz) - test link preview appearance

---

## Investigation Notes

- Share button launched on product pages Dec 9, 2025 by Dean
- David requested finding more areas to add share functionality
- Dean's Slack context: popup designed for RX and Cannabis product screens with sharing options and "copy link" action
- Known issue: "Share" wrapped in `<h3>` tag twice - needs fix to `<span>` (reported by Oleksandr)
- Consider A/B testing different placements
- Track which personas share most and from where
- Check Confluence for page architecture details

---

## Next Steps

- [ ] Review Confluence for page architecture and share placement docs
- [ ] Map all potential placement points per area
- [ ] Define placement priority per persona
- [ ] Research competitor share button implementations
- [ ] Draft placement proposal with mockups
- [ ] Calculate RICE score - no need its ready
- [ ] Present to team for feedback

---

*Last updated: 17/12/2025*