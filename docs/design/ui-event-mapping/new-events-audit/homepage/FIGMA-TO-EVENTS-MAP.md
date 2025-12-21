# Homepage: Figma Design → Events Map

**Figma Node**: 10810:10533  
**Purpose**: Visual guide showing exactly which Figma elements map to which events

---

## Visual Section Map

### 1. Top Bar (Black Strip)
```
Figma: Thin black bar at very top
Text: "Free shipping on all orders over $50"
↓
Event: web_homepage_topbar_notice_view
Property: notice_text: "Free shipping on all orders over $50"
```

### 2. Navigation Bar (White Bar)
```
Figma: White navigation bar below top bar
Elements: Logo | Home | About Us | Products | Blog | Contact | Search Icon | Cart Icon | Profile Icon
↓
Events:
- web_homepage_nav_item_click (for Home, About Us, Products, Blog, Contact)
  Property: nav_item: "Home" | "About Us" | "Products" | "Blog" | "Contact"
- web_homepage_search_icon_click (for Search icon)
- web_homepage_cart_icon_click (for Cart icon)
- web_homepage_profile_icon_click (for Profile icon)
```

### 3. Hero Section (Green Background)
```
Figma: Large green section with headline
Elements:
- Headline: "Medical Cannabis Made easy with DoktorABC"
- Sub-headline: "Find your perfect medical cannabis solution today."
- Button: "Get Started" (large green button)
- 12 Category Icons (grid below button)
- 3 Trust Indicators (below icons)
↓
Events:
- web_homepage_hero_cta_get_started_click (Get Started button)
- web_homepage_hero_category_click (any of 12 category icons)
  Property: category_type: "flower" | "oils" | "vapes" | "edibles" | etc.
- web_homepage_trust_indicator_view (any of 3 trust indicators)
  Property: metric_type: "happy_customers" | "years_trust" | "secure_payments"
```

### 4. How It Works Section
```
Figma: Section with "Your 3 easy steps to get your products"
Elements: 3 step cards with images and buttons
↓
Events:
- web_homepage_how_it_works_step_click (any step button)
  Property: step_number: 1 | 2 | 3
  Property: button_text: "Book an appointment" | "Shop now" | "Learn more"
```

### 5. Trusted Care Section
```
Figma: Section with "Trusted care starts here"
Elements:
- Video banner with play button
- 2 Feature cards (Natural Ingredients, Online Consultations)
↓
Events:
- web_homepage_video_play_click (video play button)
- web_homepage_feature_card_click (feature cards)
  Property: feature_type: "natural_ingredients" | "online_consultations"
```

### 6. Why Choose Us Section (Light Blue)
```
Figma: Section with "Why choose us?"
Elements:
- Main CTA: "Learn more" button
- 4 Benefit icons: Licensed Doctors, Secure Payments, Wide Range, 24/7 Support
↓
Events:
- web_homepage_button_learn_more_click (Learn more button)
  Property: section_name: "why_choose_us"
- web_homepage_why_choose_benefit_click (benefit icons)
  Property: benefit_type: "licensed_doctors" | "secure_payments" | "wide_range_products" | "24_7_support"
```

### 7. Conditions We Treat Section (Blue)
```
Figma: Section with "Bringing people relief from a variety of conditions"
Elements: 4 condition cards with images
↓
Events:
- web_homepage_condition_card_click (any condition card)
  Property: condition_id: "anxiety-stress" | "chronic-pain" | "insomnia" | "depression"
  Property: condition_name: "Anxiety & Stress" | "Chronic Pain" | "Insomnia" | "Depression"
```

### 8. Holistic Wellness Section (Light Green)
```
Figma: Section with "Embrace a holistic approach to wellness"
Elements: 2 wellness cards
↓
Events:
- web_homepage_wellness_card_click (wellness cards)
  Property: wellness_type: "mindfulness-meditation" | "nutrition-diet"
```

### 9. Weight Management Section (Light Beige)
```
Figma: Section with "Start leading a more active and healthy lifestyle"
Elements:
- 2 Plan cards (Personalized Plans, Expert Guidance)
- "Shop now" button
↓
Events:
- web_homepage_weight_management_plan_click (plan cards)
  Property: plan_type: "personalized_plans" | "expert_guidance"
- web_homepage_weight_management_shop_now_click (Shop now button)
```

### 10. Sexual Health Section (Light Beige)
```
Figma: Section with "Rediscover intimacy and confidence"
Elements: 3 solution cards
↓
Events:
- web_homepage_sexual_health_card_click (solution cards)
  Property: condition_id: "erectile-dysfunction" | "premature-ejaculation" | "low-libido"
```

### 11. Women's Health Section (Light Pink)
```
Figma: Section with "Empowering women through every stage of life"
Elements: 2 solution cards
↓
Events:
- web_homepage_womens_health_card_click (solution cards)
  Property: condition_id: "menopause-relief" | "pcos-management"
```

### 12. Men's Health Section (Light Brown)
```
Figma: Section with "Take control of your health and well-being"
Elements: 2 solution cards
↓
Events:
- web_homepage_mens_health_card_click (solution cards)
  Property: condition_id: "hair-loss" | "testosterone-therapy"
```

### 13. Online Pharmacy Section (White & Green)
```
Figma: Section with "Your online pharmacy, ready 24/7"
Elements:
- 6 Feature icons (Easy refills, Wide selection, etc.)
- Product carousel with navigation arrows
↓
Events:
- web_homepage_pharmacy_feature_click (feature icons)
  Property: feature_type: "easy_refills" | "wide_selection" | "discreet_packaging" | etc.
- web_homepage_pharmacy_carousel_navigate_click (carousel arrows)
  Property: carousel_direction: "next" | "prev"
- web_homepage_pharmacy_carousel_item_click (product in carousel)
```

### 14. Medical Advisory Board Section
```
Figma: Section with "Our medical advisory board"
Elements: 3 doctor photos
↓
Events:
- web_homepage_advisory_board_doctor_click (doctor photos)
  Property: doctor_id, doctor_name, doctor_title
```

### 15. Self Pickup Section
```
Figma: Section with "Self Pickup"
Elements: "Find a location" button
↓
Events:
- web_homepage_self_pickup_cta_click (Find a location button)
```

### 16. FAQ Section
```
Figma: Section with "Frequently asked questions"
Elements: Accordion questions (expandable/collapsible)
↓
Events:
- web_homepage_faq_question_toggle (any FAQ question)
  Property: question_id, question_text, action: "expand" | "collapse"
```

### 17. Newsletter Section (Blue & Green)
```
Figma: Section with "Stay in the know"
Elements:
- Email input field
- "Subscribe" button
↓
Events:
- web_homepage_newsletter_email_submit (email form submission)
- web_homepage_newsletter_subscribe_click (Subscribe button)
```

### 18. Footer (Dark Grey)
```
Figma: Dark footer at bottom
Elements:
- Navigation links (Our Clinic, About Us, Products, Blog, Contact Us, FAQ, Terms, Privacy)
- Social media icons (Facebook, Instagram, Twitter, LinkedIn)
↓
Events:
- web_homepage_footer_nav_click (footer navigation links)
  Property: footer_link: "Our Clinic" | "About Us" | "Products" | etc.
- web_homepage_footer_social_click (social media icons)
  Property: social_platform: "facebook" | "instagram" | "twitter" | "linkedin"
```

---

## Quick Lookup: "I see X in Figma, what's the event?"

| What You See in Figma | Event Name | Key Property |
|------------------------|------------|--------------|
| "Get Started" button (green, hero) | `web_homepage_hero_cta_get_started_click` | - |
| Any category icon (12 icons) | `web_homepage_hero_category_click` | `category_type` |
| "Learn more" button (anywhere) | `web_homepage_button_learn_more_click` | `section_name` |
| Condition card (Anxiety, Pain, etc.) | `web_homepage_condition_card_click` | `condition_id` |
| Footer "Privacy Policy" link | `web_homepage_footer_nav_click` | `footer_link: "Privacy Policy"` |
| Facebook icon (footer) | `web_homepage_footer_social_click` | `social_platform: "facebook"` |
| FAQ question (expand/collapse) | `web_homepage_faq_question_toggle` | `question_id`, `action` |
| Step 1 "Book appointment" | `web_homepage_how_it_works_step_click` | `step_number: 1` |

---

## How to Use This Map

1. **In Figma**: Identify which section the element is in
2. **In This Map**: Find that section number (1-18)
3. **Match**: See which event corresponds to that element
4. **Check Properties**: Note the property values that identify the specific element
5. **In Events File**: Open `web.md` and find that event for full details

