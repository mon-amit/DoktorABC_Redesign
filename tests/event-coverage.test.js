/**
 * Event Coverage Validation Tests
 * Validates that 100% of events from master-event-map.md appear in review tables
 */

const fs = require('fs');
const path = require('path');

class EventCoverageValidator {
  constructor() {
    this.masterEvents = new Set();
    this.reviewTableEvents = new Set();
    this.tableEventMap = new Map(); // event -> table
  }

  /**
   * Load events from master event map
   */
  async loadMasterEvents() {
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
            if (eventName && eventName !== 'Event Name') {
              this.masterEvents.add(eventName);
            }
          }
        }
      }

      console.log(`📋 Loaded ${this.masterEvents.size} events from master event map`);
    } catch (error) {
      console.error('Failed to load master events:', error.message);
    }
  }

  /**
   * Load events from all review tables
   */
  async loadReviewTableEvents() {
    const tableFiles = [
      'docs/design/ui-event-mapping/final-tables/review-table-homepage-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-homepage-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-product-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-product-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-category-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-category-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-checkout-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-checkout-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-account-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-account-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-search-otc-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-search-otc-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-treatment-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-treatment-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-navigation-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-navigation-mobile.md',
      'docs/design/ui-event-mapping/final-tables/review-table-popups-web.md',
      'docs/design/ui-event-mapping/final-tables/review-table-popups-mobile.md'
    ];

    for (const filePath of tableFiles) {
      try {
        const tableName = path.basename(filePath, '.md').replace('review-table-', '');
        const events = await this.parseTableEvents(filePath);

        for (const event of events) {
          this.reviewTableEvents.add(event);
          this.tableEventMap.set(event, tableName);
        }
      } catch (error) {
        console.error(`Failed to parse ${filePath}:`, error.message);
      }
    }

    console.log(`📋 Loaded ${this.reviewTableEvents.size} events from review tables`);
  }

  /**
   * Parse events from a single table
   */
  async parseTableEvents(filePath) {
    const events = [];
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      let inTable = false;

      for (const line of lines) {
        if (line.includes('| Event Name | Properties | Short Description of TRIGGER |')) {
          inTable = true;
          continue;
        }

        if (inTable && line.includes('|') && !line.includes('|---') && line.trim() !== '') {
          const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
          if (cells.length >= 3) {
            const eventName = cells[0];
            if (eventName && eventName !== 'Event Name') {
              events.push(eventName);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error.message);
    }

    return events;
  }

  /**
   * Run coverage validation tests
   */
  async runTests() {
    await this.loadMasterEvents();
    await this.loadReviewTableEvents();

    const tests = [
      { name: 'Complete Coverage', test: () => this.testCompleteCoverage() },
      { name: 'No Extra Events', test: () => this.testNoExtraEvents() },
      { name: 'Unique Assignment', test: () => this.testUniqueAssignment() }
    ];

    let allPassed = true;

    for (const { name, test } of tests) {
      console.log(`\n🧪 Running ${name}...`);
      try {
        const passed = test();
        console.log(passed ? '✅ PASSED' : '❌ FAILED');
        if (!passed) allPassed = false;
      } catch (error) {
        console.log('❌ ERROR:', error.message);
        allPassed = false;
      }
    }

    console.log(`\n${allPassed ? '🎉' : '💥'} Overall Result: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
    return allPassed;
  }

  /**
   * Test that all master events are covered in review tables
   */
  testCompleteCoverage() {
    let passed = true;
    const missingEvents = [];

    for (const event of this.masterEvents) {
      if (!this.reviewTableEvents.has(event)) {
        missingEvents.push(event);
        passed = false;
      }
    }

    if (missingEvents.length > 0) {
      console.error(`❌ Missing ${missingEvents.length} events in review tables:`);
      missingEvents.forEach(event => console.error(`  - ${event}`));
    }

    return passed;
  }

  /**
   * Test that review tables don't contain extra events not in master
   */
  testNoExtraEvents() {
    let passed = true;
    const extraEvents = [];

    for (const event of this.reviewTableEvents) {
      if (!this.masterEvents.has(event)) {
        extraEvents.push(event);
        passed = false;
      }
    }

    if (extraEvents.length > 0) {
      console.error(`❌ Found ${extraEvents.length} extra events in review tables not in master:`);
      extraEvents.forEach(event => {
        const table = this.tableEventMap.get(event);
        console.error(`  - ${event} (in ${table})`);
      });
    }

    return passed;
  }

  /**
   * Test that each event appears in exactly one table
   */
  testUniqueAssignment() {
    let passed = true;
    const eventCounts = new Map();

    // Count occurrences of each event
    for (const [event, table] of this.tableEventMap) {
      if (!eventCounts.has(event)) {
        eventCounts.set(event, []);
      }
      eventCounts.get(event).push(table);
    }

    // Check for duplicates
    for (const [event, tables] of eventCounts) {
      if (tables.length > 1) {
        console.error(`❌ Event "${event}" appears in multiple tables: ${tables.join(', ')}`);
        passed = false;
      }
    }

    return passed;
  }

  /**
   * Get coverage statistics
   */
  getCoverageStats() {
    const masterCount = this.masterEvents.size;
    const reviewCount = this.reviewTableEvents.size;
    const coverage = masterCount > 0 ? (this.reviewTableEvents.size / this.masterEvents.size) * 100 : 0;

    return {
      masterEvents: masterCount,
      reviewEvents: reviewCount,
      coveragePercent: coverage.toFixed(1),
      missingEvents: [...this.masterEvents].filter(e => !this.reviewTableEvents.has(e)),
      extraEvents: [...this.reviewTableEvents].filter(e => !this.masterEvents.has(e))
    };
  }
}

// Run tests if this file is executed directly
async function main() {
  const validator = new EventCoverageValidator();

  try {
    const passed = await validator.runTests();
    const stats = validator.getCoverageStats();

    console.log('\n📊 Coverage Statistics:');
    console.log(`- Master Events: ${stats.masterEvents}`);
    console.log(`- Review Table Events: ${stats.reviewEvents}`);
    console.log(`- Coverage: ${stats.coveragePercent}%`);

    if (stats.missingEvents.length > 0) {
      console.log(`- Missing Events: ${stats.missingEvents.length}`);
    }

    if (stats.extraEvents.length > 0) {
      console.log(`- Extra Events: ${stats.extraEvents.length}`);
    }

    process.exit(passed ? 0 : 1);
  } catch (error) {
    console.error('Test execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { EventCoverageValidator };