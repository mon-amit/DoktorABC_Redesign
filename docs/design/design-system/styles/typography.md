# Typography Styles

This document defines typography styles extracted from the Figma design system.

## Font Families

```css
:root {
  --font-header: 'Poppins', sans-serif;
  --font-body: 'Roboto', sans-serif;
  --font-title: 'Poppins', sans-serif;
}
```

## Display Typography

### Display Extra Large

```css
.display-xl {
  font-family: var(--font-header);
  font-size: 90px;
  font-weight: 600;
  line-height: 90px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Display Medium

```css
.display-md {
  font-family: var(--font-header);
  font-size: 80px;
  font-weight: 500;
  line-height: 80px;
  letter-spacing: 0;
  color: #08080a;
}
```

## Header Typography

### Header 2

```css
.h2, .header-h2 {
  font-family: var(--font-header);
  font-size: 52px;
  font-weight: 600;
  line-height: 57px;
  letter-spacing: 0;
  color: #08080a;
  margin: 0 0 20px 0;
}
```

### Header 3

```css
.h3, .header-h3 {
  font-family: var(--font-header);
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 0;
  color: #08080a;
  margin: 0 0 18px 0;
}
```

### Header 4

```css
.h4, .header-h4 {
  font-family: var(--font-header);
  font-size: 32px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0;
  color: #08080a;
  margin: 0 0 16px 0;
}
```

### Header 5

```css
.h5, .header-h5 {
  font-family: var(--font-header);
  font-size: 26px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: 0;
  color: #08080a;
  margin: 0 0 16px 0;
}
```

## Title Typography

### Title Extra Large Medium

```css
.title-xl-medium {
  font-family: var(--font-title);
  font-size: 28px;
  font-weight: 500;
  line-height: 39px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Title Extra Large Regular

```css
.title-xl-regular {
  font-family: var(--font-title);
  font-size: 28px;
  font-weight: 400;
  line-height: 39px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Title Large Medium

```css
.title-lg-medium {
  font-family: var(--font-title);
  font-size: 26px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Title Large Regular

```css
.title-lg-regular {
  font-family: var(--font-title);
  font-size: 26px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Title Medium Regular

```css
.title-md-regular {
  font-family: var(--font-title);
  font-size: 22px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Title Medium Semibold

```css
.title-md-semibold {
  font-family: var(--font-title);
  font-size: 22px;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: 0;
  color: #08080a;
}
```

## Text Typography

### Text Medium Regular

```css
.text-m-regular, .body-text {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Text Large Regular

```css
.text-l-regular {
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0;
  color: #08080a;
}
```

## Label Typography

### Label Large

```css
.label-l {
  font-family: var(--font-title);
  font-size: 20px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Label Medium

```css
.label-m {
  font-family: var(--font-title);
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0;
  color: #08080a;
}
```

## Mobile/Web Specific Typography

### Mobile Title Medium

```css
.mobile-title-m {
  font-family: var(--font-header);
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0;
  color: #08080a;
}
```

### Body Extra Small Regular

```css
.body-xs-regular {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;
}
```

### Body Small Regular

```css
.body-sm-regular {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;
}
```

### Headlines Mobile/Web Large

```css
.headlines-mobile-lg {
  font-family: var(--font-header);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
  color: #08080a;
}
```

### Cross Body Small

```css
.cross-body-s {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  color: #08080a;
}
```

## Text Colors

```css
.text-primary {
  color: #08080a;
}

.text-secondary {
  color: #616975;
}

.text-tertiary {
  color: #99a3b2;
}

.text-on-primary {
  color: #ffffff;
}

.text-link {
  color: #00734a;
}

.text-info {
  color: #1f638c;
}

.text-success {
  color: #61a333;
}
```

## Usage Guidelines

### Typography Hierarchy

1. **Display**: Hero text, major page headings
2. **Headers (H2-H5)**: Section headings, page titles
3. **Titles**: Card titles, component headings
4. **Text**: Body content, descriptions
5. **Labels**: Form labels, button text, UI elements

### Font Family Usage

- **Poppins**: Headers, titles, display text, labels
- **Roboto**: Body text, content, descriptions

### Responsive Typography

- **Desktop**: Full size scale
- **Tablet**: Slight size reductions for H1-H3
- **Mobile**: Significant size reductions, increased line heights

### Color Application

- **Primary text**: Main content, headings
- **Secondary text**: Supporting information
- **Tertiary text**: Metadata, timestamps
- **Link text**: Interactive elements
- **On-primary**: Text over colored backgrounds

## Implementation Notes

- **Line heights**: Specified in pixels for consistent rendering
- **Letter spacing**: Set to 0 for optimal readability
- **Margins**: Bottom margins on headings for proper spacing
- **Color variables**: All colors reference the design token system
- **Font loading**: Ensure Poppins and Roboto are loaded for optimal performance

## Source Variables

Typography styles derived from preset variables:
- `Display/xl`, `Display/md`
- `header/H2`, `header/H3`, `header/H4`, `header/H5`
- `title/xl-medium`, `title/xl-regular`, `title/lg-medium`, etc.
- `text/m-regular`, `text/l-regular`
- `label/L`, `label/M`
- Color variables from the color system