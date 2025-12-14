/**
 * Review Tables Schema Validation Tests
 * Tests for PM review tables (3-column format) per page per platform
 */

interface ReviewTableRow {
  eventName: string;
  properties: string;
  triggerDescription: string;
}

interface ReviewTable {
  page: string;
  platform: string;
  rows: ReviewTableRow[];
  totalEvents: number;
}

class ReviewTableValidator {
  private tables: ReviewTable[] = [];
  private allEventNames: Set<string> = new Set();

  /**
   * Load and parse all review tables
   */
  async loadTables(): Promise<void> {
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
        const table = await this.parseTableFile(filePath);
        if (table) {
          this.tables.push(table);
        }
      } catch (error) {
        console.error(`Failed to parse ${filePath}:`, error);
      }
    }
  }

  /**
   * Parse a single review table file
   */
  private async parseTableFile(filePath: string): Promise<ReviewTable | null> {
    try {
      const fs = require('fs').promises;
      const content = await fs.readFile(filePath, 'utf-8');

      // Extract page and platform from filename
      const filename = filePath.split('/').pop()!;
      const match = filename.match(/review-table-(.+)-(.+)\.md/);
      if (!match) return null;

      const page = match[1].replace('-', ' ');
      const platform = match[2];

      // Parse table rows
      const lines = content.split('\n');
      const rows: ReviewTableRow[] = [];
      let inTable = false;

      for (const line of lines) {
        if (line.includes('| Event Name | Properties | Short Description of TRIGGER |')) {
          inTable = true;
          continue;
        }

        if (inTable && line.includes('|') && !line.includes('|---') && line.trim() !== '') {
          const cells = line.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell !== '');
          if (cells.length >= 3) {
            rows.push({
              eventName: cells[0],
              properties: cells[1],
              triggerDescription: cells[2]
            });
          }
        }
      }

      // Extract total events from footer
      const totalMatch = content.match(/\*\*Total Events\*\*: (\d+)/);
      const totalEvents = totalMatch ? parseInt(totalMatch[1]) : rows.length;

      return {
        page,
        platform,
        rows,
        totalEvents
      };
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Run all validation tests
   */
  async runTests(): Promise<boolean> {
    await this.loadTables();

    const tests = [
      { name: 'Schema Validation', test: () => this.testSchema() },
      { name: 'Unique Event Names', test: () => this.testUniqueEventNames() },
      { name: 'Table Completeness', test: () => this.testCompleteness() },
      { name: 'RCA Documentation', test: () => this.testRCADocumentation() },
      { name: 'Pre-events Documentation', test: () => this.testPreEventsDocumentation() }
    ];

    let allPassed = true;

    for (const { name, test } of tests) {
      console.log(`\n🧪 Running ${name}...`);
      try {
        const passed = test();
        console.log(passed ? '✅ PASSED' : '❌ FAILED');
        if (!passed) allPassed = false;
      } catch (error) {
        console.log('❌ ERROR:', error);
        allPassed = false;
      }
    }

    console.log(`\n${allPassed ? '🎉' : '💥'} Overall Result: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
    return allPassed;
  }

  /**
   * Test that all tables have the correct 3-column schema
   */
  private testSchema(): boolean {
    let passed = true;

    for (const table of this.tables) {
      for (const row of table.rows) {
        if (!row.eventName || !row.properties || !row.triggerDescription) {
          console.error(`❌ Table ${table.page}-${table.platform}: Missing required columns in row`);
          passed = false;
        }
      }
    }

    return passed;
  }

  /**
   * Test that all event names are unique across all tables
   */
  private testUniqueEventNames(): boolean {
    let passed = true;
    this.allEventNames.clear();

    for (const table of this.tables) {
      for (const row of table.rows) {
        if (this.allEventNames.has(row.eventName)) {
          console.error(`❌ Duplicate event name found: ${row.eventName}`);
          passed = false;
        } else {
          this.allEventNames.add(row.eventName);
        }
      }
    }

    return passed;
  }

  /**
   * Test that tables have reasonable completeness
   */
  private testCompleteness(): boolean {
    let passed = true;

    for (const table of this.tables) {
      if (table.rows.length === 0) {
        console.warn(`⚠️  Table ${table.page}-${table.platform}: No events found`);
      }

      if (table.rows.length !== table.totalEvents) {
        console.error(`❌ Table ${table.page}-${table.platform}: Row count (${table.rows.length}) doesn't match total (${table.totalEvents})`);
        passed = false;
      }
    }

    return passed;
  }

  /**
   * Test that all trigger descriptions include RCA
   */
  private testRCADocumentation(): boolean {
    let passed = true;

    for (const table of this.tables) {
      for (const row of table.rows) {
        if (!row.triggerDescription.includes('RCA:')) {
          console.error(`❌ Table ${table.page}-${table.platform}: Missing RCA in trigger description for event ${row.eventName}`);
          passed = false;
        }
      }
    }

    return passed;
  }

  /**
   * Test that all trigger descriptions include pre-events
   */
  private testPreEventsDocumentation(): boolean {
    let passed = true;

    for (const table of this.tables) {
      for (const row of table.rows) {
        if (!row.triggerDescription.includes('Pre-events:')) {
          console.error(`❌ Table ${table.page}-${table.platform}: Missing Pre-events in trigger description for event ${row.eventName}`);
          passed = false;
        }
      }
    }

    return passed;
  }

  /**
   * Get summary statistics
   */
  getSummary(): { totalTables: number; totalEvents: number; tablesByPlatform: Record<string, number> } {
    const totalEvents = this.tables.reduce((sum, table) => sum + table.rows.length, 0);
    const tablesByPlatform: Record<string, number> = {};

    for (const table of this.tables) {
      tablesByPlatform[table.platform] = (tablesByPlatform[table.platform] || 0) + 1;
    }

    return {
      totalTables: this.tables.length,
      totalEvents,
      tablesByPlatform
    };
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const validator = new ReviewTableValidator();

  validator.runTests().then((passed) => {
    const summary = validator.getSummary();
    console.log('\n📊 Summary:');
    console.log(`- Total Tables: ${summary.totalTables}`);
    console.log(`- Total Events: ${summary.totalEvents}`);
    console.log(`- Tables by Platform:`, summary.tablesByPlatform);

    process.exit(passed ? 0 : 1);
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

export { ReviewTableValidator };