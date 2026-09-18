import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export default function RoadmapSimulator() {
  const [selectedType, setSelectedType] = useState('saas');

  const archetypes = {
    saas: {
      title: 'Bootstrapped B2B Software / SaaS',
      bracket: '$12k – $85k MRR',
      efficiency: '+215% CAC Payback Velocity',
      trap: 'Pouring money into cold Facebook/Google display ads before achieving customer onboarding retention.',
      solution: 'Shift 70% of spend into High-Intent Comparison Pages and interactive demo calculators targeting frustrated rival users.',
      roadmap: [
        { phase: 'Day 1–15', action: 'Isolate single sharpest customer pain point; rebuild core value proposition headline.' },
        { phase: 'Day 16–45', action: 'Deploy Comparison Landing Pages targeting competitor alternatives with high commercial search intent.' },
        { phase: 'Day 46–90', action: 'Implement automated behavioral email sequences and founder-led LinkedIn thought leadership.' }
      ],
      futureHorizon: 'After reaching $50k MRR, new challenge: expanding to multi-seat enterprise contracts and establishing dedicated customer success.'
    },
    d2c: {
      title: 'Direct-to-Consumer & Physical Products',
      bracket: '$250k – $1.5M Annual Revenue',
      efficiency: '3.4x Blended ROAS on Scaled Spend',
      trap: 'Over-reliance on volatile Meta ad auctions with a low repeat customer rate (bleeding margin on single-unit orders).',
      solution: 'Restructure product bundles to raise Average Order Value by 28%; deploy post-purchase email & SMS retention flows.',
      roadmap: [
        { phase: 'Day 1–15', action: 'Design high-margin tiered product bundles that absorb rising ad auction costs.' },
        { phase: 'Day 16–45', action: 'Launch micro-creator UGC video ads focusing on immediate problem-solution unboxing.' },
        { phase: 'Day 46–90', action: 'Automate 60-day replenishment reminders and launch a VIP loyalty tier for top 10% buyers.' }
      ],
      futureHorizon: 'After breaking $1M revenue, new challenge: inventory supply chain predictability and wholesale retail expansion.'
    },
    agency: {
      title: 'Specialized Consulting & Agency',
      bracket: '$180k – $900k Annual Revenue',
      efficiency: '$52,000 / Mo Inbound Pipeline',
      trap: 'Unpredictable word-of-mouth referral cycles and vague "full-service" positioning that forces price discounting.',
      solution: 'Productize expertise into an irresistible Flagship Diagnostic Audit with fixed pricing and guaranteed turnaround.',
      roadmap: [
        { phase: 'Day 1–15', action: 'Package high-ticket expertise into a standardized Diagnostic Audit offer.' },
        { phase: 'Day 16–45', action: 'Run targeted Account-Based Outreach toward 300 vetted dream client decision makers.' },
        { phase: 'Day 46–90', action: 'Publish proprietary industry teardowns to build inbound inbound executive authority.' }
      ],
      futureHorizon: 'After reaching capacity, new challenge: hiring tier-one senior operators to decouple revenue from founder hours.'
    },
    local: {
      title: 'Local Service & Healthcare Enterprise',
      bracket: '$300k – $2M Annual Revenue',
      efficiency: '+180% High-Intent Local Bookings',
      trap: 'Generic local print & radio ads with zero conversion tracking, leading to low online appointment booking.',
      solution: 'Hyper-local Google Local Services Ads paired with automated review generation and instant online booking widgets.',
      roadmap: [
        { phase: 'Day 1–15', action: 'Optimize Google Business Profile with geo-targeted keywords and verified local reviews.' },
        { phase: 'Day 16–45', action: 'Launch Google Local Services Ads targeting consumers actively searching for emergency/same-day help.' },
        { phase: 'Day 46–90', action: 'Deploy automated SMS follow-ups for consultation reminders and post-service referrals.' }
      ],
      futureHorizon: 'After dominating the primary territory, new challenge: multi-location expansion and cross-branch brand standardisation.'
    }
  };

  const current = archetypes[selectedType];

  return (
    <section id="blueprint" className="py-24 bg-[#FAF7F2] border-b border-[#5F4E4A]/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#5F4E4A] uppercase block mb-3">
            Phase 5: The Master Blueprint
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#382C29]">
            The Final Summit: <br />
            <span className="italic font-normal text-[#5F4E4A]">
              Your Complete Future Roadmap
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F4E4A]">
            Select your business model to preview how Yaduka isolates your key constraint and builds your step-by-step scaling plan.
          </p>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(archetypes).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedType === key
                  ? 'bg-[#5F4E4A] text-white shadow-md'
                  : 'bg-white text-[#5F4E4A] border border-[#5F4E4A]/15 hover:bg-[#F8EFEB]'
              }`}
            >
              {archetypes[key].title}
            </button>
          ))}
        </div>

        {/* Blueprint Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#5F4E4A]/15">
          
          {/* Header Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#5F4E4A]/10 pb-8 mb-8">
            <div>
              <span className="text-xs font-mono text-[#7E6B66] uppercase block">Selected Model</span>
              <h4 className="font-serif text-xl font-bold text-[#382C29] mt-1">{current.title}</h4>
            </div>
            <div>
              <span className="text-xs font-mono text-[#7E6B66] uppercase block">Target Bracket</span>
              <h4 className="font-mono text-lg font-bold text-[#5F4E4A] mt-1">{current.bracket}</h4>
            </div>
            <div>
              <span className="text-xs font-mono text-[#7E6B66] uppercase block">Projected Efficiency</span>
              <h4 className="font-mono text-lg font-bold text-[#382C29] mt-1">{current.efficiency}</h4>
            </div>
          </div>

          {/* Diagnostic Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#5F4E4A]/10">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#5F4E4A] uppercase">
                <AlertCircle className="w-4 h-4 text-[#5F4E4A]" />
                Identified Blind Spot (The Trap)
              </div>
              <p className="text-sm text-[#5F4E4A] leading-relaxed">
                {current.trap}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8EFEB] border border-[#D6ADAD]">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#382C29] uppercase">
                <Sparkles className="w-4 h-4 text-[#5F4E4A]" />
                Yaduka Strategic Intervention
              </div>
              <p className="text-sm text-[#382C29] font-medium leading-relaxed">
                {current.solution}
              </p>
            </div>

          </div>

          {/* Step-by-Step Chronological Roadmap */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-bold text-[#7E6B66] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5F4E4A]" />
              <span>30-60-90 Day Actionable Roadmap (Execution Steps)</span>
            </h4>
            
            <div className="space-y-3">
              {current.roadmap.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-4 p-4 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10 hover:border-[#D6ADAD] transition-all"
                >
                  <span className="px-3 py-1 bg-[#5F4E4A] text-[#FAF7F2] text-xs font-mono font-semibold rounded-lg shrink-0 mt-0.5">
                    {item.phase}
                  </span>
                  <p className="text-sm text-[#382C29] font-medium leading-relaxed">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Future Horizon Callout (After Winning this Level) */}
          <div className="p-5 bg-gradient-to-r from-[#FAF7F2] to-[#F8EFEB] rounded-2xl border border-[#5F4E4A]/15 text-xs text-[#5F4E4A] leading-relaxed">
            <span className="font-mono font-bold text-[#382C29] uppercase block mb-1">
              THE NEXT EXPEDITION PEAK AHEAD:
            </span>
            {current.futureHorizon}
          </div>

        </div>

      </div>
    </section>
  );
}
