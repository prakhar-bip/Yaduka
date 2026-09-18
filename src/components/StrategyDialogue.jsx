import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, ChevronRight, Terminal, Cpu } from 'lucide-react';

export default function StrategyDialogue() {
  const [activeScenario, setActiveScenario] = useState('budget');

  const scenarios = {
    budget: {
      name: 'Ad Budget Reallocation',
      founderMessage: 'We are planning to spend $10k/mo on Meta ads. Our competitor is all over Instagram, so we should match their volume.',
      yadukaReply: {
        intro: 'Hold on. Our autonomous reconnaissance shows that competitor is running at an estimated 0.82x ROAS and burning venture debt. Here is the true leverage in your market:',
        points: [
          'High-intent search volume for competitor alternatives is up 185%.',
          'Shifting 65% of budget to Comparison Landing Pages will cut CAC by ~38%.',
          'Preserve the remaining 35% as a high-margin retargeting buffer.'
        ],
        verdict: 'Recommended Action: Divert capital from cold display into search capture.'
      }
    },
    pricing: {
      name: 'Packaging & Pricing Stress-Test',
      founderMessage: 'We offer our services at $49/month to attract as many small customers as possible. Should we run discount coupons?',
      yadukaReply: {
        intro: 'Discounts will attract high-churn customers who drain your support. Your market research reveals:',
        points: [
          'Small businesses in this niche churn 4x faster on low-cost tiers due to lack of commitment.',
          'B2B buyers are willing to pay $290/month if onboarding includes white-glove setup.',
          'A three-tier value ladder will increase Average Revenue Per User by 310%.'
        ],
        verdict: 'Recommended Action: Productize onboarding and increase entry threshold.'
      }
    },
    messaging: {
      name: 'Market Positioning & Angle',
      founderMessage: 'Our tagline is "The all-in-one business platform". We want to highlight all 14 features in our next campaign.',
      yadukaReply: {
        intro: 'An "all-in-one" message solves nothing specifically. When you say everything, the buyer hears nothing. Our market analysis dictates:',
        points: [
          'Prospects complain about one single acute pain: lost leads during follow-up.',
          'Highlighting that single pain point in test copy produces a 4.2x higher click-to-book rate.',
          'Relegate secondary features into the product walkthrough post-signup.'
        ],
        verdict: 'Recommended Action: Anchor your campaign on one single, acute bottleneck.'
      }
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section id="dialogue-room" className="py-24 bg-white border-b border-[#5F4E4A]/10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Punchlines */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono font-semibold tracking-wider text-[#5F4E4A] uppercase block mb-3">
              Phase 4: Collaborative Co-Pilot
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#382C29] leading-tight">
              You don’t need an order-taker. <br />
              <span className="italic font-normal text-[#5F4E4A]">
                You need a strategic sparring partner.
              </span>
            </h2>

            <p className="mt-6 text-base text-[#5F4E4A] leading-relaxed">
              Most software simply dumps charts on your screen and abandons you. Yaduka steps into the strategy room with you: asking the hard questions, stress-testing your assumptions, and negotiating the exact campaigns that will actually work.
            </p>

            {/* Scenario Switchers */}
            <div className="mt-8 space-y-2.5">
              <span className="text-xs font-mono text-[#7E6B66] uppercase tracking-wider block">
                Test a Strategic Discussion Topic:
              </span>
              {Object.keys(scenarios).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveScenario(key)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    activeScenario === key
                      ? 'bg-[#5F4E4A] text-[#FAF7F2] border-[#5F4E4A] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#5F4E4A] border-[#5F4E4A]/15 hover:border-[#5F4E4A]'
                  }`}
                >
                  <span>{scenarios[key].name}</span>
                  <ChevronRight className="w-4 h-4 opacity-75" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated Live Strategy Room Dialogue (GIF/Interactive Aesthetic) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#5F4E4A]/20 shadow-2xl relative overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D6ADAD]" />
                  <span className="w-3 h-3 rounded-full bg-[#5F4E4A]/40" />
                  <span className="w-3 h-3 rounded-full bg-[#382C29]/30" />
                  <span className="ml-2 font-mono text-xs font-semibold text-[#5F4E4A]">
                    YADUKA // CO-PILOT STRATEGY ROOM
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#7E6B66]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ACTIVE CO-PLANNING</span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                
                {/* Founder Prompt */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-[#5F4E4A] text-[#FAF7F2] p-4 rounded-2xl rounded-tr-none max-w-md text-sm leading-relaxed shadow-sm">
                    <span className="block text-[10px] font-mono opacity-60 mb-1">
                      FOUNDER // STRATEGIC QUERY
                    </span>
                    "{current.founderMessage}"
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#382C29] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    F
                  </div>
                </div>

                {/* Yaduka Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D6ADAD] text-[#382C29] text-xs font-bold flex items-center justify-center shrink-0 shadow">
                    Y
                  </div>
                  <div className="bg-white border border-[#5F4E4A]/15 text-[#382C29] p-5 rounded-2xl rounded-tl-none max-w-lg text-sm leading-relaxed shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-3.5 h-3.5 text-[#5F4E4A]" />
                      <span className="text-[10px] font-mono text-[#7E6B66] uppercase">
                        Yaduka Intelligence Diagnostics
                      </span>
                    </div>

                    <p className="font-medium text-[#5F4E4A] mb-3">
                      "{current.yadukaReply.intro}"
                    </p>

                    <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#D6ADAD] text-xs space-y-2 font-mono text-[#382C29]">
                      {current.yadukaReply.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#5F4E4A] font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 text-xs font-bold text-[#382C29] font-mono">
                      &gt; {current.yadukaReply.verdict}
                    </p>
                  </div>
                </div>

                {/* Synthesized Output Banner */}
                <div className="p-4 bg-[#F8EFEB] border border-[#D6ADAD] rounded-2xl text-xs flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#5F4E4A]" />
                    <span className="font-mono font-bold text-[#382C29]">
                      STRATEGY ALIGNED: GENERATING 30-60-90 DAY EXECUTION SPRINT
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#5F4E4A] font-bold px-2 py-0.5 bg-white rounded border border-[#D6ADAD]">
                    READY
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
