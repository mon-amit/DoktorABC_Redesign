# Component Variables

This document contains component-specific variables extracted from the Figma design system.

## Button Component Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `button/font_size` | `22` | Button text font size |
| `button/gap` | `8` | Gap between button elements (text + icon) |
| `button/padding_h` | `32` | Horizontal padding for standard buttons |
| `button/padding_v` | `20` | Vertical padding for standard buttons |
| `button/round` | `999` | Border radius (pill-shaped buttons) |
| `button/fill` | `#ffffff` | Button background color |
| `button/border` | `#ffffff00` | Button border color (transparent) |
| `button/text` | `#1f2129` | Button text color |
| `button/icon_size` | `24` | Button icon size |

## Input Component Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `input/icon_size` | `24` | Input icon size |
| `input/font_size` | `16` | Input text font size |
| `input/left_icon` | `8` | Left padding when icon is present |
| `input/padding_h` | `16` | Horizontal padding for inputs |
| `input/padding_v` | `18` | Vertical padding for inputs |
| `input/weight_border` | `1` | Border width |
| `input/bg` | `#ffffff` | Input background color |
| `input/border` | `#c2c9d6` | Input border color |
| `input/placeholder` | `#99a3b2` | Placeholder text color |

## Usage Guidelines

### Button Components

#### Standard Buttons

```css
.button {
  font-size: 22px;
  padding: 20px 32px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 1px solid transparent;
  color: #1f2129;
  gap: 8px;
}
```

#### Icon Buttons

```css
.button-icon {
  padding: 16px;
  /* Other properties same as standard buttons */
}
```

### Input Components

#### Text Inputs

```css
.input {
  font-size: 16px;
  padding: 18px 16px;
  border: 1px solid #c2c9d6;
  background-color: #ffffff;
  border-radius: 8px; /* From button/round context */
}

.input-with-icon {
  padding-left: 24px; /* 16px + 8px for icon */
}
```

### Design Principles

#### Accessibility

- **Touch targets**: Minimum 44px height (achieved with `padding_v: 18px` + border)
- **Color contrast**: Button text (`#1f2129`) on white background meets WCAG AA standards
- **Icon sizing**: `24px` icons are clearly visible and touchable

#### Consistency

- **Border radius**: `999px` creates consistent pill-shaped buttons
- **Spacing**: `8px` gap between text and icons maintains visual balance
- **Typography**: `22px` for buttons, `16px` for inputs follows hierarchy

#### Responsive Design

- **Padding**: Generous padding ensures comfortable touch targets on mobile
- **Font sizes**: Large enough for readability across devices
- **Icon sizing**: `24px` scales well on high-DPI displays

## Component States

### Button States (Implied)

While not explicitly defined in variables, common button states would follow:

- **Hover**: Slight background color change
- **Active**: Slightly darker background
- **Disabled**: Reduced opacity, `pointer-events: none`
- **Focus**: Outline or border color change

### Input States (Implied)

- **Focus**: Border color change to primary color
- **Error**: Border color change to error color
- **Disabled**: Reduced opacity, `pointer-events: none`
- **Valid**: Border color change to success color

## Implementation Notes

- All measurements in pixels
- Colors reference the color token system
- Spacing follows the spacing token system
- Border radius uses `999px` for fully rounded buttons
- Input padding accounts for icon placement when needed

## Source Nodes

Component variables extracted from Figma nodes:
- `10810:10533` (comprehensive button and input variables)
- `11653:24352` (additional button variables)