// Yaduka - Strategic Growth Expedition Engine
document.addEventListener('DOMContentLoaded', () => {

  // --- EXPEDITION STAGES DATA ---
  const stages = [
    {
      id: 'basecamp',
      elevation: 'Elevation 0m — Basecamp',
      title: 'The Reality Inventory (Ingestion)',
      quote: '"Before you conquer the mountain, you must empty the illusions from your pack."',
      challenge: 'Confronting messy unit economics, scattered ad accounts, and murky customer acquisition costs. Leaving behind the comfort of guesswork.',
      happiness: 'The exhilarating peace of absolute clarity. Seeing your business in sharp, unvarnished definition on an honest topographic map.',
      nextFrontier: 'The unknown wilderness ahead: deciphering where the hidden market currents truly flow.',
      metricLabel: 'Diagnostic Clarity',
      metricValue: '100% Unbiased',
      badgeColor: 'bg-[#5F4E4A] text-white',
      accent: '#5F4E4A'
    },
    {
      id: 'ridge1',
      elevation: 'Elevation 1,800m — The Wilderness Ridge',
      title: 'Autonomous Reconnaissance (Market & Competitor Intel)',
      quote: '"The crowded road is expensive. The secret ridge is profitable."',
      challenge: 'Sifting through competitor noise, deciphering saturated ad keywords, and identifying why previous marketing tests sputtered.',
      happiness: 'Uncovering the golden whitespace—a high-intent customer segment that your competitors are completely ignoring.',
      nextFrontier: 'Defending this new territory against copycats; crafting messaging sharp enough to pierce customer skepticism.',
      metricLabel: 'Whitespace Opportunity Found',
      metricValue: '3 Uncontested Angles',
      badgeColor: 'bg-[#D6ADAD] text-[#382C29]',
      accent: '#D6ADAD'
    },
    {
      id: 'highcamp',
      elevation: 'Elevation 3,600m — The Crucible Camp',
      title: 'The Diagnostic Mirror (Positioning Truth)',
      quote: '"You cannot scale what is leaking. True mastery begins by pruning waste."',
      challenge: 'Cutting painful deadweight: shutting down vanity ad campaigns, rethinking underperforming offers, and confronting low conversion rates.',
      happiness: 'Watching customer acquisition costs drop by 42%. Experiencing the rush when high-quality customers arrive because the positioning finally resonates.',
      nextFrontier: 'Scaling strain: higher order volume exposes operational friction and demands systematic retention.',
      metricLabel: 'Ad Budget Waste Eliminated',
      metricValue: '42% Preserved Capital',
      badgeColor: 'bg-[#5F4E4A] text-[#FAF7F2]',
      accent: '#5F4E4A'
    },
    {
      id: 'summit-council',
      elevation: 'Elevation 5,400m — The Summit Council',
      title: 'The Co-Pilot Dialogue (Collaborative War Room)',
      quote: '"A general never enters battle alone. Strategy is forged in rigorous debate."',
      challenge: 'High-stakes capital allocation decisions: deciding whether to double down on paid search, organic authority, or outbound partnerships.',
      happiness: 'The calm confidence of a united, mathematical battle plan co-created with an intelligent partner who never panics.',
      nextFrontier: 'Volatile macro-market shifts, platform algorithm updates, and maintaining brand discipline during rapid growth.',
      metricLabel: 'Strategic Conviction',
      metricValue: 'Complete Alignment',
      badgeColor: 'bg-[#D6ADAD] text-[#382C29]',
      accent: '#D6ADAD'
    },
    {
      id: 'endless-horizon',
      elevation: 'Elevation 8,200m+ — The Endless Horizon',
      title: 'The Immutable Roadmap (Continuous Execution)',
      quote: '"Every peak you conquer reveals higher mountains. That is not a curse; it is the privilege of the great."',
      challenge: 'Transforming from an aggressive startup into an enduring, category-defining market leader. Retaining agility while scaling team and systems.',
      happiness: 'The profound pride of having built an unstoppable growth engine that operates predictably, sustainably, and profitably.',
      nextFrontier: 'The next expedition: entering adjacent markets, acquiring smaller competitors, and building a legendary brand legacy.',
      metricLabel: 'Compounded Scaling Trajectory',
      metricValue: '4.8x Sustainable LTV',
      badgeColor: 'bg-[#382C29] text-white',
      accent: '#382C29'
    }
  ];

  // Stage Switcher Logic
  const stageButtons = document.querySelectorAll('.stage-nav-btn');
  const stageTitleEl = document.getElementById('active-stage-title');
  const stageElevationEl = document.getElementById('active-stage-elevation');
  const stageQuoteEl = document.getElementById('active-stage-quote');
  const stageChallengeEl = document.getElementById('active-stage-challenge');
  const stageHappinessEl = document.getElementById('active-stage-happiness');
  const stageNextEl = document.getElementById('active-stage-next');
  const stageMetricLabel = document.getElementById('active-metric-label');
  const stageMetricValue = document.getElementById('active-metric-value');

  function updateStage(stageId) {
    const stage = stages.find(s => s.id === stageId) || stages[0];
    
    // Update active button state
    stageButtons.forEach(btn => {
      if (btn.dataset.stage === stageId) {
        btn.classList.add('bg-[#5F4E4A]', 'text-white', 'shadow-md');
        btn.classList.remove('bg-white', 'text-[#5F4E4A]', 'hover:bg-[#F4E8E8]');
      } else {
        btn.classList.remove('bg-[#5F4E4A]', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-[#5F4E4A]', 'hover:bg-[#F4E8E8]');
      }
    });

    // Animate content change
    const displayCard = document.getElementById('expedition-display-card');
    if (displayCard) {
      displayCard.style.opacity = '0.4';
      displayCard.style.transform = 'translateY(6px)';
      setTimeout(() => {
        if (stageElevationEl) stageElevationEl.textContent = stage.elevation;
        if (stageTitleEl) stageTitleEl.textContent = stage.title;
        if (stageQuoteEl) stageQuoteEl.textContent = stage.quote;
        if (stageChallengeEl) stageChallengeEl.textContent = stage.challenge;
        if (stageHappinessEl) stageHappinessEl.textContent = stage.happiness;
        if (stageNextEl) stageNextEl.textContent = stage.nextFrontier;
        if (stageMetricLabel) stageMetricLabel.textContent = stage.metricLabel;
        if (stageMetricValue) stageMetricValue.textContent = stage.metricValue;

        displayCard.style.opacity = '1';
        displayCard.style.transform = 'translateY(0px)';
      }, 150);
    }
  }

  stageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      updateStage(btn.dataset.stage);
    });
  });

  // --- BUSINESS BLUEPRINT SIMULATOR ---
  const businessData = {
    'saas': {
      archetype: 'Bootstrapped B2B SaaS',
      arrRange: '$12k – $85k MRR',
      primaryTrap: 'Pouring money into Facebook/Google ads before achieving customer retention resonance.',
      yadukaDiagnostic: 'Churn in onboarding is bleeding 38% of acquired accounts. High search intent for competitor alternatives.',
      strategicIntervention: 'Shift 70% budget from cold display ads into High-Intent Comparison Pages & Interactive ROI Calculators.',
      futureRoadmap: [
        { day: 'Day 1–15', task: 'Revamp positioning: focus on the single sharpest problem your software solves effortlessly.' },
        { day: 'Day 16–45', task: 'Launch Search Intent Capture & Comparison Landing Pages targeting disenfranchised rival users.' },
        { day: 'Day 46–90', task: 'Implement Automated Strategic Email Nurture & Founder-Led Thought Leadership on LinkedIn.' }
      ],
      efficiencyScore: '+215% CAC Payback Velocity'
    },
    'd2c': {
      archetype: 'Direct-To-Consumer & Physical Goods',
      arrRange: '$200k – $1.2M Annual Revenue',
      primaryTrap: 'Relying exclusively on Meta ROAS volatility while ignoring second-purchase customer retention.',
      yadukaDiagnostic: 'First-order acquisition is breakeven, but 90-day repeat purchase rate is 8% below industry benchmark.',
      strategicIntervention: 'Re-engineer bundle economics to raise AOV by 28%; deploy personalized post-purchase retention journeys.',
      futureRoadmap: [
        { day: 'Day 1–15', task: 'Bundle restructuring: introduce high-margin Tiered Value Packs to absorb ad costs.' },
        { day: 'Day 16–45', task: 'Deploy micro-influencer product seeding and UGC testimonial ad variations.' },
        { day: 'Day 46–90', task: 'Launch VIP Retention Club with automated replenishment reminders.' }
      ],
      efficiencyScore: '3.4x Blend ROAS on Scaled Spend'
    },
    'agency': {
      archetype: 'Specialized Consulting & Agency',
      arrRange: '$150k – $800k Annual Revenue',
      primaryTrap: 'Feast-or-famine referral cycles and vague "full-service" positioning that confuses prospects.',
      yadukaDiagnostic: 'Broad positioning forces price negotiations. High client lifetime value, but lack of predictable inbound pipeline.',
      strategicIntervention: 'Productize core offering into an irresistible Flagship Diagnostic Audit with guaranteed deliverable timelines.',
      futureRoadmap: [
        { day: 'Day 1–15', task: 'Package expertise into a single high-ticket "Diagnostic Flagship" offer.' },
        { day: 'Day 16–45', task: 'Run Targeted Account-Based Marketing (ABM) toward 250 vetted dream enterprise prospects.' },
        { day: 'Day 46–90', task: 'Publish authoritative benchmark teardowns to build inbound industry authority.' }
      ],
      efficiencyScore: '$48,000 Pipeline Value Generated / Mo'
    }
  };

  const businessSelector = document.getElementById('business-type-select');
  const simArchetype = document.getElementById('sim-archetype');
  const simRevenue = document.getElementById('sim-revenue');
  const simTrap = document.getElementById('sim-trap');
  const simDiagnostic = document.getElementById('sim-diagnostic');
  const simIntervention = document.getElementById('sim-intervention');
  const simRoadmap = document.getElementById('sim-roadmap');
  const simEfficiency = document.getElementById('sim-efficiency');

  function renderSimulation(type) {
    const data = businessData[type] || businessData['saas'];
    if (simArchetype) simArchetype.textContent = data.archetype;
    if (simRevenue) simRevenue.textContent = data.arrRange;
    if (simTrap) simTrap.textContent = data.primaryTrap;
    if (simDiagnostic) simDiagnostic.textContent = data.diagnostic;
    if (simIntervention) simIntervention.textContent = data.strategicIntervention;
    if (simEfficiency) simEfficiency.textContent = data.efficiencyScore;

    if (simRoadmap) {
      simRoadmap.innerHTML = data.futureRoadmap.map((item, idx) => `
        <div class="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#5F4E4A]/10 hover:border-[#D6ADAD] transition-all">
          <span class="px-2 py-1 bg-[#5F4E4A] text-[#FAF7F2] text-xs font-mono font-semibold rounded shrink-0">${item.day}</span>
          <p class="text-sm text-[#382C29] font-medium leading-relaxed">${item.task}</p>
        </div>
      `).join('');
    }
  }

  if (businessSelector) {
    businessSelector.addEventListener('change', (e) => {
      renderSimulation(e.target.value);
    });
    // initial render
    renderSimulation(businessSelector.value);
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});
