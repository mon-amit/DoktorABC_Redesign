#!/usr/bin/env node

/**
 * CSV Events Extraction Script
 * Reads all CSV files from deliverables/dean-delivery-package/excel-files/
 * Parses event names, properties, and RCA descriptions
 * Outputs normalized master JSON file
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// CSV directory path
const CSV_DIR = path.join(__dirname, '../../deliverables/dean-delivery-package/excel-files');

// Parse CSV file
function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const events = [];

    fs.createReadStream(filePath)
      .pipe(csv({
        headers: ['event_name', 'properties', 'rca_description'],
        skipEmptyLines: true
      }))
      .on('data', (row) => {
        // Skip header rows and empty rows
        if (!row.event_name ||
            row.event_name.toLowerCase().includes('event name') ||
            row.event_name.trim() === '') {
          return;
        }

        // Clean and parse the row
        const event = {
          event_name: row.event_name.trim(),
          properties: parseProperties(row.properties),
          rca_description: (row.rca_description || '').trim(),
          source_file: path.basename(filePath),
          page: extractPageFromFilename(filePath),
          platform: extractPlatformFromFilename(filePath)
        };

        events.push(event);
      })
      .on('end', () => {
        resolve(events);
      })
      .on('error', reject);
  });
}

// Parse properties string into array
function parseProperties(propertiesString) {
  if (!propertiesString || propertiesString.trim() === '') {
    return [];
  }

  // Handle various formats:
  // "prop1, prop2, prop3"
  // "prop1,prop2,prop3"
  // "prop1, prop2"
  // "prop1"

  return propertiesString
    .split(',')
    .map(prop => prop.trim())
    .filter(prop => prop.length > 0)
    .map(prop => prop.toLowerCase().replace(/\s+/g, '_')); // Normalize to snake_case
}

// Extract page name from filename
function extractPageFromFilename(filePath) {
  const filename = path.basename(filePath, '.csv');
  // Remove platform suffix (e.g., -web, -mobile)
  const pageName = filename.replace(/-(web|mobile)$/, '');
  return pageName;
}

// Extract platform from filename
function extractPlatformFromFilename(filePath) {
  const filename = path.basename(filePath, '.csv');

  if (filename.endsWith('-web')) {
    return 'web';
  } else if (filename.endsWith('-mobile')) {
    return 'mobile';
  } else {
    return 'unknown';
  }
}

// Process all CSV files
async function processAllCSVFiles() {
  console.log('Processing CSV files...');

  const csvFiles = fs.readdirSync(CSV_DIR)
    .filter(file => file.endsWith('.csv'))
    .map(file => path.join(CSV_DIR, file));

  console.log(`Found ${csvFiles.length} CSV files`);

  const allEvents = [];
  let totalEvents = 0;

  for (const filePath of csvFiles) {
    try {
      console.log(`Processing: ${path.basename(filePath)}`);
      const events = await parseCSVFile(filePath);
      allEvents.push(...events);
      console.log(`  → ${events.length} events`);
      totalEvents += events.length;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`Total events extracted: ${totalEvents}`);
  return allEvents;
}

// Normalize event names
function normalizeEventNames(events) {
  console.log('Normalizing event names...');

  const normalizedEvents = events.map(event => {
    const normalized = { ...event };

    // Extract semantic components
    const components = extractEventComponents(event.event_name);

    normalized.normalized_name = components.normalized_name;
    normalized.semantic_components = components;
    normalized.name_variations = generateNameVariations(components);

    return normalized;
  });

  return normalizedEvents;
}

// Extract semantic components from event name
function extractEventComponents(eventName) {
  // Expected format: {platform}_{page}_{element}_{action}
  // Examples:
  // - web_homepage_cta_start_click
  // - mobile_product_add_to_cart_click
  // - web_checkout_payment_complete

  const parts = eventName.toLowerCase().split('_').filter(part => part.length > 0);

  // Try to identify components
  let platform = 'unknown';
  let page = 'unknown';
  let element = 'unknown';
  let action = 'unknown';

  // Platform detection
  if (parts[0] === 'web') {
    platform = 'web';
    parts.shift();
  } else if (parts[0] === 'mobile') {
    platform = 'mobile';
    parts.shift();
  }

  // Common page names
  const commonPages = [
    'homepage', 'category', 'product', 'checkout', 'account',
    'search', 'navigation', 'popups', 'treatment', 'bmi',
    'information', 'otc', 'brand'
  ];

  // Try to match page from remaining parts
  for (let i = 0; i < parts.length; i++) {
    if (commonPages.includes(parts[i])) {
      page = parts[i];
      parts.splice(0, i + 1);
      break;
    }
  }

  // Action detection (common actions at the end)
  const commonActions = [
    'click', 'view', 'show', 'hide', 'submit', 'complete',
    'start', 'finish', 'open', 'close', 'select', 'change',
    'scroll', 'hover', 'focus', 'blur'
  ];

  // Check last part for action
  if (parts.length > 0 && commonActions.includes(parts[parts.length - 1])) {
    action = parts.pop();
  }

  // Element is what's left
  if (parts.length > 0) {
    element = parts.join('_');
  }

  // Create normalized name
  const normalizedParts = [];
  if (platform !== 'unknown') normalizedParts.push(platform);
  if (page !== 'unknown') normalizedParts.push(page);
  if (element !== 'unknown') normalizedParts.push(element);
  if (action !== 'unknown') normalizedParts.push(action);

  const normalizedName = normalizedParts.join('_');

  return {
    original_name: eventName,
    normalized_name: normalizedName,
    platform,
    page,
    element,
    action,
    confidence: calculateNormalizationConfidence(platform, page, element, action)
  };
}

// Calculate confidence in normalization
function calculateNormalizationConfidence(platform, page, element, action) {
  let confidence = 0;

  if (platform !== 'unknown') confidence += 25;
  if (page !== 'unknown') confidence += 25;
  if (element !== 'unknown') confidence += 25;
  if (action !== 'unknown') confidence += 25;

  return confidence;
}

// Generate name variations for fuzzy matching
function generateNameVariations(components) {
  const variations = [];

  // Original name
  variations.push(components.original_name);

  // Normalized name
  if (components.normalized_name !== components.original_name) {
    variations.push(components.normalized_name);
  }

  // Common variations
  if (components.action) {
    // click vs _click vs button_click
    const actionVariations = [
      components.action,
      `_${components.action}`,
      `button_${components.action}`,
      `${components.element}_${components.action}`,
      `${components.action}_${components.element}`
    ];

    actionVariations.forEach(variation => {
      if (components.platform && components.page) {
        variations.push(`${components.platform}_${components.page}_${variation}`);
      }
    });
  }

  // Remove duplicates
  return [...new Set(variations)];
}

// Validate extracted events
function validateEvents(events) {
  console.log('Validating extracted events...');

  const validation = {
    total_events: events.length,
    valid_events: 0,
    invalid_events: 0,
    issues: []
  };

  events.forEach((event, index) => {
    let isValid = true;
    const issues = [];

    // Check required fields
    if (!event.event_name || event.event_name.trim() === '') {
      issues.push('Missing event name');
      isValid = false;
    }

    if (!Array.isArray(event.properties)) {
      issues.push('Properties should be an array');
      isValid = false;
    }

    if (typeof event.page !== 'string' || event.page === 'unknown') {
      issues.push('Could not determine page from filename');
    }

    if (typeof event.platform !== 'string' || event.platform === 'unknown') {
      issues.push('Could not determine platform from filename');
    }

    if (event.semantic_components.confidence < 50) {
      issues.push(`Low normalization confidence (${event.semantic_components.confidence}%)`);
    }

    if (isValid) {
      validation.valid_events++;
    } else {
      validation.invalid_events++;
      validation.issues.push({
        index,
        event_name: event.event_name,
        issues
      });
    }
  });

  return validation;
}

// Generate summary statistics
function generateSummary(events, validation) {
  const summary = {
    total_events: events.length,
    valid_events: validation.valid_events,
    invalid_events: validation.invalid_events,
    csv_files_processed: [...new Set(events.map(e => e.source_file))].length,
    pages_covered: [...new Set(events.map(e => e.page))],
    platforms_covered: [...new Set(events.map(e => e.platform))],
    property_distribution: {},
    normalization_confidence: {
      high: events.filter(e => e.semantic_components.confidence >= 75).length,
      medium: events.filter(e => e.semantic_components.confidence >= 50 && e.semantic_components.confidence < 75).length,
      low: events.filter(e => e.semantic_components.confidence < 50).length
    }
  };

  // Property distribution
  events.forEach(event => {
    event.properties.forEach(prop => {
      summary.property_distribution[prop] = (summary.property_distribution[prop] || 0) + 1;
    });
  });

  // Sort property distribution
  const sortedProps = Object.entries(summary.property_distribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20);

  summary.top_properties = sortedProps.map(([prop, count]) => ({
    property: prop,
    count,
    percentage: ((count / events.length) * 100).toFixed(1)
  }));

  return summary;
}

// Main execution
async function main() {
  try {
    console.log('Starting CSV events extraction...');

    // Process all CSV files
    const rawEvents = await processAllCSVFiles();

    if (rawEvents.length === 0) {
      throw new Error('No events found in CSV files');
    }

    // Normalize event names
    const normalizedEvents = normalizeEventNames(rawEvents);

    // Validate events
    const validation = validateEvents(normalizedEvents);

    // Generate summary
    const summary = generateSummary(normalizedEvents, validation);

    // Prepare final output
    const csvEventsData = {
      metadata: {
        generated_at: new Date().toISOString(),
        csv_directory: CSV_DIR,
        ...summary
      },
      events: normalizedEvents,
      validation,
      summary
    };

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/csv-events-master.json');
    fs.writeFileSync(outputPath, JSON.stringify(csvEventsData, null, 2));

    console.log(`✅ CSV extraction complete! Exported ${normalizedEvents.length} events to ${outputPath}`);

    // Summary output
    console.log('\n=== EXTRACTION SUMMARY ===');
    console.log(`Total Events: ${summary.total_events}`);
    console.log(`Valid Events: ${summary.valid_events}`);
    console.log(`Invalid Events: ${summary.invalid_events}`);
    console.log(`CSV Files Processed: ${summary.csv_files_processed}`);
    console.log(`Pages Covered: ${summary.pages_covered.join(', ')}`);
    console.log(`Platforms: ${summary.platforms_covered.join(', ')}`);

    console.log('\nNormalization Confidence:');
    console.log(`High (≥75%): ${summary.normalization_confidence.high}`);
    console.log(`Medium (50-74%): ${summary.normalization_confidence.medium}`);
    console.log(`Low (<50%): ${summary.normalization_confidence.low}`);

    console.log('\nTop Properties:');
    summary.top_properties.slice(0, 10).forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.property} (${prop.count} events, ${prop.percentage}%)`);
    });

    if (validation.issues.length > 0) {
      console.log('\n⚠️  Validation Issues:');
      validation.issues.slice(0, 5).forEach(issue => {
        console.log(`- Event ${issue.index}: ${issue.event_name}`);
        issue.issues.forEach(i => console.log(`  • ${i}`));
      });
      if (validation.issues.length > 5) {
        console.log(`... and ${validation.issues.length - 5} more issues`);
      }
    }

  } catch (error) {
    console.error('❌ Error during CSV extraction:', error.message);
    process.exit(1);
  }
}

// Check if csv-parser is available, install if needed
function ensureDependencies() {
  try {
    require('csv-parser');
  } catch (e) {
    console.log('Installing csv-parser dependency...');
    const { execSync } = require('child_process');
    execSync('npm install csv-parser', { stdio: 'inherit' });
  }
}

// Run if called directly
if (require.main === module) {
  ensureDependencies();
  main();
}

module.exports = {
  parseCSVFile,
  parseProperties,
  extractEventComponents,
  normalizeEventNames,
  validateEvents
};
