# Homepage - Web Events (Concatenated)

**Source**: Figma UI UX Redesign - Node 10810:10533  
**Platform**: Web  
**Date**: 2025-01-27  
**Total Events**: 81 → 35 (after concatenation)

## 🎯 Quick Reference: Viewing with Figma

**To see which Figma element matches each event:**
- Open **[FIGMA-TO-EVENTS-MAP.md](FIGMA-TO-EVENTS-MAP.md)** in this folder
- It shows exactly which Figma sections/elements map to which events

**Figma Link**: `https://www.figma.com/design/IhA4sJGAztWKehQ9hFqRfK/UI-UX-Redesign?node-id=10810-10533`

**Tip**: Keep Figma open on one screen and this file + the map on another screen for easy reference.

## Concatenated Events

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `web_homepage_page_view` | `page_url, referrer, user_agent, viewport_width` | User loads homepage. Pre-events: None. RCA: Traffic source and entry point tracking |
| `web_homepage_topbar_notice_view` | `notice_text, notice_type` | User views top bar notice (shipping, promotion, etc.). Pre-events: Page load. RCA: Awareness of key messaging |
| `web_homepage_nav_item_click` | `nav_item, menu_level, location` | User clicks any navigation item (Home, About, Products, Blog, Contact). Pre-events: Page load. RCA: Navigation pattern tracking |
| `web_homepage_search_icon_click` | `search_location` | User clicks search icon in header. Pre-events: Page load. RCA: Search intent identification |
| `web_homepage_cart_icon_click` | `cart_item_count` | User clicks cart icon in header. Pre-events: Page load. RCA: Shopping cart engagement |
| `web_homepage_profile_icon_click` | `user_logged_in` | User clicks profile/account icon. Pre-events: Page load. RCA: Account access intent |
| `web_homepage_hero_cta_get_started_click` | `button_location, button_text, section` | User clicks primary CTA "Get Started" in hero section. Pre-events: Page load. RCA: Main conversion funnel entry point |
| `web_homepage_hero_category_click` | `category_type, icon_position` | User clicks any category icon in hero grid (Flower, Oils, Vapes, Edibles, etc.). Pre-events: Page load. RCA: Product category interest |
| `web_homepage_trust_indicator_view` | `metric_type, metric_value` | User views trust indicator (Happy Customers, Years of Trust, Secure Payments). Pre-events: Page load. RCA: Social proof visibility |
| `web_homepage_how_it_works_step_click` | `step_number, step_title, button_text, action_type` | User clicks button in any How It Works step (Book appointment, Shop now, Learn more). Pre-events: Scroll to section. RCA: Process engagement tracking |
| `web_homepage_video_play_click` | `video_type, video_location` | User clicks play button on video banner. Pre-events: Scroll to section. RCA: Brand content engagement |
| `web_homepage_feature_card_click` | `feature_type, button_text, section` | User clicks feature card (Natural Ingredients, Online Consultations, etc.). Pre-events: Scroll to section. RCA: Feature interest tracking |
| `web_homepage_button_learn_more_click` | `section_name, button_location` | User clicks "Learn more" button in any section. Pre-events: Scroll to section. RCA: Content engagement and information seeking |
| `web_homepage_why_choose_benefit_click` | `benefit_type` | User clicks benefit icon (Licensed Doctors, Secure Payments, Wide Range, 24/7 Support). Pre-events: Scroll to section. RCA: Value proposition engagement |
| `web_homepage_condition_card_click` | `condition_id, condition_name, button_text` | User clicks condition card (Anxiety, Chronic Pain, Insomnia, Depression). Pre-events: Scroll to section. RCA: Condition-specific interest tracking |
| `web_homepage_wellness_card_click` | `wellness_type, button_text` | User clicks wellness card (Mindfulness & Meditation, Nutrition & Diet). Pre-events: Scroll to section. RCA: Holistic approach interest |
| `web_homepage_weight_management_plan_click` | `plan_type, button_text` | User clicks weight management plan card (Personalized Plans, Expert Guidance). Pre-events: Scroll to section. RCA: Program interest tracking |
| `web_homepage_weight_management_shop_now_click` | `section, button_text` | User clicks "Shop now" in weight management section. Pre-events: Scroll to section. RCA: Product purchase intent |
| `web_homepage_sexual_health_card_click` | `condition_id, condition_name, button_text` | User clicks sexual health solution card (ED, Premature Ejaculation, Low Libido). Pre-events: Scroll to section. RCA: Sexual health interest tracking |
| `web_homepage_womens_health_card_click` | `condition_id, condition_name, button_text` | User clicks women's health solution card (Menopause Relief, PCOS Management). Pre-events: Scroll to section. RCA: Women's health interest tracking |
| `web_homepage_mens_health_card_click` | `condition_id, condition_name, button_text` | User clicks men's health solution card (Hair Loss, Testosterone Therapy). Pre-events: Scroll to section. RCA: Men's health interest tracking |
| `web_homepage_pharmacy_feature_click` | `feature_type, metric_value` | User clicks pharmacy feature icon (Easy Refills, Wide Selection, Discreet Packaging, Conditions Treated, Licensed Pharmacists, Free Delivery). Pre-events: Scroll to section. RCA: Pharmacy service interest |
| `web_homepage_pharmacy_carousel_navigate_click` | `carousel_direction, current_position` | User clicks carousel navigation (next/prev). Pre-events: Scroll to section. RCA: Product browsing engagement |
| `web_homepage_pharmacy_carousel_item_click` | `product_id, product_name, product_type` | User clicks on a product in the carousel. Pre-events: Scroll to section. RCA: Product-specific interest |
| `web_homepage_advisory_board_doctor_click` | `doctor_id, doctor_name, doctor_title` | User clicks on a medical advisory board member photo. Pre-events: Scroll to section. RCA: Credibility engagement |
| `web_homepage_self_pickup_cta_click` | `button_text, section` | User clicks "Find a location" button in Self Pickup section. Pre-events: Scroll to section. RCA: Delivery method preference |
| `web_homepage_faq_question_toggle` | `question_id, question_text, action, section` | User expands or collapses FAQ accordion question. Pre-events: Scroll to section. RCA: Information-seeking behavior |
| `web_homepage_newsletter_email_submit` | `email, discount_code, section` | User submits email in newsletter signup form. Pre-events: Scroll to section. RCA: Lead generation and email list growth |
| `web_homepage_newsletter_subscribe_click` | `button_text, section` | User clicks Subscribe button. Pre-events: Email entered. RCA: Newsletter conversion tracking |
| `web_homepage_footer_nav_click` | `footer_link, section` | User clicks footer navigation link (Our Clinic, About Us, Products, Blog, Contact Us, FAQ, Terms & Conditions, Privacy Policy). Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_social_click` | `social_platform, section` | User clicks social media icon (Facebook, Instagram, Twitter, LinkedIn). Pre-events: Scroll to footer. RCA: Social media engagement |
| `web_homepage_payment_icon_click` | `payment_method, location` | User clicks payment method icon (Visa, Mastercard, PayPal, Apple Pay, Google Pay). Pre-events: Scroll to section. RCA: Payment method interest |
| `web_homepage_scroll_section_view` | `section_name, scroll_depth_percent, time_on_page_ms` | User scrolls to view a specific section. Pre-events: Page load. RCA: Content engagement depth, section performance |

## Concatenation Summary

| Original Events | Concatenated To | Reduction |
|-----------------|-----------------|-----------|
| 5 nav clicks (Home, About, Products, Blog, Contact) | `web_homepage_nav_item_click` | 5 → 1 |
| 12 category icon clicks | `web_homepage_hero_category_click` | 12 → 1 |
| 3 trust indicator views | `web_homepage_trust_indicator_view` | 3 → 1 |
| 3 how it works step clicks | `web_homepage_how_it_works_step_click` | 3 → 1 |
| 2 feature card clicks | `web_homepage_feature_card_click` | 2 → 1 |
| 4 condition card clicks | `web_homepage_condition_card_click` | 4 → 1 |
| 2 wellness card clicks | `web_homepage_wellness_card_click` | 2 → 1 |
| 2 weight management plan clicks | `web_homepage_weight_management_plan_click` | 2 → 1 |
| 3 sexual health card clicks | `web_homepage_sexual_health_card_click` | 3 → 1 |
| 2 women's health card clicks | `web_homepage_womens_health_card_click` | 2 → 1 |
| 2 men's health card clicks | `web_homepage_mens_health_card_click` | 2 → 1 |
| 6 pharmacy feature clicks | `web_homepage_pharmacy_feature_click` | 6 → 1 |
| 2 carousel navigation clicks | `web_homepage_pharmacy_carousel_navigate_click` | 2 → 1 |
| 4 why choose benefit clicks | `web_homepage_why_choose_benefit_click` | 4 → 1 |
| 2 FAQ actions (expand/collapse) | `web_homepage_faq_question_toggle` | 2 → 1 |
| 8 footer nav clicks | `web_homepage_footer_nav_click` | 8 → 1 |
| 4 social icon clicks | `web_homepage_footer_social_click` | 4 → 1 |
| 5 payment icon clicks | `web_homepage_payment_icon_click` | 5 → 1 |

**Total Reduction**: 81 events → 35 events (57% reduction)

## Notes

- All concatenated events maintain full tracking granularity through properties
- Event names follow consistent pattern: `web_homepage_{element}_{action}`
- Properties capture all necessary context for analysis
- RCA and pre-events documented for each event type

