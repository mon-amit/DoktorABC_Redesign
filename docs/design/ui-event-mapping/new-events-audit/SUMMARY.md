# New Events Audit - Summary

**Created**: 2025-01-27  
**Structure**: Organized by page, separated by web/mobile  
**Concatenation**: Applied where possible to reduce redundancy

## Folder Structure

```
new-events-audit/
├── README.md (overview and structure guide)
├── SUMMARY.md (this file)
├── homepage/
│   ├── web.md ✅ (81 → 35 events, 57% reduction) - NEW SCAN
│   └── mobile.md ⏳ (placeholder)
├── category/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
├── product/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
├── account/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
├── checkout/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
├── navigation/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
├── popups/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
├── search-otc/
│   ├── web.md ⏳ (placeholder - awaiting scan)
│   └── mobile.md ⏳ (placeholder)
└── treatment/
    ├── web.md ⏳ (placeholder - awaiting scan)
    └── mobile.md ⏳ (placeholder)
```

**Legend**: ✅ = Scanned | ⏳ = Placeholder

## Concatenation Results

| Page | Status | Original Events | Concatenated Events | Reduction | % Reduction |
|------|--------|----------------|---------------------|-----------|-------------|
| **Homepage** | ✅ **NEW SCAN** | 81 | 35 | 46 | 57% |
| Category | ⏳ Placeholder | - | - | - | - |
| Product | ⏳ Placeholder | - | - | - | - |
| Account | ⏳ Placeholder | - | - | - | - |
| Checkout | ⏳ Placeholder | - | - | - | - |
| Navigation | ⏳ Placeholder | - | - | - | - |
| Popups | ⏳ Placeholder | - | - | - | - |
| Search OTC | ⏳ Placeholder | - | - | - | - |
| Treatment | ⏳ Placeholder | - | - | - | - |
| **TOTAL (Homepage only)** | | **81** | **35** | **46** | **57%** |

**Note**: Only Homepage has been scanned. Other pages will be added as they are scanned from the new design.

## Concatenation Patterns Applied

### 1. Navigation Items
- **Pattern**: Multiple nav links → Single event with `nav_item` property
- **Examples**: Home, About, Products, Blog, Contact → `web_homepage_nav_item_click`

### 2. Category/Type Selections
- **Pattern**: Multiple category clicks → Single event with `category_type` property
- **Examples**: Flower, Oils, Vapes, Edibles → `web_homepage_hero_category_click`

### 3. Similar Actions
- **Pattern**: Actions with same intent → Single event with `action_type` property
- **Examples**: Increase/Decrease quantity → `web_product_quantity_change_click`

### 4. Filter/Sort Options
- **Pattern**: Multiple filter/sort options → Single event with `filter_type`/`sort_type` property
- **Examples**: Price Low, Price High, Newest, Rating → `web_category_sort_click`

### 5. Card/Item Clicks
- **Pattern**: Multiple similar cards → Single event with identifier property
- **Examples**: Condition cards → `web_homepage_condition_card_click` with `condition_id`

### 6. Social/Payment Icons
- **Pattern**: Multiple icons → Single event with platform/method property
- **Examples**: Facebook, Instagram, Twitter, LinkedIn → `web_homepage_footer_social_click`

## Key Benefits

1. **Reduced Complexity**: 44% fewer events to implement and maintain
2. **Maintained Granularity**: All tracking detail preserved through properties
3. **Consistent Patterns**: Similar interactions use same event structure
4. **Easier Analysis**: Grouped events enable better segmentation and filtering
5. **Platform Separation**: Clear web/mobile distinction for platform-specific tracking

## Implementation Notes

- All concatenated events maintain full tracking capability through properties
- Event names follow consistent pattern: `{platform}_{page}_{element}_{action}`
- Properties capture all necessary context for analysis
- RCA and pre-events documented for each event type
- Mobile events use same structure with platform-specific additions

## Status

- ✅ **Homepage**: NEW design scanned from Figma (Node 10810:10533) - Complete with concatenated events
- ⏳ **Category**: Placeholder - Awaiting new design scan
- ⏳ **Product**: Placeholder - Awaiting new design scan
- ⏳ **Account**: Placeholder - Awaiting new design scan
- ⏳ **Checkout**: Placeholder - Awaiting new design scan
- ⏳ **Navigation**: Placeholder - Awaiting new design scan
- ⏳ **Popups**: Placeholder - Awaiting new design scan
- ⏳ **Search OTC**: Placeholder - Awaiting new design scan
- ⏳ **Treatment**: Placeholder - Awaiting new design scan
- ⏳ **Mobile**: Placeholder structure ready for mobile design review

## Note

**Only Homepage has been newly scanned from the Figma design.** The concatenation results shown for other pages in the table above are from existing review tables (old design) and are included for reference only. These will be replaced when new design scans are completed.

