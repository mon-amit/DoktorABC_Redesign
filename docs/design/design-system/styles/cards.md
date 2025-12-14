# Card Component Styles

This document defines card component styles extracted from the Figma design system.

## Basic Card

```css
.card {
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Appearance */
  background-color: #f5f6f7;
  border: 1px solid #dee3ed;
  border-radius: 8px;

  /* Spacing */
  padding: 24px;

  /* Effects */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
```

## Card with Hover Effect

```css
.card-interactive {
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Appearance */
  background-color: #f5f6f7;
  border: 1px solid #dee3ed;
  border-radius: 8px;

  /* Spacing */
  padding: 24px;

  /* Effects */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.card-interactive:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

## Card Variants

### Primary Card

```css
.card-primary {
  background-color: #ffffff;
  border: 1px solid #dee3ed;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Secondary Card

```css
.card-secondary {
  background-color: #f7faef;
  border: 1px solid #7aba47;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(122, 186, 71, 0.1);
}
```

### Success Card

```css
.card-success {
  background-color: #f7faef;
  border: 1px solid #61a333;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(97, 163, 51, 0.1);
}
```

## Card Content Structure

### Card Header

```css
.card-header {
  margin-bottom: 16px;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #08080a;
  margin: 0 0 8px 0;
  line-height: 29px;
  letter-spacing: 0;
}

.card-subtitle {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #616975;
  margin: 0;
  line-height: 21px;
  letter-spacing: 0;
}
```

### Card Body

```css
.card-body {
  flex: 1;
}

.card-text {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #08080a;
  line-height: 21px;
  letter-spacing: 0;
  margin: 0 0 16px 0;
}

.card-text:last-child {
  margin-bottom: 0;
}
```

### Card Footer

```css
.card-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #dee3ed;
}

.card-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
```

## Card Sizes

### Large Card

```css
.card-lg {
  padding: 32px;
}

.card-lg .card-title {
  font-size: 26px;
  line-height: 34px;
}
```

### Medium Card (Default)

```css
.card-md {
  padding: 24px;
}

.card-md .card-title {
  font-size: 22px;
  line-height: 29px;
}
```

### Small Card

```css
.card-sm {
  padding: 16px;
}

.card-sm .card-title {
  font-size: 18px;
  line-height: 23px;
}
```

## Card Grid Layout

```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

## Usage Guidelines

### Card Types

- **Basic cards**: Static content display
- **Interactive cards**: Clickable cards with hover effects
- **Primary cards**: Main content, white background
- **Secondary cards**: Supporting content, light green background
- **Success cards**: Positive feedback, green accents

### Content Hierarchy

1. **Header**: Title and subtitle
2. **Body**: Main content, text, images
3. **Footer**: Actions, metadata, links

### Spacing

- **Internal padding**: `24px` for comfortable content spacing
- **Element gaps**: `16px` between sections
- **Action spacing**: `12px` between buttons/links

### Responsive Design

- **Desktop**: Multi-column grid layout
- **Tablet**: Adjusted grid columns
- **Mobile**: Single column stack

## Implementation Notes

- **Background color**: `#f5f6f7` for subtle card separation
- **Border radius**: `8px` for modern, approachable appearance
- **Box shadow**: Subtle shadow for depth without being harsh
- **Typography**: Poppins for titles, Roboto for body text
- **Hover effects**: Gentle lift and shadow increase for interactivity

## Source Variables

Card styles derived from variables:
- `surface/card: #f5f6f7`
- `border/subtle: #dee3ed`
- `sizes/gaps/24: 24`
- `sizes/gaps/16: 16`
- `sizes/gaps/12: 12`
- `surface/green: #f7faef`
- `secondary/400: #7aba47`
- `surface/success: #61a333`