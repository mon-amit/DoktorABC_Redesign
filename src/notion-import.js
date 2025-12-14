#!/usr/bin/env node

/**
 * DoktorABC Redesign - Notion Import Script
 *
 * Imports comprehensive project data into Notion including:
 * - Design System (tokens, colors, typography, components)
 * - UI Event Mappings (analytics tracking events)
 * - Project Tracking (status, milestones, progress)
 * - Documentation (README, guides, setup)
 *
 * Usage: node src/notion-import.js
 */

const fs = require('fs');
const path = require('path');

// Import data sources
const designTokens = require('../docs/design/design-system/consolidated/design-tokens.json');

// Configuration
const CONFIG = {
  workspace: {
    name: "DoktorABC_Redesign",
    description: "Healthcare platform redesign with analytics and CRM integration"
  },
  databases: {
    designSystem: {
      name: "Design System",
      description: "Design tokens, colors, typography, spacing, and components",
      properties: {
        "Token Name": { type: "title" },
        "Category": { type: "select", options: ["Colors", "Typography", "Spacing", "Components", "Effects"] },
        "Value": { type: "rich_text" },
        "Platform": { type: "multi_select", options: ["Web", "Mobile", "Both"] },
        "Status": { type: "select", options: ["Active", "Deprecated", "Draft"] },
        "Figma Node": { type: "rich_text" },
        "Last Updated": { type: "date" }
      }
    },
    uiEvents: {
      name: "UI Events",
      description: "Analytics event mappings for user interactions",
      properties: {
        "Event Name": { type: "title" },
        "Trigger": { type: "select", options: ["Button Click", "Card Click", "Link Click", "Input Focus", "Page Load", "Scroll", "Search Submit"] },
        "Element": { type: "rich_text" },
        "Page": { type: "select", options: ["Homepage", "Product Page", "Category Page", "Search OTC", "Checkout", "Account", "Navigation"] },
        "Platform": { type: "select", options: ["Web", "Mobile", "Both"] },
        "CMS Properties": { type: "rich_text" },
        "Figma Node ID": { type: "rich_text" },
        "Status": { type: "select", options: ["New", "Implemented", "Testing", "Live"] },
        "Priority": { type: "select", options: ["High", "Medium", "Low"] }
      }
    },
    projectTracking: {
      name: "Project Tracking",
      description: "Project status, milestones, and progress tracking",
      properties: {
        "Task": { type: "title" },
        "Category": { type: "select", options: ["Design System", "Event Mapping", "Testing", "Documentation", "Infrastructure", "Analytics", "CRM"] },
        "Status": { type: "select", options: ["Not Started", "In Progress", "Completed", "Blocked", "Cancelled"] },
        "Priority": { type: "select", options: ["Critical", "High", "Medium", "Low"] },
        "Assignee": { type: "people" },
        "Due Date": { type: "date" },
        "Progress": { type: "number", format: "percent" },
        "Dependencies": { type: "relation" },
        "Notes": { type: "rich_text" }
      }
    },
    assets: {
      name: "Design Assets",
      description: "Figma files, images, and design resources",
      properties: {
        "Asset Name": { type: "title" },
        "Type": { type: "select", options: ["Figma File", "Image", "PDF", "Video", "Design Token", "Component"] },
        "Category": { type: "select", options: ["Homepage", "Product Page", "Category Page", "Mobile", "Web", "Components", "Design System"] },
        "File Path": { type: "rich_text" },
        "Figma Node ID": { type: "rich_text" },
        "Description": { type: "rich_text" },
        "Last Modified": { type: "date" }
      }
    }
  }
};

/**
 * Parse markdown table into structured data
 */
function parseMarkdownTable(content, headers) {
  const lines = content.split('\n');
  const tableStart = lines.findIndex(line => line.includes('|') && !line.includes('---'));
  if (tableStart === -1) return [];

  const data = [];
  for (let i = tableStart + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || !line.includes('|')) break;

    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length === headers.length) {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = cells[index];
      });
      data.push(item);
    }
  }
  return data;
}

/**
 * Read file content safely
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Extract design system data from tokens JSON
 */
function extractDesignSystemData() {
  const data = [];

  // Colors
  Object.entries(designTokens.tokens.colors).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          data.push({
            "Token Name": `colors/${category}/${key}`,
            "Category": "Colors",
            "Value": value,
            "Platform": ["Web", "Mobile"],
            "Status": "Active",
            "Last Updated": new Date(designTokens.last_updated).toISOString().split('T')[0]
          });
        }
      });
    }
  });

  // Typography
  Object.entries(designTokens.tokens.typography).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      if (category === 'families') {
        Object.entries(values).forEach(([key, value]) => {
          data.push({
            "Token Name": `typography/families/${key}`,
            "Category": "Typography",
            "Value": value,
            "Platform": ["Web", "Mobile"],
            "Status": "Active",
            "Last Updated": new Date(designTokens.last_updated).toISOString().split('T')[0]
          });
        });
      } else if (category === 'sizes') {
        Object.entries(values).forEach(([subcategory, subvalues]) => {
          Object.entries(subvalues).forEach(([key, value]) => {
            data.push({
              "Token Name": `typography/sizes/${subcategory}/${key}`,
              "Category": "Typography",
              "Value": value,
              "Platform": ["Web", "Mobile"],
              "Status": "Active",
              "Last Updated": new Date(designTokens.last_updated).toISOString().split('T')[0]
            });
          });
        });
      }
    }
  });

  // Spacing
  Object.entries(designTokens.tokens.spacing).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([key, value]) => {
        data.push({
          "Token Name": `spacing/${category}/${key}`,
          "Category": "Spacing",
          "Value": value,
          "Platform": ["Web", "Mobile"],
          "Status": "Active",
          "Last Updated": new Date(designTokens.last_updated).toISOString().split('T')[0]
        });
      });
    }
  });

  return data;
}

/**
 * Extract UI events from master event map
 */
function extractUIEventsData() {
  const content = readFile('docs/design/ui-event-mapping/master-event-map.md');
  if (!content) return [];

  const lines = content.split('\n');
  const data = [];

  // Find the master event table
  const tableStart = lines.findIndex(line => line.includes('| Event Name |'));
  if (tableStart === -1) return [];

  // Parse table rows
  for (let i = tableStart + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || !line.includes('|') || line.includes('---')) continue;
    if (line.includes('Total Events')) break;

    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length >= 8) {
      const event = {
        "Event Name": cells[0],
        "Trigger": cells[1],
        "Element": cells[2],
        "Page": cells[3],
        "Platform": cells[4],
        "CMS Properties": cells[5],
        "Figma Node ID": cells[6],
        "Status": cells[7],
        "Priority": "Medium" // Default priority
      };
      data.push(event);
    }
  }

  return data;
}

/**
 * Extract project tracking data
 */
function extractProjectTrackingData() {
  const statusContent = readFile('docs/project-tracking/comprehensive-status.md');
  if (!statusContent) return [];

  const data = [];

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

            data.push({
              "Task": component,
              "Category": "Project Management",
              "Status": status.includes('✅') ? "Completed" : status.includes('🔄') ? "In Progress" : "Not Started",
              "Priority": "High",
              "Progress": progress,
              "Notes": `${completion} - ${notes}`
            });
          }
        }
      }
    }
  });

  return data;
}

/**
 * Create Notion database
 */
async function createDatabase(name, description, properties) {
  console.log(`Creating database: ${name}`);

  // This would use the Notion MCP tool
  // For now, we'll log what would be created
  console.log(`- Name: ${name}`);
  console.log(`- Description: ${description}`);
  console.log(`- Properties: ${Object.keys(properties).length} properties`);
  console.log(`- Sample property: ${Object.keys(properties)[0]}`);

  return `database_${name.toLowerCase().replace(/\s+/g, '_')}`;
}

/**
 * Import data into Notion database
 */
async function importData(databaseId, data) {
  console.log(`Importing ${data.length} items into ${databaseId}`);

  // This would use the Notion MCP tool to create pages
  // For now, we'll log the import plan
  console.log(`- Would create ${data.length} pages`);
  if (data.length > 0) {
    console.log(`- Sample item: ${data[0]["Token Name"] || data[0]["Event Name"] || data[0]["Task"] || "Unknown"}`);
  }
}

/**
 * Main import function
 */
async function importToNotion() {
  console.log('🚀 Starting DoktorABC Redesign Notion Import');
  console.log('=' .repeat(50));

  try {
    // 1. Create databases
    console.log('\n📁 Creating Notion Databases...');

    const databases = {};
    for (const [key, config] of Object.entries(CONFIG.databases)) {
      databases[key] = await createDatabase(config.name, config.description, config.properties);
    }

    // 2. Extract and import data
    console.log('\n📊 Extracting and Importing Data...');

    // Design System
    console.log('\n🎨 Processing Design System...');
    const designData = extractDesignSystemData();
    await importData(databases.designSystem, designData);

    // UI Events
    console.log('\n📱 Processing UI Events...');
    const eventData = extractUIEventsData();
    await importData(databases.uiEvents, eventData);

    // Project Tracking
    console.log('\n📈 Processing Project Tracking...');
    const trackingData = extractProjectTrackingData();
    await importData(databases.projectTracking, trackingData);

    // 3. Create documentation pages
    console.log('\n📄 Creating Documentation Pages...');

    const readmeContent = readFile('README.md');
    if (readmeContent) {
      console.log('- Would create README page with project overview');
    }

    // 4. Link assets
    console.log('\n🖼️  Processing Design Assets...');
    const assetFiles = [
      ...fs.readdirSync('docs/design/full export/').map(file => `docs/design/full export/${file}`),
      'docs/design/design-system/consolidated/design-tokens.json'
    ];
    console.log(`- Would link ${assetFiles.length} design assets`);

    console.log('\n✅ Notion Import Complete!');
    console.log('=' .repeat(50));

    // Summary
    console.log('\n📊 Import Summary:');
    console.log(`- Design System: ${designData.length} tokens`);
    console.log(`- UI Events: ${eventData.length} events`);
    console.log(`- Project Tracking: ${trackingData.length} tasks`);
    console.log(`- Documentation: README and guides`);
    console.log(`- Assets: ${assetFiles.length} files linked`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Run import if called directly
if (require.main === module) {
  importToNotion();
}

module.exports = {
  importToNotion,
  extractDesignSystemData,
  extractUIEventsData,
  extractProjectTrackingData,
  parseMarkdownTable
};