#!/usr/bin/env node

/**
 * Mixpanel Event Discovery Script
 * Queries existing Mixpanel events via Data Export API
 * Exports to JSON for analysis and matching
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration - from event-tracking-config.json
const CONFIG = {
  token: 'vkFfPe1vI5wMr9KIOtjSvalW8rAmUCNz',
  project_id: '2280288',
  api_secret: process.env.MIXPANEL_API_SECRET || '', // Should be set as env var
  eu_endpoint: 'api-eu.mixpanel.com'
};

// Rate limiting
const RATE_LIMIT_DELAY = 100; // ms between requests
let lastRequestTime = 0;

// Utility function for API requests
function makeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
      const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest;
      console.log(`Rate limiting: waiting ${waitTime}ms...`);
      setTimeout(() => makeRequest(endpoint, params).then(resolve).catch(reject), waitTime);
      return;
    }
    lastRequestTime = now;

    const queryParams = new URLSearchParams({
      ...params,
      api_secret: CONFIG.api_secret
    });

    const url = `https://${CONFIG.eu_endpoint}${endpoint}?${queryParams}`;

    console.log(`Making request to: ${endpoint}`);

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

// Get all event names
async function getEventNames() {
  console.log('Fetching all event names...');

  try {
    const response = await makeRequest('/api/2.0/events/names');

    if (!response || !response.names) {
      throw new Error('No event names found in response');
    }

    console.log(`Found ${response.names.length} events`);
    return response.names;
  } catch (error) {
    console.error('Error fetching event names:', error.message);
    throw error;
  }
}

// Get top properties for each event
async function getEventProperties(eventNames) {
  console.log('Fetching properties for each event...');

  const eventsWithProperties = {};
  let processed = 0;

  for (const eventName of eventNames) {
    try {
      console.log(`Processing event: ${eventName} (${processed + 1}/${eventNames.length})`);

      // Get top properties for this event
      const response = await makeRequest('/api/2.0/events/properties/top', {
        event: eventName,
        limit: 50 // Get top 50 properties
      });

      eventsWithProperties[eventName] = {
        properties: response.properties || [],
        property_count: (response.properties || []).length
      };

      processed++;
    } catch (error) {
      console.error(`Error fetching properties for ${eventName}:`, error.message);
      eventsWithProperties[eventName] = {
        properties: [],
        property_count: 0,
        error: error.message
      };
      processed++;
    }
  }

  return eventsWithProperties;
}

// Get sample event data for schema analysis
async function getEventSamples(eventNames) {
  console.log('Fetching sample data for events...');

  const eventsWithSamples = {};
  let processed = 0;

  // Only sample first 10 events for analysis (to avoid API limits)
  const sampleEvents = eventNames.slice(0, 10);

  for (const eventName of sampleEvents) {
    try {
      console.log(`Fetching sample for: ${eventName} (${processed + 1}/${sampleEvents.length})`);

      // Get recent events (last 7 days)
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const toDate = new Date().toISOString().split('T')[0];

      const response = await makeRequest('/api/2.0/export', {
        event: JSON.stringify([eventName]),
        from_date: fromDate,
        to_date: toDate,
        limit: 5 // Just a few samples for schema analysis
      });

      // Parse NDJSON response
      const lines = response.split('\n').filter(line => line.trim());
      const samples = lines.slice(0, 5).map(line => {
        try {
          return JSON.parse(line);
        } catch (e) {
          return null;
        }
      }).filter(sample => sample !== null);

      eventsWithSamples[eventName] = {
        sample_count: samples.length,
        samples: samples
      };

      processed++;
    } catch (error) {
      console.error(`Error fetching samples for ${eventName}:`, error.message);
      eventsWithSamples[eventName] = {
        sample_count: 0,
        samples: [],
        error: error.message
      };
      processed++;
    }
  }

  return eventsWithSamples;
}

// Main execution
async function main() {
  try {
    console.log('Starting Mixpanel event discovery...');
    console.log(`Project ID: ${CONFIG.project_id}`);
    console.log(`Using EU endpoint: ${CONFIG.eu_endpoint}`);

    // Check API secret
    if (!CONFIG.api_secret) {
      throw new Error('MIXPANEL_API_SECRET environment variable is required');
    }

    // Get event names
    const eventNames = await getEventNames();

    // Get properties for each event
    const eventsWithProperties = await getEventProperties(eventNames);

    // Get sample data for analysis
    const eventsWithSamples = await getEventSamples(eventNames);

    // Combine all data
    const mixpanelData = {
      metadata: {
        project_id: CONFIG.project_id,
        total_events: eventNames.length,
        generated_at: new Date().toISOString(),
        api_endpoint: CONFIG.eu_endpoint
      },
      events: eventNames,
      event_details: eventsWithProperties,
      sample_data: eventsWithSamples
    };

    // Write to JSON file
    const outputPath = path.join(__dirname, '../../data/analytics/mixpanel-existing-events.json');
    fs.writeFileSync(outputPath, JSON.stringify(mixpanelData, null, 2));

    console.log(`✅ Successfully exported ${eventNames.length} events to ${outputPath}`);
    console.log('Event discovery complete!');

    // Summary
    console.log('\n=== SUMMARY ===');
    console.log(`Total events found: ${eventNames.length}`);

    const eventsWithProps = Object.values(eventsWithProperties).filter(e => e.property_count > 0).length;
    console.log(`Events with properties: ${eventsWithProps}`);

    const totalProperties = Object.values(eventsWithProperties).reduce((sum, e) => sum + e.property_count, 0);
    console.log(`Total properties found: ${totalProperties}`);

    console.log(`Sample data collected: ${Object.keys(eventsWithSamples).length} events`);

  } catch (error) {
    console.error('❌ Error during execution:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { getEventNames, getEventProperties, getEventSamples };
