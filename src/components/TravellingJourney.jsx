import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mountain, Sparkles, AlertTriangle, Trophy, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

export default function TravellingJourney() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stages = [
    {
      id: 'basecamp',
      elevation: 'Elevation 0m',
      campName: 'Basecamp',
      subtitle: 'The Reality Inventory (Business Ingestion)',
      quote: '"Before you conquer the mountain, you must empty the illusions from your pack."',
      challenge: 'Confronting messy unit economics, fragmented ad accounts, and murky customer acquisition costs. Leaving behind the comfort of guesswork.',
      happiness: 'The exhilarating peace of absolute clarity. Seeing your business in sharp, unvarnished definition on an honest topographic map.',
      nextFrontier: 'The unknown wilderness ahead: deciphering where the hidden market currents truly flow without wasting valuable supplies.',
      metricLabel: 'Diagnostic Clarity',
      metricValue: '100% Unvarnished',
      iconColor: '#5F4E4A'
    },
    {
      id: 'ridge1',
      elevation: 'Elevation 1,800m',
      campName: 'The Wilderness Ridge',
      subtitle: 'Autonomous Reconnaissance (Market & Competitor Intel)',
      quote: '"The crowded road is expensive. The secret ridge is profitable."',
      challenge: 'Sifting through competitor noise, deciphering saturated ad keywords, and identifying why previous marketing tests sputtered.',
      happiness: 'Uncovering the golden whitespace—a high-intent customer segment that your competitors are completely ignoring.',
      nextFrontier: 'Defending this new territory against copycats; crafting messaging sharp enough to pierce customer skepticism.',
      metricLabel: 'Whitespace Opportunity Found',
      metricValue: '3 Uncontested Angles',
      iconColor: '#D6ADAD'
    },
    {
      id: 'highcamp',
      elevation: 'Elevation 3,600m',
      campName: 'The Crucible Camp',
      subtitle: 'The Diagnostic Mirror (Positioning Truth)',
      quote: '"You cannot scale what is leaking. True mastery begins by pruning waste."',
      challenge: 'Cutting painful deadweight: shutting down vanity ad campaigns, rethinking underperforming offers, and confronting low conversion rates.',
      happiness: 'Watching customer acquisition costs drop by 42%. Experiencing the rush when high-quality customers arrive because the positioning finally resonates.',
      nextFrontier: 'Scaling strain: higher order volume exposes operational friction and demands systematic retention.',
      metricLabel: 'Ad Budget Waste Eliminated',
      metricValue: '42% Preserved Capital',
      iconColor: '#5F4E4A'
    },
    {
      id: 'summit-council',
      elevation: 'Elevation 5,400m',
      campName: 'The Summit Council',
      subtitle: 'The Strategy Dialogue (Collaborative War Room)',
      quote: '"A general never enters battle alone. Strategy is forged in rigorous debate."',
      challenge: 'High-stakes capital allocation decisions: deciding whether to double down on paid search, organic authority, or outbound partnerships.',
      happiness: 'The calm confidence of a united, mathematical battle plan co-created with an intelligent partner who never panics.',
      nextFrontier: 'Volatile macro-market shifts, platform algorithm updates, and maintaining brand discipline during rapid growth.',
      metricLabel: 'Strategic Conviction',
      metricValue: 'Complete Alignment',
      iconColor: '#D6ADAD'
    },
    {
      id: 'endless-horizon',
      elevation: 'Elevation 8,200m+',
      campName: 'The Endless Horizon',
      subtitle: 'The Immutable Roadmap (Continuous Scaling)',
      quote: '"Every peak you conquer reveals higher mountains. That is not a curse; it is the privilege of the great."',
      challenge: 'Transforming from an aggressive startup into an enduring, category-defining market leader. Retaining agility while scaling team and systems.',
      happiness: 'The profound pride of having built an unstoppable growth engine that operates predictably, sustainably, and profitably.',
      nextFrontier: 'The next expedition: entering adjacent markets, acquiring smaller competitors, and building a legendary brand legacy.',
      metricLabel: 'Compounded Scaling Trajectory',
      metricValue: '4.8x Sustainable LTV',
      iconColor: '#382C29'
    }
  ];

  const currentStage = stages[activeStageIndex];

  // Trigger celebratory confetti in Yaduka colors
  const triggerCelebration = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#5F4E4A', '#D6ADAD', '#F8EFEB', '#382C29']
    });
  };

  return (
    <section id="expedition" className="py-24 bg-[#FAF7F2] relative border-b border-[#5F4E4A]/10 overflow-hidden">
      
      {/* Subtle Background Topographic Lines (Pure SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-25 -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contourPattern" width="400" height="200" patternUnits="userSpaceOnUse">
              <path d="M 0 100 Q 100 40 200 100 T 400 100" fill="none" stroke="#5F4E4A" strokeWidth="1" strokeDasharray="4 6"/>
              <path d="M 0 150 Q 150 90 250 150 T 400 150" fill="none" stroke="#D6ADAD" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contourPattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Narrative Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#5F4E4A] uppercase mb-3">
            <Mountain className="w-4 h-4 text-[#D6ADAD]" />
            <span>The Scaling Expedition</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#382C29] leading-tight">
            Not a checklist. <br />
            <span className="italic font-normal text-[#5F4E4A]">
              A journey where every victory reveals higher peaks.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5F4E4A] leading-relaxed">
            When your business grows, the road doesn’t end. Reaching a landmark brings real happiness and triumph—which immediately opens up more ambitious, exciting terrain. Here is how Yaduka travels with you at every altitude:
          </p>
        </div>

        {/* Interactive Elevation Progression Trail (SVG Elevation Profile) */}
        <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#5F4E4A]/10">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7E6B66]">
              Interactive Elevation Map
            </span>
            <span className="text-xs font-mono text-[#5F4E4A] font-semibold">
              Current Altitude: {currentStage.elevation}
            </span>
          </div>

          {/* SVG Elevation Path */}
          <div className="relative w-full h-24 mb-6">
            <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="none" fill="none">
              {/* Gradient fill under mountain slope */}
              <defs>
                <linearGradient id="elevationSlopeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D6ADAD" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <path 
                d="M 0 90 Q 200 80 400 50 T 800 15 L 800 100 L 0 100 Z" 
                fill="url(#elevationSlopeGrad)" 
              />
              <path 
                d="M 0 90 Q 200 80 400 50 T 800 15" 
                stroke="#5F4E4A" 
                strokeWidth="2.5" 
              />

              {/* Waypoint Nodes along the SVG Curve */}
              {stages.map((st, idx) => {
                const xPositions = [40, 220, 410, 600, 760];
                const yPositions = [88, 72, 48, 28, 16];
                const isSelected = activeStageIndex === idx;

                return (
                  <g key={st.id} className="cursor-pointer" onClick={() => setActiveStageIndex(idx)}>
                    {isSelected && (
                      <circle cx={xPositions[idx]} cy={yPositions[idx]} r="12" fill="#D6ADAD" fillOpacity="0.5" className="animate-ping" />
                    )}
                    <circle 
                      cx={xPositions[idx]} 
                      cy={yPositions[idx]} 
                      r={isSelected ? "7" : "5"} 
                      fill={isSelected ? "#5F4E4A" : "#FAF7F2"} 
                      stroke="#5F4E4A" 
                      strokeWidth="2.5" 
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Altitude Level Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-3 rounded-2xl border transition-all ${
                    isActive 
                      ? 'bg-[#5F4E4A] text-white border-[#5F4E4A] shadow-md scale-[1.02]' 
                      : 'bg-[#FAF7F2] text-[#5F4E4A] border-[#5F4E4A]/15 hover:bg-[#F8EFEB]'
                  }`}
                >
                  <span className="text-[10px] font-mono block opacity-75 uppercase tracking-wider">
                    {stage.elevation}
                  </span>
                  <span className="text-xs font-serif font-bold block mt-0.5">
                    {stage.campName}
                  </span>
                  <span className="text-[11px] block opacity-80 truncate">
                    {stage.subtitle.split('(')[0]}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Current Altitude Detailed Showcase Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#5F4E4A]/15 transition-all duration-300">
          
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#5F4E4A]/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#D6ADAD]/30 text-[#382C29] text-xs font-mono font-bold uppercase rounded-full">
                  {currentStage.elevation}
                </span>
                <span className="text-xs font-mono text-[#7E6B66] uppercase">
                  Camp: {currentStage.campName}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#382C29] mt-2">
                {currentStage.subtitle}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[11px] font-mono text-[#7E6B66] block uppercase">
                  {currentStage.metricLabel}
                </span>
                <span className="text-sm font-bold font-mono text-[#382C29]">
                  {currentStage.metricValue}
                </span>
              </div>
              
              <button 
                onClick={triggerCelebration}
                title="Celebrate this victory!"
                className="px-4 py-2 bg-[#F8EFEB] hover:bg-[#D6ADAD] text-[#382C29] rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-[#D6ADAD] transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5F4E4A]" />
                <span>Celebrate Victory</span>
              </button>
            </div>
          </div>

          {/* Thought-Provoking Expedition Quote */}
          <blockquote className="text-base sm:text-lg italic font-serif text-[#5F4E4A] mb-8 border-l-4 border-[#D6ADAD] pl-4">
            {currentStage.quote}
          </blockquote>

          {/* 3 Pillars: Challenge -> Victory & Happiness -> The Next Higher Peak */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. The Mountain Challenge */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#5F4E4A]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[#5F4E4A]" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#382C29]">
                    The Mountain Challenge
                  </h4>
                </div>
                <p className="text-sm text-[#5F4E4A] leading-relaxed">
                  {currentStage.challenge}
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono text-[#7E6B66] block">
                Friction to overcome
              </span>
            </div>

            {/* 2. The Victory & Happiness */}
            <div className="p-6 rounded-2xl bg-[#F8EFEB] border border-[#D6ADAD] relative overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#D6ADAD]/20 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-[#5F4E4A]" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#382C29]">
                    The Victory & Happiness
                  </h4>
                </div>
                <p className="text-sm text-[#382C29] font-medium leading-relaxed">
                  {currentStage.happiness}
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono text-[#5F4E4A] font-semibold block">
                Triumph & Clarity Unlocked
              </span>
            </div>

            {/* 3. The Greater Peak Ahead */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#5F4E4A]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpRight className="w-4 h-4 text-[#7E6B66]" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7E6B66]">
                    The Greater Peak Ahead
                  </h4>
                </div>
                <p className="text-sm text-[#5F4E4A] leading-relaxed">
                  {currentStage.nextFrontier}
                </p>
              </div>
              <span className="mt-4 text-[11px] font-mono text-[#7E6B66] block">
                Higher mountain in view
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
