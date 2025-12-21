#!/usr/bin/env node

/**
 * Hybrid Matching Orchestrator
 * Combines exact, semantic, and property-based matching results
 * Resolves conflicts and produces final event mapping
 */

const fs = require('fs');
const path = require('path');

// Load all matching results
function loadMatchingResults() {
  const results = {
    exact: null,
    semantic: null,
    properties: null
  };

  // Load exact matches
  const exactFile = path.join(__dirname, '../../data/analytics/matches-exact.json');
  if (fs.existsSync(exactFile)) {
    results.exact = JSON.parse(fs.readFileSync(exactFile, 'utf8'));
  }

  // Load semantic matches
  const semanticFile = path.join(__dirname, '../../data/analytics/matches-semantic.json');
  if (fs.existsSync(semanticFile)) {
    results.semantic = JSON.parse(fs.readFileSync(semanticFile, 'utf8'));
  }

  // Load property matches
  const propertiesFile = path.join(__dirname, '../../data/analytics/matches-properties.json');
  if (fs.existsSync(propertiesFile)) {
    results.properties = JSON.parse(fs.readFileSync(propertiesFile, 'utf8'));
  }

  return results;
}

// Combine all matches into a unified structure
function combineMatches(allResults) {
  const combinedMatches = new Map(); // csv_event -> array of potential matches

  // Process exact matches (highest priority)
  if (allResults.exact) {
    allResults.exact.results.matches.forEach(match => {
      if (!combinedMatches.has(match.csv_event)) {
        combinedMatches.set(match.csv_event, []);
      }
      combinedMatches.get(match.csv_event).push({
        ...match,
        source: 'exact',
        priority: 1,
        final_score: match.confidence_score
      });
    });
  }

  // Process semantic matches (medium priority)
  if (allResults.semantic) {
    allResults.semantic.results.matches.forEach(match => {
      if (!combinedMatches.has(match.csv_event)) {
        combinedMatches.set(match.csv_event, []);
      }

      // Check if this Mixpanel event is already matched by exact matching
      const existingMatches = combinedMatches.get(match.csv_event);
      const alreadyMatched = existingMatches.some(m =>
        m.mixpanel_event === match.mixpanel_event && m.source === 'exact'
      );

      if (!alreadyMatched) {
        combinedMatches.get(match.csv_event).push({
          ...match,
          source: 'semantic',
          priority: 2,
          final_score: match.confidence_score
        });
      }
    });
  }

  // Process property matches (lower priority)
  if (allResults.properties) {
    allResults.properties.results.matches.forEach(match => {
      if (!combinedMatches.has(match.csv_event)) {
        combinedMatches.set(match.csv_event, []);
      }

      // Check if this Mixpanel event is already matched by higher priority methods
      const existingMatches = combinedMatches.get(match.csv_event);
      const alreadyMatched = existingMatches.some(m =>
        m.mixpanel_event === match.mixpanel_event && (m.source === 'exact' || m.source === 'semantic')
      );

      if (!alreadyMatched) {
        combinedMatches.get(match.csv_event).push({
          ...match,
          source: 'properties',
          priority: 3,
          final_score: match.confidence_score
        });
      }
    });
  }

  return combinedMatches;
}

// Resolve conflicts when multiple matches exist for the same CSV event
function resolveConflicts(combinedMatches) {
  const resolvedMatches = [];
  const conflicts = [];

  for (const [csvEvent, matches] of combinedMatches) {
    if (matches.length === 1) {
      // No conflict, single match
      resolvedMatches.push({
        ...matches[0],
        conflict_resolved: false,
        conflict_reason: null
      });
    } else {
      // Multiple matches, resolve conflict
      const sortedMatches = matches.sort((a, b) => {
        // First sort by priority (exact > semantic > properties)
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        // Then by confidence score
        return b.final_score - a.final_score;
      });

      const bestMatch = sortedMatches[0];

      resolvedMatches.push({
        ...bestMatch,
        conflict_resolved: true,
        conflict_reason: 'multiple_matches',
        alternative_matches: sortedMatches.slice(1).map(m => ({
          mixpanel_event: m.mixpanel_event,
          source: m.source,
          confidence_score: m.confidence_score
        }))
      });

      if (matches.length > 2) {
        conflicts.push({
          csv_event: csvEvent,
          total_matches: matches.length,
          best_match: {
            mixpanel_event: bestMatch.mixpanel_event,
            source: bestMatch.source,
            confidence_score: bestMatch.final_score
          },
          alternatives: sortedMatches.slice(1)
        });
      }
    }
  }

  return { resolvedMatches, conflicts };
}

// Calculate hybrid confidence score combining all factors
function calculateHybridConfidence(match) {
  let baseScore = match.final_score;

  // Boost score for exact matches
  if (match.source === 'exact') {
    baseScore = Math.min(100, baseScore + 10);
  }

  // Boost score for semantic matches with high confidence
  if (match.source === 'semantic' && match.confidence_score >= 95) {
    baseScore = Math.min(100, baseScore + 5);
  }

  // Boost score for property matches with high overlap
  if (match.source === 'properties' && match.property_overlap >= 0.8) {
    baseScore = Math.min(100, baseScore + 5);
  }

  return Math.round(baseScore);
}

// Generate final mapping with all metadata
function generateFinalMapping(resolvedMatches, allResults) {
  const finalMapping = {
    metadata: {
      generated_at: new Date().toISOString(),
      algorithm: 'hybrid_matching_orchestrator',
      sources_combined: ['exact', 'semantic', 'properties'],
      total_csv_events: resolvedMatches.length,
      exact_matches: allResults.exact ? allResults.exact.summary.matched_events : 0,
      semantic_matches: allResults.semantic ? allResults.semantic.summary.matched_events : 0,
      property_matches: allResults.properties ? allResults.properties.summary.matched_events : 0
    },
    mappings: [],
    unmapped_events: []
  };

  // Get all CSV events that weren't matched
  const allCsvEvents = new Set();
  if (allResults.exact) {
    allResults.exact.results.unmatched_csv.forEach(event => allCsvEvents.add(event.event_name));
  }
  if (allResults.semantic) {
    allResults.semantic.results.unmatched_csv.forEach(event => allCsvEvents.add(event.event_name));
  }
  if (allResults.properties) {
    allResults.properties.results.unmatched_csv.forEach(event => allCsvEvents.add(event.event_name));
  }

  // Remove events that were eventually matched
  resolvedMatches.forEach(match => {
    allCsvEvents.delete(match.csv_event);
  });

  // Build final mappings
  resolvedMatches.forEach(match => {
    finalMapping.mappings.push({
      csv_event: match.csv_event,
      mixpanel_event: match.mixpanel_event,
      match_type: match.match_type,
      match_source: match.source,
      confidence_score: calculateHybridConfidence(match),
      original_confidence: match.final_score,
      conflict_resolved: match.conflict_resolved,
      conflict_reason: match.conflict_reason,
      alternative_matches: match.alternative_matches || [],
      property_overlap: match.property_overlap || null,
      csv_properties: match.csv_properties,
      csv_page: match.csv_page,
      csv_platform: match.csv_platform,
      csv_source_file: match.csv_source_file,
      csv_rca_description: match.csv_rca_description,
      semantic_components: match.semantic_components
    });
  });

  // Add unmapped events
  finalMapping.unmapped_events = Array.from(allCsvEvents).map(eventName => {
    // Find the original CSV event data
    let csvEvent = null;
    if (allResults.exact) {
      csvEvent = allResults.exact.results.unmatched_csv.find(e => e.event_name === eventName) ||
                 allResults.semantic?.results.unmatched_csv.find(e => e.event_name === eventName) ||
                 allResults.properties?.results.unmatched_csv.find(e => e.event_name === eventName);
    }
    return csvEvent || { event_name: eventName };
  });

  // Sort mappings by confidence score
  finalMapping.mappings.sort((a, b) => b.confidence_score - a.confidence_score);

  // Update metadata
  finalMapping.metadata.total_mapped_events = finalMapping.mappings.length;
  finalMapping.metadata.total_unmapped_events = finalMapping.unmapped_events.length;
  finalMapping.metadata.overall_match_rate = ((finalMapping.mappings.length /
    (finalMapping.mappings.length + finalMapping.unmapped_events.length)) * 100).toFixed(1);

  return finalMapping;
}

// Generate comprehensive report
function generateHybridReport(finalMapping, conflicts) {
  const report = {
    ...finalMapping,
    conflicts: conflicts,
    summary: {
      total_events_processed: finalMapping.metadata.total_csv_events,
      successfully_mapped: finalMapping.metadata.total_mapped_events,
      unmapped_events: finalMapping.metadata.total_unmapped_events,
      overall_match_rate: finalMapping.metadata.overall_match_rate,
      conflicts_resolved: conflicts.length,
      high_confidence_mappings: finalMapping.mappings.filter(m => m.confidence_score >= 90).length,
      medium_confidence_mappings: finalMapping.mappings.filter(m => m.confidence_score >= 70 && m.confidence_score < 90).length,
      low_confidence_mappings: finalMapping.mappings.filter(m => m.confidence_score < 70).length
    },
    insights: {
      match_distribution_by_source: {},
      match_distribution_by_page: {},
      match_distribution_by_platform: {},
      confidence_score_distribution: {
        '90-100%': 0,
        '80-89%': 0,
        '70-79%': 0,
        '60-69%': 0,
        '50-59%': 0,
        '0-49%': 0
      },
      top_unmapped_pages: [],
      mapping_recommendations: []
    }
  };

  // Analyze match distribution by source
  finalMapping.mappings.forEach(mapping => {
    const source = mapping.match_source;
    report.insights.match_distribution_by_source[source] = (report.insights.match_distribution_by_source[source] || 0) + 1;
  });

  // Analyze match distribution by page
  finalMapping.mappings.forEach(mapping => {
    const page = mapping.csv_page;
    report.insights.match_distribution_by_page[page] = (report.insights.match_distribution_by_page[page] || 0) + 1;
  });

  // Analyze match distribution by platform
  finalMapping.mappings.forEach(mapping => {
    const platform = mapping.csv_platform;
    report.insights.match_distribution_by_platform[platform] = (report.insights.match_distribution_by_platform[platform] || 0) + 1;
  });

  // Analyze confidence score distribution
  finalMapping.mappings.forEach(mapping => {
    const score = mapping.confidence_score;
    if (score >= 90) report.insights.confidence_score_distribution['90-100%']++;
    else if (score >= 80) report.insights.confidence_score_distribution['80-89%']++;
    else if (score >= 70) report.insights.confidence_score_distribution['70-79%']++;
    else if (score >= 60) report.insights.confidence_score_distribution['60-69%']++;
    else if (score >= 50) report.insights.confidence_score_distribution['50-59%']++;
    else report.insights.confidence_score_distribution['0-49%']++;
  });

  // Find top unmapped pages
  const unmappedByPage = {};
  finalMapping.unmapped_events.forEach(event => {
    const page = event.page || 'unknown';
    unmappedByPage[page] = (unmappedByPage[page] || 0) + 1;
  });

  report.insights.top_unmapped_pages = Object.entries(unmappedByPage)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([page, count]) => ({ page, count }));

  // Generate mapping recommendations
  if (finalMapping.unmapped_events.length > 0) {
    report.insights.mapping_recommendations = [
      {
        priority: 'high',
        recommendation: 'Review unmapped events manually - they may need new Mixpanel events',
        affected_events: finalMapping.unmapped_events.length,
        action: 'Check if these events are truly new or if naming conventions need adjustment'
      },
      {
        priority: 'medium',
        recommendation: 'Review low-confidence mappings (<70%)',
        affected_events: report.summary.low_confidence_mappings,
        action: 'Manually verify these mappings before implementation'
      },
      {
        priority: 'low',
        recommendation: 'Consider property schema updates for better matching',
        affected_events: 'N/A',
        action: 'Update event property definitions to improve future matching accuracy'
      }
    ];
  }

  return report;
}

// Main execution
function main() {
  try {
    console.log('Starting hybrid matching orchestrator...');

    // Load all matching results
    const allResults = loadMatchingResults();

    if (!allResults.exact || !allResults.semantic || !allResults.properties) {
      console.error('❌ Missing matching results. Please run all matching algorithms first:');
      if (!allResults.exact) console.error('  - Run match-exact-names.js');
      if (!allResults.semantic) console.error('  - Run match-semantic-similarity.js');
      if (!allResults.properties) console.error('  - Run match-by-properties.js');
      process.exit(1);
    }

    console.log('Combining results from all matching algorithms...');

    // Combine all matches
    const combinedMatches = combineMatches(allResults);

    // Resolve conflicts
    const { resolvedMatches, conflicts } = resolveConflicts(combinedMatches);

    console.log(`Resolved ${conflicts.length} conflicts from ${combinedMatches.size} total CSV events`);

    // Generate final mapping
    const finalMapping = generateFinalMapping(resolvedMatches, allResults);

    // Generate comprehensive report
    const report = generateHybridReport(finalMapping, conflicts);

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/event-mapping-final.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log(`✅ Hybrid matching orchestrator complete! Exported final mapping to ${outputPath}`);

    // Summary output
    console.log('\n=== HYBRID MATCHING ORCHESTRATOR SUMMARY ===');
    console.log(`Total CSV Events Processed: ${report.summary.total_events_processed}`);
    console.log(`Successfully Mapped: ${report.summary.successfully_mapped}`);
    console.log(`Unmapped Events: ${report.summary.unmapped_events}`);
    console.log(`Overall Match Rate: ${report.summary.overall_match_rate}%`);
    console.log(`Conflicts Resolved: ${report.summary.conflicts_resolved}`);

    console.log('\nConfidence Score Distribution:');
    Object.entries(report.insights.confidence_score_distribution).forEach(([bucket, count]) => {
      if (count > 0) console.log(`- ${bucket}: ${count} mappings`);
    });

    console.log('\nMatch Distribution by Source:');
    Object.entries(report.insights.match_distribution_by_source)
      .sort(([,a], [,b]) => b - a)
      .forEach(([source, count]) => {
        console.log(`- ${source}: ${count} mappings`);
      });

    if (report.insights.top_unmapped_pages.length > 0) {
      console.log('\nTop Unmapped Pages:');
      report.insights.top_unmapped_pages.forEach((item, index) => {
        console.log(`${index + 1}. ${item.page}: ${item.count} unmapped events`);
      });
    }

    if (conflicts.length > 0) {
      console.log('\n⚠️  Conflicts Resolved:');
      conflicts.slice(0, 3).forEach((conflict, index) => {
        console.log(`${index + 1}. ${conflict.csv_event}: ${conflict.total_matches} matches, chose ${conflict.best_match.mixpanel_event}`);
      });
      if (conflicts.length > 3) {
        console.log(`... and ${conflicts.length - 3} more conflicts`);
      }
    }

  } catch (error) {
    console.error('❌ Error during hybrid matching orchestration:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  combineMatches,
  resolveConflicts,
  generateFinalMapping,
  generateHybridReport
};
