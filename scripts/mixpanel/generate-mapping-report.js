#!/usr/bin/env node

/**
 * Mapping Report Generator
 * Creates comprehensive HTML report showing event mappings, conflicts, and recommendations
 */

const fs = require('fs');
const path = require('path');

// Load final mapping data
function loadFinalMapping() {
  const filePath = path.join(__dirname, '../../data/analytics/event-mapping-final.json');

  if (!fs.existsSync(filePath)) {
    throw new Error('event-mapping-final.json not found. Run hybrid-matcher.js first.');
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Generate HTML report
function generateHTMLReport(mappingData) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixpanel Event Mapping Report - DoktorABC Redesign</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 0;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .summary-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .summary-card h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .summary-card .value {
            font-size: 2.5em;
            font-weight: bold;
            color: #333;
        }

        .summary-card .label {
            color: #666;
            font-size: 0.9em;
        }

        .section {
            background: white;
            margin-bottom: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .section-header {
            background: #f8f9fa;
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
        }

        .section-header h2 {
            color: #333;
            font-size: 1.5em;
        }

        .section-content {
            padding: 20px;
        }

        .mapping-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .mapping-table th,
        .mapping-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }

        .mapping-table th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        .confidence-score {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: bold;
        }

        .confidence-high { background: #d4edda; color: #155724; }
        .confidence-medium { background: #fff3cd; color: #856404; }
        .confidence-low { background: #f8d7da; color: #721c24; }

        .match-source {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 0.7em;
            font-weight: bold;
            text-transform: uppercase;
        }

        .source-exact { background: #28a745; color: white; }
        .source-semantic { background: #17a2b8; color: white; }
        .source-properties { background: #ffc107; color: #212529; }

        .conflict-badge {
            background: #dc3545;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 0.7em;
            font-weight: bold;
        }

        .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .insight-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }

        .insight-card h4 {
            color: #333;
            margin-bottom: 10px;
        }

        .insight-card ul {
            list-style: none;
            padding: 0;
        }

        .insight-card li {
            padding: 5px 0;
            border-bottom: 1px solid #e9ecef;
        }

        .insight-card li:last-child {
            border-bottom: none;
        }

        .recommendations {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }

        .recommendations h3 {
            color: #856404;
            margin-bottom: 15px;
        }

        .recommendation-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 10px;
            border-left: 4px solid #ffc107;
        }

        .priority-high { border-left-color: #dc3545; }
        .priority-medium { border-left-color: #ffc107; }
        .priority-low { border-left-color: #28a745; }

        .priority-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.7em;
            font-weight: bold;
            text-transform: uppercase;
        }

        .priority-high-badge { background: #f8d7da; color: #721c24; }
        .priority-medium-badge { background: #fff3cd; color: #856404; }
        .priority-low-badge { background: #d4edda; color: #155724; }

        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 0.9em;
        }

        @media (max-width: 768px) {
            .summary-grid {
                grid-template-columns: 1fr;
            }

            .insights-grid {
                grid-template-columns: 1fr;
            }

            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Mixpanel Event Mapping Report</h1>
            <p>DoktorABC Redesign - Event Deduplication Analysis</p>
            <p><small>Generated: ${new Date(mappingData.metadata.generated_at).toLocaleString()}</small></p>
        </div>

        <div class="summary-grid">
            <div class="summary-card">
                <h3>Total Events</h3>
                <div class="value">${mappingData.summary.total_events_processed}</div>
                <div class="label">CSV Events Processed</div>
            </div>
            <div class="summary-card">
                <h3>Match Rate</h3>
                <div class="value">${mappingData.summary.overall_match_rate}%</div>
                <div class="label">Events Successfully Mapped</div>
            </div>
            <div class="summary-card">
                <h3>Mapped Events</h3>
                <div class="value">${mappingData.summary.successfully_mapped}</div>
                <div class="label">Connected to Mixpanel</div>
            </div>
            <div class="summary-card">
                <h3>Unmapped Events</h3>
                <div class="value">${mappingData.summary.unmapped_events}</div>
                <div class="label">Need New Mixpanel Events</div>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>📊 Mapping Summary</h2>
            </div>
            <div class="section-content">
                <div class="insights-grid">
                    <div class="insight-card">
                        <h4>Match Distribution by Source</h4>
                        <ul>
                            ${Object.entries(mappingData.insights.match_distribution_by_source)
                                .sort(([,a], [,b]) => b - a)
                                .map(([source, count]) => `<li><strong>${source}:</strong> ${count} mappings</li>`)
                                .join('')}
                        </ul>
                    </div>
                    <div class="insight-card">
                        <h4>Confidence Score Distribution</h4>
                        <ul>
                            ${Object.entries(mappingData.insights.confidence_score_distribution)
                                .filter(([,count]) => count > 0)
                                .map(([bucket, count]) => `<li><strong>${bucket}:</strong> ${count} mappings</li>`)
                                .join('')}
                        </ul>
                    </div>
                    <div class="insight-card">
                        <h4>Match Distribution by Page</h4>
                        <ul>
                            ${Object.entries(mappingData.insights.match_distribution_by_page)
                                .sort(([,a], [,b]) => b - a)
                                .slice(0, 8)
                                .map(([page, count]) => `<li><strong>${page}:</strong> ${count} mappings</li>`)
                                .join('')}
                        </ul>
                    </div>
                    <div class="insight-card">
                        <h4>Match Distribution by Platform</h4>
                        <ul>
                            ${Object.entries(mappingData.insights.match_distribution_by_platform)
                                .sort(([,a], [,b]) => b - a)
                                .map(([platform, count]) => `<li><strong>${platform}:</strong> ${count} mappings</li>`)
                                .join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        ${mappingData.conflicts.length > 0 ? `
        <div class="section">
            <div class="section-header">
                <h2>⚠️ Resolved Conflicts</h2>
            </div>
            <div class="section-content">
                <p><strong>${mappingData.summary.conflicts_resolved}</strong> conflicts were resolved by prioritizing exact matches over semantic matches over property-based matches.</p>
                <table class="mapping-table">
                    <thead>
                        <tr>
                            <th>CSV Event</th>
                            <th>Chosen Mixpanel Event</th>
                            <th>Match Source</th>
                            <th>Confidence</th>
                            <th>Alternatives</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mappingData.conflicts.slice(0, 10).map(conflict => `
                            <tr>
                                <td><code>${conflict.csv_event}</code></td>
                                <td><code>${conflict.best_match.mixpanel_event}</code></td>
                                <td><span class="match-source source-${conflict.best_match.source}">${conflict.best_match.source}</span></td>
                                <td><span class="confidence-score ${getConfidenceClass(conflict.best_match.confidence_score)}">${conflict.best_match.confidence_score}%</span></td>
                                <td>${conflict.alternatives.length} alternative${conflict.alternatives.length !== 1 ? 's' : ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${mappingData.conflicts.length > 10 ? `<p><em>... and ${mappingData.conflicts.length - 10} more conflicts</em></p>` : ''}
            </div>
        </div>
        ` : ''}

        <div class="section">
            <div class="section-header">
                <h2>✅ High Confidence Mappings (>90%)</h2>
            </div>
            <div class="section-content">
                <table class="mapping-table">
                    <thead>
                        <tr>
                            <th>CSV Event</th>
                            <th>Mixpanel Event</th>
                            <th>Match Source</th>
                            <th>Confidence</th>
                            <th>Page</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mappingData.mappings
                            .filter(m => m.confidence_score >= 90)
                            .slice(0, 20)
                            .map(mapping => `
                            <tr>
                                <td><code>${mapping.csv_event}</code></td>
                                <td><code>${mapping.mixpanel_event}</code></td>
                                <td><span class="match-source source-${mapping.match_source}">${mapping.match_source}</span></td>
                                <td><span class="confidence-score confidence-high">${mapping.confidence_score}%</span></td>
                                <td>${mapping.csv_page}</td>
                                <td>${mapping.csv_platform}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${mappingData.mappings.filter(m => m.confidence_score >= 90).length > 20 ?
                    `<p><em>... and ${mappingData.mappings.filter(m => m.confidence_score >= 90).length - 20} more high-confidence mappings</em></p>` : ''}
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>🔍 Unmapped Events (Need New Mixpanel Events)</h2>
            </div>
            <div class="section-content">
                <p><strong>${mappingData.summary.unmapped_events}</strong> CSV events could not be matched to existing Mixpanel events. These will need new Mixpanel events created.</p>

                ${mappingData.insights.top_unmapped_pages.length > 0 ? `
                <div class="insight-card" style="margin-top: 20px;">
                    <h4>Top Unmapped Pages</h4>
                    <ul>
                        ${mappingData.insights.top_unmapped_pages.map(item => `<li><strong>${item.page}:</strong> ${item.count} unmapped events</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <table class="mapping-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Page</th>
                            <th>Platform</th>
                            <th>Properties</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mappingData.unmapped_events.slice(0, 15).map(event => `
                            <tr>
                                <td><code>${event.event_name}</code></td>
                                <td>${event.page || 'unknown'}</td>
                                <td>${event.platform || 'unknown'}</td>
                                <td>${event.properties ? event.properties.join(', ') : 'none'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${mappingData.unmapped_events.length > 15 ? `<p><em>... and ${mappingData.unmapped_events.length - 15} more unmapped events</em></p>` : ''}
            </div>
        </div>

        <div class="recommendations">
            <h3>🚀 Implementation Recommendations</h3>
            ${mappingData.insights.mapping_recommendations.map(rec => `
                <div class="recommendation-item priority-${rec.priority}">
                    <div class="priority-badge priority-${rec.priority}-badge">${rec.priority} priority</div>
                    <strong>${rec.recommendation}</strong>
                    <p>${rec.action}</p>
                    ${rec.affected_events !== 'N/A' ? `<small>Affects: ${rec.affected_events} events</small>` : ''}
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>Report generated by Mixpanel Event Mapping & Deduplication Plan</p>
            <p>DoktorABC Redesign Project - Analytics Team</p>
        </div>
    </div>

    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Add click handlers for expandable sections if needed
            console.log('Mixpanel mapping report loaded');
        });
    </script>
</body>
</html>`;

  return html;
}

// Helper function to get confidence class
function getConfidenceClass(score) {
  if (score >= 90) return 'confidence-high';
  if (score >= 70) return 'confidence-medium';
  return 'confidence-low';
}

// Main execution
function main() {
  try {
    console.log('Generating mapping report...');

    // Load final mapping data
    const mappingData = loadFinalMapping();

    // Generate HTML report
    const htmlReport = generateHTMLReport(mappingData);

    // Write to file
    const outputPath = path.join(__dirname, '../../docs/analytics/mixpanel-event-mapping-report.html');
    fs.writeFileSync(outputPath, htmlReport);

    console.log(`✅ Mapping report generated! Saved to ${outputPath}`);

    // Summary
    console.log('\n=== REPORT SUMMARY ===');
    console.log(`Total Events: ${mappingData.summary.total_events_processed}`);
    console.log(`Mapped Events: ${mappingData.summary.successfully_mapped}`);
    console.log(`Unmapped Events: ${mappingData.summary.unmapped_events}`);
    console.log(`Match Rate: ${mappingData.summary.overall_match_rate}%`);
    console.log(`High Confidence Mappings: ${mappingData.summary.high_confidence_mappings}`);
    console.log(`Conflicts Resolved: ${mappingData.summary.conflicts_resolved}`);

    console.log('\n📊 Key Insights:');
    console.log(`- Primary matching source: ${Object.entries(mappingData.insights.match_distribution_by_source).sort(([,a], [,b]) => b - a)[0][0]}`);
    console.log(`- Most mapped page: ${Object.entries(mappingData.insights.match_distribution_by_page).sort(([,a], [,b]) => b - a)[0][0]}`);
    if (mappingData.insights.top_unmapped_pages.length > 0) {
      console.log(`- Page needing most new events: ${mappingData.insights.top_unmapped_pages[0].page} (${mappingData.insights.top_unmapped_pages[0].count} events)`);
    }

    console.log('\n🔗 Open the HTML report in your browser to view the full interactive report.');

  } catch (error) {
    console.error('❌ Error generating mapping report:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateHTMLReport };
