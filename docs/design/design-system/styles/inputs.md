# Input Field Style Definitions

This document contains comprehensive input field style definitions extracted from the Figma design system.

## Input Component Specifications

### Standard Input Properties
- **Font Size**: 16px
- **Icon Size**: 24px
- **Left Icon Spacing**: 8px
- **Horizontal Padding**: 16px
- **Vertical Padding**: 18px
- **Border Weight**: 1px
- **Border Radius**: 8px
- **Background Color**: #ffffff (white)
- **Border Color**: #c2c9d6 (light gray)
- **Placeholder Color**: #99a3b2 (medium gray)

### Alternative Input Properties
- **Left Icon Spacing**: 6px (reduced)
- **Horizontal Padding**: 14px (reduced)
- **Vertical Padding**: 16px (reduced)

## Input Variants

Based on the extracted variables, the design system supports:

1. **Standard Text Input**
   - Full padding and spacing
   - Supports left icons

2. **Compact Input**
   - Reduced padding and icon spacing
   - For dense layouts

## Input States

The design system includes colors that suggest the following states:

- **Default**: Light border and background
- **Focus**: Enhanced border treatment
- **Error**: Red border color (`system/red: #EF4747`)
- **Disabled**: Muted colors

## Icon Integration

### Left Icon Placement
- **Standard**: 8px from left edge
- **Compact**: 6px from left edge
- **Icon Size**: 24px (consistent)
- **Icon Color**: `icons/primary: #1f2129` or `icons/brand: #269c6e`

## Usage Guidelines

### Spacing
- Use `input/padding_h: 16px` for horizontal padding
- Use `input/padding_v: 18px` for vertical padding
- Maintain `input/left_icon: 8px` spacing for icons

### Colors
- Background: `input/bg: #ffffff`
- Border: `input/border: #c2c9d6`
- Placeholder: `input/placeholder: #99a3b2`

### Typography
- Font size: `input/font_size: 16px`
- Font family: Roboto (body font)
- Font weight: Regular (400)

### Effects
- Border radius: `input/radius: 8px` for modern appearance
- Border weight: `input/weight_border: 1px` for subtle definition

---

*Last updated: December 14, 2025*
*Source: Consolidated from 79 Figma nodes*