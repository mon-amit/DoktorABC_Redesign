# Card Component Style Definitions

This document contains comprehensive card component style definitions extracted from the Figma design system.

## Card Component Specifications

### Standard Card Properties
- **Background Color**: #f5f6f7 (light gray)
- **Border**: Subtle or none
- **Border Radius**: 8-16px (from radii tokens)

### Card Variants

Based on the extracted variables, the design system supports:

1. **Standard Card**
   - Background: `surface/card: #f5f6f7`
   - Subtle shadow effects

2. **Elevated Card**
   - Enhanced shadow effects
   - Higher contrast

3. **Colored Card**
   - Background: `surface/success: #61a333` or other surface colors
   - For status or category cards

## Card States

The design system includes effects that suggest the following states:

- **Default**: Subtle background and shadow
- **Hover**: Enhanced shadow depth
- **Focus**: Focus ring using `surface/focus: #61a333`

## Usage Guidelines

### Colors
- Default background: `surface/card: #f5f6f7`
- Success/confirmation: `surface/success: #61a333`
- Primary: `surface/primary: #269c6e`

### Spacing
- Internal padding: Use spacing tokens (16px, 24px recommended)
- Margins: Use gap tokens (8px, 12px, 16px)

### Effects
- Subtle shadows for depth
- Border radius: 8px for consistency
- Background blur: 32px for overlay cards

### Typography
- Card titles: Use header/H4 or title styles
- Card content: Use text/m-regular or text/l-regular
- Card metadata: Use text/m-regular with secondary color

---

*Last updated: December 14, 2025*
*Source: Consolidated from 79 Figma nodes*