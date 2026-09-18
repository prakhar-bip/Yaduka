import React, { useState } from 'react';
import { 
  ArrowLeft, Download, Printer, CheckSquare, Square, Sparkles, 
  Calendar, Layers, DollarSign, Target, Copy, Check, ExternalLink,
  ChevronRight, Award, ShieldCheck, Flame, Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import YadukaLogo from './YadukaLogo';

export default function MasterExecutionPlanView({ businessProfile, planData, onBackToWarRoom, onBackToDashboard }) {
  const [copied, setCopied] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (taskKey) => {
    setCompletedTasks(prev => {
      const next = { ...prev, [taskKey]: !prev[taskKey] };
      if (!prev[taskKey]) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.7 },
          colors: ['#D6ADAD', '#5F4E4A']
        });
      }
      return next;
    });
  };

  const plan = planData || {};
  const budgetAlloc = plan.budget_allocation || {};
  const creative = plan.ad_creative_playbook || {};
  const calendar = plan.twelve_week_sprint_calendar || [];

  const handleCopy = () => {
    const textToCopy = `YADUKA MASTER EXECUTION PLAN\nBusiness: ${businessProfile?.business_name}\nTerritory: ${businessProfile?.target_territory}\n\nNorth Star Target: ${plan.north_star_target}\n\nBudget: ${businessProfile?.monthly_marketing_budget}\nChannel 1: ${budgetAlloc.channel_1?.name} (${budgetAlloc.channel_1?.split})\nChannel 2: ${budgetAlloc.channel_2?.name} (${budgetAlloc.channel_2?.split})\n\nCreative Headlines:\n${(creative.headlines || []).map(h => `- ${h}`).join('\n')}\n\n12-Week Milestones:\n${calendar.map(c => `[${c.week_range}]\n${c.tasks.map(t => `  * ${t}`).join('\n')}`).join('\n\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#382C29] flex flex-col font-sans print:bg-white print:p-0">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#5F4E4A]/10 px-6 py-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToWarRoom}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#5F4E4A]/20 text-xs font-semibold text-[#5F4E4A] hover:text-[#382C29] hover:bg-[#F8EFEB] transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to War Room</span>
            </button>
            <div className="h-6 w-px bg-[#5F4E4A]/20 hidden sm:block" />
            <YadukaLogo size={34} showText={true} />
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#5F4E4A]/20 text-xs font-semibold text-[#5F4E4A] hover:text-[#382C29] transition-all shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Plan' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#5F4E4A]/20 text-xs font-semibold text-[#5F4E4A] hover:text-[#382C29] transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5F4E4A] hover:bg-[#382C29] text-[#FAF7F2] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-[1.02]"
            >
              <Compass className="w-3.5 h-3.5 text-[#D6ADAD]" />
              <span>Dashboard</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Execution Plan Document */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 print:p-0">
        
        {/* Document Master Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#5F4E4A]/15 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6ADAD]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[#5F4E4A]/10 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="px-3 py-1 bg-[#5F4E4A] text-white text-xs font-mono font-bold uppercase rounded-full tracking-wider">
                  STAGE 5 // MASTER MARKETING EXECUTION PLAN
                </span>
                <span className="text-xs font-mono text-[#7E6B66] uppercase">
                  Elevation 5,200m
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#382C29]">
                {businessProfile?.business_name}
              </h1>
              <p className="text-base text-[#5F4E4A] mt-2 max-w-3xl leading-relaxed">
                {plan.north_star_target || `Autonomous 90-day scaling roadmap for ${businessProfile?.target_territory}`}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#5F4E4A]/10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#5F4E4A] text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#D6ADAD]" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#7E6B66] uppercase block">Strategy Status</span>
                <span className="text-xs font-bold font-mono text-[#382C29] block">LOCKED & VERIFIED</span>
                <span className="text-[10px] text-emerald-700 font-medium">Ready for deployment</span>
              </div>
            </div>
          </div>

          {/* Strategic Anchors Quick Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Territory</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5">{businessProfile?.target_territory}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Monthly Budget</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5">{businessProfile?.monthly_marketing_budget}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Hero Spearhead</span>
              <span className="font-bold text-[#5F4E4A] truncate block mt-0.5">{businessProfile?.mvp_offer}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Roadmap Velocity</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5">12-Week Sprints</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 1: CAPITAL & CHANNEL BUDGET MODEL */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-8 border border-[#5F4E4A]/15 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#5F4E4A]" />
              <h2 className="font-serif text-2xl font-bold text-[#382C29]">
                Pillar 1: Capital & Channel Allocation Model
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#5F4E4A] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#5F4E4A]/15">
              Budget: {businessProfile?.monthly_marketing_budget}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Channel 1 */}
            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-[#5F4E4A] text-white text-xs font-mono font-bold uppercase rounded-lg">
                  Channel 1 ({budgetAlloc.channel_1?.split || '65%'})
                </span>
                <span className="text-xs font-mono font-bold text-[#5F4E4A]">
                  CAC: {budgetAlloc.channel_1?.estimated_cac || '$38 - $65'}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#382C29]">
                {budgetAlloc.channel_1?.name || 'High-Intent Search & Comparison Capture'}
              </h3>
              <p className="text-xs text-[#5F4E4A] leading-relaxed">
                Directly captures dissatisfied incumbent prospects searching for alternatives in {businessProfile?.target_territory}. 
                Avoids broad vanity keywords; bids exclusively on competitor comparisons and high-urgency commercial queries.
              </p>
            </div>

            {/* Channel 2 */}
            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-[#D6ADAD] text-[#382C29] text-xs font-mono font-bold uppercase rounded-lg">
                  Channel 2 ({budgetAlloc.channel_2?.split || '35%'})
                </span>
                <span className="text-xs font-mono font-bold text-[#5F4E4A]">
                  CAC: {budgetAlloc.channel_2?.estimated_cac || '$45 - $80'}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#382C29]">
                {budgetAlloc.channel_2?.name || 'Problem-Centric Social Proof & Video Authority'}
              </h3>
              <p className="text-xs text-[#5F4E4A] leading-relaxed">
                Deploys short-form teardown videos and client case reviews targeting decision-makers. Retargets visitors who bounced 
                from pricing with risk-reversal guarantees to collapse decision hesitation.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 2: DIRECT-RESPONSE CREATIVE PLAYBOOK */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-8 border border-[#5F4E4A]/15 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600" />
              <h2 className="font-serif text-2xl font-bold text-[#382C29]">
                Pillar 2: Direct-Response Ad Creative Playbook
              </h2>
            </div>
            <span className="text-xs font-mono text-[#7E6B66] uppercase">
              Field-Tested Copy
            </span>
          </div>

          <div className="space-y-6">
            
            {/* Headlines */}
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#5F4E4A] block mb-3">
                High-Converting Ad Headlines
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(creative.headlines || []).map((headline, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D6ADAD]/40">
                    <span className="text-[10px] font-mono text-[#7E6B66] uppercase block mb-1">Headline #{idx + 1}</span>
                    <p className="font-serif font-bold text-sm text-[#382C29] leading-snug">
                      "{headline}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Objection-Handling Hooks */}
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#5F4E4A] block mb-3">
                Objection-Handling Direct-Response Hooks
              </span>
              <div className="space-y-2.5">
                {(creative.direct_response_hooks || []).map((hook, idx) => (
                  <div key={idx} className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10 text-xs font-mono text-[#382C29] flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5F4E4A] shrink-0 mt-1.5" />
                    <span>{hook}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Landing Page Wireframe Strip */}
            <div className="p-4 bg-gradient-to-r from-[#FAF7F2] to-[#F8EFEB] rounded-2xl border border-[#5F4E4A]/15">
              <span className="text-xs font-mono font-bold uppercase text-[#5F4E4A] block mb-1.5">
                Recommended High-Converting Landing Page Flow:
              </span>
              <p className="text-xs text-[#382C29] font-mono leading-relaxed">
                {creative.landing_page_wireframe || '1. Hook Headline -> 2. The Incumbent Flaw Teardown -> 3. The 3-Step Solution -> 4. Verifiable Proof & Video -> 5. Risk-Free Action CTA'}
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 3: 12-WEEK SPRINT ACTION CALENDAR */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-8 border border-[#5F4E4A]/15 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#5F4E4A]" />
              <h2 className="font-serif text-2xl font-bold text-[#382C29]">
                Pillar 3: The 12-Week Interactive Sprint Calendar
              </h2>
            </div>
            <span className="text-xs font-mono text-[#7E6B66]">
              Click items to mark complete
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calendar.map((phase, pIdx) => (
              <div key={pIdx} className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#5F4E4A] text-white text-xs font-mono font-bold uppercase rounded-lg">
                      {phase.week_range.split(':')[0]}
                    </span>
                    <span className="text-xs font-mono text-[#7E6B66]">
                      Phase {pIdx + 1} of 4
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#382C29] mb-4">
                    {phase.week_range.split(':')[1] || phase.week_range}
                  </h3>

                  <div className="space-y-3">
                    {phase.tasks.map((task, tIdx) => {
                      const taskKey = `${pIdx}-${tIdx}`;
                      const isDone = !!completedTasks[taskKey];
                      return (
                        <div
                          key={tIdx}
                          onClick={() => toggleTask(taskKey)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            isDone 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 line-through' 
                              : 'bg-white border-[#5F4E4A]/10 hover:border-[#D6ADAD] text-[#382C29]'
                          }`}
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-[#7E6B66] shrink-0 mt-0.5" />
                          )}
                          <span className="text-xs leading-relaxed font-medium">
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-[#5F4E4A]/10 py-6 px-6 text-center text-xs text-[#7E6B66] font-mono print:hidden">
        Yaduka Master Execution Plan • Generated autonomously for {businessProfile?.business_name}
      </footer>

    </div>
  );
}
