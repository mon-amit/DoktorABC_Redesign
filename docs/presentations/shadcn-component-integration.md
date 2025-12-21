# shadcn/ui Component Integration Guide

## Overview

All presentation slides have been updated with shadcn/ui component references and integration notes. The presentations are currently standalone HTML files but are ready for conversion to React/Next.js using shadcn components.

## Updated Presentations

### 1. Project Status OnePager (`project-status-onepager.html`)
- **Added:** Component library integration section
- **shadcn Components Recommended:**
  - Card (status cards, detail items)
  - Badge (status indicators)
  - Progress (progress bars)
  - Button (interactive elements)
- **MCP Integration:** Notes about using shadcn MCP server

### 2. Mixpanel Event Planning Session (`mixpanel-event-planning-session.html`)
- **Added:** Component library notes section
- **shadcn Components Recommended:**
  - Card (event cards)
  - Badge (priority indicators)
  - Table (decision matrix)
  - Accordion (planning steps)
- **Design Tokens:** Reference to 410+ tokens aligning with shadcn patterns

### 3. Redesign Analytics Presentation (`redesign-analytics-presentation.html`)
- **Added:** Footer note about component library
- **shadcn Components Recommended:**
  - Card (metric cards)
  - Progress (chart bars)
  - Alert/Callout (insights)
- **Implementation:** Ready for React conversion

### 4. Project Audit Slides (`project-audit-slides.html`)
- **Added:** New slide (#10) dedicated to component library integration
- **shadcn Components Recommended:**
  - Card (metric cards)
  - Badge (status badges)
  - Progress (progress bars)
  - Table (comparison tables)
  - Button (navigation buttons)
  - Alert (key insights)
- **Total Slides:** Updated from 11 to 12 slides

## Component Mapping

### Current HTML Elements → shadcn Components

| HTML Element | shadcn Component | Usage |
|-------------|------------------|-------|
| `.status-card` | `Card` | Status cards, metric cards |
| `.card-status` | `Badge` | Status indicators (complete, progress, pending) |
| `.progress-bar` | `Progress` | Progress indicators |
| `.event-card` | `Card` | Event cards in planning session |
| `.event-priority` | `Badge` | Priority badges (high, medium, low) |
| `.decision-table` | `Table` | Decision matrices, comparison tables |
| `.nav-button` | `Button` | Navigation buttons |
| `.key-insight` | `Alert` or `Callout` | Important insights and highlights |
| `.step` | `Accordion` or custom | Planning steps, methodology steps |

## Design Token Alignment

The 410+ design tokens extracted from Figma align with shadcn/ui patterns:

- **Colors:** Compatible with shadcn slate theme
- **Spacing:** Aligned with shadcn spacing scale
- **Typography:** Inter font family (shadcn default)
- **Border Radius:** Compatible with shadcn radius tokens
- **Shadows:** Can be mapped to shadcn shadow utilities

## MCP Server Integration

The shadcn MCP server is configured and active:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### Usage Examples

Use natural language to interact with shadcn components:

- "Show me all available components in the shadcn registry"
- "Add the button, card, and dialog components to my project"
- "Create a status dashboard using shadcn components"
- "Install badge, progress, and table components"

## Next Steps

### For React/Next.js Implementation

1. **Install shadcn CLI:**
   ```bash
   npx shadcn@latest init
   ```

2. **Add Required Components:**
   ```bash
   npx shadcn@latest add card
   npx shadcn@latest add badge
   npx shadcn@latest add progress
   npx shadcn@latest add table
   npx shadcn@latest add button
   npx shadcn@latest add alert
   npx shadcn@latest add accordion
   ```

3. **Convert HTML Presentations:**
   - Replace custom HTML/CSS with shadcn components
   - Use shadcn Card for all card elements
   - Use shadcn Badge for status indicators
   - Use shadcn Progress for progress bars
   - Use shadcn Table for data tables
   - Use shadcn Button for interactive elements

4. **Apply Design Tokens:**
   - Map Figma design tokens to shadcn CSS variables
   - Update `components.json` with custom theme if needed
   - Use shadcn theming system for consistent styling

## Benefits of shadcn Integration

1. **Consistency:** All components follow shadcn design patterns
2. **Accessibility:** shadcn components include built-in accessibility features
3. **Maintainability:** Easier to maintain with standardized components
4. **Customization:** Easy to customize with CSS variables
5. **Type Safety:** Full TypeScript support
6. **MCP Integration:** Natural language component installation

## Component Configuration

The `components.json` file is already configured:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

## References

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn MCP Server](https://ui.shadcn.com/docs/mcp)
- [Component Installation Guide](https://ui.shadcn.com/docs/installation)
- [Design System Documentation](../design/design-system/README.md)

---

**Last Updated:** December 15, 2025  
**Status:** All presentations updated with shadcn component references  
**Next:** Convert to React/Next.js using shadcn components
