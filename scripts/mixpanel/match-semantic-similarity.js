#!/usr/bin/env node

/**
 * Semantic Similarity Matching Algorithm
 * Uses string similarity algorithms to match CSV events to Mixpanel events
 * Employs Levenshtein distance, Jaro-Winkler, and token-based similarity
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

// Load existing exact matches to avoid duplication
function loadExistingMatches() {
  const filePath = path.join(__dirname, '../../data/analytics/matches-exact.json');

  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return new Set(data.results.matches.map(m => m.csv_event));
  }

  return new Set();
}

// Calculate Levenshtein distance
function levenshteinDistance(str1, str2) {
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

// Calculate Jaro-Winkler similarity
function jaroWinklerSimilarity(str1, str2) {
  // Simplified Jaro-Winkler implementation
  if (str1 === str2) return 1.0;

  const len1 = str1.length;
  const len2 = str2.length;
  const maxLen = Math.max(len1, len2);
  const matchWindow = Math.floor(maxLen / 2) - 1;

  let matches = 0;
  let transpositions = 0;
  const matched1 = new Array(len1).fill(false);
  const matched2 = new Array(len2).fill(false);

  // Count matches
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(len2, i + matchWindow + 1);

    for (let j = start; j < end; j++) {
      if (!matched2[j] && str1[i] === str2[j]) {
        matched1[i] = true;
        matched2[j] = true;
        matches++;
        break;
      }
    }
  }

  if (matches === 0) return 0.0;

  // Count transpositions
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (matched1[i]) {
      while (!matched2[k]) k++;
      if (str1[i] !== str2[k]) transpositions++;
      k++;
    }
  }

  const jaro = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3;

  // Winkler modification (simplified)
  let prefixLength = 0;
  for (let i = 0; i < Math.min(len1, len2, 4); i++) {
    if (str1[i] === str2[i]) {
      prefixLength++;
    } else {
      break;
    }
  }

  return jaro + prefixLength * 0.1 * (1 - jaro);
}

// Tokenize event name and calculate token similarity
function calculateTokenSimilarity(str1, str2) {
  const tokens1 = str1.toLowerCase().split('_').filter(t => t.length > 0);
  const tokens2 = str2.toLowerCase().split('_').filter(t => t.length > 0);

  if (tokens1.length === 0 && tokens2.length === 0) return 1.0;
  if (tokens1.length === 0 || tokens2.length === 0) return 0.0;

  let matchingTokens = 0;
  const usedTokens2 = new Set();

  // Count exact token matches
  for (const token1 of tokens1) {
    for (let i = 0; i < tokens2.length; i++) {
      if (!usedTokens2.has(i) && token1 === tokens2[i]) {
        matchingTokens++;
        usedTokens2.add(i);
        break;
      }
    }
  }

  // Calculate weighted similarity
  const tokenMatchRatio = matchingTokens / Math.max(tokens1.length, tokens2.length);

  // Bonus for same token count
  const tokenCountBonus = tokens1.length === tokens2.length ? 0.1 : 0;

  // Bonus for common prefixes/suffixes
  let positionBonus = 0;
  const minLength = Math.min(tokens1.length, tokens2.length);
  for (let i = 0; i < minLength; i++) {
    if (tokens1[i] === tokens2[i]) {
      positionBonus += 0.05;
    } else {
      break;
    }
  }

  return Math.min(1.0, tokenMatchRatio + tokenCountBonus + positionBonus);
}

// Calculate semantic similarity between two event names
function calculateSemanticSimilarity(csvName, mixpanelName, csvComponents) {
  const csvLower = csvName.toLowerCase();
  const mixpanelLower = mixpanelName.toLowerCase();

  // Levenshtein similarity
  const levenshteinDist = levenshteinDistance(csvLower, mixpanelLower);
  const maxLength = Math.max(csvLower.length, mixpanelLower.length);
  const levenshteinSim = 1 - (levenshteinDist / maxLength);

  // Jaro-Winkler similarity
  const jaroWinklerSim = jaroWinklerSimilarity(csvLower, mixpanelLower);

  // Token-based similarity
  const tokenSim = calculateTokenSimilarity(csvName, mixpanelName);

  // Component-based similarity (using semantic components)
  let componentSim = 0;
  if (csvComponents) {
    const mixpanelTokens = mixpanelName.toLowerCase().split('_');

    const platformMatch = mixpanelTokens.includes(csvComponents.platform) ? 0.25 : 0;
    const pageMatch = mixpanelTokens.includes(csvComponents.page) ? 0.25 : 0;
    const actionMatch = mixpanelTokens.includes(csvComponents.action) ? 0.25 : 0;
    const elementMatch = csvComponents.element && mixpanelTokens.includes(csvComponents.element) ? 0.25 : 0;

    componentSim = platformMatch + pageMatch + actionMatch + elementMatch;
  }

  // Weighted combination
  const weights = {
    levenshtein: 0.3,
    jaroWinkler: 0.3,
    token: 0.25,
    component: 0.15
  };

  const combinedSimilarity = (
    levenshteinSim * weights.levenshtein +
    jaroWinklerSim * weights.jaroWinkler +
    tokenSim * weights.token +
    componentSim * weights.component
  );

  return {
    overall: combinedSimilarity,
    components: {
      levenshtein: levenshteinSim,
      jaro_winkler: jaroWinklerSim,
      token: tokenSim,
      component: componentSim
    }
  };
}

// Perform semantic similarity matching
function performSemanticMatching(csvEvents, mixpanelEvents, excludeMatched = true) {
  console.log('Performing semantic similarity matching...');

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
    let bestSimilarity = 0;

    // Try matching against all Mixpanel events
    for (const mixpanelEvent of mixpanelEvents) {
      const similarity = calculateSemanticSimilarity(
        csvEvent.event_name,
        mixpanelEvent,
        csvEvent.semantic_components
      );

      if (similarity.overall > bestSimilarity && similarity.overall >= 0.85) {
        bestSimilarity = similarity.overall;
        bestMatch = {
          csv_event: csvEvent.event_name,
          mixpanel_event: mixpanelEvent,
          match_type: 'semantic_similarity',
          confidence_score: Math.round(similarity.overall * 100),
          similarity_breakdown: similarity,
          csv_properties: csvEvent.properties,
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
      console.log(`🎯 Matched: ${csvEvent.event_name} → ${bestMatch.mixpanel_event} (${bestMatch.confidence_score}% confidence)`);
    } else {
      unmatchedCsv.push(csvEvent);
    }
  }

  // Sort matches by confidence score
  matches.sort((a, b) => b.confidence_score - a.confidence_score);

  return {
    matches,
    unmatched_csv: unmatchedCsv,
    threshold_used: 0.85
  };
}

// Generate matching report
function generateMatchingReport(results) {
  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      algorithm: 'semantic_similarity_matching',
      similarity_threshold: results.threshold_used,
      methods_used: ['levenshtein', 'jaro_winkler', 'token_based', 'component_based']
    },
    summary: {
      total_csv_events_processed: results.matches.length + results.unmatched_csv.length,
      matched_events: results.matches.length,
      unmatched_csv_events: results.unmatched_csv.length,
      match_rate_percent: ((results.matches.length / (results.matches.length + results.unmatched_csv.length)) * 100).toFixed(1),
      average_confidence: results.matches.length > 0 ?
        (results.matches.reduce((sum, m) => sum + m.confidence_score, 0) / results.matches.length).toFixed(1) : 0
    },
    results,
    insights: {
      confidence_distribution: {},
      match_distribution_by_page: {},
      match_distribution_by_platform: {},
      high_confidence_matches: results.matches.filter(m => m.confidence_score >= 95).length,
      medium_confidence_matches: results.matches.filter(m => m.confidence_score >= 85 && m.confidence_score < 95).length
    }
  };

  // Analyze confidence distribution
  const confidenceBuckets = {
    '95-100%': 0,
    '90-94%': 0,
    '85-89%': 0
  };

  results.matches.forEach(match => {
    if (match.confidence_score >= 95) confidenceBuckets['95-100%']++;
    else if (match.confidence_score >= 90) confidenceBuckets['90-94%']++;
    else if (match.confidence_score >= 85) confidenceBuckets['85-89%']++;
  });

  report.insights.confidence_distribution = confidenceBuckets;

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

  return report;
}

// Main execution
function main() {
  try {
    console.log('Starting semantic similarity matching...');

    // Load data
    const csvEvents = loadCSVEvents();
    const mixpanelEvents = loadMixpanelEvents();

    console.log(`Loaded ${csvEvents.length} CSV events and ${mixpanelEvents.length} Mixpanel events`);

    // Perform matching
    const results = performSemanticMatching(csvEvents, mixpanelEvents);

    // Generate report
    const report = generateMatchingReport(results);

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/matches-semantic.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(`✅ Semantic similarity matching complete! Exported results to ${outputPath}`);

    // Summary output
    console.log('\n=== SEMANTIC SIMILARITY MATCHING SUMMARY ===');
    console.log(`Total CSV Events Processed: ${report.summary.total_csv_events_processed}`);
    console.log(`Matched Events: ${report.summary.matched_events}`);
    console.log(`Unmatched CSV Events: ${report.summary.unmatched_csv_events}`);
    console.log(`Match Rate: ${report.summary.match_rate_percent}%`);
    console.log(`Average Confidence: ${report.summary.average_confidence}%`);

    console.log('\nConfidence Distribution:');
    Object.entries(report.insights.confidence_distribution).forEach(([bucket, count]) => {
      console.log(`- ${bucket}: ${count} matches`);
    });

    console.log('\nMatches by Page:');
    Object.entries(report.insights.match_distribution_by_page)
      .sort(([,a], [,b]) => b - a)
      .forEach(([page, count]) => {
        console.log(`- ${page}: ${count} matches`);
      });

    if (results.matches.length > 0) {
      console.log('\nTop 5 High-Confidence Matches:');
      results.matches.slice(0, 5).forEach((match, index) => {
        console.log(`${index + 1}. ${match.csv_event} → ${match.mixpanel_event} (${match.confidence_score}%)`);
      });
    }

  } catch (error) {
    console.error('❌ Error during semantic similarity matching:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  calculateSemanticSimilarity,
  performSemanticMatching,
  generateMatchingReport
};
