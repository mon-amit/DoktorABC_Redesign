# DoktorABC Redesign - Notion Import Guide

This guide explains how to import the comprehensive DoktorABC redesign project data into Notion using MCP tools for clean, sorted, and structured documentation.

## 📋 Overview

The import process creates three main databases in Notion:

1. **Design System Database** - Design tokens, colors, typography, spacing, and components
2. **UI Events Database** - Analytics event mappings for user interactions
3. **Project Tracking Database** - Project status, milestones, and progress tracking

## 🚀 Quick Start

### Prerequisites
- **Notion MCP Integration**: Active in Cursor IDE
- **Node.js**: Version 25+ installed
- **Project Data**: All design tokens and documentation available

### Run Import Script
```bash
# Generate import commands (recommended first step)
npm run notion-import

# Or run dry-run to see what would be imported
npm run notion-import-dry-run
```

## 📁 Database Structures

### 1. Design System Database
**Purpose**: Centralized design token management

**Properties**:
- **Token Name** (Title) - e.g., `colors/primary/600`, `typography/families/header`
- **Category** (Select) - Colors, Typography, Spacing, Components, Effects
- **Value** (Rich Text) - The actual token value (hex color, font size, etc.)
- **Platform** (Multi-select) - Web, Mobile, Both
- **Status** (Select) - Active, Deprecated, Draft
- **Figma Node** (Rich Text) - Reference to Figma node ID
- **Last Updated** (Date) - When token was last modified

**Sample Data**:
- `colors/primary/600` → `#0A9281`
- `typography/families/header` → `Poppins`
- `spacing/gaps/16` → `16`

### 2. UI Events Database
**Purpose**: Analytics event tracking and mapping

**Properties**:
- **Event Name** (Title) - e.g., `web_homepage_cta_start_click`
- **Trigger** (Select) - Button Click, Card Click, Link Click, etc.
- **Element** (Rich Text) - UI element description
- **Page** (Select) - Homepage, Product Page, Category Page, etc.
- **Platform** (Select) - Web, Mobile, Both
- **CMS Properties** (Rich Text) - Data properties to track
- **Figma Node ID** (Rich Text) - Reference to design element
- **Status** (Select) - New, Implemented, Testing, Live
- **Priority** (Select) - High, Medium, Low

**Sample Data**:
- Event: `web_homepage_cta_start_click`
- Trigger: Button Click
- Element: Start Treatment
- Page: Homepage
- CMS Properties: `treatment_type`

### 3. Project Tracking Database
**Purpose**: Project management and status tracking

**Properties**:
- **Task** (Title) - Task or milestone name
- **Category** (Select) - Design System, Event Mapping, Testing, etc.
- **Status** (Select) - Not Started, In Progress, Completed, Blocked
- **Priority** (Select) - Critical, High, Medium, Low
- **Assignee** (People) - Team member responsible
- **Due Date** (Date) - Target completion date
- **Progress** (Number) - Percentage complete (0-1)
- **Dependencies** (Relation) - Links to other tasks
- **Notes** (Rich Text) - Additional context and details

## 🔧 Manual Import Process

If you prefer to run the import manually or need more control:

### Step 1: Create Databases

Execute these function calls in Cursor (one at a time) to create the databases:

**1. Design System Database:**
```json
{
  "name": "user-Notion-notion-create-database",
  "parameters": {
    "properties": {
      "Token Name": {"type": "title"},
      "Category": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Colors", "color": "blue"},
            {"name": "Typography", "color": "green"},
            {"name": "Spacing", "color": "yellow"},
            {"name": "Components", "color": "red"},
            {"name": "Effects", "color": "purple"}
          ]
        }
      },
      "Value": {"type": "rich_text"},
      "Platform": {
        "type": "multi_select",
        "multi_select": {
          "options": [
            {"name": "Web", "color": "blue"},
            {"name": "Mobile", "color": "green"},
            {"name": "Both", "color": "gray"}
          ]
        }
      },
      "Status": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Active", "color": "green"},
            {"name": "Deprecated", "color": "red"},
            {"name": "Draft", "color": "yellow"}
          ]
        }
      },
      "Figma Node": {"type": "rich_text"},
      "Last Updated": {"type": "date"}
    },
    "title": [
      {
        "type": "text",
        "text": {"content": "Design System - DoktorABC Redesign"}
      }
    ],
    "description": [
      {
        "type": "text",
        "text": {"content": "Design tokens, colors, typography, spacing, and components extracted from Figma"}
      }
    ]
  }
}
```

**2. UI Events Database:**
```json
{
  "name": "user-Notion-notion-create-database",
  "parameters": {
    "properties": {
      "Event Name": {"type": "title"},
      "Trigger": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Button Click", "color": "blue"},
            {"name": "Card Click", "color": "green"},
            {"name": "Link Click", "color": "yellow"},
            {"name": "Input Focus", "color": "red"},
            {"name": "Page Load", "color": "purple"},
            {"name": "Scroll", "color": "orange"},
            {"name": "Search Submit", "color": "pink"}
          ]
        }
      },
      "Element": {"type": "rich_text"},
      "Page": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Homepage", "color": "blue"},
            {"name": "Product Page", "color": "green"},
            {"name": "Category Page", "color": "yellow"},
            {"name": "Search OTC", "color": "red"},
            {"name": "Checkout", "color": "purple"},
            {"name": "Account", "color": "orange"},
            {"name": "Navigation", "color": "pink"}
          ]
        }
      },
      "Platform": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Web", "color": "blue"},
            {"name": "Mobile", "color": "green"},
            {"name": "Both", "color": "gray"}
          ]
        }
      },
      "CMS Properties": {"type": "rich_text"},
      "Figma Node ID": {"type": "rich_text"},
      "Status": {
        "type": "select",
        "select": {
          "options": [
            {"name": "New", "color": "yellow"},
            {"name": "Implemented", "color": "blue"},
            {"name": "Testing", "color": "orange"},
            {"name": "Live", "color": "green"}
          ]
        }
      },
      "Priority": {
        "type": "select",
        "select": {
          "options": [
            {"name": "High", "color": "red"},
            {"name": "Medium", "color": "yellow"},
            {"name": "Low", "color": "green"}
          ]
        }
      }
    },
    "title": [
      {
        "type": "text",
        "text": {"content": "UI Events - DoktorABC Redesign"}
      }
    ],
    "description": [
      {
        "type": "text",
        "text": {"content": "Analytics event mappings for user interactions and tracking"}
      }
    ]
  }
}
```

**3. Project Tracking Database:**
```json
{
  "name": "user-Notion-notion-create-database",
  "parameters": {
    "properties": {
      "Task": {"type": "title"},
      "Category": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Design System", "color": "blue"},
            {"name": "Event Mapping", "color": "green"},
            {"name": "Testing", "color": "yellow"},
            {"name": "Documentation", "color": "red"},
            {"name": "Infrastructure", "color": "purple"},
            {"name": "Analytics", "color": "orange"},
            {"name": "CRM", "color": "pink"}
          ]
        }
      },
      "Status": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Not Started", "color": "gray"},
            {"name": "In Progress", "color": "yellow"},
            {"name": "Completed", "color": "green"},
            {"name": "Blocked", "color": "red"},
            {"name": "Cancelled", "color": "orange"}
          ]
        }
      },
      "Priority": {
        "type": "select",
        "select": {
          "options": [
            {"name": "Critical", "color": "red"},
            {"name": "High", "color": "orange"},
            {"name": "Medium", "color": "yellow"},
            {"name": "Low", "color": "green"}
          ]
        }
      },
      "Assignee": {"type": "people"},
      "Due Date": {"type": "date"},
      "Progress": {
        "type": "number",
        "number": {"format": "percent"}
      },
      "Dependencies": {
        "type": "relation",
        "relation": {
          "database_id": "self",
          "type": "dual_property"
        }
      },
      "Notes": {"type": "rich_text"}
    },
    "title": [
      {
        "type": "text",
        "text": {"content": "Project Tracking - DoktorABC Redesign"}
      }
    ],
    "description": [
      {
        "type": "text",
        "text": {"content": "Project status, milestones, and progress tracking"}
      }
    ]
  }
}
```

### Step 2: Import Data

After creating databases and noting their IDs, run the automated script:

```bash
npm run notion-import
```

This will generate the function calls needed to import all data. Copy and execute them in Cursor.

### Step 3: Create Documentation Pages

Create a README page with project overview:

```json
{
  "name": "user-Notion-notion-create-pages",
  "parameters": {
    "pages": [
      {
        "properties": {
          "title": [
            {
              "text": {
                "content": "DoktorABC_Redesign - Project Overview"
              }
            }
          ]
        },
        "content": "[README content will be automatically generated]"
      }
    ]
  }
}
```

## 🎯 Post-Import Configuration

### Database Views
Create useful views for each database:

**Design System Views:**
- **All Tokens** - Default table view
- **By Category** - Grouped by category
- **Active Only** - Filtered to active tokens
- **By Platform** - Filtered by platform support

**UI Events Views:**
- **All Events** - Default table view
- **By Page** - Grouped by page
- **By Status** - Filtered by implementation status
- **By Priority** - Sorted by priority

**Project Tracking Views:**
- **Active Tasks** - Filtered to non-completed tasks
- **By Category** - Grouped by category
- **Overdue** - Filtered to past due dates
- **Completed** - Archive of finished tasks

### Relations and Links
Set up cross-database relationships:
- Link UI Events to Design System tokens where applicable
- Create dependencies between Project Tracking tasks
- Link documentation pages to relevant database entries

### Templates
Create templates for:
- New design tokens
- New UI events
- New project tasks
- Status update entries

## 📊 Data Summary

After import, your Notion workspace will contain:

| Database | Items | Key Data |
|----------|-------|----------|
| **Design System** | ~50+ tokens | Colors, typography, spacing, components |
| **UI Events** | ~100+ events | Homepage, product, category, search events |
| **Project Tracking** | ~10+ tasks | Current project status and milestones |
| **Documentation** | 1+ pages | README, guides, and references |

## 🔍 Verification

After import, verify data integrity:

1. **Design System**: Check that all color values start with `#`
2. **UI Events**: Verify event names follow naming convention
3. **Project Tracking**: Confirm progress percentages are between 0-1
4. **Documentation**: Ensure README content is properly formatted

## 🚨 Troubleshooting

### Common Issues

**MCP Tool Not Available**
```
Error: user-Notion-notion-create-database not found
```
- Ensure Notion MCP is properly configured in Cursor
- Check MCP server status in Cursor settings

**Database Creation Fails**
```
Error: Invalid property configuration
```
- Verify JSON syntax is correct
- Check that all required properties are included

**Data Import Fails**
```
Error: Database ID not found
```
- Ensure database was created successfully
- Use correct database ID in import calls

### Recovery Steps

1. **Check MCP Configuration**: Verify Notion integration is active
2. **Test Individual Calls**: Run database creation one at a time
3. **Verify Data**: Use dry-run script first
4. **Partial Imports**: Import data in smaller batches if needed

## 🎉 Success Criteria

Your Notion import is successful when:

- ✅ All three databases are created with correct properties
- ✅ Design tokens are imported with proper categorization
- ✅ UI events are mapped with all required metadata
- ✅ Project tracking shows current status and progress
- ✅ Documentation pages are created and linked
- ✅ Cross-database relations are established
- ✅ Useful views and filters are configured

## 📞 Support

If you encounter issues:

1. Run the dry-run script: `npm run notion-import-dry-run`
2. Check the generated output for syntax errors
3. Verify your Notion MCP integration status
4. Review the troubleshooting section above

---

**Import Generated**: December 14, 2025
**Data Sources**: Design tokens, event mappings, project tracking
**Target**: Notion workspace with structured databases