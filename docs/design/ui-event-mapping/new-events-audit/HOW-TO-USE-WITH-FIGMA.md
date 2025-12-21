# How to Use Events Audit with Figma - Visual Guide

**Purpose**: This guide explains how to view the events audit side-by-side with Figma design to understand which events track which design elements.

---

## Quick Start: Viewing Events with Figma

### Step 1: Open Figma Design
1. Open the Figma file: `https://www.figma.com/design/IhA4sJGAztWKehQ9hFqRfK/UI-UX-Redesign`
2. Navigate to the Homepage frame (Node ID: 10810:10533)

### Step 2: Open Events Audit
1. Open: `docs/design/ui-event-mapping/new-events-audit/homepage/web.md`
2. Keep both windows side-by-side

### Step 3: Match Elements to Events

**Example**: Finding the "Get Started" button event

1. **In Figma**: Click on the "Get Started" button in the hero section
2. **In Figma**: Check the layer name or node ID (if visible in properties panel)
3. **In Events Audit**: Look for `web_homepage_hero_cta_get_started_click`
4. **Match**: The event description says "User clicks primary CTA 'Get Started' in hero section"

---

## Visual Mapping: Figma Sections → Events

### Hero Section (Top of Page)

**In Figma**: Look for the large green section with "Get Started" button

| Figma Element | Event Name | How to Find in Figma |
|---------------|------------|---------------------|
| "Get Started" button | `web_homepage_hero_cta_get_started_click` | Large green button in hero |
| Category icons (12 icons) | `web_homepage_hero_category_click` | Grid of 12 small icons below hero |
| Trust indicators | `web_homepage_trust_indicator_view` | "500+ Happy Customers", "5 Years", "100% Secure" |

### Navigation Bar (Top)

**In Figma**: Look for the white navigation bar at the top

| Figma Element | Event Name | How to Find in Figma |
|---------------|------------|---------------------|
| "Home" link | `web_homepage_nav_item_click` (nav_item: "Home") | First nav link |
| "About Us" link | `web_homepage_nav_item_click` (nav_item: "About Us") | Second nav link |
| "Products" link | `web_homepage_nav_item_click` (nav_item: "Products") | Third nav link |
| Search icon | `web_homepage_search_icon_click` | Magnifying glass icon |
| Cart icon | `web_homepage_cart_icon_click` | Shopping cart icon |
| Profile icon | `web_homepage_profile_icon_click` | User/profile icon |

### How It Works Section

**In Figma**: Look for "Your 3 easy steps to get your products" section

| Figma Element | Event Name | How to Find in Figma |
|---------------|------------|---------------------|
| Step 1 "Book appointment" | `web_homepage_how_it_works_step_click` (step_number: 1) | First step card |
| Step 2 "Shop now" | `web_homepage_how_it_works_step_click` (step_number: 2) | Second step card |
| Step 3 "Learn more" | `web_homepage_how_it_works_step_click` (step_number: 3) | Third step card |

### Conditions We Treat Section

**In Figma**: Look for "Bringing people relief from a variety of conditions"

| Figma Element | Event Name | How to Find in Figma |
|---------------|------------|---------------------|
| Anxiety & Stress card | `web_homepage_condition_card_click` (condition_id: "anxiety-stress") | First condition card |
| Chronic Pain card | `web_homepage_condition_card_click` (condition_id: "chronic-pain") | Second condition card |
| Insomnia card | `web_homepage_condition_card_click` (condition_id: "insomnia") | Third condition card |
| Depression card | `web_homepage_condition_card_click` (condition_id: "depression") | Fourth condition card |

### Footer Section (Bottom)

**In Figma**: Scroll to bottom, look for dark footer with links

| Figma Element | Event Name | How to Find in Figma |
|---------------|------------|---------------------|
| Footer "About Us" link | `web_homepage_footer_nav_click` (footer_link: "About Us") | Footer navigation column |
| Footer "Privacy Policy" link | `web_homepage_footer_nav_click` (footer_link: "Privacy Policy") | Footer legal links |
| Facebook icon | `web_homepage_footer_social_click` (social_platform: "facebook") | Social media icons |

---

## Event Organization by Visual Section

The events in `homepage/web.md` are organized by **visual sections** you see in Figma:

1. **Top Bar & Header** - Top navigation and icons
2. **Hero Section** - Main banner with CTA
3. **How It Works** - 3-step process
4. **Trusted Care** - Video and features
5. **Why Choose Us** - Benefits section
6. **Conditions We Treat** - Condition cards
7. **Wellness** - Holistic approach cards
8. **Weight Management** - Weight loss section
9. **Sexual Health** - Sexual health cards
10. **Women's Health** - Women's health cards
11. **Men's Health** - Men's health cards
12. **Online Pharmacy** - Pharmacy features
13. **Medical Advisory Board** - Doctor profiles
14. **Self Pickup** - Pickup option
15. **FAQ** - Accordion questions
16. **Newsletter** - Email signup
17. **Footer** - Footer links and social icons

---

## How to Find an Event for a Specific Element

### Method 1: By Section Name
1. Identify which **section** the element is in (Hero, Footer, etc.)
2. Open `homepage/web.md`
3. Scroll to that section in the event table
4. Find the event that matches the element type (button, card, link)

### Method 2: By Element Text
1. Note the **exact text** on the button/link (e.g., "Get Started", "Learn more")
2. Search in `homepage/web.md` for that text
3. Find the matching event

### Method 3: By Element Type
1. Identify the **element type** (button, card, icon, link)
2. Look for events ending in that type:
   - Buttons → `*_click`
   - Cards → `*_card_click`
   - Icons → `*_icon_click`
   - Links → `*_nav_click` or `*_link_click`

---

## Understanding Concatenated Events

Some events are **concatenated** (combined) to reduce complexity:

### Example: Navigation Links
**Instead of**:
- `web_homepage_nav_home_click`
- `web_homepage_nav_about_click`
- `web_homepage_nav_products_click`

**We have**:
- `web_homepage_nav_item_click` with property `nav_item: "Home"` or `"About Us"` or `"Products"`

**In Figma**: All navigation links use the **same event**, but the `nav_item` property tells you which one was clicked.

---

## Quick Reference: Event → Figma Location

| Event Pattern | Figma Location | Example |
|---------------|----------------|---------|
| `*_nav_item_click` | Top navigation bar | Home, About, Products links |
| `*_hero_*_click` | Hero section (top banner) | Get Started button, category icons |
| `*_condition_card_click` | Conditions We Treat section | Anxiety, Chronic Pain cards |
| `*_footer_*_click` | Footer (bottom of page) | Footer links, social icons |
| `*_how_it_works_*_click` | How It Works section | Step 1, 2, 3 buttons |
| `*_learn_more_click` | Multiple sections | Any "Learn more" button |
| `*_category_click` | Hero section | Category icons grid |

---

## Tips for Side-by-Side Viewing

1. **Split Screen**: 
   - Left: Figma design
   - Right: Events audit markdown file

2. **Use Browser DevTools** (if viewing Figma in browser):
   - Right-click element → Inspect
   - Check element classes/IDs
   - Match to event descriptions

3. **Search in Events File**:
   - Use Cmd+F (Mac) or Ctrl+F (Windows)
   - Search for button text or section name
   - Find matching event

4. **Check Event Properties**:
   - Each event has properties that identify the specific element
   - Example: `condition_id: "anxiety-stress"` tells you it's the Anxiety card

---

## Still Confused?

If you can't find an event for a specific Figma element:

1. **Note the element**: What section is it in? What does it say?
2. **Check the section**: Look in `homepage/web.md` under that section
3. **Check if concatenated**: It might be part of a combined event (like all "Learn more" buttons)
4. **Check properties**: The event might use a property to distinguish it (like `condition_id`)

---

## Next Steps

When you scan the next page (Category, Product, etc.):
1. The same structure will be used
2. Events will be organized by visual sections
3. You can use this same method to match events to Figma elements

