# Color System

## Overview
The DoktorABC_Redesign color system provides a cohesive visual language that supports brand identity, accessibility, and user experience across all platforms and devices.

## Primary Colors

### Brand Colors
```css
/* Primary Brand Color */
--color-primary: #2563eb;        /* Blue-600 */
--color-primary-dark: #1d4ed8;   /* Blue-700 */
--color-primary-light: #3b82f6;  /* Blue-500 */
--color-primary-lighter: #60a5fa; /* Blue-400 */

/* Secondary Brand Color */
--color-secondary: #7c3aed;      /* Violet-600 */
--color-secondary-dark: #6d28d9; /* Violet-700 */
--color-secondary-light: #8b5cf6; /* Violet-500 */
```

### Usage Guidelines
- **Primary**: Used for primary actions, links, and key interactive elements
- **Secondary**: Used for secondary actions and supporting elements
- **Variations**: Use darker shades for hover states, lighter for subtle backgrounds

## Semantic Colors

### Status Colors
```css
/* Success States */
--color-success: #16a34a;        /* Green-600 */
--color-success-light: #dcfce7;  /* Green-100 */
--color-success-dark: #15803d;   /* Green-700 */

/* Warning States */
--color-warning: #ca8a04;        /* Yellow-600 */
--color-warning-light: #fef3c7;  /* Yellow-100 */
--color-warning-dark: #a16207;   /* Yellow-700 */

/* Error States */
--color-error: #dc2626;          /* Red-600 */
--color-error-light: #fef2f2;    /* Red-100 */
--color-error-dark: #b91c1c;     /* Red-700 */

/* Info States */
--color-info: #2563eb;           /* Blue-600 */
--color-info-light: #eff6ff;     /* Blue-100 */
--color-info-dark: #1d4ed8;      /* Blue-700 */
```

### Usage Guidelines
- **Success**: Positive actions, confirmations, completed states
- **Warning**: Cautionary messages, non-critical issues
- **Error**: Critical errors, destructive actions
- **Info**: Neutral information, help text

## Neutral Colors

### Gray Scale
```css
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Usage Guidelines
- **50-200**: Background colors, subtle borders
- **300-400**: Placeholder text, disabled states
- **500-600**: Body text, secondary information
- **700-900**: Headings, primary text, strong emphasis

## Accessibility Compliance

### Contrast Requirements
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio (18pt+ or 14pt+ bold)
- **Interactive Elements**: 3:1 minimum contrast ratio

### Color Blindness Considerations
- Avoid relying solely on color to convey meaning
- Use color in combination with icons, patterns, or text
- Test designs with color blindness simulators

## Dark Mode Support

### Dark Mode Colors
```css
/* Dark backgrounds */
--color-bg-primary: #111827;      /* Gray-900 */
--color-bg-secondary: #1f2937;    /* Gray-800 */
--color-bg-tertiary: #374151;     /* Gray-700 */

/* Dark text */
--color-text-primary: #f9fafb;    /* Gray-50 */
--color-text-secondary: #e5e7eb;  /* Gray-200 */
--color-text-tertiary: #9ca3af;   /* Gray-400 */
```

## Implementation

### CSS Custom Properties
```css
:root {
  /* Primary Colors */
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #3b82f6;

  /* Semantic Colors */
  --color-success: #16a34a;
  --color-warning: #ca8a04;
  --color-error: #dc2626;

  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  /* ... additional grays ... */
}
```

### Usage in Components
```css
/* Button Styles */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

/* Status Messages */
.alert-success {
  background-color: var(--color-success-light);
  border-color: var(--color-success);
  color: var(--color-success-dark);
}
```

## Tools & Resources

### Color Tools
- [Coolors](https://coolors.co/) - Color palette generator
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility compliance
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/) - Color blindness testing

### Design Resources
- [Material Design Colors](https://material.io/design/color/) - Google's color system
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors) - Utility-first color system

---

**Design System Version**: 1.0
**Last Updated**: December 14, 2025
**Tags**: #design-system #colors #accessibility #css
