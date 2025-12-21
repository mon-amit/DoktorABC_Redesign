# Homepage New Design - Complete Event Mapping

**Source**: Figma UI UX Redesign - Node 10810:10533  
**Design Review Date**: 2025-01-27  
**Platform**: Web (Desktop)  
**Page Type**: Homepage (New Redesign)

---

## Event Mapping Table

| Event Name | Properties | Short Description of TRIGGER |
|------------|------------|------------------------------|
| `web_homepage_topbar_shipping_notice_view` | `notice_text: "Free shipping on all orders over $50"` | User views top bar shipping notice. Pre-events: Page load. RCA: Awareness of shipping threshold |
| `web_homepage_nav_home_click` | `nav_item: "Home"`, `menu_level: "main"` | User clicks Home in navigation. Pre-events: Page load. RCA: Navigation pattern tracking |
| `web_homepage_nav_about_click` | `nav_item: "About Us"`, `menu_level: "main"` | User clicks About Us navigation. Pre-events: Page load. RCA: Brand trust engagement |
| `web_homepage_nav_products_click` | `nav_item: "Products"`, `menu_level: "main"` | User clicks Products navigation. Pre-events: Page load. RCA: Product browsing intent |
| `web_homepage_nav_blog_click` | `nav_item: "Blog"`, `menu_level: "main"` | User clicks Blog navigation. Pre-events: Page load. RCA: Content marketing engagement |
| `web_homepage_nav_contact_click` | `nav_item: "Contact"`, `menu_level: "main"` | User clicks Contact navigation. Pre-events: Page load. RCA: Support intent tracking |
| `web_homepage_search_icon_click` | `search_location: "header"` | User clicks search icon in header. Pre-events: Page load. RCA: Search intent identification |
| `web_homepage_cart_icon_click` | `cart_item_count` | User clicks cart icon in header. Pre-events: Page load. RCA: Shopping cart engagement |
| `web_homepage_profile_icon_click` | `user_logged_in: boolean` | User clicks profile/account icon. Pre-events: Page load. RCA: Account access intent |
| `web_homepage_hero_cta_get_started_click` | `button_location: "hero"`, `button_text: "Get Started"`, `section: "hero"` | User clicks primary CTA "Get Started" in hero section. Pre-events: Page load. RCA: Main conversion funnel entry point |
| `web_homepage_hero_category_flower_click` | `category_type: "flower"`, `icon_position: 1` | User clicks Flower category icon in hero grid. Pre-events: Page load. RCA: Product category interest |
| `web_homepage_hero_category_oils_click` | `category_type: "oils"`, `icon_position: 2` | User clicks Oils category icon. Pre-events: Page load. RCA: Product category interest |
| `web_homepage_hero_category_vapes_click` | `category_type: "vapes"`, `icon_position: 3` | User clicks Vapes category icon. Pre-events: Page load. RCA: Product category interest |
| `web_homepage_hero_category_edibles_click` | `category_type: "edibles"`, `icon_position: 4` | User clicks Edibles category icon. Pre-events: Page load. RCA: Product category interest |
| `web_homepage_hero_category_click` | `category_type`, `icon_position` | User clicks any category icon in hero grid (generic for remaining 8 icons). Pre-events: Page load. RCA: Product category discovery |
| `web_homepage_trust_indicator_customers_view` | `metric_type: "happy_customers"`, `metric_value: "500+"` | User views "500+ Happy Customers" trust indicator. Pre-events: Page load. RCA: Social proof visibility |
| `web_homepage_trust_indicator_years_view` | `metric_type: "years_trust"`, `metric_value: "5"` | User views "5 Years of Trust" indicator. Pre-events: Page load. RCA: Brand credibility tracking |
| `web_homepage_trust_indicator_secure_view` | `metric_type: "secure_payments"`, `metric_value: "100%"` | User views "100% Secure Payments" indicator. Pre-events: Page load. RCA: Trust signal engagement |
| `web_homepage_how_it_works_step1_click` | `step_number: 1`, `step_title: "Get Your Prescription"`, `button_text: "Book an appointment"` | User clicks "Book an appointment" button in Step 1. Pre-events: Scroll to section. RCA: Consultation booking intent |
| `web_homepage_how_it_works_step2_click` | `step_number: 2`, `step_title: "Choose Your Products"`, `button_text: "Shop now"` | User clicks "Shop now" button in Step 2. Pre-events: Scroll to section. RCA: Product browsing conversion |
| `web_homepage_how_it_works_step3_click` | `step_number: 3`, `step_title: "Get Your Delivery"`, `button_text: "Learn more"` | User clicks "Learn more" button in Step 3. Pre-events: Scroll to section. RCA: Delivery information interest |
| `web_homepage_trusted_care_video_play_click` | `video_type: "brand_intro"`, `video_location: "trusted_care_section"` | User clicks play button on video banner. Pre-events: Scroll to section. RCA: Brand content engagement |
| `web_homepage_feature_natural_ingredients_click` | `feature_type: "natural_ingredients"`, `button_text: "Learn more"` | User clicks natural ingredients feature card. Pre-events: Scroll to section. RCA: Product quality interest |
| `web_homepage_feature_online_consultations_click` | `feature_type: "online_consultations"`, `button_text: "Learn more"` | User clicks online consultations feature card. Pre-events: Scroll to section. RCA: Service interest |
| `web_homepage_why_choose_cta_learn_more_click` | `button_location: "why_choose_us"`, `button_text: "Learn more"` | User clicks "Learn more" CTA in Why Choose Us section. Pre-events: Scroll to section. RCA: Value proposition engagement |
| `web_homepage_why_choose_benefit_licensed_doctors_click` | `benefit_type: "licensed_doctors"` | User clicks Licensed Doctors benefit icon. Pre-events: Scroll to section. RCA: Trust factor engagement |
| `web_homepage_why_choose_benefit_secure_payments_click` | `benefit_type: "secure_payments"` | User clicks Secure Payments benefit icon. Pre-events: Scroll to section. RCA: Security concern tracking |
| `web_homepage_why_choose_benefit_wide_range_click` | `benefit_type: "wide_range_products"` | User clicks Wide Range of Products benefit icon. Pre-events: Scroll to section. RCA: Product selection interest |
| `web_homepage_why_choose_benefit_support_click` | `benefit_type: "24_7_support"` | User clicks 24/7 Support benefit icon. Pre-events: Scroll to section. RCA: Support need identification |
| `web_homepage_conditions_anxiety_click` | `condition_id: "anxiety-stress"`, `condition_name: "Anxiety & Stress"`, `button_text: "Learn more"` | User clicks Anxiety & Stress condition card. Pre-events: Scroll to section. RCA: Condition-specific interest tracking |
| `web_homepage_conditions_chronic_pain_click` | `condition_id: "chronic-pain"`, `condition_name: "Chronic Pain"`, `button_text: "Learn more"` | User clicks Chronic Pain condition card. Pre-events: Scroll to section. RCA: Condition-specific interest tracking |
| `web_homepage_conditions_insomnia_click` | `condition_id: "insomnia"`, `condition_name: "Insomnia"`, `button_text: "Learn more"` | User clicks Insomnia condition card. Pre-events: Scroll to section. RCA: Condition-specific interest tracking |
| `web_homepage_conditions_depression_click` | `condition_id: "depression"`, `condition_name: "Depression"`, `button_text: "Learn more"` | User clicks Depression condition card. Pre-events: Scroll to section. RCA: Condition-specific interest tracking |
| `web_homepage_wellness_mindfulness_click` | `wellness_type: "mindfulness-meditation"`, `button_text: "Learn more"` | User clicks Mindfulness & Meditation wellness card. Pre-events: Scroll to section. RCA: Holistic approach interest |
| `web_homepage_wellness_nutrition_click` | `wellness_type: "nutrition-diet"`, `button_text: "Learn more"` | User clicks Nutrition & Diet wellness card. Pre-events: Scroll to section. RCA: Lifestyle approach interest |
| `web_homepage_weight_management_plan_personalized_click` | `plan_type: "personalized_plans"`, `button_text: "Learn more"` | User clicks Personalized Plans card in weight management. Pre-events: Scroll to section. RCA: Program customization interest |
| `web_homepage_weight_management_plan_expert_click` | `plan_type: "expert_guidance"`, `button_text: "Learn more"` | User clicks Expert Guidance card. Pre-events: Scroll to section. RCA: Professional support interest |
| `web_homepage_weight_management_shop_now_click` | `section: "weight_management"`, `button_text: "Shop now"` | User clicks "Shop now" in weight management product showcase. Pre-events: Scroll to section. RCA: Product purchase intent |
| `web_homepage_sexual_health_ed_click` | `condition_id: "erectile-dysfunction"`, `condition_name: "Erectile Dysfunction"`, `button_text: "Learn more"` | User clicks Erectile Dysfunction solution card. Pre-events: Scroll to section. RCA: Men's health interest tracking |
| `web_homepage_sexual_health_premature_click` | `condition_id: "premature-ejaculation"`, `condition_name: "Premature Ejaculation"`, `button_text: "Learn more"` | User clicks Premature Ejaculation solution card. Pre-events: Scroll to section. RCA: Sexual health interest tracking |
| `web_homepage_sexual_health_libido_click` | `condition_id: "low-libido"`, `condition_name: "Low Libido"`, `button_text: "Learn more"` | User clicks Low Libido solution card. Pre-events: Scroll to section. RCA: Sexual health interest tracking |
| `web_homepage_womens_health_menopause_click` | `condition_id: "menopause-relief"`, `condition_name: "Menopause Relief"`, `button_text: "Learn more"` | User clicks Menopause Relief solution card. Pre-events: Scroll to section. RCA: Women's health interest tracking |
| `web_homepage_womens_health_pcos_click` | `condition_id: "pcos-management"`, `condition_name: "PCOS Management"`, `button_text: "Learn more"` | User clicks PCOS Management solution card. Pre-events: Scroll to section. RCA: Women's health interest tracking |
| `web_homepage_mens_health_hair_loss_click` | `condition_id: "hair-loss"`, `condition_name: "Hair Loss"`, `button_text: "Learn more"` | User clicks Hair Loss solution card. Pre-events: Scroll to section. RCA: Men's health interest tracking |
| `web_homepage_mens_health_testosterone_click` | `condition_id: "testosterone-therapy"`, `condition_name: "Testosterone Therapy"`, `button_text: "Learn more"` | User clicks Testosterone Therapy solution card. Pre-events: Scroll to section. RCA: Men's health interest tracking |
| `web_homepage_pharmacy_feature_easy_refills_click` | `feature_type: "easy_refills"` | User clicks Easy Refills feature icon. Pre-events: Scroll to section. RCA: Pharmacy service interest |
| `web_homepage_pharmacy_feature_wide_selection_click` | `feature_type: "wide_selection"` | User clicks Wide Selection feature icon. Pre-events: Scroll to section. RCA: Product variety interest |
| `web_homepage_pharmacy_feature_discreet_packaging_click` | `feature_type: "discreet_packaging"` | User clicks Discreet Packaging feature icon. Pre-events: Scroll to section. RCA: Privacy concern tracking |
| `web_homepage_pharmacy_feature_conditions_click` | `feature_type: "conditions_treated"`, `metric_value: "50+"` | User clicks 50+ Conditions Treated feature icon. Pre-events: Scroll to section. RCA: Service scope interest |
| `web_homepage_pharmacy_feature_pharmacists_click` | `feature_type: "licensed_pharmacists"` | User clicks Licensed Pharmacists feature icon. Pre-events: Scroll to section. RCA: Professional trust tracking |
| `web_homepage_pharmacy_feature_free_delivery_click` | `feature_type: "free_delivery"` | User clicks Free Delivery feature icon. Pre-events: Scroll to section. RCA: Delivery benefit interest |
| `web_homepage_pharmacy_product_carousel_next_click` | `carousel_direction: "next"`, `current_position` | User clicks next arrow in product carousel. Pre-events: Scroll to section. RCA: Product browsing engagement |
| `web_homepage_pharmacy_product_carousel_prev_click` | `carousel_direction: "prev"`, `current_position` | User clicks previous arrow in product carousel. Pre-events: Scroll to section. RCA: Product browsing engagement |
| `web_homepage_pharmacy_product_carousel_item_click` | `product_id`, `product_name`, `product_type` | User clicks on a product in the carousel. Pre-events: Scroll to section. RCA: Product-specific interest |
| `web_homepage_advisory_board_doctor_click` | `doctor_id`, `doctor_name`, `doctor_title` | User clicks on a medical advisory board member photo. Pre-events: Scroll to section. RCA: Credibility engagement |
| `web_homepage_self_pickup_cta_click` | `button_text: "Find a location"`, `section: "self_pickup"` | User clicks "Find a location" button in Self Pickup section. Pre-events: Scroll to section. RCA: Delivery method preference |
| `web_homepage_faq_question_expand` | `question_id`, `question_text`, `section: "faq"` | User expands a FAQ accordion question. Pre-events: Scroll to section. RCA: Information-seeking behavior |
| `web_homepage_faq_question_collapse` | `question_id`, `question_text` | User collapses a FAQ accordion question. Pre-events: FAQ question expanded. RCA: Content consumption tracking |
| `web_homepage_newsletter_email_submit` | `email`, `discount_code: "10% off"`, `section: "newsletter"` | User submits email in newsletter signup form. Pre-events: Scroll to section. RCA: Lead generation and email list growth |
| `web_homepage_newsletter_subscribe_click` | `button_text: "Subscribe"`, `section: "newsletter"` | User clicks Subscribe button. Pre-events: Email entered. RCA: Newsletter conversion tracking |
| `web_homepage_footer_nav_clinic_click` | `footer_link: "Our Clinic"`, `section: "footer"` | User clicks Our Clinic link in footer. Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_nav_about_click` | `footer_link: "About Us"`, `section: "footer"` | User clicks About Us in footer. Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_nav_products_click` | `footer_link: "Products"`, `section: "footer"` | User clicks Products in footer. Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_nav_blog_click` | `footer_link: "Blog"`, `section: "footer"` | User clicks Blog in footer. Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_nav_contact_click` | `footer_link: "Contact Us"`, `section: "footer"` | User clicks Contact Us in footer. Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_nav_faq_click` | `footer_link: "FAQ"`, `section: "footer"` | User clicks FAQ in footer. Pre-events: Scroll to footer. RCA: Footer navigation tracking |
| `web_homepage_footer_nav_terms_click` | `footer_link: "Terms & Conditions"`, `section: "footer"` | User clicks Terms & Conditions in footer. Pre-events: Scroll to footer. RCA: Legal content access |
| `web_homepage_footer_nav_privacy_click` | `footer_link: "Privacy Policy"`, `section: "footer"` | User clicks Privacy Policy in footer. Pre-events: Scroll to footer. RCA: Privacy compliance and trust behavior |
| `web_homepage_footer_social_facebook_click` | `social_platform: "facebook"`, `section: "footer"` | User clicks Facebook social icon. Pre-events: Scroll to footer. RCA: Social media engagement |
| `web_homepage_footer_social_instagram_click` | `social_platform: "instagram"`, `section: "footer"` | User clicks Instagram social icon. Pre-events: Scroll to footer. RCA: Social media engagement |
| `web_homepage_footer_social_twitter_click` | `social_platform: "twitter"`, `section: "footer"` | User clicks Twitter social icon. Pre-events: Scroll to footer. RCA: Social media engagement |
| `web_homepage_footer_social_linkedin_click` | `social_platform: "linkedin"`, `section: "footer"` | User clicks LinkedIn social icon. Pre-events: Scroll to footer. RCA: Social media engagement |
| `web_homepage_payment_icon_visa_click` | `payment_method: "visa"`, `location: "why_choose_us"` | User clicks Visa payment icon (if interactive). Pre-events: Scroll to section. RCA: Payment method interest |
| `web_homepage_payment_icon_mastercard_click` | `payment_method: "mastercard"`, `location: "why_choose_us"` | User clicks Mastercard payment icon (if interactive). Pre-events: Scroll to section. RCA: Payment method interest |
| `web_homepage_payment_icon_paypal_click` | `payment_method: "paypal"`, `location: "why_choose_us"` | User clicks PayPal payment icon (if interactive). Pre-events: Scroll to section. RCA: Payment method interest |
| `web_homepage_payment_icon_apple_pay_click` | `payment_method: "apple_pay"`, `location: "why_choose_us"` | User clicks Apple Pay payment icon (if interactive). Pre-events: Scroll to section. RCA: Payment method interest |
| `web_homepage_payment_icon_google_pay_click` | `payment_method: "google_pay"`, `location: "why_choose_us"` | User clicks Google Pay payment icon (if interactive). Pre-events: Scroll to section. RCA: Payment method interest |
| `web_homepage_scroll_section_view` | `section_name`, `scroll_depth_percent`, `time_on_page_ms` | User scrolls to view a specific section. Pre-events: Page load. RCA: Content engagement depth, section performance |
| `web_homepage_page_view` | `page_url`, `referrer`, `user_agent`, `viewport_width` | User loads homepage. Pre-events: None. RCA: Traffic source and entry point tracking |

---

## Event Summary

| Category | Count | Events |
|----------|-------|--------|
| Navigation | 6 | Header nav links (Home, About, Products, Blog, Contact) |
| Header Actions | 3 | Search, Cart, Profile icons |
| Hero Section | 13 | CTA, 12 category icons, 3 trust indicators |
| How It Works | 3 | Step 1, 2, 3 CTAs |
| Trusted Care | 3 | Video play, 2 feature cards |
| Why Choose Us | 6 | Main CTA, 4 benefit icons |
| Conditions | 4 | Anxiety, Chronic Pain, Insomnia, Depression |
| Wellness | 2 | Mindfulness, Nutrition |
| Weight Management | 3 | 2 plan cards, Shop now |
| Sexual Health | 3 | ED, Premature Ejaculation, Low Libido |
| Women's Health | 2 | Menopause, PCOS |
| Men's Health | 2 | Hair Loss, Testosterone |
| Online Pharmacy | 9 | 6 features, carousel navigation (next/prev/item) |
| Advisory Board | 1 | Doctor clicks |
| Self Pickup | 1 | Find location CTA |
| FAQ | 2 | Expand, Collapse |
| Newsletter | 2 | Email submit, Subscribe click |
| Footer | 9 | 5 nav links, Terms, Privacy, 4 social icons |
| Payment Icons | 5 | Visa, Mastercard, PayPal, Apple Pay, Google Pay |
| Engagement | 2 | Scroll section view, Page view |
| **TOTAL** | **81** | |

---

## Design Variables Reference

See `/docs/design/design-system/homepage-design-variables.json` for complete design token extraction including:
- Color palette (Primary, Secondary, Text, Surface, Border, Icons)
- Typography system (Display, Headers, Titles, Text, Labels, Body)
- Spacing system (Gaps, Vertical spacing)
- Component styles (Buttons, Inputs)
- Effects (Shadows, Blurs)

---

## Implementation Notes

1. **Event Naming Convention**: All events use `web_homepage_` prefix for homepage-specific tracking
2. **Properties**: Include contextual data (section, button_text, condition_id) for detailed analysis
3. **Pre-events**: Document expected user flow before each event
4. **RCA (Root Cause Analysis)**: Business reason for tracking each event
5. **Platform**: Web desktop only - mobile events should be mapped separately if design differs

---

**Generated from**: Figma Node 10810:10533  
**Design Review**: 2025-01-27  
**Status**: Ready for PM review and implementation

