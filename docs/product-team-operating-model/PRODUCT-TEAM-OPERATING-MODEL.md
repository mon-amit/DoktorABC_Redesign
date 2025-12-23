---
marp: true
size: 16:9
paginate: true
footer: "Helfy Product Operating Model"
style: |
  section {
    background: linear-gradient(135deg, #0a2540 0%, #1a5a5a 50%, #2d8659 100%);
    color: #fff;
    padding: 50px 60px;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }

  /* Extracted deck styles */
  /* Reset and Base Styles */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      /* Presentation Container */
      /* Slide Styles */
      .slide { 
           
           
          margin: 20px 0; 
          background: linear-gradient(135deg, #0a2540 0%, #1a5a5a 50%, #2d8659 100%); 
          padding: 50px 60px; 
          position: relative; 
          box-shadow: 0 10px 40px rgba(0,0,0,0.3); 
          flex-shrink: 0;
      }
  
      /* Typography & Core Components */
      .slide-title { color: white; font-size: 48px; font-weight: 700; margin-bottom: 10px; }
      .slide-subtitle { color: rgba(255,255,255,0.85); font-size: 20px; font-weight: 300; margin-bottom: 30px; }
      
      .logo { 
          width: 140px; 
          height: 140px; 
          background: white; 
          border-radius: 20px; 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 60px; 
          font-weight: 900; 
          color: #0a2540; 
          margin: 0 auto 25px; 
      }
      
      .big-number { color: white; font-size: 76px; font-weight: 900; text-align: center; margin: 20px 0; }
      
      .domain-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
      .domain-card { background: rgba(255,255,255,0.15); border-radius: 12px; padding: 22px; }
      .domain-name { color: white; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
      .domain-owner { color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 600; margin-bottom: 12px; }
      .domain-scope { color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.7; }
      
      .slide-number { position: absolute; bottom: 20px; right: 30px; color: rgba(255,255,255,0.6); font-size: 14px; }
      
      .routines-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 15px; }
      .routine-card { background: rgba(255,255,255,0.15); border-radius: 12px; padding: 16px; }
      .routine-title { color: white; font-size: 14px; font-weight: 700; margin-bottom: 5px; }
      .routine-desc { color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.5; }
      
      .section-divider { color: white; font-size: 18px; font-weight: 600; margin: 15px 0 10px; }
      
      table { width: 100%; color: white; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; border-collapse: collapse; }
      th { padding: 11px; text-align: left; font-size: 13px; border-bottom: 2px solid rgba(255,255,255,0.2); }
      td { padding: 11px; font-size: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      
      .calendar { background: white; border-radius: 12px; overflow: hidden; }
      .calendar-header { display: grid; grid-template-columns: 85px repeat(7, 1fr); background: #0a2540; }
      .calendar-header div { padding: 10px 8px; text-align: center; color: white; font-weight: 700; font-size: 13px; }
      .calendar-row { display: grid; grid-template-columns: 85px repeat(7, 1fr); border-bottom: 1px solid #e0e0e0; }
      .time-slot { padding: 8px; background: #f8f8f8; color: #0a2540; font-weight: 700; font-size: 12px; text-align: center; }
      .calendar-cell { padding: 5px; min-height: 45px; }
      .calendar-event { background: #2d8659; color: white; padding: 4px 6px; border-radius: 5px; font-size: 10px; margin-bottom: 2px; }
      .calendar-event.weekly { background: #ff6b9d; }
      .calendar-event.biweekly { background: #4a90e2; }
      .calendar-event.monthly { background: #9b59b6; }
      
      .step-item { background: rgba(255,255,255,0.15); border-radius: 10px; padding: 15px 20px; margin-bottom: 12px; display: flex; align-items: center; }
      .step-number { width: 40px; height: 40px; background: #2d8659; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; margin-right: 15px; flex-shrink: 0; }
      .step-title { color: white; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
      .step-desc { color: rgba(255,255,255,0.8); font-size: 13px; line-height: 1.5; }
      .phase-divider { color: white; font-size: 22px; font-weight: 700; margin: 15px 0 10px; padding-left: 10px; border-left: 4px solid #2d8659; }
  
      /* New Elements */
      .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; }
      .dashboard-card { background: rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; }
      .dashboard-card h3 { color: white; margin-bottom: 15px; }
      .dashboard-card p { color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.8; }
      .dashboard-card ul { list-style-type: none; }
      .dashboard-card li { margin-bottom: 8px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
      
      .principle-card { background: rgba(255,255,255,0.15); border-radius: 12px; padding: 25px; border-left: 5px solid #2d8659; display: flex; flex-direction: column; justify-content: center; }
      .principle-title { color: white; font-size: 20px; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
      .principle-desc { color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.6; }
      
      .resource-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 40px; }
      .resource-item { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 20px; display: flex; align-items: center; transition: background 0.2s; }
      .resource-item:hover { background: rgba(255,255,255,0.2); cursor: pointer; }
      .resource-icon { font-size: 24px; margin-right: 15px; }
      .resource-text strong { display: block; color: white; font-size: 16px; margin-bottom: 4px; }
      .resource-text span { display: block; color: rgba(255,255,255,0.7); font-size: 12px; }
      .resource-link { text-decoration: none; color: inherit; display: flex; width: 100%; align-items: center;}
  
      /* Action Buttons Styles */
      .btn-action {
          background: #2d8659;
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.2s, background 0.2s;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
      }
      .btn-action:hover {
          transform: translateY(-2px);
          background: #257a4f;
      }
      
      /* URL Generation Modal */
      .modal-box {
          background: #0a2540;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 40px;
          border-radius: 20px;
          width: 500px;
          text-align: center;
          color: white;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          position: relative;
      }
      
      .modal-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; color: white; }
      .modal-desc { font-size: 15px; color: rgba(255,255,255,0.8); margin-bottom: 30px; line-height: 1.6; }
      
      .step-card {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
          text-align: left;
          display: flex;
          align-items: center;
      }
      .step-icon {
          width: 30px;
          height: 30px;
          background: #2d8659;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
      }
      .step-text { font-size: 14px; color: white; }
      
      /* Print Hiding */
---

<!-- Slide 1 -->
<div style="text-align:center;"><div class="logo">H</div></div>
    <h1 class="slide-title" style="text-align:center;">Helfy Product Operating Model</h1>
    <p class="slide-subtitle" style="text-align:center;">Strategic Alignment Through Full-Stack Ownership</p>
    <div class="big-number">4 Domains</div>
    <p style="color:rgba(255,255,255,0.95); font-size:20px; text-align:center; line-height:1.6;">Each PM owns the full vertical: Domain Scope and Internal Team</p>

---

<!-- Slide 2 -->
<h1 class="slide-title">Full-Stack Product Team</h1>
    <p class="slide-subtitle">Complete vertical ownership across 4 domains</p>
    <div class="domain-grid">
        <div class="domain-card">
            <div class="domain-name"> Ecommerce CRO</div>
            <div class="domain-owner">Owner: Dean</div>
            <div class="domain-scope"><strong>Domain:</strong> Full funnels from marketing landing page to checkout<br><strong>Internal Team:</strong> Marketing</div>
        </div>
        <div class="domain-card">
            <div class="domain-name"> Growth &amp; Retention</div>
            <div class="domain-owner">Owner: Amit &amp; Alexsey</div>
            <div class="domain-scope"><strong>Domain:</strong> Customer lifecycle, retention programs, growth features<br><strong>Internal Team:</strong> CRM Team, Customer Success</div>
        </div>
        <div class="domain-card">
            <div class="domain-name"> Operations Backbone</div>
            <div class="domain-owner">Owner: Pavlo</div>
            <div class="domain-scope"><strong>Domain:</strong> Panels and back office operations<br><strong>Internal Team:</strong> Ops Team, Stock &amp; Inventory, Finance</div>
        </div>
        <div class="domain-card">
            <div class="domain-name"> Flowzz Platform</div>
            <div class="domain-owner">Owner: Tamir</div>
            <div class="domain-scope"><strong>Domain:</strong> Cannabis B2C Marketplace (Flowzz.de)<br><strong>Internal Team:</strong> Content Ops, SEO</div>
        </div>
    </div>

---

<!-- Slide 3 -->
<h1 class="slide-title">Operating Principles</h1>
    <p class="slide-subtitle">The values that guide our product culture</p>
    <div class="domain-grid" style="grid-template-rows: repeat(2, 1fr); height: 480px;">
        <div class="principle-card">
            <div class="principle-title"> User Obsession</div>
            <div class="principle-desc">We start with the customer problem, not the solution. We validate hypotheses before we build and ship.</div>
        </div>
        <div class="principle-card">
            <div class="principle-title"> Data &gt; Opinion</div>
            <div class="principle-desc">We bring data to arguments. If we don't have data, we ship a minimal version to learn. God we trust, everyone else brings data.</div>
        </div>
        <div class="principle-card">
            <div class="principle-title"> Disagree &amp; Commit</div>
            <div class="principle-desc">We debate vigorously during the planning phase, but once a decision is made, we align fully and execute with speed.</div>
        </div>
        <div class="principle-card">
            <div class="principle-title"> Extreme Ownership</div>
            <div class="principle-desc">PMs own the outcome, not just the ticket. No "that's not my job." If a feature fails, we own the fix.</div>
        </div>
    </div>

---

<!-- Slide 4 -->
<h1 class="slide-title">Red Queen Code Review Pattern</h1>
    <p class="slide-subtitle">Self-evolving development standards through AI-human collaboration</p>
    <div style="background:rgba(255,255,255,0.1); border-radius:12px; padding:30px; margin-top:20px;">
        <div style="margin-bottom:25px;">
            <div class="principle-title" style="margin-bottom:15px;">The Core Concept</div>
            <div class="principle-desc">
                Like the Red Queen Hypothesis in evolution, development standards must constantly evolve to stay relevant. 
                Every code review comment is either validating a rule or exposing an outdated one. 
                <strong>Fix the code OR update the rule</strong> — creating a self-improving system.
            </div>
        </div>
        <div class="section-divider" style="margin-top:25px; margin-bottom:15px;">Implementation</div>
        <div class="step-item" style="margin-bottom:12px;">
            <div class="step-number">1</div>
            <div>
                <div class="step-title">Document Standards as Cursor Rules</div>
                <div class="step-desc">Store patterns in <code style="background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px;">.cursor/rules/*.mdc</code> files:<br>
                • <strong>react-patterns.mdc</strong> - Component architecture, composition, props<br>
                • <strong>api-development.mdc</strong> - HTTP client usage, status codes, error handling<br>
                • <strong>code-quality.mdc</strong> - Constants, logging, type safety, security<br>
                • <strong>testing-accessibility.mdc</strong> - Test patterns, WCAG compliance, ARIA<br>
                • <strong>python-core-architecture.mdc</strong> - Service layer, error handling, decorators</div>
            </div>
        </div>
        <div class="step-item" style="margin-bottom:12px;">
            <div class="step-number">2</div>
            <div>
                <div class="step-title">Run Code Review Command</div>
                <div class="step-desc">Use <code style="background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px;">@code-review.md</code> in Cursor to analyze code against documented rules. AI generates structured feedback with file paths, rule violations, and concrete suggestions.</div>
            </div>
        </div>
        <div class="step-item" style="margin-bottom:12px;">
            <div class="step-number">3</div>
            <div>
                <div class="step-title">The Feedback Loop</div>
                <div class="step-desc">When AI flags a violation: <strong>Is the rule right?</strong><br>
                • <strong>Yes</strong> → Fix the code (follow the rule)<br>
                • <strong>No</strong> → Update the rule (evolve the system)<br>
                Next review uses updated standards automatically.</div>
            </div>
        </div>
        <div style="background:rgba(45,134,89,0.2); border-left:4px solid #2d8659; border-radius:8px; padding:20px; margin-top:20px;">
            <div class="step-title" style="margin-bottom:10px;">Example Rule Violation</div>
            <div style="font-size:12px; line-height:1.6; color:rgba(255,255,255,0.9);">
                <strong>File:</strong> src/components/UserProfile.tsx<br>
                <strong>Issue:</strong> Using axios directly instead of HttpClient<br>
                <strong>Rule:</strong> api-development.mdc - "Always use HttpClient for API requests"<br>
                <strong>Fix:</strong> Replace <code style="background:rgba(0,0,0,0.3); padding:1px 4px;">axios.get()</code> with <code style="background:rgba(0,0,0,0.3); padding:1px 4px;">HttpClient.getUsers()</code>
            </div>
        </div>
        <div class="section-divider" style="margin-top:25px; margin-bottom:15px;">Benefits</div>
        <div class="routines-grid" style="margin-top:0;">
            <div class="routine-card"><div class="routine-title">Consistent Code</div><div class="routine-desc">AI generates code that matches team standards automatically. Same patterns, every time.</div></div>
            <div class="routine-card"><div class="routine-title">Faster Onboarding</div><div class="routine-desc">New developers run @code-review.md on their first PR to learn patterns instantly</div></div>
            <div class="routine-card"><div class="routine-title">Less Bikeshedding</div><div class="routine-desc">Debates shift from "should we use axios?" to "should we update the rule?"</div></div>
            <div class="routine-card"><div class="routine-title">Focus on Logic</div><div class="routine-desc">Reviewers focus on business logic, edge cases, and architecture - not style</div></div>
            <div class="routine-card"><div class="routine-title">Self-Evolving</div><div class="routine-desc">Rules adapt as patterns change. Outdated rules get updated, not ignored</div></div>
            <div class="routine-card"><div class="routine-title">Documented Decisions</div><div class="routine-desc">Every pattern includes the "why" so future developers understand reasoning</div></div>
        </div>
    </div>

---

<!-- Slide 5 -->
<h1 class="slide-title">Product Routines - Team Level</h1>
    <p class="slide-subtitle">Cross-squad ceremonies for alignment</p>
    <div class="section-divider"> Daily Team Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">15m Daily Standup</div><div class="routine-desc">All PMs sync on progress, blockers, and dependencies</div></div>
        <div class="routine-card"><div class="routine-title">5m Dashboard Check</div><div class="routine-desc">Each PM reviews their domain KPIs</div></div>
        <div class="routine-card"><div class="routine-title">Funnel Walk</div><div class="routine-desc">Click through checkout flow on mobile to spot issues</div></div>
    </div>
    <div class="section-divider"> Weekly Team Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Weekly PM Summary</div><div class="routine-desc">Each PM presents: What shipped, What's blocked, What's next</div></div>
        <div class="routine-card"><div class="routine-title">Weekly Product Meeting</div><div class="routine-desc">Cross-vertical alignment, resource coordination, dependencies</div></div>
        <div class="routine-card"><div class="routine-title">BI Weekly Sync</div><div class="routine-desc">Coordination with Marketing, Design, CRM teams</div></div>
        <div class="routine-card"><div class="routine-title">1-on-1 PM with Product TL</div><div class="routine-desc">Individual strategic guidance and career development</div></div>
        <div class="routine-card"><div class="routine-title">Weekly Release Notes</div><div class="routine-desc">Document and communicate all shipped features</div></div>
    </div>

---

<!-- Slide 6 -->
<h1 class="slide-title">Monthly Team Routines</h1>
    <p class="slide-subtitle">Deep dive ceremonies for strategic alignment across all squads</p>
    <div class="routines-grid" style="margin-top:50px;">
        <div class="routine-card"><div class="routine-title"> Release Notes</div><div class="routine-desc">Monthly summary of all shipped features across domains</div></div>
        <div class="routine-card"><div class="routine-title"> Roadmap Review</div><div class="routine-desc">Review progress on quarterly roadmap and adjust priorities</div></div>
        <div class="routine-card"><div class="routine-title"> Revenue Performance</div><div class="routine-desc">Monthly P&amp;L review for each vertical with leadership</div></div>
        <div class="routine-card"><div class="routine-title"> Management Roadmap Meeting</div><div class="routine-desc">Strategic review with management on roadmap progress</div></div>
        <div class="routine-card"><div class="routine-title"> OKR Check-in</div><div class="routine-desc">Track progress on quarterly OKRs and key results</div></div>
        <div class="routine-card"><div class="routine-title"> Retrospective</div><div class="routine-desc">What went well, what didn't, what to improve next month</div></div>
    </div>

---

<!-- Slide 7 -->
<h1 class="slide-title">Squad Routines - Ecommerce CRO</h1>
    <p class="slide-subtitle">Dean's domain-specific activities</p>
    <div class="section-divider"> Weekly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Funnel Analysis</div><div class="routine-desc">Deep dive into conversion rates across landing pages and checkout</div></div>
        <div class="routine-card"><div class="routine-title">A/B Test Review</div><div class="routine-desc">Review running experiments, analyze results, plan next tests</div></div>
        <div class="routine-card"><div class="routine-title">Marketing Campaign Sync</div><div class="routine-desc">Align on upcoming campaigns, landing pages, and traffic sources</div></div>
        <div class="routine-card"><div class="routine-title">Competitor Funnel Scan</div><div class="routine-desc">Review competitor landing pages, user journeys, and messaging</div></div>
    </div>
    <div class="section-divider"> Monthly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Conversion Rate Report</div><div class="routine-desc">Monthly performance review of all funnels and optimization impact</div></div>
        <div class="routine-card"><div class="routine-title">Marketing Performance Review</div><div class="routine-desc">ROI analysis across channels, CAC trends, attribution review</div></div>
    </div>

---

<!-- Slide 8 -->
<h1 class="slide-title">Squad Routines - Growth &amp; Retention</h1>
    <p class="slide-subtitle">Amit &amp; Alexsey's domain-specific activities</p>
    <div class="section-divider"> Weekly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Retention Metrics Review</div><div class="routine-desc">Analyze churn, repeat purchase rate, customer lifetime value</div></div>
        <div class="routine-card"><div class="routine-title">CRM Campaign Planning</div><div class="routine-desc">Plan email/SMS campaigns, segment targeting, automation flows</div></div>
        <div class="routine-card"><div class="routine-title">Customer Journey Mapping</div><div class="routine-desc">Identify drop-off points and opportunities in lifecycle stages</div></div>
        <div class="routine-card"><div class="routine-title">Competitor Product Scan</div><div class="routine-desc">Review competitor KPIs, pricing strategies, new product launches</div></div>
        <div class="routine-card"><div class="routine-title">Growth Feature Testing</div><div class="routine-desc">Review referral programs, loyalty features, activation experiments</div></div>
    </div>
    <div class="section-divider"> Monthly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">LTV &amp; Cohort Analysis</div><div class="routine-desc">Deep dive into customer cohorts and lifetime value trends</div></div>
        <div class="routine-card"><div class="routine-title">Retention Program Review</div><div class="routine-desc">Evaluate success of retention initiatives and subscription programs</div></div>
    </div>

---

<!-- Slide 9 -->
<h1 class="slide-title">Squad Routines - Operations Backbone</h1>
    <p class="slide-subtitle">Pavlo's domain-specific activities</p>
    <div class="section-divider"> Weekly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Ops Team Sync</div><div class="routine-desc">Align on doctor panel capacity, pharmacy integrations, fulfillment</div></div>
        <div class="routine-card"><div class="routine-title">Stock &amp; Inventory Review</div><div class="routine-desc">Monitor stock levels, stock measurements and more</div></div>
        <div class="routine-card"><div class="routine-title">Finance &amp; Payments Check</div><div class="routine-desc">Review payment gateway performance, reconciliation issues</div></div>
        <div class="routine-card"><div class="routine-title">Panel Automation Progress</div><div class="routine-desc">Track improvements to back office tools and automation initiatives</div></div>
        <div class="routine-card"><div class="routine-title">Back Office Efficiency</div><div class="routine-desc">Review panel usability, workflow optimization, user feedback</div></div>
    </div>
    <div class="section-divider"> Monthly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Operational Efficiency Report</div><div class="routine-desc">Doctor approval times, stock-outs, payment success rates</div></div>
        <div class="routine-card"><div class="routine-title">Cost Optimization Review</div><div class="routine-desc">Analyze operational costs, identify efficiency improvements</div></div>
    </div>

---

<!-- Slide 10 -->
<h1 class="slide-title">Squad Routines - Flowzz Platform</h1>
    <p class="slide-subtitle">Tamir's domain-specific activities</p>
    <div class="section-divider"> Weekly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">SEO Performance Review</div><div class="routine-desc">Track organic rankings, traffic, technical SEO issues</div></div>
        <div class="routine-card"><div class="routine-title">Content Ops Sync</div><div class="routine-desc">Plan product descriptions, blog content, CMS updates</div></div>
        <div class="routine-card"><div class="routine-title">Marketplace Analytics</div><div class="routine-desc">Review product performance, category trends, search behavior</div></div>
        <div class="routine-card"><div class="routine-title">User Experience Monitoring</div><div class="routine-desc">Analyze 404 errors, site speed, mobile usability issues</div></div>
        <div class="routine-card"><div class="routine-title">Catalog Management</div><div class="routine-desc">Review product listings, pricing, availability updates</div></div>
    </div>
    <div class="section-divider"> Monthly Squad Routines</div>
    <div class="routines-grid">
        <div class="routine-card"><div class="routine-title">Organic Growth Report</div><div class="routine-desc">Monthly SEO performance, new user acquisition, content ROI</div></div>
        <div class="routine-card"><div class="routine-title">Platform Health Check</div><div class="routine-desc">Review site performance, conversion rates, user feedback</div></div>
    </div>

---

<!-- Slide 11 -->
<h1 class="slide-title">Daily Monitoring Dashboard</h1>
    <p class="slide-subtitle">5-minute KPI review each morning</p>
    <div class="dashboard-grid">
        <div class="dashboard-card">
            <h3>Amit (Retention)</h3>
            <ul>
                <li><span>Rx Ticket Vol:</span> <strong>XX (vs avg)</strong></li>
                <li><span>Rx Refund Rate:</span> <strong>&lt; 2%</strong></li>
                <li><span>Churn Rate:</span> <strong>Weekly Trend</strong></li>
                <li><span>NPS Score:</span> <strong>Live feed</strong></li>
            </ul>
        </div>
        <div class="dashboard-card">
            <h3>Dean &amp; Alexsey (CRO/Growth)</h3>
            <ul>
                <li><span>Sales Velocity:</span> <strong>vs Target</strong></li>
                <li><span>Blended CAC:</span> <strong>WoW Change</strong></li>
                <li><span>Cart Abandon %:</span> <strong>Daily Avg</strong></li>
                <li><span>Landing Pg Conv:</span> <strong>Top 3 pgs</strong></li>
            </ul>
        </div>
        <div class="dashboard-card">
            <h3>Pavlo (Ops)</h3>
            <ul>
                <li><span>Low Stock Alerts:</span> <strong>SKU count</strong></li>
                <li><span>Dr Rejection Rate:</span> <strong>% of Total</strong></li>
                <li><span>Pay Success %:</span> <strong>Gateway health</strong></li>
                <li><span>Order to Ship:</span> <strong>Avg Hours</strong></li>
            </ul>
        </div>
        <div class="dashboard-card">
            <h3>Tamir (Flowzz)</h3>
            <ul>
                <li><span>Organic Users:</span> <strong>Daily Vol</strong></li>
                <li><span>New Signups:</span> <strong>vs Target</strong></li>
                <li><span>404 Errors:</span> <strong>Alert count</strong></li>
                <li><span>Bounce Rate:</span> <strong>Mobile vs Desk</strong></li>
            </ul>
        </div>
    </div>

---

<!-- Slide 12 -->
<h1 class="slide-title">Weekly Stakeholder Alignment</h1>
    <p class="slide-subtitle">Mandatory syncs between PMs and functional teams</p>
    <table style="margin-top:20px;">
        <thead><tr><th>PM</th><th>Stakeholder</th><th>Goal</th></tr></thead>
        <tbody>
        <tr><td><strong>Dean</strong></td><td>Marketing Lead</td><td>Campaign Performance &amp; Funnel Optimization</td></tr>
        <tr><td><strong>Amit &amp; Alexsey</strong></td><td>CRM Lead</td><td>Retention Programs, Lifecycle &amp; Segmentation</td></tr>
        <tr><td><strong>Amit &amp; Alexsey</strong></td><td>Customer Success</td><td>User Feedback, Ticket Trends, Refunds</td></tr>
        <tr><td><strong>Pavlo</strong></td><td>Head of Ops</td><td>Supply, Fulfillment &amp; Doctor Capacity</td></tr>
        <tr><td><strong>Pavlo</strong></td><td>Finance &amp; Inventory</td><td>Stock Value, COGS, Reconciliation</td></tr>
        <tr><td><strong>Tamir</strong></td><td>Content &amp; SEO</td><td>Article Roadmap, Keyword Ranking, On-page</td></tr>
        </tbody>
    </table>

---

<!-- Slide 13 -->
<h1 class="slide-title">Weekly Operating Calendar</h1>
    <p class="slide-subtitle">Structured routines for the entire product team</p>
    <div class="calendar">
        <div class="calendar-header"><div>Time</div><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div>
        <div class="calendar-row"><div class="time-slot">09:00</div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event">Send Weekly Status</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">09:45</div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event">Daily Squads (All PMs)</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">10:00</div><div class="calendar-cell"><div class="calendar-event">Daily Squads (Amit, Dean, Tamir)</div></div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event">Daily Squads</div></div><div class="calendar-cell"><div class="calendar-event">Daily Squads</div></div><div class="calendar-cell"><div class="calendar-event">Daily Squads</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">11:00</div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event weekly">Weekly Product Team</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">13:00</div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event">Competitor Scan</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">14:00</div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event biweekly">Marketing Sync (Bi-Weekly)</div></div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event biweekly">Design Sync (Bi-Weekly)</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">15:00</div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event monthly">Roadmap with Mgmt (Tue)</div></div><div class="calendar-cell"><div class="calendar-event biweekly">CRM Sync (Bi-Weekly)</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
        <div class="calendar-row"><div class="time-slot">16:00</div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"><div class="calendar-event biweekly">CS Sync (Bi-Weekly)</div></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div><div class="calendar-cell"></div></div>
    </div>

---

<!-- Slide 14 -->
<h1 class="slide-title"> Roadmap Building Process - Phase 1</h1>
    <p class="slide-subtitle">Discovery &amp; Input Gathering - Week 1</p>
    <div style="background:rgba(255,255,255,0.1); border-radius:12px; padding:25px; margin-top:30px;">
        <div class="step-item"><div class="step-number">1</div><div><div class="step-title">Get Company Goals from Management</div><div class="step-desc">Align with company OKRs and strategic priorities • Day 1-2</div></div></div>
        <div class="step-item"><div class="step-number">2</div><div><div class="step-title">Collect Feedback from Company Teams</div><div class="step-desc">Gather input from CS, Marketing, Ops on pain points • Day 2-3</div></div></div>
        <div class="step-item"><div class="step-number">3</div><div><div class="step-title">Analyse Tickets, Feedbacks, Competitor</div><div class="step-desc">Deep dive into support tickets, user feedback, competitive landscape • Day 3-5</div></div></div>
        <div class="step-item"><div class="step-number">4</div><div><div class="step-title">Gather 20 Initiatives to Prioritize</div><div class="step-desc">Brainstorm and compile comprehensive list of potential initiatives • Day 5-7</div></div></div>
    </div>

---

<!-- Slide 15 -->
<h1 class="slide-title"> Roadmap Building Process - Phase 2</h1>
    <p class="slide-subtitle">Prioritization &amp; Planning - Week 2-3</p>
    <div style="background:rgba(255,255,255,0.1); border-radius:12px; padding:25px; margin-top:30px;">
        <div class="step-item"><div class="step-number">5</div><div><div class="step-title">RICE Prioritize Initiatives</div><div class="step-desc">Score initiatives using RICE framework (Reach, Impact, Confidence, Effort) • Day 8-9</div></div></div>
        <div class="step-item"><div class="step-number">6</div><div><div class="step-title">Choose 5 Initiatives, Draft PRDs</div><div class="step-desc">Select top 5 initiatives and start drafting Product Requirements Documents • Day 10-14</div></div></div>
        <div class="step-item"><div class="step-number">7</div><div><div class="step-title">Present to David for Approval</div><div class="step-desc">Review proposed initiatives with Product TL for strategic alignment • Day 15</div></div></div>
        <div class="step-item"><div class="step-number">8</div><div><div class="step-title">Collect T-shirt Sizes from Dev</div><div class="step-desc">Get effort estimates (S/M/L/XL) from engineering team • Day 16-17</div></div></div>
    </div>

---

<!-- Slide 16 -->
<h1 class="slide-title"> Roadmap Building Process - Phase 3</h1>
    <p class="slide-subtitle">Execution Planning &amp; Finalization - Week 4</p>
    <div style="background:rgba(255,255,255,0.1); border-radius:12px; padding:25px; margin-top:30px;">
        <div class="step-item"><div class="step-number">9</div><div><div class="step-title">Plan Scope of Quarter &amp; Resources</div><div class="step-desc">Define what fits in the quarter based on capacity and dependencies • Day 18-19</div></div></div>
        <div class="step-item"><div class="step-number">10</div><div><div class="step-title">Create Detailed PRDs</div><div class="step-desc">Finalize comprehensive PRDs with specs, user stories, success metrics • Day 20-23</div></div></div>
        <div class="step-item"><div class="step-number">11</div><div><div class="step-title">Create Detailed Gantt Chart</div><div class="step-desc">Build timeline with milestones, dependencies, resource allocation • Day 24-25</div></div></div>
        <div class="step-item"><div class="step-number">12</div><div><div class="step-title">Present to David</div><div class="step-desc">Final review of detailed plan with Product TL • Day 26</div></div></div>
        <div class="step-item"><div class="step-number">13</div><div><div class="step-title">Present to Management</div><div class="step-desc">Present quarterly roadmap to executive team for final approval • Day 28-30</div></div></div>
    </div>

---

<!-- Slide 17 -->
<h1 class="slide-title">Decision Rights Matrix (RACI)</h1>
    <p class="slide-subtitle">Clear ownership for key product decisions</p>
    <table style="margin-top:40px; height: 450px;">
        <thead>
            <tr>
                <th style="width: 25%">Decision Area</th>
                <th style="width: 15%">Responsible<br><span style="font-weight:400; font-size:11px; color:rgba(255,255,255,0.7)">(Driver)</span></th>
                <th style="width: 15%">Accountable<br><span style="font-weight:400; font-size:11px; color:rgba(255,255,255,0.7)">(Approver)</span></th>
                <th style="width: 20%">Consulted<br><span style="font-weight:400; font-size:11px; color:rgba(255,255,255,0.7)">(Contributors)</span></th>
                <th style="width: 25%">Informed<br><span style="font-weight:400; font-size:11px; color:rgba(255,255,255,0.7)">(Stakeholders)</span></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Roadmap Priorities</strong></td>
                <td>PM</td>
                <td>Product TL</td>
                <td>Eng/Design Leads</td>
                <td>Management, CS, Ops, Marketing</td>
            </tr>
            <tr>
                <td><strong>Feature Scope (PRD)</strong></td>
                <td>PM</td>
                <td>PM</td>
                <td>Eng Lead, Designer</td>
                <td>Marketing, CS</td>
            </tr>
            <tr>
                <td><strong>UX/UI Design</strong></td>
                <td>Product Designer</td>
                <td>PM</td>
                <td>Eng Lead</td>
                <td>-</td>
            </tr>
            <tr>
                <td><strong>Tech Stack/Implementation</strong></td>
                <td>Eng Lead</td>
                <td>CTO</td>
                <td>PM</td>
                <td>-</td>
            </tr>
            <tr>
                <td><strong>Release Schedule</strong></td>
                <td>PM</td>
                <td>Product TL</td>
                <td>Marketing</td>
                <td>CS, Ops, Support</td>
            </tr>
        </tbody>
    </table>

---

<!-- Slide 18 -->
<h1 class="slide-title">Success Metrics by Squad</h1>
    <p class="slide-subtitle">How each domain measures impact and value</p>
    <div class="domain-grid">
        <div class="domain-card">
            <div class="domain-name"> Ecommerce CRO</div>
            <div style="margin-top:10px; padding-top:10px; font-size:13px; line-height:1.4;">
                <div style="margin-bottom:8px;"><strong style="color:#4cd137;"> Conv Rate %</strong><br>(Total Orders / Total Sessions) * 100</div>
                <div><strong style="color:#e1b12c;"> AOV</strong><br>Total Revenue / Total # of Orders</div>
            </div>
        </div>
        <div class="domain-card">
            <div class="domain-name"> Growth &amp; Retention</div>
            <div style="margin-top:10px; padding-top:10px; font-size:13px; line-height:1.4;">
                <div style="margin-bottom:8px;"><strong style="color:#4cd137;"> 90-Day LTV</strong><br>Avg value * Purchase Freq * Retention (90d)</div>
                <div><strong style="color:#e1b12c;"> Churn Rate</strong><br>(Lost Cust / Total Cust at Start) * 100</div>
            </div>
        </div>
        <div class="domain-card">
            <div class="domain-name"> Operations Backbone</div>
            <div style="margin-top:10px; padding-top:10px; font-size:13px; line-height:1.4;">
                <div style="margin-bottom:8px;"><strong style="color:#4cd137;"> Perfect Order Rate %</strong><br>(On-time &amp; Complete Orders / Total Orders) * 100</div>
                <div><strong style="color:#e1b12c;"> Cost per Order</strong><br>Total Fulfillment Costs / Total Orders</div>
            </div>
        </div>
        <div class="domain-card">
            <div class="domain-name"> Flowzz Platform</div>
            <div style="margin-top:10px; padding-top:10px; font-size:13px; line-height:1.4;">
                <div style="margin-bottom:8px;"><strong style="color:#4cd137;"> Organic Traffic</strong><br>Unique Users from "Organic Search" Source</div>
                <div><strong style="color:#e1b12c;"> Bounce Rate</strong><br>% of single-page sessions (no interaction)</div>
            </div>
        </div>
    </div>

---

<!-- Slide 19 -->
<h1 class="slide-title">Escalation Paths</h1>
    <p class="slide-subtitle">When and how to escalate blockers</p>
    <div style="background:rgba(255,255,255,0.1); border-radius:12px; padding:40px; margin-top:30px;">
        <div class="step-item" style="background: linear-gradient(90deg, rgba(45,134,89,0.3) 0%, rgba(255,255,255,0.1) 100%);">
            <div class="step-number">1</div>
            <div>
                <div class="step-title">Level 1: Squad Sync (Immediately)</div>
                <div class="step-desc">
                    <strong>Trigger:</strong> Blocker within the squad (e.g., waiting on design, dev hurdle).<br>
                    <strong>Action:</strong> PM and Tech Lead meet immediately to adjust scope or resources.
                </div>
            </div>
        </div>
        <div style="height: 30px; border-left: 2px dashed rgba(255,255,255,0.3); margin-left: 35px;"></div>
        <div class="step-item" style="background: linear-gradient(90deg, rgba(230, 126, 34, 0.3) 0%, rgba(255,255,255,0.1) 100%);">
            <div class="step-number" style="background: #e67e22;">2</div>
            <div>
                <div class="step-title">Level 2: Product TL (1-2 Hours / 24 Hours)</div>
                <div class="step-desc">
                    <strong>Trigger:</strong> Cross-squad dependency or unresolvable resource conflict.<br>
                    <strong>Action:</strong> Raise in "Weekly Product Meeting" or direct Slack channel for arbitration.
                </div>
            </div>
        </div>
        <div style="height: 30px; border-left: 2px dashed rgba(255,255,255,0.3); margin-left: 35px;"></div>
        <div class="step-item" style="background: linear-gradient(90deg, rgba(192, 57, 43, 0.3) 0%, rgba(255,255,255,0.1) 100%);">
            <div class="step-number" style="background: #c0392b;">3</div>
            <div>
                <div class="step-title">Level 3: Leadership/Exec (Within 72 Hours)</div>
                <div class="step-desc">
                    <strong>Trigger:</strong> Strategic misalignment, budget requirement, or major risk.<br>
                    <strong>Action:</strong> PM prepares 1-pager; Product TL presents to David/Management.
                </div>
            </div>
        </div>
    </div>

---

<!-- Slide 20 -->
<h1 class="slide-title">Appendix &amp; Templates</h1>
    <p class="slide-subtitle">Standard resources for the product team</p>
    
    <div class="resource-grid">
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Weekly PM Summary</strong>
                <span>Confluence • Template for weekly updates</span>
            </div>
        </div>
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Roadmap Planning Board</strong>
                <span>Jira • Quarterly planning view and backlog</span>
            </div>
        </div>
        <div class="resource-item">
            <a href="https://doktorabc.atlassian.net/wiki/spaces/GPR/pages/2024865880/A+B+Testing" target="_blank" class="resource-link">
                <div class="resource-icon"></div>
                <div class="resource-text">
                    <strong>Experiment / A/B Test Card</strong>
                    <span>Confluence • Click to open template</span>
                </div>
            </a>
        </div>
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Release Note Template</strong>
                <span>Confluence • Format for weekly stakeholder updates</span>
            </div>
        </div>
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Retrospective Board</strong>
                <span>Confluence • Start/Stop/Continue framework</span>
            </div>
        </div>
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Competitor Scan</strong>
                <span>Confluence • Market analysis template</span>
            </div>
        </div>
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Cursor Rules Setup</strong>
                <span>.cursor/rules/*.mdc • 5 rule files covering React, API, code quality, testing, Python</span>
            </div>
        </div>
        <div class="resource-item">
            <div class="resource-icon"></div>
            <div class="resource-text">
                <strong>Code Review Command</strong>
                <span>.cursor/code-review.md • Run @code-review.md in Cursor for AI-powered reviews</span>
            </div>
        </div>
    </div>

---

<!-- Slide 21 -->
<div style="text-align:center; margin-top:250px;">
        <h1 class="slide-title" style="font-size:64px;">Questions?</h1>
    </div>

