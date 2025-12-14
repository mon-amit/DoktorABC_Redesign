/**
 * Event Merge Analysis
 * Identifies events that could be consolidated under single event names
 */

const fs = require('fs');

class EventMergeAnalyzer {
  constructor() {
    this.events = [];
    this.mergeCandidates = new Map();
  }

  /**
   * Load events from master event map
   */
  async loadEvents() {
    try {
      const content = fs.readFileSync('docs/design/ui-event-mapping/master-event-map.md', 'utf-8');
      const lines = content.split('\n');
      let inTable = false;

      for (const line of lines) {
        if (line.includes('| Event Name | Trigger | Element | Page | Platform | CMS Property | Figma Node ID | Status |')) {
          inTable = true;
          continue;
        }

        if (inTable && line.includes('|') && !line.includes('|---') && line.trim() !== '') {
          const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
          if (cells.length >= 8 && cells[7] !== 'Status') { // Skip header row
            const eventName = cells[0];
            const trigger = cells[1];
            const element = cells[2];
            const page = cells[3];
            const platform = cells[4];
            const properties = cells[5];

            if (eventName && eventName !== 'Event Name') {
              this.events.push({
                eventName,
                trigger,
                element,
                page,
                platform,
                properties,
                baseName: this.extractBaseName(eventName),
                variableProperty: this.extractVariableProperty(eventName, properties)
              });
            }
          }
        }
      }

      console.log(`📋 Loaded ${this.events.size} events for merge analysis`);
    } catch (error) {
      console.error('Failed to load events:', error.message);
    }
  }

  /**
   * Extract base name from event name (remove specific identifiers)
   */
  extractBaseName(eventName) {
    // Examples:
    // web_homepage_button_category_ed_click -> web_homepage_button_category_click
    // web_homepage_button_category_hair_loss_click -> web_homepage_button_category_click
    // web_product_button_variant_50ml_click -> web_product_button_variant_click

    const patterns = [
      // Category clicks: remove specific category names
      [/_(ed|hair_loss|weight_loss|cannabis|asthma|birth_control|diabetes|testosterone|quit_smoking|sti)_click$/, '_click'],
      // Variant clicks: remove specific variant names
      [/_(50ml|100ml|200ml)_click$/, '_click'],
      // Size/filter variations
      [/_(price_low|price_high|newest|rating)_click$/, '_click'],
      // Numbered items
      [/_(\d+)_click$/, '_click']
    ];

    let baseName = eventName;
    for (const [pattern, replacement] of patterns) {
      baseName = baseName.replace(pattern, replacement);
    }

    return baseName;
  }

  /**
   * Extract the variable property that differentiates similar events
   */
  extractVariableProperty(eventName, properties) {
    // Extract the differentiating factor from event name or properties
    if (eventName.includes('category_')) {
      const categoryMatch = eventName.match(/category_(ed|hair_loss|weight_loss|cannabis|asthma|birth_control|diabetes|testosterone|quit_smoking|sti)_click/);
      if (categoryMatch) {
        return `category_id: "${this.mapCategoryName(categoryMatch[1])}"`;
      }
    }

    if (properties && properties.includes('category_id')) {
      return properties;
    }

    return null;
  }

  /**
   * Map short category names to full category IDs
   */
  mapCategoryName(shortName) {
    const categoryMap = {
      'ed': 'erectile-dysfunction',
      'hair_loss': 'hair-loss',
      'weight_loss': 'weight-loss',
      'cannabis': 'medical-cannabis',
      'asthma': 'asthma',
      'birth_control': 'birth-control',
      'diabetes': 'diabetes',
      'testosterone': 'testosterone',
      'quit_smoking': 'quit-smoking',
      'sti': 'sti-test'
    };

    return categoryMap[shortName] || shortName;
  }

  /**
   * Analyze events for merge candidates
   */
  analyzeMerges() {
    const baseNameGroups = new Map();

    // Group events by base name
    for (const event of this.events) {
      if (!baseNameGroups.has(event.baseName)) {
        baseNameGroups.set(event.baseName, []);
      }
      baseNameGroups.get(event.baseName).push(event);
    }

    // Find groups with multiple variations
    for (const [baseName, events] of baseNameGroups) {
      if (events.length > 1) {
        const uniqueProperties = new Set();
        const propertyVariations = [];

        for (const event of events) {
          if (event.variableProperty) {
            uniqueProperties.add(event.variableProperty);
            propertyVariations.push({
              originalEvent: event.eventName,
              variableProperty: event.variableProperty,
              trigger: event.trigger,
              element: event.element
            });
          }
        }

        if (uniqueProperties.size > 1) {
          this.mergeCandidates.set(baseName, {
            count: events.length,
            variations: propertyVariations,
            uniqueProperties: Array.from(uniqueProperties)
          });
        }
      }
    }
  }

  /**
   * Generate merge analysis report
   */
  generateReport() {
    console.log('\n🔍 Event Merge Analysis Report');
    console.log('=' .repeat(50));

    if (this.mergeCandidates.size === 0) {
      console.log('No merge candidates found.');
      return;
    }

    let totalMergableEvents = 0;

    for (const [baseName, data] of this.mergeCandidates) {
      console.log(`\n📊 Merge Candidate: \`${baseName}\``);
      console.log(`   Variations: ${data.count} events`);
      console.log(`   Unique Properties: ${data.uniqueProperties.length}`);

      console.log('\n   Event Variations:');
      for (const variation of data.variations) {
        console.log(`   • ${variation.originalEvent} → ${variation.variableProperty}`);
      }

      console.log('\n   Recommended Merged Structure:');
      console.log(`   \`${baseName}\` with properties:`);
      for (const prop of data.uniqueProperties) {
        console.log(`   • ${prop}`);
      }

      totalMergableEvents += data.count;
    }

    console.log('\n📈 Summary:');
    console.log(`- Total merge candidates: ${this.mergeCandidates.size}`);
    console.log(`- Total events that could be merged: ${totalMergableEvents}`);
    console.log(`- Potential reduction: ${totalMergableEvents - this.mergeCandidates.size} events`);
  }

  /**
   * Run the complete analysis
   */
  async runAnalysis() {
    await this.loadEvents();
    this.analyzeMerges();
    this.generateReport();
  }
}

// Run analysis if this file is executed directly
async function main() {
  const analyzer = new EventMergeAnalyzer();

  try {
    await analyzer.runAnalysis();
  } catch (error) {
    console.error('Analysis failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { EventMergeAnalyzer };