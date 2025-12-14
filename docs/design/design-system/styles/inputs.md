# Input Component Styles

This document defines input component styles extracted from the Figma design system.

## Text Input

```css
.input-text {
  /* Typography */
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;

  /* Spacing */
  padding: 18px 16px;
  border: 1px solid #c2c9d6;
  border-radius: 8px;

  /* Appearance */
  background-color: #ffffff;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  /* Transitions */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
```

## Input with Icon

```css
.input-with-icon {
  /* Base input styles */
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;

  /* Spacing with icon */
  padding: 18px 16px 18px 40px; /* 16px + 24px for icon */
  border: 1px solid #c2c9d6;
  border-radius: 8px;

  /* Appearance */
  background-color: #ffffff;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  /* Background image positioning */
  background-image: url('data:image/svg+xml,...'); /* Icon SVG */
  background-repeat: no-repeat;
  background-position: 12px center; /* 16px - 4px for visual balance */
  background-size: 24px;

  /* Transitions */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
```

## Input States

### Focus State

```css
.input-text:focus,
.input-with-icon:focus {
  border-color: #0A9281;
  box-shadow: 0 0 0 3px rgba(10, 146, 129, 0.1);
}
```

### Error State

```css
.input-text.error,
.input-with-icon.error {
  border-color: #EF4747;
  box-shadow: 0 0 0 3px rgba(239, 71, 71, 0.1);
}
```

### Success State

```css
.input-text.success,
.input-with-icon.success {
  border-color: #61a333;
  box-shadow: 0 0 0 3px rgba(97, 163, 51, 0.1);
}
```

### Disabled State

```css
.input-text:disabled,
.input-with-icon:disabled {
  background-color: #f5f6f7;
  border-color: #dee3ed;
  color: #99a3b2;
  cursor: not-allowed;
  opacity: 0.6;
}
```

## Placeholder Styles

```css
.input-text::placeholder,
.input-with-icon::placeholder {
  color: #99a3b2;
  font-style: italic;
  opacity: 1; /* Override browser defaults */
}
```

## Input Variants

### Search Input

```css
.input-search {
  /* Base input styles */
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;

  /* Search-specific spacing */
  padding: 18px 16px 18px 48px; /* Extra left padding for search icon */

  /* Appearance */
  background-color: #ffffff;
  border: 1px solid #c2c9d6;
  border-radius: 24px; /* More rounded for search */
  outline: none;
  width: 100%;
  box-sizing: border-box;

  /* Search icon */
  background-image: url('data:image/svg+xml,<svg>...</svg>'); /* Search icon SVG */
  background-repeat: no-repeat;
  background-position: 16px center;
  background-size: 20px;

  /* Transitions */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
```

### Email Input

```css
.input-email {
  /* Same as text input */
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;
  padding: 18px 16px;
  border: 1px solid #c2c9d6;
  border-radius: 8px;
  background-color: #ffffff;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-email:focus {
  border-color: #0A9281;
  box-shadow: 0 0 0 3px rgba(10, 146, 129, 0.1);
}
```

## Form Layout

### Input Group

```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #08080a;
  margin-bottom: 4px;
}

.input-helper {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #616975;
  margin-top: 4px;
}

.input-error {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #EF4747;
  margin-top: 4px;
}
```

## Usage Guidelines

### Input Types

- **Text inputs**: Standard single-line text entry
- **Search inputs**: Rounded corners, search icon, often with autocomplete
- **Email inputs**: Standard styling with email validation feedback

### Accessibility

- **Label association**: Always pair inputs with `<label>` elements
- **Focus indicators**: Clear focus rings for keyboard navigation
- **Color contrast**: Text meets WCAG AA standards
- **Touch targets**: Minimum 44px height for mobile

### Validation States

- **Default**: Neutral border color
- **Focus**: Primary color border with subtle shadow
- **Error**: Red border with error shadow
- **Success**: Green border with success shadow
- **Disabled**: Muted appearance, not focusable

## Implementation Notes

- **Border radius**: `8px` for standard inputs, `24px` for search
- **Font family**: Roboto for inputs to match body text
- **Spacing**: `18px` vertical padding for comfortable typing
- **Icon integration**: `24px` icons with `8px` left offset
- **Transitions**: Smooth color changes for better UX

## Source Variables

Input styles derived from variables:
- `input/font_size: 16`
- `input/padding_h: 16`
- `input/padding_v: 18`
- `input/bg: #ffffff`
- `input/border: #c2c9d6`
- `input/placeholder: #99a3b2`
- `input/icon_size: 24`
- `input/left_icon: 8`