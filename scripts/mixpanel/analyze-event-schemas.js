#!/usr/bin/env node

/**
 * Mixpanel Event Schema Analysis
 * Analyzes event schemas to identify common property patterns
 * Builds property frequency matrix for matching algorithms
 */

const fs = require('fs');
const path = require('path');

// Load existing events data
function loadExistingEvents() {
  const filePath = path.join(__dirname, '../../data/analytics/mixpanel-existing-events.json');

  if (!fs.existsSync(filePath)) {
    throw new Error('mixpanel-existing-events.json not found. Run query-existing-events.js first.');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
}

// Analyze property patterns across all events
function analyzePropertyPatterns(eventsData) {
  console.log('Analyzing property patterns...');

  const propertyFrequency = {};
  const propertyTypes = {};
  const eventPropertyMap = {};

  // Process each event's properties
  Object.entries(eventsData.event_details).forEach(([eventName, details]) => {
    eventPropertyMap[eventName] = details.properties || [];

    // Count property frequency and types
    details.properties.forEach(prop => {
      const propName = prop.name;
      const propType = prop.type || 'unknown';

      // Track frequency
      if (!propertyFrequency[propName]) {
        propertyFrequency[propName] = {
          count: 0,
          events: [],
          types: new Set()
        };
      }
      propertyFrequency[propName].count++;
      propertyFrequency[propName].events.push(eventName);
      propertyFrequency[propName].types.add(propType);

      // Track types
      if (!propertyTypes[propType]) {
        propertyTypes[propType] = [];
      }
      if (!propertyTypes[propType].includes(propName)) {
        propertyTypes[propType].push(propName);
      }
    });
  });

  // Convert types Set to Array for JSON serialization
  Object.keys(propertyFrequency).forEach(propName => {
    propertyFrequency[propName].types = Array.from(propertyFrequency[propName].types);
  });

  return {
    propertyFrequency,
    propertyTypes,
    eventPropertyMap,
    totalEvents: Object.keys(eventPropertyMap).length,
    totalUniqueProperties: Object.keys(propertyFrequency).length
  };
}

// Identify common property patterns
function identifyCommonPatterns(analysis) {
  console.log('Identifying common property patterns...');

  const patterns = {
    user_identifiers: [],
    timing_properties: [],
    location_properties: [],
    device_properties: [],
    content_properties: [],
    business_properties: []
  };

  // User identifiers
  const userIdPatterns = ['user_id', 'userId', 'distinct_id', 'user', 'customer_id', 'customerId'];
  patterns.user_identifiers = Object.keys(analysis.propertyFrequency)
    .filter(prop => userIdPatterns.some(pattern => prop.toLowerCase().includes(pattern.toLowerCase())));

  // Timing properties
  const timingPatterns = ['time', 'timestamp', 'date', 'created', 'updated', 'last_', 'first_'];
  patterns.timing_properties = Object.keys(analysis.propertyFrequency)
    .filter(prop => timingPatterns.some(pattern => prop.toLowerCase().includes(pattern.toLowerCase())));

  // Location properties
  const locationPatterns = ['url', 'path', 'page', 'referrer', 'location', 'country', 'city', 'region'];
  patterns.location_properties = Object.keys(analysis.propertyFrequency)
    .filter(prop => locationPatterns.some(pattern => prop.toLowerCase().includes(pattern.toLowerCase())));

  // Device properties
  const devicePatterns = ['device', 'browser', 'os', 'platform', 'mobile', 'desktop', 'screen', 'resolution'];
  patterns.device_properties = Object.keys(analysis.propertyFrequency)
    .filter(prop => devicePatterns.some(pattern => prop.toLowerCase().includes(pattern.toLowerCase())));

  // Content properties
  const contentPatterns = ['title', 'name', 'description', 'content', 'text', 'category', 'tag'];
  patterns.content_properties = Object.keys(analysis.propertyFrequency)
    .filter(prop => contentPatterns.some(pattern => prop.toLowerCase().includes(pattern.toLowerCase())));

  // Business properties
  const businessPatterns = ['price', 'amount', 'value', 'count', 'quantity', 'revenue', 'cost', 'profit'];
  patterns.business_properties = Object.keys(analysis.propertyFrequency)
    .filter(prop => businessPatterns.some(pattern => prop.toLowerCase().includes(pattern.toLowerCase())));

  return patterns;
}

// Build property similarity matrix for matching
function buildSimilarityMatrix(analysis) {
  console.log('Building property similarity matrix...');

  const properties = Object.keys(analysis.propertyFrequency);
  const similarityMatrix = {};

  properties.forEach(prop1 => {
    similarityMatrix[prop1] = {};

    properties.forEach(prop2 => {
      if (prop1 === prop2) {
        similarityMatrix[prop1][prop2] = 1.0; // Exact match
      } else {
        // Calculate similarity based on string similarity and common patterns
        const similarity = calculatePropertySimilarity(prop1, prop2);
        similarityMatrix[prop1][prop2] = similarity;
      }
    });
  });

  return similarityMatrix;
}

// Calculate similarity between two property names
function calculatePropertySimilarity(prop1, prop2) {
  // Normalize to lowercase
  const p1 = prop1.toLowerCase();
  const p2 = prop2.toLowerCase();

  // Exact match after normalization
  if (p1 === p2) return 1.0;

  // Check for camelCase vs snake_case variations
  const p1Normalized = p1.replace(/_/g, '').replace(/([A-Z])/g, '_$1').toLowerCase();
  const p2Normalized = p2.replace(/_/g, '').replace(/([A-Z])/g, '_$1').toLowerCase();

  if (p1Normalized === p2Normalized) return 0.95;

  // Check for common abbreviations
  const abbreviations = {
    'id': ['identifier', 'identification'],
    'url': ['uri', 'link', 'address'],
    'desc': ['description'],
    'qty': ['quantity'],
    'amt': ['amount']
  };

  for (const [abbrev, expansions] of Object.entries(abbreviations)) {
    if ((p1.includes(abbrev) && expansions.some(exp => p2.includes(exp))) ||
        (p2.includes(abbrev) && expansions.some(exp => p1.includes(exp)))) {
      return 0.9;
    }
  }

  // Levenshtein distance for small differences
  const levenshteinDistance = getLevenshteinDistance(p1, p2);
  const maxLength = Math.max(p1.length, p2.length);
  const distanceRatio = 1 - (levenshteinDistance / maxLength);

  if (distanceRatio > 0.8) return distanceRatio;

  // Check for substring matches
  if (p1.includes(p2) || p2.includes(p1)) return 0.7;

  return 0.0;
}

// Simple Levenshtein distance implementation
function getLevenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Generate schema analysis report
function generateSchemaReport(analysis, patterns, similarityMatrix) {
  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      total_events: analysis.totalEvents,
      total_properties: analysis.totalUniqueProperties
    },
    analysis,
    patterns,
    similarity_matrix: similarityMatrix,
    insights: {
      most_common_properties: Object.entries(analysis.propertyFrequency)
        .sort(([,a], [,b]) => b.count - a.count)
        .slice(0, 20)
        .map(([prop, data]) => ({
          property: prop,
          frequency: data.count,
          coverage_percent: (data.count / analysis.totalEvents * 100).toFixed(1),
          event_count: data.events.length
        })),
      property_type_distribution: Object.entries(analysis.propertyTypes)
        .map(([type, props]) => ({
          type,
          property_count: props.length,
          examples: props.slice(0, 5)
        })),
      pattern_coverage: Object.entries(patterns)
        .map(([category, props]) => ({
          category,
          property_count: props.length,
          coverage_percent: (props.length / Object.keys(analysis.propertyFrequency).length * 100).toFixed(1)
        }))
    }
  };

  return report;
}

// Main execution
function main() {
  try {
    console.log('Starting Mixpanel event schema analysis...');

    // Load existing events data
    const eventsData = loadExistingEvents();
    console.log(`Loaded ${eventsData.events.length} events from Mixpanel`);

    // Analyze property patterns
    const analysis = analyzePropertyPatterns(eventsData);

    // Identify common patterns
    const patterns = identifyCommonPatterns(analysis);

    // Build similarity matrix
    const similarityMatrix = buildSimilarityMatrix(analysis);

    // Generate comprehensive report
    const report = generateSchemaReport(analysis, patterns, similarityMatrix);

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/mixpanel-event-schemas.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(`✅ Schema analysis complete! Exported to ${outputPath}`);

    // Summary
    console.log('\n=== SCHEMA ANALYSIS SUMMARY ===');
    console.log(`Total Events Analyzed: ${analysis.totalEvents}`);
    console.log(`Unique Properties Found: ${analysis.totalUniqueProperties}`);

    console.log('\nTop 10 Most Common Properties:');
    report.insights.most_common_properties.slice(0, 10).forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.property} (${prop.frequency} events, ${prop.coverage_percent}% coverage)`);
    });

    console.log('\nProperty Pattern Categories:');
    Object.entries(patterns).forEach(([category, props]) => {
      console.log(`- ${category}: ${props.length} properties`);
    });

  } catch (error) {
    console.error('❌ Error during schema analysis:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  analyzePropertyPatterns,
  identifyCommonPatterns,
  buildSimilarityMatrix,
  calculatePropertySimilarity
};
