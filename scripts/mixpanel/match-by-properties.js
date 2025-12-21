#!/usr/bin/env node

/**
 * Property-Based Matching Algorithm
 * Matches CSV events to Mixpanel events based on property schema similarity
 * Compares property names, types, and usage patterns
 */

const fs = require('fs');
const path = require('path');

// Load CSV events data
function loadCSVEvents() {
  const filePath = path.join(__dirname, '../../data/analytics/csv-events-master.json');

  if (!fs.existsSync(filePath)) {
    throw new Error('csv-events-master.json not found. Run extract-csv-events.js first.');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data.events;
}

// Load Mixpanel events data
function loadMixpanelEvents() {
  const filePath = path.join(__dirname, '../../data/analytics/mixpanel-existing-events.json');

  if (!fs.existsSync(filePath)) {
    throw new Error('mixpanel-existing-events.json not found. Run query-existing-events.js first.');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
}

// Load existing matches to avoid duplication
function loadExistingMatches() {
  const existingMatches = new Set();

  // Load exact matches
  const exactFile = path.join(__dirname, '../../data/analytics/matches-exact.json');
  if (fs.existsSync(exactFile)) {
    const data = JSON.parse(fs.readFileSync(exactFile, 'utf8'));
    data.results.matches.forEach(m => existingMatches.add(m.csv_event));
  }

  // Load semantic matches
  const semanticFile = path.join(__dirname, '../../data/analytics/matches-semantic.json');
  if (fs.existsSync(semanticFile)) {
    const data = JSON.parse(fs.readFileSync(semanticFile, 'utf8'));
    data.results.matches.forEach(m => existingMatches.add(m.csv_event));
  }

  return existingMatches;
}

// Calculate property similarity between two property names
function calculatePropertySimilarity(prop1, prop2) {
  const p1 = prop1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const p2 = prop2.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Exact match
  if (p1 === p2) return 1.0;

  // Handle camelCase vs snake_case
  const p1Normalized = p1.replace(/([A-Z])/g, '_$1').toLowerCase();
  const p2Normalized = p2.replace(/([A-Z])/g, '_$1').toLowerCase();

  if (p1Normalized === p2Normalized) return 0.95;

  // Levenshtein distance for small differences
  const distance = getLevenshteinDistance(p1, p2);
  const maxLength = Math.max(p1.length, p2.length);
  const distanceRatio = 1 - (distance / maxLength);

  if (distanceRatio > 0.85) return distanceRatio;

  // Common abbreviations and synonyms
  const synonyms = {
    'id': ['identifier', 'identification', 'idx'],
    'name': ['title', 'label', 'heading'],
    'desc': ['description', 'text', 'content'],
    'qty': ['quantity', 'count', 'amount'],
    'price': ['cost', 'value', 'amount'],
    'url': ['link', 'uri', 'address'],
    'user': ['customer', 'person', 'account'],
    'time': ['timestamp', 'date', 'datetime'],
    'type': ['category', 'kind', 'class']
  };

  for (const [base, variations] of Object.entries(synonyms)) {
    if ((p1.includes(base) && variations.some(v => p2.includes(v))) ||
        (p2.includes(base) && variations.some(v => p1.includes(v)))) {
      return 0.9;
    }
  }

  return 0.0;
}

// Simple Levenshtein distance
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
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Calculate property schema overlap between CSV and Mixpanel events
function calculatePropertyOverlap(csvProperties, mixpanelProperties) {
  if (!csvProperties || csvProperties.length === 0) return { overlap: 0, matches: [] };
  if (!mixpanelProperties || mixpanelProperties.length === 0) return { overlap: 0, matches: [] };

  const matches = [];
  let totalSimilarity = 0;

  for (const csvProp of csvProperties) {
    let bestMatch = null;
    let bestSimilarity = 0;

    for (const mpProp of mixpanelProperties) {
      const similarity = calculatePropertySimilarity(csvProp, mpProp.name);

      if (similarity > bestSimilarity && similarity >= 0.7) { // Threshold for property matching
        bestSimilarity = similarity;
        bestMatch = {
          csv_property: csvProp,
          mixpanel_property: mpProp.name,
          similarity: similarity,
          mixpanel_type: mpProp.type
        };
      }
    }

    if (bestMatch) {
      matches.push(bestMatch);
      totalSimilarity += bestMatch.similarity;
    }
  }

  const overlapRatio = matches.length > 0 ? totalSimilarity / matches.length : 0;

  return {
    overlap: overlapRatio,
    matches: matches,
    matched_count: matches.length,
    csv_total: csvProperties.length,
    mixpanel_total: mixpanelProperties.length
  };
}

// Calculate weighted property overlap score
function calculateWeightedOverlapScore(csvProperties, mixpanelProperties, csvEvent) {
  const overlap = calculatePropertyOverlap(csvProperties, mixpanelProperties);

  if (overlap.overlap === 0) return 0;

  // Weight factors
  let score = overlap.overlap * 100; // Base overlap score

  // Bonus for high match count
  const matchRatio = overlap.matched_count / Math.max(csvProperties.length, 1);
  score += matchRatio * 20;

  // Bonus for matching important properties
  const importantProps = ['user_id', 'id', 'name', 'timestamp', 'time'];
  const importantMatches = overlap.matches.filter(m =>
    importantProps.some(imp => m.csv_property.toLowerCase().includes(imp))
  );
  score += (importantMatches.length / Math.max(importantProps.length, 1)) * 15;

  // Penalty for low overlap
  if (overlap.overlap < 0.5) {
    score *= 0.8;
  }

  return Math.min(100, Math.max(0, score));
}

// Perform property-based matching
function performPropertyMatching(csvEvents, mixpanelData, excludeMatched = true) {
  console.log('Performing property-based matching...');

  const matches = [];
  const unmatchedCsv = [];
  const excludedCsvEvents = excludeMatched ? loadExistingMatches() : new Set();

  let processed = 0;
  const total = csvEvents.length;

  for (const csvEvent of csvEvents) {
    processed++;
    if (processed % 10 === 0) {
      console.log(`Processing event ${processed}/${total}...`);
    }

    // Skip already matched events
    if (excludedCsvEvents.has(csvEvent.event_name)) {
      continue;
    }

    let bestMatch = null;
    let bestScore = 0;

    // Try matching against all Mixpanel events
    for (const mixpanelEvent of mixpanelData.events) {
      const mixpanelProps = mixpanelData.event_details[mixpanelEvent]?.properties || [];

      if (mixpanelProps.length === 0) continue;

      const score = calculateWeightedOverlapScore(csvEvent.properties, mixpanelProps, csvEvent);

      if (score > bestScore && score >= 50) { // Minimum threshold for property matching
        const overlap = calculatePropertyOverlap(csvEvent.properties, mixpanelProps);

        bestScore = score;
        bestMatch = {
          csv_event: csvEvent.event_name,
          mixpanel_event: mixpanelEvent,
          match_type: 'property_based',
          confidence_score: Math.round(score),
          property_overlap: overlap.overlap,
          property_matches: overlap.matches,
          csv_properties: csvEvent.properties,
          mixpanel_properties: mixpanelProps,
          csv_page: csvEvent.page,
          csv_platform: csvEvent.platform,
          csv_source_file: csvEvent.source_file,
          csv_rca_description: csvEvent.rca_description,
          semantic_components: csvEvent.semantic_components
        };
      }
    }

    if (bestMatch) {
      matches.push(bestMatch);
      console.log(`🔍 Matched: ${csvEvent.event_name} → ${bestMatch.mixpanel_event} (${bestMatch.confidence_score}% confidence, ${Math.round(bestMatch.property_overlap * 100)}% overlap)`);
    } else {
      unmatchedCsv.push(csvEvent);
    }
  }

  // Sort matches by confidence score
  matches.sort((a, b) => b.confidence_score - a.confidence_score);

  return {
    matches,
    unmatched_csv: unmatchedCsv,
    threshold_used: 50
  };
}

// Generate matching report
function generateMatchingReport(results) {
  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      algorithm: 'property_based_matching',
      confidence_threshold: results.threshold_used
    },
    summary: {
      total_csv_events_processed: results.matches.length + results.unmatched_csv.length,
      matched_events: results.matches.length,
      unmatched_csv_events: results.unmatched_csv.length,
      match_rate_percent: ((results.matches.length / (results.matches.length + results.unmatched_csv.length)) * 100).toFixed(1),
      average_confidence: results.matches.length > 0 ?
        (results.matches.reduce((sum, m) => sum + m.confidence_score, 0) / results.matches.length).toFixed(1) : 0,
      average_property_overlap: results.matches.length > 0 ?
        (results.matches.reduce((sum, m) => sum + m.property_overlap, 0) / results.matches.length * 100).toFixed(1) : 0
    },
    results,
    insights: {
      confidence_distribution: {},
      overlap_distribution: {},
      match_distribution_by_page: {},
      match_distribution_by_platform: {},
      property_match_patterns: {}
    }
  };

  // Analyze confidence distribution
  const confidenceBuckets = {
    '80-100%': 0,
    '60-79%': 0,
    '50-59%': 0
  };

  results.matches.forEach(match => {
    if (match.confidence_score >= 80) confidenceBuckets['80-100%']++;
    else if (match.confidence_score >= 60) confidenceBuckets['60-79%']++;
    else if (match.confidence_score >= 50) confidenceBuckets['50-59%']++;
  });

  report.insights.confidence_distribution = confidenceBuckets;

  // Analyze overlap distribution
  const overlapBuckets = {
    '80-100%': 0,
    '60-79%': 0,
    '40-59%': 0,
    '20-39%': 0
  };

  results.matches.forEach(match => {
    const overlapPercent = Math.round(match.property_overlap * 100);
    if (overlapPercent >= 80) overlapBuckets['80-100%']++;
    else if (overlapPercent >= 60) overlapBuckets['60-79%']++;
    else if (overlapPercent >= 40) overlapBuckets['40-59%']++;
    else if (overlapPercent >= 20) overlapBuckets['20-39%']++;
  });

  report.insights.overlap_distribution = overlapBuckets;

  // Analyze match distribution by page
  results.matches.forEach(match => {
    const page = match.csv_page;
    report.insights.match_distribution_by_page[page] = (report.insights.match_distribution_by_page[page] || 0) + 1;
  });

  // Analyze match distribution by platform
  results.matches.forEach(match => {
    const platform = match.csv_platform;
    report.insights.match_distribution_by_platform[platform] = (report.insights.match_distribution_by_platform[platform] || 0) + 1;
  });

  // Analyze property match patterns
  const propertyPatterns = {};
  results.matches.forEach(match => {
    match.property_matches.forEach(propMatch => {
      const pattern = `${propMatch.csv_property} → ${propMatch.mixpanel_property}`;
      propertyPatterns[pattern] = (propertyPatterns[pattern] || 0) + 1;
    });
  });

  report.insights.property_match_patterns = Object.entries(propertyPatterns)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .reduce((obj, [pattern, count]) => {
      obj[pattern] = count;
      return obj;
    }, {});

  return report;
}

// Main execution
function main() {
  try {
    console.log('Starting property-based matching...');

    // Load data
    const csvEvents = loadCSVEvents();
    const mixpanelData = loadMixpanelEvents();

    console.log(`Loaded ${csvEvents.length} CSV events and ${mixpanelData.events.length} Mixpanel events`);

    // Perform matching
    const results = performPropertyMatching(csvEvents, mixpanelData);

    // Generate report
    const report = generateMatchingReport(results);

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/matches-properties.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(`✅ Property-based matching complete! Exported results to ${outputPath}`);

    // Summary output
    console.log('\n=== PROPERTY-BASED MATCHING SUMMARY ===');
    console.log(`Total CSV Events Processed: ${report.summary.total_csv_events_processed}`);
    console.log(`Matched Events: ${report.summary.matched_events}`);
    console.log(`Unmatched CSV Events: ${report.summary.unmatched_csv_events}`);
    console.log(`Match Rate: ${report.summary.match_rate_percent}%`);
    console.log(`Average Confidence: ${report.summary.average_confidence}%`);
    console.log(`Average Property Overlap: ${report.summary.average_property_overlap}%`);

    console.log('\nConfidence Distribution:');
    Object.entries(report.insights.confidence_distribution).forEach(([bucket, count]) => {
      console.log(`- ${bucket}: ${count} matches`);
    });

    console.log('\nProperty Overlap Distribution:');
    Object.entries(report.insights.overlap_distribution).forEach(([bucket, count]) => {
      console.log(`- ${bucket}: ${count} matches`);
    });

    if (results.matches.length > 0) {
      console.log('\nTop 5 High-Confidence Matches:');
      results.matches.slice(0, 5).forEach((match, index) => {
        console.log(`${index + 1}. ${match.csv_event} → ${match.mixpanel_event} (${match.confidence_score}%, ${Math.round(match.property_overlap * 100)}% overlap)`);
      });
    }

  } catch (error) {
    console.error('❌ Error during property-based matching:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  calculatePropertyOverlap,
  calculateWeightedOverlapScore,
  performPropertyMatching,
  generateMatchingReport
};
