#!/usr/bin/env node

/**
 * Duplicate Tracking Monitor
 * Queries Mixpanel for recent events and detects duplicate tracking
 * Identifies if both old and new event names are being fired
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  token: 'vkFfPe1vI5wMr9KIOtjSvalW8rAmUCNz',
  project_id: '2280288',
  api_secret: process.env.MIXPANEL_API_SECRET || '',
  eu_endpoint: 'api-eu.mixpanel.com'
};

// Load mapping data for comparison
function loadMappingData() {
  const mappingPath = path.join(__dirname, '../../data/analytics/event-mapping-final.json');

  if (!fs.existsSync(mappingPath)) {
    throw new Error('event-mapping-final.json not found. Run hybrid-matcher.js first.');
  }

  return JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
}

// API request utility
function makeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({
      ...params,
      api_secret: CONFIG.api_secret
    });

    const url = `https://${CONFIG.eu_endpoint}${endpoint}?${queryParams}`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (e) {
            reject(new Error(`Invalid JSON response: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Get recent events from Mixpanel
async function getRecentEvents(hoursBack = 24) {
  console.log(`Fetching events from last ${hoursBack} hours...`);

  const fromDate = new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString().split('T')[0];
  const toDate = new Date().toISOString().split('T')[0];

  try {
    const response = await makeRequest('/api/2.0/export', {
      from_date: fromDate,
      to_date: toDate,
      limit: 10000 // Get a good sample
    });

    // Parse NDJSON response
    const lines = response.split('\n').filter(line => line.trim());
    const events = lines.map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    }).filter(event => event !== null);

    console.log(`Retrieved ${events.length} events from Mixpanel`);
    return events;

  } catch (error) {
    console.error('Error fetching recent events:', error.message);
    throw error;
  }
}

// Analyze events for duplicates
function analyzeDuplicates(events, mappingData) {
  console.log('Analyzing events for duplicates...');

  const analysis = {
    total_events: events.length,
    unique_events: new Set(),
    event_counts: {},
    potential_duplicates: [],
    confirmed_duplicates: [],
    unmapped_events: []
  };

  // Count event frequencies
  events.forEach(event => {
    const eventName = event.name || event.event;
    analysis.unique_events.add(eventName);
    analysis.event_counts[eventName] = (analysis.event_counts[eventName] || 0) + 1;
  });

  analysis.unique_events = Array.from(analysis.unique_events);

  // Check for mapped events that might have duplicates
  mappingData.mappings.forEach(mapping => {
    const csvEvent = mapping.csv_event;
    const mixpanelEvent = mapping.mixpanel_event;

    // Check if both CSV and Mixpanel event names are being tracked
    const csvEventCount = analysis.event_counts[csvEvent] || 0;
    const mixpanelEventCount = analysis.event_counts[mixpanelEvent] || 0;

    if (csvEventCount > 0 && mixpanelEventCount > 0 && csvEvent !== mixpanelEvent) {
      analysis.confirmed_duplicates.push({
        csv_event: csvEvent,
        mixpanel_event: mixpanelEvent,
        csv_count: csvEventCount,
        mixpanel_count: mixpanelEventCount,
        total_duplicate_events: csvEventCount + mixpanelEventCount,
        mapping_confidence: mapping.confidence_score,
        issue: 'Both old and new event names detected'
      });
    }

    // Check for potential duplicates (similar event names)
    analysis.unique_events.forEach(eventName => {
      if (eventName !== csvEvent && eventName !== mixpanelEvent) {
        const similarity = calculateStringSimilarity(eventName, csvEvent);
        if (similarity > 0.8) {
          analysis.potential_duplicates.push({
            original_event: csvEvent,
            similar_event: eventName,
            similarity_score: similarity,
            original_count: analysis.event_counts[csvEvent] || 0,
            similar_count: analysis.event_counts[eventName] || 0
          });
        }
      }
    });
  });

  // Find unmapped events
  analysis.unmapped_events = analysis.unique_events.filter(eventName => {
    return !mappingData.mappings.some(mapping =>
      mapping.csv_event === eventName || mapping.mixpanel_event === eventName
    );
  });

  return analysis;
}

// Simple string similarity calculation
function calculateStringSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const distance = getLevenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

// Levenshtein distance
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

// Generate monitoring report
function generateMonitoringReport(analysis, mappingData) {
  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      monitoring_period: '24 hours',
      project_id: CONFIG.project_id
    },
    summary: {
      total_events_analyzed: analysis.total_events,
      unique_events_found: analysis.unique_events.length,
      confirmed_duplicates: analysis.confirmed_duplicates.length,
      potential_duplicates: analysis.potential_duplicates.length,
      unmapped_events: analysis.unmapped_events.length,
      duplicate_events_count: analysis.confirmed_duplicates.reduce((sum, dup) => sum + dup.total_duplicate_events, 0)
    },
    analysis,
    alerts: [],
    recommendations: []
  };

  // Generate alerts
  if (analysis.confirmed_duplicates.length > 0) {
    report.alerts.push({
      level: 'critical',
      title: 'Duplicate Event Tracking Detected',
      description: `${analysis.confirmed_duplicates.length} events are being tracked with both old and new names`,
      impact: `Wasting ${(analysis.confirmed_duplicates.reduce((sum, dup) => sum + dup.total_duplicate_events, 0) / analysis.total_events * 100).toFixed(1)}% of event quota`,
      action_required: 'Immediately fix event mapping implementation'
    });
  }

  if (analysis.potential_duplicates.length > 0) {
    report.alerts.push({
      level: 'warning',
      title: 'Potential Duplicate Events',
      description: `${analysis.potential_duplicates.length} similar event names detected`,
      impact: 'May indicate incomplete mapping or inconsistent naming',
      action_required: 'Review and potentially merge similar events'
    });
  }

  if (analysis.unmapped_events.length > 0) {
    report.alerts.push({
      level: 'info',
      title: 'Unmapped Events Detected',
      description: `${analysis.unmapped_events.length} events not in mapping configuration`,
      impact: 'New events or mapping gaps identified',
      action_required: 'Update mapping configuration if needed'
    });
  }

  // Generate recommendations
  if (report.summary.confirmed_duplicates > 0) {
    report.recommendations.push({
      priority: 'high',
      title: 'Fix Duplicate Tracking',
      description: 'Update EventTracker implementation to use mapped event names only',
      estimated_savings: `${(analysis.confirmed_duplicates.reduce((sum, dup) => sum + dup.total_duplicate_events, 0) / analysis.total_events * 100).toFixed(1)}% event quota reduction`
    });
  }

  report.recommendations.push({
    priority: 'medium',
    title: 'Implement Automated Monitoring',
    description: 'Set up daily monitoring to detect duplicate tracking issues',
    estimated_savings: 'Prevents future duplicate tracking waste'
  });

  return report;
}

// Save monitoring report
function saveMonitoringReport(report) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `duplicate-monitoring-${timestamp}.json`;
  const filepath = path.join(__dirname, '../../data/analytics', filename);

  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));

  // Also update latest report
  const latestPath = path.join(__dirname, '../../data/analytics/duplicate-monitoring-latest.json');
  fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));

  return filepath;
}

// Main execution
async function main() {
  try {
    console.log('Starting duplicate tracking monitoring...');

    if (!CONFIG.api_secret) {
      throw new Error('MIXPANEL_API_SECRET environment variable is required');
    }

    // Load mapping data
    const mappingData = loadMappingData();
    console.log(`Loaded ${mappingData.mappings.length} event mappings`);

    // Get recent events
    const events = await getRecentEvents(24);

    if (events.length === 0) {
      console.log('No events found in the last 24 hours');
      return;
    }

    // Analyze for duplicates
    const analysis = analyzeDuplicates(events, mappingData);

    // Generate report
    const report = generateMonitoringReport(analysis, mappingData);

    // Save report
    const reportPath = saveMonitoringReport(report);

    console.log(`✅ Duplicate monitoring complete! Report saved to ${reportPath}`);

    // Summary output
    console.log('\n=== MONITORING SUMMARY ===');
    console.log(`Events Analyzed: ${report.summary.total_events_analyzed}`);
    console.log(`Unique Events: ${report.summary.unique_events_found}`);
    console.log(`Confirmed Duplicates: ${report.summary.confirmed_duplicates}`);
    console.log(`Potential Duplicates: ${report.summary.potential_duplicates}`);
    console.log(`Unmapped Events: ${report.summary.unmapped_events}`);

    if (report.alerts.length > 0) {
      console.log('\n🚨 ALERTS:');
      report.alerts.forEach(alert => {
        console.log(`[${alert.level.toUpperCase()}] ${alert.title}: ${alert.description}`);
      });
    }

    if (report.summary.confirmed_duplicates > 0) {
      console.log('\n❌ CONFIRMED DUPLICATES:');
      analysis.confirmed_duplicates.forEach(dup => {
        console.log(`- ${dup.csv_event} (${dup.csv_count}) ↔ ${dup.mixpanel_event} (${dup.mixpanel_count})`);
      });
    }

    // Exit with error code if critical issues found
    if (report.summary.confirmed_duplicates > 0) {
      console.log('\n⚠️  Critical duplicate tracking detected! Implementation needs fixing.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error during duplicate monitoring:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  getRecentEvents,
  analyzeDuplicates,
  generateMonitoringReport
};
