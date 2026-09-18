import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Globe, Edit3, ArrowRight, CheckCircle, AlertCircle, 
  Sparkles, Loader2, Compass, ShieldAlert, Zap, Layers 
} from 'lucide-react';
import { scanWebsite, submitBusinessIntake } from '../services/api';

export default function BusinessIntakeModal({ isOpen, onClose, onIntakeSuccess, initialUrl = "" }) {
  if (!isOpen) return null;

  // Active Mode: 'website' or 'manual'
  const [mode, setMode] = useState('website');

  // Website Scan States
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1);
  const [scanError, setScanError] = useState(null);
  const [scanData, setScanData] = useState(null);

  // Manual & Verification Form State
  const [formData, setFormData] = useState({
    business_name: '',
    website_url: initialUrl,
    category: 'B2B Software / Tech',
    value_proposition: '',
    target_audience: '',
    average_deal_size: '$500 - $2,000',
    revenue_bracket: '$10k - $50k / mo',
    monthly_marketing_budget: '$2,000 - $5,000 / mo',
    past_channels: ['Meta Ads', 'Google Search'],
    top_competitors: '',
    primary_bottleneck: 'Traffic'
  });

  // Manual Flow Multi-Step
  const [manualStep, setManualStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessResult, setSubmitSuccessResult] = useState(null);

  // --- WEBSITE SCAN HANDLER ---
  const handleScanSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput || !urlInput.trim()) return;

    setIsScanning(true);
    setScanError(null);
    setScanStep(1);

    const stepTimer1 = setTimeout(() => setScanStep(2), 700);
    const stepTimer2 = setTimeout(() => setScanStep(3), 1400);

    try {
      const result = await scanWebsite(urlInput);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      setScanData(result);
      setFormData(prev => ({
        ...prev,
        business_name: result.detected_business_name || prev.business_name,
        website_url: result.url,
        category: result.detected_category || prev.category,
        value_proposition: result.detected_value_prop || prev.value_proposition,
        target_audience: `High-intent buyers looking for ${result.detected_category || 'solutions'}`,
        top_competitors: result.suggested_competitors ? result.suggested_competitors.join(', ') : ''
      }));
    } catch (err) {
      setScanError(err.message || 'Failed to scan website. You can still proceed with manual entry.');
    } finally {
      setIsScanning(false);
    }
  };

  // --- FINAL SUBMISSION HANDLER ---
  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        website_url: urlInput || formData.website_url || null,
        top_competitors: typeof formData.top_competitors === 'string'
          ? formData.top_competitors.split(',').map(c => c.trim()).filter(Boolean)
          : formData.top_competitors
      };

      const res = await submitBusinessIntake(payload);
      setSubmitSuccessResult(res);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D6ADAD', '#5F4E4A', '#FFFFFF']
      });

      if (onIntakeSuccess) {
        onIntakeSuccess(res);
      }
    } catch (err) {
      alert(`Submission error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'B2B Software / Tech',
    'Direct-to-Consumer (D2C)',
    'Consulting & Agency',
    'Local Service Business',
    'Healthcare & Wellness',
    'B2B Professional Services'
  ];

  const bottlenecks = [
    { id: 'Traffic', title: 'Traffic & Awareness', desc: 'Too few people know we exist.' },
    { id: 'Conversion', title: 'Conversion & Messaging', desc: 'People visit, but leave without buying.' },
    { id: 'Retention', title: 'Retention & Churn', desc: 'Acquisition is okay, but customers don’t stay.' },
    { id: 'Pricing', title: 'Unit Economics & Margins', desc: 'Our margins are too thin to afford paid ads.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#382C29]/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl my-8 bg-white rounded-3xl shadow-2xl border border-[#5F4E4A]/15 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#5F4E4A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6ADAD] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F4E4A]">
              Step 1 // Basecamp Reality Inventory
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#5F4E4A]/10 text-[#7E6B66] hover:text-[#382C29] flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">

          {/* Success Screen */}
          {submitSuccessResult ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#D6ADAD] flex items-center justify-center mx-auto mb-4 text-[#5F4E4A]">
                <CheckCircle className="w-8 h-8 text-[#5F4E4A]" />
              </div>

              <span className="text-xs font-mono uppercase text-[#7E6B66] tracking-wider block mb-1">
                Expedition Initialized
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#382C29]">
                {submitSuccessResult.business_name}
              </h3>
              <p className="text-sm text-[#5F4E4A] mt-2 max-w-md mx-auto">
                Your business reality has been indexed into the Yaduka Strategic Engine.
              </p>

              {/* Diagnostic Score Card */}
              <div className="mt-6 p-6 rounded-2xl bg-[#FAF7F2] border border-[#5F4E4A]/15 max-w-lg mx-auto text-left">
                <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4 mb-4">
                  <span className="text-xs font-mono uppercase text-[#7E6B66]">Readiness Score</span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-[#382C29]">
                      {submitSuccessResult.readiness_score}/100
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#D6ADAD] text-[#382C29] text-[10px] font-mono font-bold rounded-full">
                      {submitSuccessResult.diagnostic_summary?.readiness_label || 'READY'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#5F4E4A] uppercase block mb-0.5">
                      Identified Primary Trap:
                    </span>
                    <p className="text-[#382C29] leading-relaxed">
                      {submitSuccessResult.diagnostic_summary?.primary_trap}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-[#5F4E4A] uppercase block mb-0.5">
                      Immediate Strategic Opportunity:
                    </span>
                    <p className="text-[#382C29] leading-relaxed">
                      {submitSuccessResult.diagnostic_summary?.strategic_opportunity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-[1.02]"
                >
                  Enter Stage 2: Market Reconnaissance
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header Title & Mode Selector */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#382C29]">
                  Inquire Your Business Reality
                </h2>
                <p className="text-sm text-[#5F4E4A] mt-1.5 max-w-md mx-auto">
                  Provide your business footprint so Yaduka can map your market terrain and construct your strategic roadmap.
                </p>

                {/* Mode Selector Tabs */}
                <div className="mt-5 inline-flex p-1 bg-[#FAF7F2] rounded-2xl border border-[#5F4E4A]/15">
                  <button
                    type="button"
                    onClick={() => { setMode('website'); setScanData(null); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      mode === 'website' 
                        ? 'bg-[#5F4E4A] text-white shadow-sm' 
                        : 'text-[#5F4E4A] hover:text-[#382C29]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Instant Website Scan (60s)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('manual')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      mode === 'manual' 
                        ? 'bg-[#5F4E4A] text-white shadow-sm' 
                        : 'text-[#5F4E4A] hover:text-[#382C29]'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Guided Manual Blueprint</span>
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* MODE A: INSTANT WEBSITE SCANNER */}
              {/* ========================================================================= */}
              {mode === 'website' && (
                <div>
                  {!scanData ? (
                    <form onSubmit={handleScanSubmit} className="space-y-4 max-w-lg mx-auto py-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold uppercase text-[#5F4E4A] tracking-wider block">
                          Enter Company Website URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="e.g. mycompany.com or https://acme.io"
                            required
                            disabled={isScanning}
                            className="flex-1 px-4 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl text-sm text-[#382C29] outline-none focus:border-[#5F4E4A] transition-all font-medium"
                          />
                          <button
                            type="submit"
                            disabled={isScanning}
                            className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow hover:scale-[1.02] flex items-center gap-2 shrink-0 disabled:opacity-50"
                          >
                            {isScanning ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-[#D6ADAD]" />
                                <span>Scanning...</span>
                              </>
                            ) : (
                              <>
                                <span>Scan Site</span>
                                <ArrowRight className="w-4 h-4 text-[#D6ADAD]" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Live Scanning Progress Animation */}
                      {isScanning && (
                        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D6ADAD] text-xs space-y-2.5 font-mono">
                          <div className="flex items-center gap-2 text-[#5F4E4A]">
                            <span className="w-2 h-2 rounded-full bg-[#5F4E4A] animate-ping" />
                            <span className="font-bold">AUTONOMOUS RECONNAISSANCE IN PROGRESS</span>
                          </div>
                          <div className="space-y-1 text-[#7E6B66]">
                            <p className={scanStep >= 1 ? "text-[#382C29] font-medium" : "opacity-40"}>
                              &gt; [1/3] Fetching server DOM & meta tags...
                            </p>
                            <p className={scanStep >= 2 ? "text-[#382C29] font-medium" : "opacity-40"}>
                              &gt; [2/3] Extracting value proposition and market category...
                            </p>
                            <p className={scanStep >= 3 ? "text-[#382C29] font-medium" : "opacity-40"}>
                              &gt; [3/3] Parsing competitor keywords & audience signals...
                            </p>
                          </div>
                        </div>
                      )}

                      {scanError && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{scanError}</span>
                        </div>
                      )}

                      <p className="text-[11px] text-[#7E6B66] text-center font-mono">
                        Don’t have a website yet? Switch to the "Guided Manual Blueprint" above.
                      </p>
                    </form>
                  ) : (
                    /* Scanned Review & Confirmation */
                    <div className="space-y-4 max-w-xl mx-auto">
                      <div className="p-3 bg-[#F8EFEB] border border-[#D6ADAD] rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-mono text-[#382C29]">
                          <CheckCircle className="w-4 h-4 text-[#5F4E4A]" />
                          <span><strong>Reconnaissance Successful:</strong> Review extracted data</span>
                        </div>
                        <button 
                          onClick={() => setScanData(null)}
                          className="text-[11px] underline text-[#5F4E4A] hover:text-[#382C29]"
                        >
                          Scan different URL
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={formData.business_name}
                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl text-xs font-medium"
                          />
                        </div>

                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Market Category
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl text-xs font-medium"
                          >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1 text-xs">
                          Extracted Value Proposition
                        </label>
                        <textarea
                          rows={2}
                          value={formData.value_proposition}
                          onChange={(e) => setFormData({ ...formData, value_proposition: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl text-xs font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Monthly Marketing Budget
                          </label>
                          <select
                            value={formData.monthly_marketing_budget}
                            onChange={(e) => setFormData({ ...formData, monthly_marketing_budget: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl text-xs font-medium"
                          >
                            <option value="<$1,000 / mo">&lt; $1,000 / mo</option>
                            <option value="$1,000 - $3,000 / mo">$1,000 - $3,000 / mo</option>
                            <option value="$3,000 - $10,000 / mo">$3,000 - $10,000 / mo</option>
                            <option value="$10,000+ / mo">$10,000+ / mo</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Primary Bottleneck
                          </label>
                          <select
                            value={formData.primary_bottleneck}
                            onChange={(e) => setFormData({ ...formData, primary_bottleneck: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl text-xs font-medium"
                          >
                            {bottlenecks.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleFinalSubmit}
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#D6ADAD]" />
                              <span>Synthesizing Reality Diagnostic...</span>
                            </>
                          ) : (
                            <>
                              <span>Confirm & Initialize Expedition</span>
                              <ArrowRight className="w-4 h-4 text-[#D6ADAD]" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* MODE B: GUIDED MANUAL BLUEPRINT */}
              {/* ========================================================================= */}
              {mode === 'manual' && (
                <div className="max-w-xl mx-auto">
                  
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#5F4E4A]/10 text-xs font-mono">
                    <span className="text-[#5F4E4A] font-bold">
                      SECTION {manualStep} OF 3
                    </span>
                    <span className="text-[#7E6B66]">
                      {manualStep === 1 && 'Identity & Offer'}
                      {manualStep === 2 && 'Customers & Economics'}
                      {manualStep === 3 && 'Marketing & Bottleneck'}
                    </span>
                  </div>

                  {/* Step 1: Identity & Offer */}
                  {manualStep === 1 && (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Flow, Lumina Candles, Zenith Consulting"
                          value={formData.business_name}
                          onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                          className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium outline-none focus:border-[#5F4E4A]"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                          Industry Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                        >
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                          Core Problem Solved & Value Promise *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="In one or two sentences: What specific problem do you solve, and what transformation do your customers experience?"
                          value={formData.value_proposition}
                          onChange={(e) => setFormData({ ...formData, value_proposition: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium outline-none focus:border-[#5F4E4A]"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          disabled={!formData.business_name || !formData.value_proposition}
                          onClick={() => setManualStep(2)}
                          className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 flex items-center gap-2"
                        >
                          <span>Continue to Economics</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Customers & Economics */}
                  {manualStep === 2 && (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                          Ideal Customer Profile (Who actually buys?) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Marketing directors at Series-A startups, busy working mothers, homeowners in Texas"
                          value={formData.target_audience}
                          onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                          className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium outline-none focus:border-[#5F4E4A]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Average Order / Deal Size
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. $49/mo or $2,500 project"
                            value={formData.average_deal_size}
                            onChange={(e) => setFormData({ ...formData, average_deal_size: e.target.value })}
                            className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                          />
                        </div>

                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Current Monthly Revenue
                          </label>
                          <select
                            value={formData.revenue_bracket}
                            onChange={(e) => setFormData({ ...formData, revenue_bracket: e.target.value })}
                            className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                          >
                            <option value="Pre-revenue / Launching">Pre-revenue / Launching</option>
                            <option value="$2k - $10k / mo">$2k - $10k / mo</option>
                            <option value="$10k - $50k / mo">$10k - $50k / mo</option>
                            <option value="$50k - $150k / mo">$50k - $150k / mo</option>
                            <option value="$150k+ / mo">$150k+ / mo</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setManualStep(1)}
                          className="px-5 py-2.5 border border-[#5F4E4A]/20 text-[#5F4E4A] rounded-xl font-semibold"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!formData.target_audience}
                          onClick={() => setManualStep(3)}
                          className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 flex items-center gap-2"
                        >
                          <span>Continue to Bottlenecks</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Marketing Reality & Bottleneck */}
                  {manualStep === 3 && (
                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Monthly Marketing Budget
                          </label>
                          <select
                            value={formData.monthly_marketing_budget}
                            onChange={(e) => setFormData({ ...formData, monthly_marketing_budget: e.target.value })}
                            className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                          >
                            <option value="<$1,000 / mo">&lt; $1,000 / mo</option>
                            <option value="$1,000 - $3,000 / mo">$1,000 - $3,000 / mo</option>
                            <option value="$3,000 - $10,000 / mo">$3,000 - $10,000 / mo</option>
                            <option value="$10,000+ / mo">$10,000+ / mo</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                            Known Competitors (comma separated)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Brand A, Brand B"
                            value={formData.top_competitors}
                            onChange={(e) => setFormData({ ...formData, top_competitors: e.target.value })}
                            className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-2">
                          What is your primary constraint right now? *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {bottlenecks.map(b => (
                            <div
                              key={b.id}
                              onClick={() => setFormData({ ...formData, primary_bottleneck: b.id })}
                              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                formData.primary_bottleneck === b.id
                                  ? 'bg-[#5F4E4A] text-white border-[#5F4E4A]'
                                  : 'bg-[#FAF7F2] text-[#382C29] border-[#5F4E4A]/10 hover:border-[#D6ADAD]'
                              }`}
                            >
                              <div className="font-bold">{b.title}</div>
                              <p className={`text-[11px] mt-0.5 ${formData.primary_bottleneck === b.id ? 'opacity-80' : 'text-[#7E6B66]'}`}>
                                {b.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setManualStep(2)}
                          className="px-5 py-2.5 border border-[#5F4E4A]/20 text-[#5F4E4A] rounded-xl font-semibold"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleFinalSubmit}
                          disabled={isSubmitting}
                          className="px-7 py-3.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow hover:scale-[1.02] flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#D6ADAD]" />
                              <span>Saving to Database...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit & Compute Diagnostic</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </>
          )}

        </div>

      </div>
    </div>
  );
}
