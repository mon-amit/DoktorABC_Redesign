#!/usr/bin/env node

/**
 * DoktorABC Redesign - Executable Notion Import Script
 *
 * This script uses Notion MCP tools to import project data.
 * Run with: node src/notion-import-executable.js
 */

const fs = require('fs');

// Import data
const designTokens = JSON.parse(fs.readFileSync('docs/design/design-system/consolidated/design-tokens.json', 'utf8'));

/**
 * Create Design System Database using Notion MCP
 */
function createDesignSystemDatabase() {
  return {
    "name": "user-Notion-notion-create-database",
    "parameters": {
      "properties": {
        "Token Name": {
          "type": "title"
        },
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
        "Value": {
          "type": "rich_text"
        },
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
        "Figma Node": {
          "type": "rich_text"
        },
        "Last Updated": {
          "type": "date"
        }
      },
      "title": [
        {
          "type": "text",
          "text": {
            "content": "Design System - DoktorABC Redesign"
          }
        }
      ],
      "description": [
        {
          "type": "text",
          "text": {
            "content": "Design tokens, colors, typography, spacing, and components extracted from Figma"
          }
        }
      ]
    }
  };
}

/**
 * Create UI Events Database using Notion MCP
 */
function createUIEventsDatabase() {
  return {
    "name": "user-Notion-notion-create-database",
    "parameters": {
      "properties": {
        "Event Name": {
          "type": "title"
        },
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
        "Element": {
          "type": "rich_text"
        },
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
        "CMS Properties": {
          "type": "rich_text"
        },
        "Figma Node ID": {
          "type": "rich_text"
        },
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
          "text": {
            "content": "UI Events - DoktorABC Redesign"
          }
        }
      ],
      "description": [
        {
          "type": "text",
          "text": {
            "content": "Analytics event mappings for user interactions and tracking"
          }
        }
      ]
    }
  };
}

/**
 * Create Project Tracking Database using Notion MCP
 */
function createProjectTrackingDatabase() {
  return {
    "name": "user-Notion-notion-create-database",
    "parameters": {
      "properties": {
        "Task": {
          "type": "title"
        },
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
        "Assignee": {
          "type": "people"
        },
        "Due Date": {
          "type": "date"
        },
        "Progress": {
          "type": "number",
          "number": {
            "format": "percent"
          }
        },
        "Dependencies": {
          "type": "relation",
          "relation": {
            "database_id": "self",
            "type": "dual_property"
          }
        },
        "Notes": {
          "type": "rich_text"
        }
      },
      "title": [
        {
          "type": "text",
          "text": {
            "content": "Project Tracking - DoktorABC Redesign"
          }
        }
      ],
      "description": [
        {
          "type": "text",
          "text": {
            "content": "Project status, milestones, and progress tracking"
          }
        }
      ]
    }
  };
}

/**
 * Generate design system pages data
 */
function generateDesignSystemPages(databaseId) {
  const pages = [];

  // Colors
  Object.entries(designTokens.tokens.colors).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          pages.push({
            "properties": {
              "Token Name": {
                "title": [
                  {
                    "text": {
                      "content": `colors/${category}/${key}`
                    }
                  }
                ]
              },
              "Category": {
                "select": {
                  "name": "Colors"
                }
              },
              "Value": {
                "rich_text": [
                  {
                    "text": {
                      "content": value
                    }
                  }
                ]
              },
              "Platform": {
                "multi_select": [
                  {"name": "Web"},
                  {"name": "Mobile"}
                ]
              },
              "Status": {
                "select": {
                  "name": "Active"
                }
              },
              "Last Updated": {
                "date": {
                  "start": designTokens.last_updated
                }
              }
            }
          });
        }
      });
    }
  });

  // Typography families
  Object.entries(designTokens.tokens.typography.families).forEach(([key, value]) => {
    pages.push({
      "properties": {
        "Token Name": {
          "title": [
            {
              "text": {
                "content": `typography/families/${key}`
              }
            }
          ]
        },
        "Category": {
          "select": {
            "name": "Typography"
          }
        },
        "Value": {
          "rich_text": [
            {
              "text": {
                "content": value
              }
            }
          ]
        },
        "Platform": {
          "multi_select": [
            {"name": "Web"},
            {"name": "Mobile"}
          ]
        },
        "Status": {
          "select": {
            "name": "Active"
          }
        },
        "Last Updated": {
          "date": {
            "start": designTokens.last_updated
          }
        }
      }
    });
  });

  return pages;
}

/**
 * Generate UI events pages data
 */
function generateUIEventsPages(databaseId) {
  const content = fs.readFileSync('docs/design/ui-event-mapping/master-event-map.md', 'utf8');
  const lines = content.split('\n');
  const pages = [];

  // Find the master event table
  const tableStart = lines.findIndex(line => line.includes('| Event Name |'));
  if (tableStart !== -1) {
    // Parse table rows
    for (let i = tableStart + 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || !line.includes('|') || line.includes('---')) continue;
      if (line.includes('Total Events')) break;

      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length >= 8) {
        let platform = cells[4];
        if (platform === 'both') platform = 'Both';

        pages.push({
          "properties": {
            "Event Name": {
              "title": [
                {
                  "text": {
                    "content": cells[0]
                  }
                }
              ]
            },
            "Trigger": {
              "select": {
                "name": cells[1]
              }
            },
            "Element": {
              "rich_text": [
                {
                  "text": {
                    "content": cells[2]
                  }
                }
              ]
            },
            "Page": {
              "select": {
                "name": cells[3]
              }
            },
            "Platform": {
              "select": {
                "name": platform.charAt(0).toUpperCase() + platform.slice(1)
              }
            },
            "CMS Properties": {
              "rich_text": [
                {
                  "text": {
                    "content": cells[5]
                  }
                }
              ]
            },
            "Figma Node ID": {
              "rich_text": [
                {
                  "text": {
                    "content": cells[6]
                  }
                }
              ]
            },
            "Status": {
              "select": {
                "name": cells[7]
              }
            },
            "Priority": {
              "select": {
                "name": "Medium"
              }
            }
          }
        });
      }
    }
  }

  return pages;
}

/**
 * Generate project tracking pages data
 */
function generateProjectTrackingPages(databaseId) {
  const statusContent = fs.readFileSync('docs/project-tracking/comprehensive-status.md', 'utf8');
  const pages = [];

  // Parse status tables
  const sections = statusContent.split('### ');

  sections.forEach(section => {
    if (section.includes('Executive Project Status')) {
      const lines = section.split('\n');
      const tableStart = lines.findIndex(line => line.includes('| Component |'));

      if (tableStart !== -1) {
        for (let i = tableStart + 2; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || !line.includes('|') || line.includes('---')) continue;
          if (line.includes('Directory-by-Directory')) break;

          const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
          if (cells.length >= 4) {
            const component = cells[0];
            const completion = cells[1];
            const status = cells[2];
            const notes = cells[3];

            // Parse completion percentage
            const percentMatch = completion.match(/(\d+)%/);
            const progress = percentMatch ? parseInt(percentMatch[1]) / 100 : 0;

            let statusValue = 'Not Started';
            if (status.includes('✅')) statusValue = 'Completed';
            else if (status.includes('🔄')) statusValue = 'In Progress';
            else if (status.includes('⏳')) statusValue = 'Not Started';

            pages.push({
              "properties": {
                "Task": {
                  "title": [
                    {
                      "text": {
                        "content": component
                      }
                    }
                  ]
                },
                "Category": {
                  "select": {
                    "name": "Project Management"
                  }
                },
                "Status": {
                  "select": {
                    "name": statusValue
                  }
                },
                "Priority": {
                  "select": {
                    "name": "High"
                  }
                },
                "Progress": {
                  "number": progress
                },
                "Notes": {
                  "rich_text": [
                    {
                      "text": {
                        "content": `${completion} - ${notes}`
                      }
                    }
                  ]
                }
              }
            });
          }
        }
      }
    }
  });

  return pages;
}

/**
 * Create README page
 */
function createReadmePage() {
  const readmeContent = fs.readFileSync('README.md', 'utf8');

  return {
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
          "content": readmeContent.split('\n').map(line => line ? `<p>${line}</p>` : '<empty-block/>').join('\n')
        }
      ]
    }
  };
}

/**
 * Main execution - output function calls for manual execution
 */
function main() {
  console.log('🚀 DoktorABC Redesign - Notion Import Script');
  console.log('=' .repeat(60));
  console.log('');
  console.log('This script generates function calls for Notion MCP tools.');
  console.log('Copy and execute each function call in Cursor to import data.');
  console.log('');
  console.log('📁 Step 1: Create Databases');
  console.log('');

  // Database creation calls
  console.log('1. Create Design System Database:');
  console.log(JSON.stringify(createDesignSystemDatabase(), null, 2));
  console.log('');

  console.log('2. Create UI Events Database:');
  console.log(JSON.stringify(createUIEventsDatabase(), null, 2));
  console.log('');

  console.log('3. Create Project Tracking Database:');
  console.log(JSON.stringify(createProjectTrackingDatabase(), null, 2));
  console.log('');

  // Note: In a real implementation, you'd need to capture the database IDs
  // and use them for the subsequent create-pages calls
  console.log('⚠️  IMPORTANT: After creating databases, note their IDs and update the parent database_id fields below.');
  console.log('');

  console.log('📊 Step 2: Import Data (after updating database IDs)');
  console.log('');

  // Generate sample data import calls
  const designPages = generateDesignSystemPages('YOUR_DESIGN_DB_ID');
  const eventPages = generateUIEventsPages('YOUR_EVENTS_DB_ID');
  const projectPages = generateProjectTrackingPages('YOUR_PROJECT_DB_ID');

  console.log('4. Import Design System Data:');
  console.log(`// Import ${designPages.length} design tokens`);
  console.log('// Replace YOUR_DESIGN_DB_ID with actual database ID');
  console.log(JSON.stringify({
    "name": "user-Notion-notion-create-pages",
    "parameters": {
      "parent": {
        "database_id": "YOUR_DESIGN_DB_ID"
      },
      "pages": designPages.slice(0, 5) // Show first 5 as example
    }
  }, null, 2));
  console.log(`// ... and ${designPages.length - 5} more pages`);
  console.log('');

  console.log('5. Import UI Events Data:');
  console.log(`// Import ${eventPages.length} UI events`);
  console.log('// Replace YOUR_EVENTS_DB_ID with actual database ID');
  console.log(JSON.stringify({
    "name": "user-Notion-notion-create-pages",
    "parameters": {
      "parent": {
        "database_id": "YOUR_EVENTS_DB_ID"
      },
      "pages": eventPages.slice(0, 5) // Show first 5 as example
    }
  }, null, 2));
  console.log(`// ... and ${eventPages.length - 5} more pages`);
  console.log('');

  console.log('6. Import Project Tracking Data:');
  console.log(`// Import ${projectPages.length} project tasks`);
  console.log('// Replace YOUR_PROJECT_DB_ID with actual database ID');
  console.log(JSON.stringify({
    "name": "user-Notion-notion-create-pages",
    "parameters": {
      "parent": {
        "database_id": "YOUR_PROJECT_DB_ID"
      },
      "pages": projectPages
    }
  }, null, 2));
  console.log('');

  console.log('📄 Step 3: Create Documentation');
  console.log('');
  console.log('7. Create README Page:');
  console.log(JSON.stringify(createReadmePage(), null, 2));
  console.log('');

  console.log('✅ Import Summary:');
  console.log(`- Design System: ${designPages.length} tokens`);
  console.log(`- UI Events: ${eventPages.length} events`);
  console.log(`- Project Tracking: ${projectPages.length} tasks`);
  console.log('- Documentation: README page');
  console.log('');
  console.log('🔗 Next Steps:');
  console.log('1. Execute the database creation calls in Cursor');
  console.log('2. Note the returned database IDs');
  console.log('3. Update the database IDs in the data import calls');
  console.log('4. Execute the data import calls');
  console.log('5. Create additional views, filters, and relations in Notion');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  createDesignSystemDatabase,
  createUIEventsDatabase,
  createProjectTrackingDatabase,
  generateDesignSystemPages,
  generateUIEventsPages,
  generateProjectTrackingPages,
  createReadmePage
};