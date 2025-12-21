#!/usr/bin/env node

/**
 * Exact Name Matching Algorithm
 * Matches CSV events to Mixpanel events with identical names (case-insensitive)
 * Outputs matches with 100% confidence score
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
  return data.events;
}

// Perform exact name matching
function performExactMatching(csvEvents, mixpanelEvents) {
  console.log('Performing exact name matching...');

  const matches = [];
  const unmatchedCsv = [];
  const unmatchedMixpanel = new Set(mixpanelEvents);

  // Create case-insensitive sets for quick lookup
  const mixpanelEventSet = new Set(mixpanelEvents.map(e => e.toLowerCase()));
  const mixpanelEventMap = new Map();
  mixpanelEvents.forEach(event => {
    mixpanelEventMap.set(event.toLowerCase(), event);
  });

  // Match each CSV event
  csvEvents.forEach(csvEvent => {
    const csvName = csvEvent.event_name.toLowerCase();
    const csvNormalized = csvEvent.normalized_name.toLowerCase();

    // Try exact match with original name
    let matchedMixpanelEvent = null;
    if (mixpanelEventSet.has(csvName)) {
      matchedMixpanelEvent = mixpanelEventMap.get(csvName);
    }
    // Try exact match with normalized name
    else if (mixpanelEventSet.has(csvNormalized)) {
      matchedMixpanelEvent = mixpanelEventMap.get(csvNormalized);
    }
    // Try exact match with name variations
    else {
      for (const variation of csvEvent.name_variations) {
        const variationLower = variation.toLowerCase();
        if (mixpanelEventSet.has(variationLower)) {
          matchedMixpanelEvent = mixpanelEventMap.get(variationLower);
          break;
        }
      }
    }

    if (matchedMixpanelEvent) {
      // Found a match
      const match = {
        csv_event: csvEvent.event_name,
        mixpanel_event: matchedMixpanelEvent,
        match_type: 'exact',
        confidence_score: 100,
        matching_method: csvEvent.event_name.toLowerCase() === matchedMixpanelEvent.toLowerCase() ? 'original_name' :
                        csvEvent.normalized_name.toLowerCase() === matchedMixpanelEvent.toLowerCase() ? 'normalized_name' :
                        'name_variation',
        csv_properties: csvEvent.properties,
        csv_page: csvEvent.page,
        csv_platform: csvEvent.platform,
        csv_source_file: csvEvent.source_file,
        csv_rca_description: csvEvent.rca_description,
        semantic_components: csvEvent.semantic_components
      };

      matches.push(match);
      unmatchedMixpanel.delete(matchedMixpanelEvent);

      console.log(`✅ Matched: ${csvEvent.event_name} → ${matchedMixpanelEvent}`);
    } else {
      // No match found
      unmatchedCsv.push({
        ...csvEvent,
        attempted_matches: [
          csvEvent.event_name,
          csvEvent.normalized_name,
          ...csvEvent.name_variations
        ]
      });
    }
  });

  return {
    matches,
    unmatched_csv: unmatchedCsv,
    unmatched_mixpanel: Array.from(unmatchedMixpanel)
  };
}

// Generate matching report
function generateMatchingReport(results) {
  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      algorithm: 'exact_name_matching',
      confidence_threshold: 100
    },
    summary: {
      total_csv_events: results.matches.length + results.unmatched_csv.length,
      matched_events: results.matches.length,
      unmatched_csv_events: results.unmatched_csv.length,
      unmatched_mixpanel_events: results.unmatched_mixpanel.length,
      match_rate_percent: ((results.matches.length / (results.matches.length + results.unmatched_csv.length)) * 100).toFixed(1)
    },
    results,
    insights: {
      match_distribution_by_page: {},
      match_distribution_by_platform: {},
      match_distribution_by_matching_method: {},
      common_unmatched_patterns: []
    }
  };

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

  // Analyze matching methods
  results.matches.forEach(match => {
    const method = match.matching_method;
    report.insights.match_distribution_by_matching_method[method] = (report.insights.match_distribution_by_matching_method[method] || 0) + 1;
  });

  // Find common patterns in unmatched events
  const unmatchedPatterns = {};
  results.unmatched_csv.forEach(event => {
    const components = event.semantic_components;
    const pattern = `${components.platform}_${components.page}_${components.element}_${components.action}`;
    unmatchedPatterns[pattern] = (unmatchedPatterns[pattern] || 0) + 1;
  });

  report.insights.common_unmatched_patterns = Object.entries(unmatchedPatterns)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([pattern, count]) => ({ pattern, count }));

  return report;
}

// Main execution
function main() {
  try {
    console.log('Starting exact name matching...');

    // Load data
    const csvEvents = loadCSVEvents();
    const mixpanelEvents = loadMixpanelEvents();

    console.log(`Loaded ${csvEvents.length} CSV events and ${mixpanelEvents.length} Mixpanel events`);

    // Perform matching
    const results = performExactMatching(csvEvents, mixpanelEvents);

    // Generate report
    const report = generateMatchingReport(results);

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/matches-exact.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(`✅ Exact matching complete! Exported results to ${outputPath}`);

    // Summary output
    console.log('\n=== EXACT MATCHING SUMMARY ===');
    console.log(`Total CSV Events: ${report.summary.total_csv_events}`);
    console.log(`Matched Events: ${report.summary.matched_events}`);
    console.log(`Unmatched CSV Events: ${report.summary.unmatched_csv_events}`);
    console.log(`Unmatched Mixpanel Events: ${report.summary.unmatched_mixpanel_events}`);
    console.log(`Match Rate: ${report.summary.match_rate_percent}%`);

    console.log('\nMatches by Page:');
    Object.entries(report.insights.match_distribution_by_page)
      .sort(([,a], [,b]) => b - a)
      .forEach(([page, count]) => {
        console.log(`- ${page}: ${count} matches`);
      });

    console.log('\nMatches by Platform:');
    Object.entries(report.insights.match_distribution_by_platform)
      .sort(([,a], [,b]) => b - a)
      .forEach(([platform, count]) => {
        console.log(`- ${platform}: ${count} matches`);
      });

    console.log('\nMatching Methods Used:');
    Object.entries(report.insights.match_distribution_by_matching_method)
      .sort(([,a], [,b]) => b - a)
      .forEach(([method, count]) => {
        console.log(`- ${method}: ${count} matches`);
      });

    if (results.unmatched_csv.length > 0) {
      console.log('\n⚠️  Top Unmatched Patterns:');
      report.insights.common_unmatched_patterns.slice(0, 5).forEach((pattern, index) => {
        console.log(`${index + 1}. ${pattern.pattern} (${pattern.count} events)`);
      });
    }

  } catch (error) {
    console.error('❌ Error during exact matching:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  performExactMatching,
  generateMatchingReport
};
