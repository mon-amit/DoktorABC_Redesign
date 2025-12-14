# Spacing Variables

This document contains all spacing variables extracted from the Figma design system.

## Gap Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `sizes/gaps/0` | `0` | No spacing |
| `sizes/gaps/8` | `8` | Small gap |
| `sizes/gaps/12` | `12` | Medium-small gap |
| `sizes/gaps/16` | `16` | Medium gap |
| `sizes/gaps/24` | `24` | Large gap |
| `sizes/gaps/32` | `32` | Extra large gap |
| `sizes/gaps/60` | `60` | Very large gap |

## Vertical Gap Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `sizes/gaps/vertical_gaps/xxl` | `110` | Extra extra large vertical gap |

## Button Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `button/gap` | `8` | Gap between button elements |
| `button/padding_h` | `32` | Horizontal padding for buttons |
| `button/padding_h_icon` | `16` | Horizontal padding for icon buttons |
| `button/padding_v` | `20` | Vertical padding for buttons |
| `button/padding_v_icon` | `16` | Vertical padding for icon buttons |

## Input Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `input/left_icon` | `8` | Left padding for input with icon |
| `input/padding_h` | `16` | Horizontal padding for inputs |
| `input/padding_v` | `18` | Vertical padding for inputs |
| `input/weight_border` | `1` | Border width for inputs |

## Usage Guidelines

### Gap Scale

The gap scale follows a consistent ratio for spacing elements:

- `8px`: Small spacing between related elements
- `16px`: Standard spacing between components
- `24px`: Spacing between sections
- `32px`: Large spacing for major divisions
- `60px`: Very large spacing for page sections

### Component-Specific Spacing

#### Buttons

- **Standard buttons**: `padding_h: 32px`, `padding_v: 20px`, `gap: 8px`
- **Icon buttons**: `padding_h: 16px`, `padding_v: 16px` (more compact)
- **Gap**: Used for spacing between button text and icons

#### Inputs

- **Horizontal padding**: `16px` for comfortable text entry
- **Vertical padding**: `18px` for good touch targets
- **Icon spacing**: `8px` from left edge for icon placement
- **Border**: `1px` for clear definition

### Vertical Spacing

- `vertical_gaps/xxl: 110px`: Used for major page sections or hero areas

## Implementation Notes

- All spacing values are in pixels
- Consistent use of the gap scale ensures visual harmony
- Component spacing considers accessibility (minimum touch targets)
- Spacing scales up appropriately for larger screens

## Source Nodes

Spacing variables extracted from Figma nodes:
- `10810:10533` (comprehensive spacing system)
- `10397:5276`, `11572:36292`, `11487:30811`, `11487:30276`
- `11653:24352` (button spacing)