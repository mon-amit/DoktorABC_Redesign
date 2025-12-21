#!/usr/bin/env node

/**
 * Usage Cost Analysis Script
 * Calculates event volume reduction and cost savings from deduplication
 * Estimates Mixpanel usage costs before and after mapping
 */

const fs = require('fs');
const path = require('path');

// Mixpanel pricing (approximate as of 2025)
const MIXPANEL_PRICING = {
  free_tier: {
    events: 1000,
    monthly_cost: 0
  },
  growth_tier: {
    events: 25000,
    monthly_cost: 89
  },
  enterprise_tier: {
    // Custom pricing, using estimated cost per 1000 events
    cost_per_1000_events: 3.50
  }
};

// Load mapping data
function loadMappingData() {
  const mappingPath = path.join(__dirname, '../../data/analytics/event-mapping-final.json');

  if (!fs.existsSync(mappingPath)) {
    throw new Error('event-mapping-final.json not found. Run hybrid-matcher.js first.');
  }

  return JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
}

// Load existing events data
function loadExistingEventsData() {
  const eventsPath = path.join(__dirname, '../../data/analytics/mixpanel-existing-events.json');

  if (!fs.existsSync(eventsPath)) {
    throw new Error('mixpanel-existing-events.json not found. Run query-existing-events.js first.');
  }

  return JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
}

// Estimate event volumes
function estimateEventVolumes(mappingData, existingEventsData) {
  console.log('Estimating event volumes...');

  const estimates = {
    current_volume: {
      total_events: 0,
      event_breakdown: {}
    },
    projected_volume: {
      total_events: 0,
      event_breakdown: {},
      deduplication_savings: 0
    },
    assumptions: {
      avg_events_per_day: 10000, // Estimated daily events
      growth_rate: 0.05, // 5% monthly growth
      duplicate_percentage: 0.15 // Estimated duplicate percentage before mapping
    }
  };

  // Calculate current volume from existing events
  existingEventsData.events.forEach(eventName => {
    const eventDetails = existingEventsData.event_details[eventName];
    // Estimate event count based on whether it has properties (active events)
    const estimatedCount = eventDetails && eventDetails.property_count > 0 ? 100 : 10;
    estimates.current_volume.event_breakdown[eventName] = estimatedCount;
    estimates.current_volume.total_events += estimatedCount;
  });

  // Calculate projected volume after mapping
  const mappedEvents = new Set();

  mappingData.mappings.forEach(mapping => {
    if (!mappedEvents.has(mapping.mixpanel_event)) {
      mappedEvents.add(mapping.mixpanel_event);
      // Use current volume if event exists, otherwise assume new event volume
      const currentVolume = estimates.current_volume.event_breakdown[mapping.mixpanel_event] || 50;
      estimates.projected_volume.event_breakdown[mapping.mixpanel_event] = currentVolume;
      estimates.projected_volume.total_events += currentVolume;
    }
  });

  // Add unmapped events (new events to create)
  mappingData.unmapped_events.forEach(event => {
    const estimatedVolume = 25; // Assume lower volume for new events
    estimates.projected_volume.event_breakdown[event.event_name] = estimatedVolume;
    estimates.projected_volume.total_events += estimatedVolume;
  });

  // Calculate deduplication savings
  const originalVolume = estimates.current_volume.total_events;
  const duplicateVolume = Math.round(originalVolume * estimates.assumptions.duplicate_percentage);
  const projectedVolume = estimates.projected_volume.total_events;

  estimates.projected_volume.deduplication_savings = Math.max(0, originalVolume - projectedVolume);

  return estimates;
}

// Calculate cost savings
function calculateCostSavings(estimates) {
  console.log('Calculating cost savings...');

  const costs = {
    current_monthly: {},
    projected_monthly: {},
    savings: {}
  };

  const monthlyVolume = estimates.assumptions.avg_events_per_day * 30;

  // Current costs (assuming duplicate events)
  const currentVolume = monthlyVolume * (1 + estimates.assumptions.duplicate_percentage);

  if (currentVolume <= MIXPANEL_PRICING.free_tier.events) {
    costs.current_monthly.tier = 'free';
    costs.current_monthly.cost = MIXPANEL_PRICING.free_tier.monthly_cost;
  } else if (currentVolume <= MIXPANEL_PRICING.growth_tier.events) {
    costs.current_monthly.tier = 'growth';
    costs.current_monthly.cost = MIXPANEL_PRICING.growth_tier.monthly_cost;
  } else {
    costs.current_monthly.tier = 'enterprise';
    const excessEvents = currentVolume - MIXPANEL_PRICING.growth_tier.events;
    const excessCost = (excessEvents / 1000) * MIXPANEL_PRICING.enterprise_tier.cost_per_1000_events;
    costs.current_monthly.cost = MIXPANEL_PRICING.growth_tier.monthly_cost + excessCost;
  }

  // Projected costs after deduplication
  const projectedVolume = monthlyVolume * (1 - 0.05); // 5% efficiency gain from better event structure

  if (projectedVolume <= MIXPANEL_PRICING.free_tier.events) {
    costs.projected_monthly.tier = 'free';
    costs.projected_monthly.cost = MIXPANEL_PRICING.free_tier.monthly_cost;
  } else if (projectedVolume <= MIXPANEL_PRICING.growth_tier.events) {
    costs.projected_monthly.tier = 'growth';
    costs.projected_monthly.cost = MIXPANEL_PRICING.growth_tier.monthly_cost;
  } else {
    costs.projected_monthly.tier = 'enterprise';
    const excessEvents = projectedVolume - MIXPANEL_PRICING.growth_tier.events;
    const excessCost = (excessEvents / 1000) * MIXPANEL_PRICING.enterprise_tier.cost_per_1000_events;
    costs.projected_monthly.cost = MIXPANEL_PRICING.growth_tier.monthly_cost + excessCost;
  }

  // Calculate savings
  costs.savings.monthly = costs.current_monthly.cost - costs.projected_monthly.cost;
  costs.savings.yearly = costs.savings.monthly * 12;
  costs.savings.percentage = costs.current_monthly.cost > 0 ?
    ((costs.savings.monthly / costs.current_monthly.cost) * 100).toFixed(1) : 0;

  // Event volume reduction
  costs.volume_reduction = {
    current_events: Math.round(currentVolume),
    projected_events: Math.round(projectedVolume),
    reduction_count: Math.round(currentVolume - projectedVolume),
    reduction_percentage: ((currentVolume - projectedVolume) / currentVolume * 100).toFixed(1)
  };

  return costs;
}

// Generate projections for future growth
function generateGrowthProjections(estimates, costs) {
  const projections = {
    3: {}, // 3 months
    6: {}, // 6 months
    12: {} // 12 months
  };

  [3, 6, 12].forEach(months => {
    const growthFactor = Math.pow(1 + estimates.assumptions.growth_rate, months);

    projections[months] = {
      volume_increase: `${((growthFactor - 1) * 100).toFixed(1)}%`,
      current_cost_projection: (costs.current_monthly.cost * growthFactor).toFixed(2),
      projected_cost_projection: (costs.projected_monthly.cost * growthFactor).toFixed(2),
      savings_projection: ((costs.current_monthly.cost - costs.projected_monthly.cost) * growthFactor).toFixed(2)
    };
  });

  return projections;
}

// Generate comprehensive cost analysis report
function generateCostAnalysisReport(estimates, costs, projections, mappingData) {
  const report = {
    metadata: {
      generated_at: new Date().toISOString(),
      analysis_period: 'monthly',
      currency: 'USD',
      assumptions: estimates.assumptions
    },
    executive_summary: {
      current_monthly_events: costs.volume_reduction.current_events.toLocaleString(),
      projected_monthly_events: costs.volume_reduction.projected_events.toLocaleString(),
      event_reduction: `${costs.volume_reduction.reduction_percentage}%`,
      monthly_savings: `$${costs.savings.monthly.toFixed(2)}`,
      yearly_savings: `$${costs.savings.yearly.toFixed(2)}`,
      savings_percentage: `${costs.savings.percentage}%`,
      payback_period_months: costs.savings.monthly > 0 ?
        Math.ceil(1000 / costs.savings.monthly) : 'N/A' // Assuming $1000 implementation cost
    },
    detailed_analysis: {
      estimates,
      costs,
      projections
    },
    insights: {
      cost_breakdown: {
        current_tier: costs.current_monthly.tier,
        projected_tier: costs.projected_monthly.tier,
        tier_change: costs.current_monthly.tier !== costs.projected_monthly.tier
      },
      volume_analysis: {
        duplicate_events_eliminated: estimates.projected_volume.deduplication_savings,
        new_events_added: mappingData.unmapped_events.length,
        net_volume_change: mappingData.unmapped_events.length - estimates.projected_volume.deduplication_savings
      },
      roi_analysis: {
        implementation_effort_days: 20, // Estimated
        ongoing_monitoring_hours_month: 2,
        business_value_score: calculateBusinessValueScore(mappingData)
      }
    },
    recommendations: []
  };

  // Generate recommendations
  if (costs.savings.monthly > 50) {
    report.recommendations.push({
      priority: 'high',
      title: 'Implement Event Mapping Immediately',
      description: `Expected monthly savings of $${costs.savings.monthly.toFixed(2)} justify immediate implementation`,
      roi: `Payback in ${report.executive_summary.payback_period_months} months`
    });
  }

  if (costs.volume_reduction.reduction_percentage > 10) {
    report.recommendations.push({
      priority: 'high',
      title: 'Monitor Event Usage Closely',
      description: 'Significant volume reduction requires careful monitoring to ensure no data loss',
      action: 'Set up automated monitoring and alerting for event volume changes'
    });
  }

  report.recommendations.push({
    priority: 'medium',
    title: 'Review Mixpanel Contract',
    description: 'Consider negotiating lower rates or tier downgrade based on reduced usage',
    action: 'Contact Mixpanel account manager with usage projections'
  });

  return report;
}

// Calculate business value score (1-10)
function calculateBusinessValueScore(mappingData) {
  let score = 5; // Base score

  // High match rate increases value
  const matchRate = mappingData.summary.overall_match_rate;
  if (matchRate > 90) score += 3;
  else if (matchRate > 80) score += 2;
  else if (matchRate > 70) score += 1;

  // Low conflicts increases value
  const conflicts = mappingData.conflicts.length;
  if (conflicts === 0) score += 1;
  else if (conflicts > 5) score -= 1;

  // Many high-confidence mappings increase value
  const highConfidenceMappings = mappingData.mappings.filter(m => m.confidence_score >= 90).length;
  const totalMappings = mappingData.mappings.length;
  const highConfidenceRatio = highConfidenceMappings / totalMappings;

  if (highConfidenceRatio > 0.8) score += 1;
  else if (highConfidenceRatio < 0.5) score -= 1;

  return Math.max(1, Math.min(10, score));
}

// Create HTML cost report
function createHTMLCostReport(report) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixpanel Cost Analysis Report - DoktorABC Redesign</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 40px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
        .summary-card .value { font-size: 2em; font-weight: bold; color: #28a745; }
        .summary-card .label { color: #666; font-size: 0.9em; }
        .section { background: white; margin-bottom: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .section-header { background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e9ecef; }
        .section-content { padding: 20px; }
        .savings-highlight { background: #d4edda; border: 2px solid #c3e6cb; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .savings-highlight .amount { font-size: 2em; font-weight: bold; color: #155724; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e9ecef; }
        th { background: #f8f9fa; }
        .positive { color: #28a745; font-weight: bold; }
        .negative { color: #dc3545; font-weight: bold; }
        .highlight { background: #fff3cd; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Mixpanel Cost Analysis Report</h1>
            <p>DoktorABC Redesign - Event Deduplication Cost Savings</p>
            <p><small>Generated: ${new Date(report.metadata.generated_at).toLocaleString()}</small></p>
        </div>

        <div class="savings-highlight">
            <h2>Projected Monthly Savings</h2>
            <div class="amount">$${report.executive_summary.monthly_savings}</div>
            <p>Annual Savings: <strong>$${report.executive_summary.yearly_savings}</strong></p>
            <p>Event Volume Reduction: <strong>${report.executive_summary.event_reduction}%</strong></p>
        </div>

        <div class="summary-grid">
            <div class="summary-card">
                <h3>Current Monthly Events</h3>
                <div class="value">${report.executive_summary.current_monthly_events}</div>
            </div>
            <div class="summary-card">
                <h3>Projected Monthly Events</h3>
                <div class="value">${report.executive_summary.projected_monthly_events}</div>
            </div>
            <div class="summary-card">
                <h3>Payback Period</h3>
                <div class="value">${report.executive_summary.payback_period_months}</div>
                <div class="label">months</div>
            </div>
            <div class="summary-card">
                <h3>Business Value Score</h3>
                <div class="value">${report.insights.roi_analysis.business_value_score}/10</div>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>📊 Cost Breakdown</h2>
            </div>
            <div class="section-content">
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Current</th>
                            <th>Projected</th>
                            <th>Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Monthly Events</td>
                            <td>${report.detailed_analysis.costs.volume_reduction.current_events.toLocaleString()}</td>
                            <td>${report.detailed_analysis.costs.volume_reduction.projected_events.toLocaleString()}</td>
                            <td class="positive">${report.detailed_analysis.costs.volume_reduction.reduction_count.toLocaleString()} (-${report.detailed_analysis.costs.volume_reduction.reduction_percentage}%)</td>
                        </tr>
                        <tr>
                            <td>Monthly Cost</td>
                            <td>$${report.detailed_analysis.costs.current_monthly.cost.toFixed(2)}</td>
                            <td>$${report.detailed_analysis.costs.projected_monthly.cost.toFixed(2)}</td>
                            <td class="positive">$${report.detailed_analysis.costs.savings.monthly.toFixed(2)} (-${report.detailed_analysis.costs.savings.percentage}%)</td>
                        </tr>
                        <tr>
                            <td>Tier</td>
                            <td>${report.insights.cost_breakdown.current_tier}</td>
                            <td>${report.insights.cost_breakdown.projected_tier}</td>
                            <td ${report.insights.cost_breakdown.tier_change ? 'class="highlight"' : ''}>${report.insights.cost_breakdown.tier_change ? 'Tier Change Possible' : 'No Change'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>📈 Growth Projections</h2>
            </div>
            <div class="section-content">
                <table>
                    <thead>
                        <tr>
                            <th>Time Period</th>
                            <th>Volume Increase</th>
                            <th>Current Cost</th>
                            <th>Projected Cost</th>
                            <th>Monthly Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(report.detailed_analysis.projections).map(([months, data]) => `
                            <tr>
                                <td>${months} Months</td>
                                <td>${data.volume_increase}</td>
                                <td>$${data.current_cost_projection}</td>
                                <td>$${data.projected_cost_projection}</td>
                                <td class="positive">$${data.savings_projection}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <h2>🎯 Recommendations</h2>
            </div>
            <div class="section-content">
                ${report.recommendations.map(rec => `
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid ${rec.priority === 'high' ? '#dc3545' : rec.priority === 'medium' ? '#ffc107' : '#28a745'};">
                        <strong>${rec.title}</strong>
                        <p>${rec.description}</p>
                        ${rec.roi ? `<p><em>ROI: ${rec.roi}</em></p>` : ''}
                        ${rec.action ? `<p><em>Action: ${rec.action}</em></p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;

  return html;
}

// Main execution
async function main() {
  try {
    console.log('Starting usage cost analysis...');

    // Load data
    const mappingData = loadMappingData();
    const existingEventsData = loadExistingEventsData();

    // Estimate volumes and calculate costs
    const estimates = estimateEventVolumes(mappingData, existingEventsData);
    const costs = calculateCostSavings(estimates);
    const projections = generateGrowthProjections(estimates, costs);

    // Generate comprehensive report
    const report = generateCostAnalysisReport(estimates, costs, projections, mappingData);

    // Create HTML report
    const htmlReport = createHTMLCostReport(report);

    // Save reports
    const jsonPath = path.join(__dirname, '../../data/analytics/cost-analysis-report.json');
    const htmlPath = path.join(__dirname, '../../docs/analytics/mixpanel-cost-analysis-report.html');

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    fs.writeFileSync(htmlPath, htmlReport);

    console.log(`✅ Cost analysis complete!`);
    console.log(`📄 JSON Report: ${jsonPath}`);
    console.log(`🌐 HTML Report: ${htmlPath}`);

    // Summary output
    console.log('\n=== COST ANALYSIS SUMMARY ===');
    console.log(`Current Monthly Events: ${report.executive_summary.current_monthly_events}`);
    console.log(`Projected Monthly Events: ${report.executive_summary.projected_monthly_events}`);
    console.log(`Event Reduction: ${report.executive_summary.event_reduction}%`);
    console.log(`Monthly Savings: ${report.executive_summary.monthly_savings}`);
    console.log(`Yearly Savings: ${report.executive_summary.yearly_savings}`);
    console.log(`Payback Period: ${report.executive_summary.payback_period_months} months`);
    console.log(`Business Value Score: ${report.insights.roi_analysis.business_value_score}/10`);

    if (parseFloat(report.executive_summary.monthly_savings.replace('$', '')) > 100) {
      console.log('\n💰 Significant cost savings identified! Implementation highly recommended.');
    }

  } catch (error) {
    console.error('❌ Error during cost analysis:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  estimateEventVolumes,
  calculateCostSavings,
  generateCostAnalysisReport
};
