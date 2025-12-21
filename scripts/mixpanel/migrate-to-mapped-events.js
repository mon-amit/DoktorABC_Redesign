#!/usr/bin/env node

/**
 * Migration Script for Mapped Events
 * Identifies all code locations using direct Mixpanel tracking
 * Replaces with event mapper calls and generates migration report
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration
const SEARCH_ROOT = path.join(__dirname, '../..');
const EXCLUDE_DIRS = [
  'node_modules',
  'scripts/mixpanel',
  'data/analytics',
  '.git'
];

// Patterns to search for Mixpanel usage
const MIXPANEL_PATTERNS = [
  // Direct mixpanel.track calls
  /mixpanel\.track\s*\(/g,

  // mixpanel.track with event names
  /mixpanel\.track\s*\(\s*['"`]([^'"`]+)['"`]/g,

  // Event tracking imports
  /import.*mixpanel.*from/g,
  /require.*mixpanel/g,

  // EventTracker usage
  /EventTracker\(\)/g,
  /new EventTracker/g,
  /\.trackEvent\s*\(/g,

  // CSV event names that should be mapped
  /\bweb_[a-z_]+_[a-z_]+\b/g,
  /\bmobile_[a-z_]+_[a-z_]+\b/g
];

// Files to process
const TARGET_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte'];

/**
 * Find all files that might contain Mixpanel tracking
 */
async function findTrackingFiles() {
  console.log('Searching for files with Mixpanel tracking...');

  const pattern = `**/*{${TARGET_EXTENSIONS.join(',')}}`;
  const files = await glob(pattern, {
    cwd: SEARCH_ROOT,
    ignore: EXCLUDE_DIRS.map(dir => `**/${dir}/**`)
  });

  console.log(`Found ${files.length} potential files to scan`);

  const trackingFiles = [];

  for (const file of files) {
    const filePath = path.join(SEARCH_ROOT, file);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = [];

      MIXPANEL_PATTERNS.forEach(pattern => {
        const patternMatches = content.match(pattern);
        if (patternMatches) {
          matches.push(...patternMatches);
        }
      });

      if (matches.length > 0) {
        trackingFiles.push({
          file: file,
          path: filePath,
          matches: [...new Set(matches)], // Remove duplicates
          lineCount: content.split('\n').length
        });
      }
    } catch (error) {
      console.warn(`Could not read ${file}:`, error.message);
    }
  }

  return trackingFiles;
}

/**
 * Analyze tracking usage in a file
 */
function analyzeTrackingUsage(fileInfo) {
  const content = fs.readFileSync(fileInfo.path, 'utf8');
  const lines = content.split('\n');

  const analysis = {
    directMixpanelCalls: [],
    eventTrackerUsage: [],
    csvEventNames: [],
    unmappedEvents: [],
    imports: []
  };

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();

    // Direct mixpanel.track calls
    if (trimmedLine.includes('mixpanel.track')) {
      const eventMatch = trimmedLine.match(/mixpanel\.track\s*\(\s*['"`]([^'"`]+)['"`]/);
      if (eventMatch) {
        analysis.directMixpanelCalls.push({
          line: lineNumber,
          event: eventMatch[1],
          code: trimmedLine
        });
      }
    }

    // EventTracker usage
    if (trimmedLine.includes('.trackEvent') || trimmedLine.includes('EventTracker')) {
      analysis.eventTrackerUsage.push({
        line: lineNumber,
        code: trimmedLine
      });
    }

    // CSV-style event names
    const csvEvents = trimmedLine.match(/\b(web|mobile)_[a-z_]+_[a-z_]+\b/g);
    if (csvEvents) {
      analysis.csvEventNames.push(...csvEvents.map(event => ({
        line: lineNumber,
        event: event,
        code: trimmedLine
      })));
    }

    // Import statements
    if (trimmedLine.includes('import') && trimmedLine.includes('mixpanel')) {
      analysis.imports.push({
        line: lineNumber,
        code: trimmedLine
      });
    }
  });

  return analysis;
}

/**
 * Generate migration suggestions
 */
function generateMigrationSuggestions(fileInfo, analysis) {
  const suggestions = [];

  // Direct mixpanel.track calls
  analysis.directMixpanelCalls.forEach(call => {
    suggestions.push({
      type: 'direct_mixpanel_call',
      file: fileInfo.file,
      line: call.line,
      issue: `Direct mixpanel.track call: ${call.code}`,
      solution: `Replace with EventTracker.trackEvent('${call.event}', properties)`,
      priority: 'high'
    });
  });

  // CSV event names that might need mapping
  analysis.csvEventNames.forEach(event => {
    suggestions.push({
      type: 'csv_event_name',
      file: fileInfo.file,
      line: event.line,
      issue: `CSV-style event name: ${event.event}`,
      solution: `Ensure this event is mapped through EventTracker`,
      priority: 'medium'
    });
  });

  // Missing EventTracker integration
  if (analysis.directMixpanelCalls.length > 0 && analysis.eventTrackerUsage.length === 0) {
    suggestions.push({
      type: 'missing_event_tracker',
      file: fileInfo.file,
      issue: 'File uses direct Mixpanel calls but no EventTracker',
      solution: `Import and use EventTracker instead of direct mixpanel calls`,
      priority: 'high'
    });
  }

  return suggestions;
}

/**
 * Generate migration report
 */
function generateMigrationReport(trackingFiles) {
  console.log('Generating migration report...');

  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      total_files_scanned: trackingFiles.length,
      search_root: SEARCH_ROOT
    },
    summary: {
      files_with_tracking: 0,
      direct_mixpanel_calls: 0,
      event_tracker_usage: 0,
      csv_event_names: 0,
      total_suggestions: 0
    },
    files: [],
    suggestions: [],
    migration_plan: {
      phase1: [], // Critical - direct mixpanel calls
      phase2: [], // Important - EventTracker integration
      phase3: []  // Optional - optimizations
    }
  };

  trackingFiles.forEach(fileInfo => {
    const analysis = analyzeTrackingUsage(fileInfo);
    const suggestions = generateMigrationSuggestions(fileInfo, analysis);

    // Update summary
    if (analysis.directMixpanelCalls.length > 0 || analysis.eventTrackerUsage.length > 0) {
      report.summary.files_with_tracking++;
    }

    report.summary.direct_mixpanel_calls += analysis.directMixpanelCalls.length;
    report.summary.event_tracker_usage += analysis.eventTrackerUsage.length;
    report.summary.csv_event_names += analysis.csvEventNames.length;
    report.summary.total_suggestions += suggestions.length;

    // Add file details
    report.files.push({
      file: fileInfo.file,
      analysis: analysis,
      suggestions: suggestions.length
    });

    // Add suggestions
    report.suggestions.push(...suggestions);

    // Categorize for migration plan
    suggestions.forEach(suggestion => {
      if (suggestion.priority === 'high') {
        report.migration_plan.phase1.push(suggestion);
      } else if (suggestion.priority === 'medium') {
        report.migration_plan.phase2.push(suggestion);
      } else {
        report.migration_plan.phase3.push(suggestion);
      }
    });
  });

  return report;
}

/**
 * Create HTML migration report
 */
function createHTMLReport(report) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixpanel Migration Report - DoktorABC Redesign</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
        .summary-card .value { font-size: 2em; font-weight: bold; color: #333; }
        .section { background: white; margin-bottom: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .section-header { background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e9ecef; }
        .section-content { padding: 20px; }
        .suggestion-item { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #dc3545; }
        .priority-high { border-left-color: #dc3545; }
        .priority-medium { border-left-color: #ffc107; }
        .priority-low { border-left-color: #28a745; }
        .code { font-family: 'Monaco', 'Menlo', monospace; background: #f1f3f4; padding: 2px 4px; border-radius: 3px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e9ecef; }
        th { background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔄 Mixpanel Migration Report</h1>
            <p>DoktorABC Redesign - Event Mapping Integration</p>
            <p><small>Generated: ${new Date(report.metadata.generated_at).toLocaleString()}</small></p>
        </div>

        <div class="summary-grid">
            <div class="summary-card">
                <h3>Files Scanned</h3>
                <div class="value">${report.metadata.total_files_scanned}</div>
            </div>
            <div class="summary-card">
                <h3>Files with Tracking</h3>
                <div class="value">${report.summary.files_with_tracking}</div>
            </div>
            <div class="summary-card">
                <h3>Direct Mixpanel Calls</h3>
                <div class="value">${report.summary.direct_mixpanel_calls}</div>
            </div>
            <div class="summary-card">
                <h3>Migration Tasks</h3>
                <div class="value">${report.summary.total_suggestions}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>📋 Migration Plan</h2>
            </div>
            <div class="section-content">
                <h3>Phase 1: Critical (Direct Mixpanel Calls)</h3>
                <p><strong>${report.migration_plan.phase1.length} tasks</strong> - Replace direct mixpanel.track() calls with EventTracker</p>

                <h3>Phase 2: Important (Event Mapping)</h3>
                <p><strong>${report.migration_plan.phase2.length} tasks</strong> - Ensure CSV events use proper mapping</p>

                <h3>Phase 3: Optimization</h3>
                <p><strong>${report.migration_plan.phase3.length} tasks</strong> - Code cleanup and improvements</p>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>🔧 Phase 1: Critical Tasks</h2>
            </div>
            <div class="section-content">
                ${report.migration_plan.phase1.map(task => `
                    <div class="suggestion-item priority-high">
                        <strong>${task.file}:${task.line}</strong>
                        <p>${task.issue}</p>
                        <p><em>Solution:</em> ${task.solution}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>📊 Files Analysis</h2>
            </div>
            <div class="section-content">
                <table>
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Direct Calls</th>
                            <th>EventTracker</th>
                            <th>CSV Events</th>
                            <th>Suggestions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${report.files.map(file => `
                            <tr>
                                <td class="code">${file.file}</td>
                                <td>${file.analysis.directMixpanelCalls.length}</td>
                                <td>${file.analysis.eventTrackerUsage.length}</td>
                                <td>${file.analysis.csvEventNames.length}</td>
                                <td>${file.suggestions}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>`;

  return html;
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('Starting Mixpanel migration analysis...');

    // Find tracking files
    const trackingFiles = await findTrackingFiles();

    if (trackingFiles.length === 0) {
      console.log('No files with Mixpanel tracking found.');
      return;
    }

    // Generate migration report
    const report = generateMigrationReport(trackingFiles);

    // Create HTML report
    const htmlReport = createHTMLReport(report);

    // Write reports
    const jsonPath = path.join(__dirname, '../../data/analytics/mixpanel-migration-report.json');
    const htmlPath = path.join(__dirname, '../../docs/analytics/mixpanel-migration-report.html');

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    fs.writeFileSync(htmlPath, htmlReport);

    console.log(`✅ Migration analysis complete!`);
    console.log(`📄 JSON Report: ${jsonPath}`);
    console.log(`🌐 HTML Report: ${htmlPath}`);

    // Summary output
    console.log('\n=== MIGRATION SUMMARY ===');
    console.log(`Files Scanned: ${report.metadata.total_files_scanned}`);
    console.log(`Files with Tracking: ${report.summary.files_with_tracking}`);
    console.log(`Direct Mixpanel Calls: ${report.summary.direct_mixpanel_calls}`);
    console.log(`EventTracker Usage: ${report.summary.event_tracker_usage}`);
    console.log(`CSV Event Names Found: ${report.summary.csv_event_names}`);
    console.log(`Total Migration Tasks: ${report.summary.total_suggestions}`);

    console.log('\nMigration Phases:');
    console.log(`Phase 1 (Critical): ${report.migration_plan.phase1.length} tasks`);
    console.log(`Phase 2 (Important): ${report.migration_plan.phase2.length} tasks`);
    console.log(`Phase 3 (Optimization): ${report.migration_plan.phase3.length} tasks`);

    if (report.migration_plan.phase1.length > 0) {
      console.log('\n⚠️  Critical Issues Found:');
      report.migration_plan.phase1.slice(0, 3).forEach(task => {
        console.log(`- ${task.file}:${task.line} - ${task.issue}`);
      });
      if (report.migration_plan.phase1.length > 3) {
        console.log(`... and ${report.migration_plan.phase1.length - 3} more`);
      }
    }

  } catch (error) {
    console.error('❌ Error during migration analysis:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  findTrackingFiles,
  analyzeTrackingUsage,
  generateMigrationSuggestions
};
