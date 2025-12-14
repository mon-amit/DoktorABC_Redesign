# Homepage (Web) Event Mapping - DoktorABC Redesign

**Source**: Figma UI UX Redesign - Node 10810:10533
**Scanned**: Real Figma data extracted
**Platform**: Web (Desktop)

---

## Event Table

| Event Name | Properties | Trigger Description |
|------------|------------|---------------------|
| `web_homepage_search_focus` | `search_type: "medication"`, `input_method: "click"` | User clicks on search input field "Search for medication or treatment" in header area. Pre-event: Page load. RCA: Track search intent and engagement |
| `web_homepage_search_submit` | `search_query`, `result_count`, `search_time_ms` | User submits search query via Enter or search icon. Pre-event: search_focus, typing. RCA: Track search conversion and query quality |
| `web_homepage_cta_start_journey_click` | `treatment_category: null`, `button_location: "hero"`, `button_text: "Start My Journey"` | User clicks primary CTA "Start My Journey" in hero section. Pre-event: Page view, scroll to hero. RCA: Main conversion funnel entry point |
| `web_homepage_cta_get_prescription_click` | `treatment_category: null`, `button_location: "hero"`, `button_text: "Get My Prescription"` | User clicks "Get My Prescription" CTA. Pre-event: Page view. RCA: Alternative conversion path for returning users |
| `web_homepage_cta_start_consultation_click` | `treatment_category: null`, `button_location: "how_it_works"`, `button_text: "Start My Free Consultation"` | User clicks "Start My Free Consultation" after viewing how-it-works section. Pre-event: scroll_to_section, view how_it_works. RCA: Mid-funnel conversion after education |
| `web_homepage_category_ed_click` | `category_id: "erectile-dysfunction"`, `category_name: "Erectile Dysfunction"`, `position: 1` | User clicks Erectile Dysfunction category card/button. Pre-event: Scroll to categories. RCA: Track most popular treatment categories |
| `web_homepage_category_hair_loss_click` | `category_id: "hair-loss"`, `category_name: "Hair Loss"`, `position: 2` | User clicks Hair Loss category button. Pre-event: Scroll to categories. RCA: Track treatment category preference |
| `web_homepage_category_weight_loss_click` | `category_id: "weight-loss"`, `category_name: "Weight Loss"`, `position: 3` | User clicks Weight Loss category. Pre-event: Scroll to categories. RCA: Track treatment category engagement |
| `web_homepage_category_cannabis_click` | `category_id: "medical-cannabis"`, `category_name: "Medical Cannabis"`, `position: 4` | User clicks Medical Cannabis category. Pre-event: Scroll to categories. RCA: New category tracking |
| `web_homepage_category_asthma_click` | `category_id: "asthma"`, `category_name: "Asthma"`, `position: 5` | User clicks Asthma category. Pre-event: Scroll to categories. RCA: Chronic condition interest tracking |
| `web_homepage_category_birth_control_click` | `category_id: "birth-control"`, `category_name: "Birth Control"`, `position: 6` | User clicks Birth Control / Contraception category. Pre-event: Scroll to categories. RCA: Women's health tracking |
| `web_homepage_category_diabetes_click` | `category_id: "diabetes"`, `category_name: "Diabetes"`, `position: 7` | User clicks Diabetes category. Pre-event: Scroll to categories. RCA: Chronic condition interest |
| `web_homepage_category_testosterone_click` | `category_id: "testosterone"`, `category_name: "Testosterone"`, `position: 8` | User clicks Testosterone category. Pre-event: Scroll to categories. RCA: Men's health tracking |
| `web_homepage_category_quit_smoking_click` | `category_id: "quit-smoking"`, `category_name: "Quit Smoking"`, `position: 9` | User clicks Quit Smoking category. Pre-event: Scroll to categories. RCA: Lifestyle change tracking |
| `web_homepage_category_sti_click` | `category_id: "sti-test"`, `category_name: "STI Test"`, `position: 10` | User clicks STI Test category. Pre-event: Scroll to categories. RCA: Sexual health tracking |
| `web_homepage_explore_categories_click` | `source_section: "categories"`, `button_text: "Explore more categories"` | User clicks "Explore more categories" to see full category list. Pre-event: View initial categories. RCA: Category discovery engagement |
| `web_homepage_explore_treatments_click` | `source_section: "treatments"`, `button_text: "Explore treatment options"` | User clicks "Explore treatment options". Pre-event: Scroll to treatments section. RCA: Treatment interest depth |
| `web_homepage_learn_ed_click` | `treatment_category: "erectile-dysfunction"`, `cta_text: "Understand how ED works"` | User clicks to learn about ED. Pre-event: Scroll to ED section. RCA: Educational content engagement before conversion |
| `web_homepage_learn_hair_loss_click` | `treatment_category: "hair-loss"`, `cta_text: "Learn about early signs"` | User clicks to learn about hair loss signs. Pre-event: Scroll to hair loss section. RCA: Symptom awareness funnel |
| `web_homepage_learn_weight_loss_click` | `treatment_category: "weight-loss"`, `cta_text: "Why diets don't work"` | User clicks weight loss education CTA. Pre-event: Scroll to weight loss section. RCA: Problem-aware content engagement |
| `web_homepage_learn_cannabis_click` | `treatment_category: "medical-cannabis"`, `cta_text: "Learn how cannabis can help"` | User clicks cannabis education CTA. Pre-event: Scroll to cannabis section. RCA: Cannabis interest qualification |
| `web_homepage_learn_asthma_click` | `treatment_category: "asthma"`, `cta_text: "Learn about doctor-led programs"` | User clicks asthma program CTA. Pre-event: Scroll to asthma section. RCA: Chronic care program interest |
| `web_homepage_calculate_bmi_click` | `tool_type: "bmi_calculator"`, `button_text: "Calculate My BMI"` | User clicks BMI calculator tool. Pre-event: Scroll to weight section. RCA: Interactive tool engagement |
| `web_homepage_find_fit_click` | `tool_type: "treatment_finder"`, `button_text: "Find My Fit"` | User clicks treatment finder. Pre-event: Scroll to matching section. RCA: Personalization tool usage |
| `web_homepage_manage_asthma_click` | `treatment_category: "asthma"`, `button_text: "Manage My Asthma"` | User clicks asthma management CTA. Pre-event: Scroll to asthma section. RCA: Condition management intent |
| `web_homepage_refill_prescription_click` | `action_type: "refill"`, `button_text: "Refill my prescription"` | User clicks prescription refill. Pre-event: Page view or return visit. RCA: Returning customer engagement |
| `web_homepage_otc_product_click` | `product_type: "otc"`, `source: "homepage"` | User clicks Online Pharmacy OTC product link. Pre-event: Scroll to OTC section. RCA: Non-prescription product interest |
| `web_homepage_see_eligible_click` | `eligibility_type: "general"`, `button_text: "See If You're Eligible"` | User clicks eligibility check CTA. Pre-event: Reading treatment info. RCA: Qualification funnel entry |
| `web_homepage_reviews_show_more_click` | `review_section: "testimonials"`, `current_visible: 3` | User clicks "Show more reviews" to see additional testimonials. Pre-event: Viewing initial reviews. RCA: Social proof engagement depth |
| `web_homepage_review_card_click` | `reviewer_name`, `rating`, `position` | User clicks on a specific review card. Pre-event: Scroll to reviews. RCA: Trust signal engagement |
| `web_homepage_nav_treatments_click` | `nav_item: "Our Treatments"`, `menu_level: "main"` | User clicks "Our Treatments" in main navigation. Pre-event: None. RCA: Navigation pattern tracking |
| `web_homepage_nav_how_it_works_click` | `nav_item: "How it works"`, `menu_level: "main"` | User clicks "How it works" navigation. Pre-event: None. RCA: Information-seeking behavior |
| `web_homepage_nav_blog_click` | `nav_item: "Blog"`, `menu_level: "main"` | User clicks Blog navigation. Pre-event: None. RCA: Content marketing engagement |
| `web_homepage_nav_faq_click` | `nav_item: "FAQ (Help)"`, `menu_level: "main"` | User clicks FAQ/Help navigation. Pre-event: None. RCA: Support need identification |
| `web_homepage_nav_account_click` | `nav_item: "My account"`, `menu_level: "main"` | User clicks My Account. Pre-event: None. RCA: Return user identification |
| `web_homepage_footer_privacy_click` | `footer_link: "Privacy Policy"`, `section: "legal"` | User clicks Privacy Policy in footer. Pre-event: Scroll to footer. RCA: Compliance/trust behavior |
| `web_homepage_footer_terms_click` | `footer_link: "Acceptable Use Policy"`, `section: "legal"` | User clicks terms/policy link. Pre-event: Scroll to footer. RCA: Legal content access |
| `web_homepage_footer_contact_click` | `footer_link: "Contact"`, `section: "support"` | User clicks Contact link. Pre-event: Scroll to footer. RCA: Support intent tracking |
| `web_homepage_footer_become_partner_click` | `footer_link: "Become Partner"`, `section: "business"` | User clicks partner link. Pre-event: Scroll to footer. RCA: B2B interest tracking |
| `web_homepage_self_pickup_click` | `delivery_option: "self_pickup"`, `eta: "1 hour after payment"` | User clicks Self Pickup option. Pre-event: Viewing delivery options. RCA: Delivery preference tracking |
| `web_homepage_scroll_section_view` | `section_name`, `scroll_depth_percent`, `time_on_page_ms` | User scrolls to view a specific section. Pre-event: Page load. RCA: Content engagement depth, section performance |

---

## Figma Node Reference

| Element Type | Figma Node IDs |
|--------------|----------------|
| Category Button (Main) | 10058:9756, 10058:9744 |
| Category Button (Additional) | 10146:17362, 10146:17369 |
| CTA Buttons | 10906:30791, 11572:36249 |
| Outline Buttons | 11297:14689, 11297:15754, 11200:46446 |
| Product Cards | I11649:31522, I11649:31530, I11649:31537, I11649:31544 |
| Category Grid Items | 11093:39250, 11093:39263, 11093:39275, 11093:39287, 11093:39299, 11093:39313, 11093:39315, 11093:39316, 11093:39317, 11233:52364, 11233:52373 |
| Footer Elements | 11487:30292, 11487:30296, 11487:30297, 11487:30299, 11487:30300, 11487:30370 |

---

## Treatment Categories Identified

| Category | Node ID | Type | Priority |
|----------|---------|------|----------|
| Medical Cannabis | 10058:9756 | main | HIGH |
| Hair Loss | 10146:17362 | additional | HIGH |
| Erectile Dysfunction | 11093:39250 | category-button | HIGH |
| Weight Loss | 11093:39263 | category-button | HIGH |
| Asthma | 11093:39275 | category-button | MEDIUM |
| Birth Control | 11093:39287 | category-button | MEDIUM |
| Diabetes | 11093:39299 | category-button | MEDIUM |
| Testosterone | 11093:39313 | category-button | MEDIUM |
| Quit Smoking | 11093:39315 | category-button | MEDIUM |
| STI Test | 11093:39316 | category-button | MEDIUM |

---

**Generated from**: Real Figma scan
**Frame**: UI UX Redesign / Homepage (Web)
**Node**: 10810:10533
