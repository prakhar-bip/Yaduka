import React, { useState } from 'react';
import { 
  ArrowLeft, Compass, ShieldAlert, TrendingUp, DollarSign, 
  MapPin, Package, Target, Award, AlertTriangle, CheckCircle2, 
  Layers, ExternalLink, Sparkles, MessageSquare, Download, Calendar
} from 'lucide-react';
import YadukaLogo from './YadukaLogo';

export default function MarketResearchDashboard({ businessProfile, onBackToHome, onOpenDialogue }) {
  if (!businessProfile) return null;

  const report = businessProfile.research_report || {};
  const giants = report.area_giants || {};
  const pricing = report.price_spectrum || {};
  const manipulation = report.market_manipulations || {};
  const audience = report.audience_intent || {};
  const external = report.external_threats || {};
  const synthesis = report.strategic_synthesis || {};

  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#382C29] flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#5F4E4A]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#5F4E4A]/20 text-xs font-semibold text-[#5F4E4A] hover:text-[#382C29] hover:bg-[#F8EFEB] transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
            <div className="h-6 w-px bg-[#5F4E4A]/20 hidden sm:block" />
            <YadukaLogo size={34} showText={true} />
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono text-[#7E6B66] uppercase block">Current Altitude</span>
              <span className="text-xs font-bold font-mono text-[#5F4E4A]">Elevation 1,800m — Reconnaissance</span>
            </div>
            <button
              onClick={onOpenDialogue}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5F4E4A] hover:bg-[#382C29] text-[#FAF7F2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow hover:scale-[1.02]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#D6ADAD]" />
              <span>Enter Strategy War Room</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* HERO TITLE & PROFILE SUMMARY BAR */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#5F4E4A]/15 shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6ADAD]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[#5F4E4A]/10 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold uppercase rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{giants.grounding_source || 'LIVE GOOGLE SEARCH GROUNDED'}</span>
                </span>
                <span className="text-xs font-mono text-[#7E6B66] uppercase">
                  Territory: {businessProfile.target_territory}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#382C29]">
                {businessProfile.business_name}
              </h1>
              <p className="text-sm text-[#5F4E4A] mt-1 max-w-2xl">
                {businessProfile.product_description}
              </p>
            </div>

            {/* Readiness Gauge Card */}
            <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#5F4E4A]/10">
              <div className="w-14 h-14 rounded-full bg-[#5F4E4A] text-white flex flex-col items-center justify-center font-mono">
                <span className="text-lg font-bold leading-none">{businessProfile.readiness_score}%</span>
                <span className="text-[9px] opacity-75">SCORE</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#7E6B66] uppercase block">Diagnostic State</span>
                <span className="text-xs font-bold font-serif text-[#382C29] block">
                  {businessProfile.diagnostic_summary?.readiness_label || 'Expedition Ready'}
                </span>
                <span className="text-[10px] text-[#5F4E4A]">High Strategic Leverage</span>
              </div>
            </div>
          </div>

          {/* Ingested Anchor Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Flagship MVP</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5" title={businessProfile.mvp_offer}>
                {businessProfile.mvp_offer}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Operating Base</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5">
                {businessProfile.operating_base}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Catalog Breadth</span>
              <span className="font-bold text-[#5F4E4A] truncate block mt-0.5">
                {businessProfile.skus_count}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Avg Deal Size</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5">
                {businessProfile.average_deal_size || '$250'}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Monthly Budget</span>
              <span className="font-bold text-[#382C29] truncate block mt-0.5">
                {businessProfile.monthly_marketing_budget}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10">
              <span className="text-[#7E6B66] text-[10px] uppercase block">Primary Bottleneck</span>
              <span className="font-bold text-rose-700 truncate block mt-0.5">
                {businessProfile.primary_bottleneck}
              </span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* VECTOR 6 FIRST: THE STRATEGIC ARBITRAGE (WHITESPACE & HOOK) */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F8EFEB] to-[#FAF7F2] rounded-3xl p-8 border-2 border-[#D6ADAD] shadow-lg relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#5F4E4A]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F4E4A]">
              Vector 6 // The Yaduka Strategic Arbitrage (Your Unfair Advantage)
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#382C29]">
            The Whitespace Positioning Gap
          </h2>
          <p className="text-base text-[#382C29] font-medium mt-2 leading-relaxed max-w-4xl">
            {synthesis.whitespace_gap}
          </p>

          <div className="mt-6 p-4 bg-white/80 rounded-2xl border border-[#5F4E4A]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#7E6B66] uppercase block">
                Recommended Core Messaging Hook
              </span>
              <p className="font-serif text-lg font-bold text-[#5F4E4A] italic mt-0.5">
                "{synthesis.core_messaging_hook}"
              </p>
            </div>
            <button
              onClick={onOpenDialogue}
              className="px-5 py-2.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow"
            >
              Discuss in War Room
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN GRID: VECTORS 1 & 2 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* VECTOR 1: AREA GIANTS & MONOPOLY ANALYSIS */}
          <div className="bg-white rounded-3xl p-7 border border-[#5F4E4A]/15 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#5F4E4A]" />
                  <h3 className="font-serif text-xl font-bold text-[#382C29]">
                    Area Giants & Competitors
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 bg-[#FAF7F2] rounded-lg border border-[#5F4E4A]/15 text-[#5F4E4A] font-semibold uppercase">
                  {giants.market_concentration || 'High Concentration'}
                </span>
              </div>

              <div className="space-y-4">
                {(giants.primary_giants || []).map((giant, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#5F4E4A]/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-[#382C29]">
                          {giant.name}
                        </h4>
                        {giant.location && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F8EFEB] text-[#5F4E4A] rounded-full border border-[#D6ADAD]/50 font-semibold">
                            📍 {giant.location}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold text-[#5F4E4A]">
                        Est. Share: {giant.estimated_market_share}
                      </span>
                    </div>

                    <p className="text-xs text-[#7E6B66] font-mono mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{giant.type} • {giant.digital_prominence}</span>
                    </p>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-rose-700 font-bold uppercase block">
                        Mined Review Vulnerabilities (Where They Fail):
                      </span>
                      {giant.mined_review_flaws.map((flaw, i) => (
                        <p key={i} className="text-xs text-[#382C29] flex items-start gap-1.5 leading-relaxed">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{flaw}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#5F4E4A]/10 text-xs text-[#5F4E4A] italic leading-relaxed">
              <strong>Vulnerability Verdict:</strong> {giants.vulnerability_verdict}
            </div>
          </div>

          {/* VECTOR 2: PRICING ARCHITECTURE & ECONOMIC SPECTRUM */}
          <div className="bg-white rounded-3xl p-7 border border-[#5F4E4A]/15 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#5F4E4A]" />
                  <h3 className="font-serif text-xl font-bold text-[#382C29]">
                    Market Price Spectrum
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 bg-[#FAF7F2] rounded-lg border border-[#5F4E4A]/15 text-[#5F4E4A] font-semibold uppercase">
                  {pricing.currency_unit || 'USD ($)'}
                </span>
              </div>

              {/* Visual Price Bar */}
              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/10 mb-6">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-[#7E6B66] mb-2">
                  <span>Floor (Budget)</span>
                  <span>Median (Standard)</span>
                  <span>Ceiling (Premium)</span>
                </div>

                <div className="relative w-full h-3 bg-[#E8CECE] rounded-full overflow-hidden mb-3">
                  <div className="absolute inset-y-0 left-0 bg-[#5F4E4A] w-full opacity-40" />
                  <div className="absolute inset-y-0 left-1/4 right-1/4 bg-[#5F4E4A] opacity-80" />
                </div>

                <div className="flex justify-between items-center text-sm font-serif font-bold text-[#382C29]">
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-[#5F4E4A]/15">{pricing.floor_price}</span>
                  <span className="px-2.5 py-1 bg-[#5F4E4A] text-white rounded-lg shadow-sm">{pricing.median_benchmark}</span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-[#5F4E4A]/15">{pricing.ceiling_price}</span>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-[#5F4E4A] font-semibold bg-[#F8EFEB] px-3 py-1 rounded-full border border-[#D6ADAD]">
                    Founder Position: {pricing.founder_pricing_position}
                  </span>
                </div>
              </div>

              {/* Predatory Discounting Warning */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>PREDATORY PRICING & DISCOUNTING HAZARD</span>
                </div>
                <p className="text-amber-950 leading-relaxed">
                  {pricing.predatory_discounting_alert?.observation}
                </p>
                <p className="text-amber-900 font-medium">
                  <strong>Counter-Measure:</strong> {pricing.predatory_discounting_alert?.recommended_counter}
                </p>
              </div>
            </div>

            <p className="mt-5 pt-4 border-t border-[#5F4E4A]/10 text-xs text-[#7E6B66]">
              {pricing.positioning_evaluation}
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN GRID: VECTORS 3 & 4 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* VECTOR 3: MARKET MANIPULATION & HIDDEN TRAPS */}
          <div className="bg-white rounded-3xl p-7 border border-[#5F4E4A]/15 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <h3 className="font-serif text-xl font-bold text-[#382C29]">
                  Market Traps & Manipulation
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold uppercase">
                Caution
              </span>
            </div>

            {/* Platform Extortion Tax */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/10">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1 text-[#382C29]">
                <span>Platform Extortion Tax</span>
                <span className="text-rose-700 text-sm">{manipulation.platform_extortion_tax?.rate}</span>
              </div>
              <p className="text-xs text-[#5F4E4A] leading-relaxed mb-1">
                Intermediaries: {manipulation.platform_extortion_tax?.intermediaries}
              </p>
              <p className="text-[11px] text-[#7E6B66] italic">
                {manipulation.platform_extortion_tax?.warning}
              </p>
            </div>

            {/* Keyword Bidding Wars */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/10">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1 text-[#382C29]">
                <span>Keyword Bidding Wars & CPCs</span>
                <span className="text-[#5F4E4A]">{manipulation.keyword_bidding_wars?.average_cpc}</span>
              </div>
              <p className="text-xs text-[#5F4E4A] leading-relaxed mb-1">
                {manipulation.keyword_bidding_wars?.finding}
              </p>
              <p className="text-[11px] font-mono text-[#382C29] font-semibold">
                Strategy: {manipulation.keyword_bidding_wars?.strategy}
              </p>
            </div>

            {/* Review Cartel Detection */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/10">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1 text-[#382C29]">
                <span>Review Cartels & Astroturfing</span>
                <span className="text-[#7E6B66]">{manipulation.review_cartels_and_astroturfing?.threat_level}</span>
              </div>
              <p className="text-xs text-[#5F4E4A] leading-relaxed">
                {manipulation.review_cartels_and_astroturfing?.notes}
              </p>
            </div>
          </div>

          {/* VECTOR 4: AUDIENCE INTENT & REGIONAL DYNAMICS */}
          <div className="bg-white rounded-3xl p-7 border border-[#5F4E4A]/15 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#5F4E4A]" />
                <h3 className="font-serif text-xl font-bold text-[#382C29]">
                  Audience Intent & Seasonality
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FAF7F2] border border-[#5F4E4A]/15 text-[#5F4E4A] rounded font-bold uppercase">
                Regional Intel
              </span>
            </div>

            {/* High Intent Search Queries */}
            <div>
              <span className="text-[10px] font-mono text-[#7E6B66] uppercase block mb-2 font-bold">
                High-Converting Search Query Clusters
              </span>
              <div className="flex flex-wrap gap-2">
                {(audience.high_intent_search_clusters || []).map((query, i) => (
                  <span key={i} className="px-3 py-1 bg-[#FAF7F2] border border-[#D6ADAD] rounded-lg text-xs font-mono text-[#382C29]">
                    "{query}"
                  </span>
                ))}
              </div>
            </div>

            {/* Unmet Community Complaints */}
            <div>
              <span className="text-[10px] font-mono text-[#7E6B66] uppercase block mb-1.5 font-bold">
                Unmet Customer Complaints Mined from Forums
              </span>
              <div className="space-y-1.5 text-xs text-[#5F4E4A]">
                {(audience.unmet_forum_complaints || []).map((comp, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#FAF7F2] p-2 rounded-lg border border-[#5F4E4A]/10">
                    <span className="text-[#5F4E4A] font-bold">&bull;</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 12-Month Seasonality Bar Chart */}
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#7E6B66] uppercase mb-2 font-bold">
                <span>12-Month Category Demand Index</span>
                <span>{audience.peak_season_note}</span>
              </div>
              <div className="grid grid-cols-12 gap-1.5 items-end h-20 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#5F4E4A]/10">
                {(audience.seasonality_curve || []).map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end">
                    <div 
                      className="w-full bg-[#5F4E4A] hover:bg-[#D6ADAD] rounded-t transition-all"
                      style={{ height: `${m.demand_index}%` }}
                      title={`${m.month}: ${m.demand_index}% demand`}
                    />
                    <span className="text-[9px] font-mono text-[#7E6B66] mt-1">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* ACTIONABLE 30-60-90 DAY EXECUTION ROADMAP */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-8 border border-[#5F4E4A]/15 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#5F4E4A]" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#382C29]">
                  30-60-90 Day Execution Sprint
                </h3>
                <span className="text-xs text-[#7E6B66]">
                  Calibrated for {businessProfile.target_territory} to bypass identified incumbents
                </span>
              </div>
            </div>
            
            <button
              onClick={onOpenDialogue}
              className="px-6 py-2.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow"
            >
              Collaborate on Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(synthesis.execution_sprint_30_60_90 || []).map((sprint, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#5F4E4A]/10 flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-[#5F4E4A] text-white text-[10px] font-mono font-bold uppercase rounded-lg inline-block mb-3">
                    {sprint.phase.split(':')[0]}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#382C29] mb-3">
                    {sprint.phase.split(':')[1] || sprint.phase}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5F4E4A]">
                    {sprint.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5F4E4A] shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-[#5F4E4A]/10 py-6 px-6 text-center text-xs text-[#7E6B66] font-mono">
        Yaduka Strategic Growth Engine • Elevation 1,800m Wilderness Reconnaissance Complete
      </footer>

    </div>
  );
}
