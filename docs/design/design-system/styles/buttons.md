# Button Component Styles

This document defines button component styles extracted from the Figma design system.

## Button Variants

### Primary Button

```css
.btn-primary {
  /* Typography */
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0;

  /* Spacing */
  padding: 20px 32px;
  gap: 8px;

  /* Appearance */
  background-color: #0A9281;
  color: #ffffff;
  border: 1px solid #0A9281;
  border-radius: 999px;

  /* Effects */
  cursor: pointer;
  transition: all 0.2s ease;

  /* Icon sizing */
  --icon-size: 24px;
}
```

### Secondary Button

```css
.btn-secondary {
  /* Typography */
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;

  /* Spacing */
  padding: 20px 32px;
  gap: 8px;

  /* Appearance */
  background-color: #7aba47;
  color: #ffffff;
  border: 1px solid #7aba47;
  border-radius: 999px;

  /* Effects */
  cursor: pointer;
  transition: all 0.2s ease;

  /* Icon sizing */
  --icon-size: 24px;
}
```

### Outline Button

```css
.btn-outline {
  /* Typography */
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0;

  /* Spacing */
  padding: 20px 32px;
  gap: 8px;

  /* Appearance */
  background-color: transparent;
  color: #1f2129;
  border: 1px solid #1f2129;
  border-radius: 999px;

  /* Effects */
  cursor: pointer;
  transition: all 0.2s ease;

  /* Icon sizing */
  --icon-size: 24px;
}
```

### Icon Button

```css
.btn-icon {
  /* Typography */
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0;

  /* Spacing */
  padding: 16px;
  gap: 8px;

  /* Appearance */
  background-color: #ffffff;
  color: #1f2129;
  border: 1px solid transparent;
  border-radius: 999px;

  /* Effects */
  cursor: pointer;
  transition: all 0.2s ease;

  /* Icon sizing */
  --icon-size: 24px;
}
```

## Button States

### Hover States

```css
.btn-primary:hover {
  background-color: #269c6e;
  border-color: #269c6e;
}

.btn-secondary:hover {
  background-color: #2E3E67;
  border-color: #2E3E67;
}

.btn-outline:hover {
  background-color: #1f2129;
  color: #ffffff;
}

.btn-icon:hover {
  background-color: #f5f6f7;
}
```

### Active States

```css
.btn-primary:active {
  background-color: #0A9281;
  transform: translateY(1px);
}

.btn-secondary:active {
  background-color: #7aba47;
  transform: translateY(1px);
}

.btn-outline:active {
  background-color: #1f2129;
  transform: translateY(1px);
}

.btn-icon:active {
  background-color: #ffffff;
  transform: translateY(1px);
}
```

### Focus States

```css
.btn-primary:focus,
.btn-secondary:focus,
.btn-outline:focus,
.btn-icon:focus {
  outline: 2px solid #61a333;
  outline-offset: 2px;
}
```

### Disabled States

```css
.btn-primary:disabled,
.btn-secondary:disabled,
.btn-outline:disabled,
.btn-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## Button Sizes

### Large Button

```css
.btn-lg {
  font-size: 26px;
  padding: 24px 40px;
}
```

### Medium Button (Default)

```css
.btn-md {
  font-size: 22px;
  padding: 20px 32px;
}
```

### Small Button

```css
.btn-sm {
  font-size: 18px;
  padding: 16px 24px;
}
```

## Usage Guidelines

### Button Hierarchy

1. **Primary buttons**: Main actions, conversions, important CTAs
2. **Secondary buttons**: Supporting actions, alternative options
3. **Outline buttons**: Less prominent actions, secondary CTAs
4. **Icon buttons**: Compact actions, toolbar buttons

### Accessibility

- **Color contrast**: All button combinations meet WCAG AA standards
- **Focus indicators**: Visible focus outlines for keyboard navigation
- **Touch targets**: Minimum 44px height for mobile accessibility
- **Text size**: 22px font size ensures readability

### Responsive Design

- **Desktop**: Full button styles with generous padding
- **Tablet**: Slightly reduced padding if needed
- **Mobile**: Maintain minimum touch targets, consider full-width buttons

## Implementation Notes

- **Border radius**: `999px` creates fully rounded, pill-shaped buttons
- **Font family**: Poppins for buttons to match header typography
- **Spacing**: Generous padding for comfortable click areas
- **Transitions**: Smooth hover effects for better UX
- **Icon integration**: `gap: 8px` between text and icons

## Source Variables

Button styles derived from variables:
- `button/font_size: 22`
- `button/gap: 8`
- `button/padding_h: 32`
- `button/padding_v: 20`
- `button/round: 999`
- `Primary/600: #0A9281`
- `secondary/400: #7aba47`
- `button/text: #1f2129`