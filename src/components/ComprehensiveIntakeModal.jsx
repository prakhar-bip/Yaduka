import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Globe, Edit3, ArrowRight, CheckCircle, AlertCircle, 
  Sparkles, Loader2, Compass, MapPin, Package, Target, 
  DollarSign, TrendingUp, Shield, BarChart3, ChevronLeft 
} from 'lucide-react';
import { scanWebsite, submitComprehensiveIntake } from '../services/api';

export default function ComprehensiveIntakeModal({ isOpen, onClose, onIntakeSuccess, initialUrl = "" }) {
  if (!isOpen) return null;

  // Active Mode: 'website' or 'manual'
  const [mode, setMode] = useState('website');

  // Website Scan States
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1);
  const [scanError, setScanError] = useState(null);
  const [scanData, setScanData] = useState(null);

  // Manual Multi-Module Step (1 to 5)
  const [moduleStep, setModuleStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Complete Form State (All 5 Modules)
  const [formData, setFormData] = useState({
    // Module 1: Offering & Identity
    business_name: '',
    website_url: initialUrl,
    product_description: '',
    skus_count: '1-5 SKUs',
    mvp_offer: '',
    delivery_mechanism: 'Digital / Physical',
    moats: '',

    // Module 2: Geographic Footprint
    operating_base: '',
    target_territory: 'Metropolitan & Regional',
    distribution_channels: ['Direct-to-Consumer Website'],

    // Module 3: Customer & Commercials
    category: 'B2B Software / Tech',
    target_audience: '',
    buying_trigger: '',
    pricing_structure: 'Fixed One-Time / Tiered Retainer',
    average_deal_size: '$250',
    gross_margin_percentage: '65%',
    estimated_ltv: '$1,200',

    // Module 4: Marketing Reality & Traction
    stage: 'Early Growth',
    revenue_bracket: 'Pre-revenue / Launching',
    monthly_marketing_budget: '$1,000 - $3,000 / mo',
    past_channels: ['Google Search', 'Meta Ads'],
    top_competitors: [],
    primary_bottleneck: 'Traffic',

    // Module 5: Goals & Operational Limits
    north_star_metric: '$30,000 MRR within 90 days',
    operational_capacity: '50-100 orders or clients/month',
    brand_guardrails: 'Strictly transparent pricing; no spammy countdown timers'
  });

  // --- DEMO PRESET: SHREEJEE ENTERPRISES (SHAMGARH, MP) ---
  const handleAutofillShreejee = () => {
    const shreejeeData = {
      business_name: 'Shreejee Enterprises',
      website_url: 'https://shreejee-enterprises.in',
      product_description: 'Agricultural equipment, micro-drip irrigation systems, high-yield hybrid seeds, and fertilizers for commercial growers across the Malwa plateau.',
      skus_count: '10-50 SKUs',
      mvp_offer: 'Solar-Powered Micro-Drip Irrigation Kit with On-Site Installation & MP Govt Subsidy Assistance',
      delivery_mechanism: 'Direct Truck Freight & Shamgarh Central Hub',
      moats: 'Exclusive territorial dealership rights and 48-hour on-farm technical service repair fleet',

      operating_base: 'Shamgarh, Mandsaur, Madhya Pradesh',
      target_territory: 'Malwa & Chambal Region (Shamgarh, Mandsaur, Neemuch, Ratlam, Ujjain)',
      distribution_channels: ['Direct-to-Farmer Wholesale Hub', 'Sub-dealers in rural mandis'],

      category: 'Manufacturing & Physical Goods',
      target_audience: 'Commercial garlic, soyabean, and wheat farmers and horticulture growers with 5-25 acres',
      buying_trigger: 'Water scarcity before Rabi sowing and soaring diesel pumping electricity expenses',
      pricing_structure: 'Fixed Tiered Pricing with Subsidy Assistance',
      average_deal_size: '₹65,000 (~$800)',
      gross_margin_percentage: '28%',
      estimated_ltv: '₹2,50,000',

      stage: 'Expansion Stage',
      revenue_bracket: '$10k - $50k / mo',
      monthly_marketing_budget: '$1,000 - $3,000 / mo',
      past_channels: ['Local Agri Expos', 'WhatsApp Farmer Groups', 'Meta Ads'],
      top_competitors: [],
      primary_bottleneck: 'Traffic',

      north_star_metric: '₹50 Lakhs revenue across 60 new farm installations before Rabi season',
      operational_capacity: '20-25 farm installations per week with current technician team',
      brand_guardrails: 'Strictly ISI-certified pumps; 2-year on-site replacement warranty; zero counterfeit agrochemicals'
    };

    setFormData(shreejeeData);
    setUrlInput('https://shreejee-enterprises.in');
    setScanData({
      url: 'https://shreejee-enterprises.in',
      detected_business_name: 'Shreejee Enterprises',
      detected_category: 'Manufacturing & Physical Goods',
      detected_value_prop: 'Solar-Powered Micro-Drip Irrigation Kit with On-Site Installation & MP Govt Subsidy Assistance in Shamgarh, MP'
    });
    setMode('website');
  };

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
        product_description: result.detected_value_prop || prev.product_description,
        mvp_offer: result.detected_value_prop ? result.detected_value_prop.slice(0, 80) : prev.mvp_offer,
        target_audience: `High-intent buyers looking for ${result.detected_category || 'solutions'}`,
        top_competitors: [],
        operating_base: prev.operating_base || 'Metropolitan Area',
        target_territory: prev.target_territory || 'Regional & National'
      }));
    } catch (err) {
      setScanError(err.message || 'Failed to scan website. You can still proceed with manual entry.');
    } finally {
      setIsScanning(false);
    }
  };

  // --- FINAL COMPREHENSIVE SUBMISSION ---
  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        website_url: urlInput || formData.website_url || null,
        top_competitors: Array.isArray(formData.top_competitors) ? formData.top_competitors : []
      };

      const res = await submitComprehensiveIntake(payload);

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D6ADAD', '#5F4E4A', '#FFFFFF']
      });

      // Close modal and pass result to parent to transition to the dedicated Research Dashboard page!
      onClose();
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
    'Consulting & Professional Agency',
    'Local Healthcare & Clinical Practice',
    'Local Trades & Home Services',
    'Manufacturing & Physical Goods',
    'E-Commerce & Retail'
  ];

  const bottlenecks = [
    { id: 'Traffic', title: 'Traffic & Discovery', desc: 'Too few prospects know we exist.' },
    { id: 'Conversion', title: 'Conversion & Messaging', desc: 'Visitors arrive, but bounce without buying.' },
    { id: 'Retention', title: 'Retention & LTV', desc: 'Acquisition is okay, but repeat purchases are weak.' },
    { id: 'Pricing', title: 'Margins & Price Pressure', desc: 'Competitor price cuts are squeezing our margins.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#382C29]/65 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-3xl shadow-2xl border border-[#5F4E4A]/15 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#5F4E4A]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6ADAD] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F4E4A]">
              Step 1 // Complete Business Profile Intake
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#5F4E4A]/10 text-[#7E6B66] hover:text-[#382C29] flex items-center justify-center transition-all shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* Header Title & Mode Selector */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#382C29]">
              Inquire Your Business Reality
            </h2>
            <p className="text-sm text-[#5F4E4A] mt-1.5 max-w-lg mx-auto leading-relaxed">
              Yaduka requires your complete business coordinates to scour the web for local giants, price bands, and hidden market traps.
            </p>

            {/* Mode Switcher */}
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
                <span>Instant Website Auto-Scan</span>
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
                <span>5-Module Detailed Intake</span>
              </button>
            </div>

            {/* Quick Demo Autofill Button */}
            <div className="mt-3.5 flex items-center justify-center">
              <button
                type="button"
                onClick={handleAutofillShreejee}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#F8EFEB] text-[#5F4E4A] hover:text-[#382C29] border border-[#D6ADAD] rounded-full text-xs font-mono font-semibold transition-all shadow-xs hover:scale-[1.02] active:scale-95 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5F4E4A] group-hover:rotate-12 transition-transform" />
                <span>⚡ Demo Preset: <strong>Shreejee Enterprises (Shamgarh, MP)</strong></span>
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

                  {isScanning && (
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D6ADAD] text-xs space-y-2.5 font-mono">
                      <div className="flex items-center gap-2 text-[#5F4E4A]">
                        <span className="w-2 h-2 rounded-full bg-[#5F4E4A] animate-ping" />
                        <span className="font-bold">AUTONOMOUS CRAWLER ACTIVE</span>
                      </div>
                      <div className="space-y-1 text-[#7E6B66]">
                        <p className={scanStep >= 1 ? "text-[#382C29] font-medium" : "opacity-40"}>
                          &gt; [1/3] Parsing meta tags, DOM hierarchy, and product descriptors...
                        </p>
                        <p className={scanStep >= 2 ? "text-[#382C29] font-medium" : "opacity-40"}>
                          &gt; [2/3] Extracting MVP offer, detected SKUs, and geographic signals...
                        </p>
                        <p className={scanStep >= 3 ? "text-[#382C29] font-medium" : "opacity-40"}>
                          &gt; [3/3] Clustering competitor keywords and preparing verification draft...
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
                    You can verify and supplement all details before the online research engine launches.
                  </p>
                </form>
              ) : (
                /* Pre-filled Scanned Review */
                <div className="space-y-5 max-w-2xl mx-auto">
                  <div className="p-3.5 bg-[#F8EFEB] border border-[#D6ADAD] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-mono text-[#382C29]">
                      <CheckCircle className="w-4 h-4 text-[#5F4E4A]" />
                      <span><strong>Extraction Successful:</strong> Complete the key anchors below</span>
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
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.business_name}
                        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Operating Base / City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Austin, TX or London, UK"
                        value={formData.operating_base}
                        onChange={(e) => setFormData({ ...formData, operating_base: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Target Geographic Territory *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Greater Texas or Pan-India or US & Canada"
                        value={formData.target_territory}
                        onChange={(e) => setFormData({ ...formData, target_territory: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Catalog Depth / SKUs
                      </label>
                      <select
                        value={formData.skus_count}
                        onChange={(e) => setFormData({ ...formData, skus_count: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      >
                        <option value="1 Single Hero SKU">1 Single Hero SKU</option>
                        <option value="2-5 SKUs">2-5 SKUs</option>
                        <option value="10-50 SKUs">10-50 SKUs</option>
                        <option value="50+ Catalog SKUs">50+ Catalog SKUs</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Product Description *
                    </label>
                    <textarea
                      rows={2}
                      value={formData.product_description}
                      onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      MVP (Flagship Hero Offer) *
                    </label>
                    <input
                      type="text"
                      placeholder="The specific primary offer that drives initial traction"
                      value={formData.mvp_offer}
                      onChange={(e) => setFormData({ ...formData, mvp_offer: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
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
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
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
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      >
                        {bottlenecks.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting || !formData.business_name || !formData.operating_base}
                      className="w-full py-4 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D6ADAD]" />
                          <span>Dispatching Autonomous Research Engine...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Profile & Launch Market Research Dashboard</span>
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
          {/* MODE B: 5-MODULE DETAILED GUIDED INTAKE */}
          {/* ========================================================================= */}
          {mode === 'manual' && (
            <div className="max-w-2xl mx-auto">
              
              {/* Module Progress Navigation */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#5F4E4A]/10 text-xs font-mono">
                <span className="text-[#5F4E4A] font-bold">
                  MODULE {moduleStep} OF 5
                </span>
                <span className="text-[#7E6B66]">
                  {moduleStep === 1 && '1. Offering & Identity'}
                  {moduleStep === 2 && '2. Geographic Footprint'}
                  {moduleStep === 3 && '3. Customer & Commercials'}
                  {moduleStep === 4 && '4. Marketing Reality'}
                  {moduleStep === 5 && '5. Goals & Guardrails'}
                </span>
              </div>

              {/* MODULE 1: Offering & Identity */}
              {moduleStep === 1 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Business / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Health, Lumina Goods"
                        value={formData.business_name}
                        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Catalog SKU Count
                      </label>
                      <select
                        value={formData.skus_count}
                        onChange={(e) => setFormData({ ...formData, skus_count: e.target.value })}
                        className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      >
                        <option value="1 Single Hero SKU">1 Single Hero SKU</option>
                        <option value="2-5 SKUs">2-5 SKUs</option>
                        <option value="10-50 SKUs">10-50 SKUs</option>
                        <option value="50+ Catalog SKUs">50+ Catalog SKUs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Product / Service Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="What is the exact product or service specifications?"
                      value={formData.product_description}
                      onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      MVP (Flagship Hero Offer) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="The single highest-conviction offer that acts as your entry spearhead"
                      value={formData.mvp_offer}
                      onChange={(e) => setFormData({ ...formData, mvp_offer: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      disabled={!formData.business_name || !formData.product_description || !formData.mvp_offer}
                      onClick={() => setModuleStep(2)}
                      className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 flex items-center gap-2"
                    >
                      <span>Continue to Geography</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 2: Geographic Footprint */}
              {moduleStep === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Primary Operating Base / City HQ *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Austin, TX or Mumbai, India or Berlin, Germany"
                      value={formData.operating_base}
                      onChange={(e) => setFormData({ ...formData, operating_base: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Target Market Territory / Radius *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Within 25-mile radius, Statewide, National, Global"
                      value={formData.target_territory}
                      onChange={(e) => setFormData({ ...formData, target_territory: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Delivery & Distribution Channels
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Online website, Amazon store, physical storefront, on-site service"
                      value={formData.distribution_channels.join(', ')}
                      onChange={(e) => setFormData({ ...formData, distribution_channels: e.target.value.split(',').map(s => s.trim()) })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setModuleStep(1)}
                      className="px-5 py-2.5 border border-[#5F4E4A]/20 text-[#5F4E4A] rounded-xl font-semibold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="button"
                      disabled={!formData.operating_base || !formData.target_territory}
                      onClick={() => setModuleStep(3)}
                      className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 flex items-center gap-2"
                    >
                      <span>Continue to Commercials</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 3: Customer & Commercials */}
              {moduleStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Target Audience / Ideal Customer Profile (ICP) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Who actually buys? (e.g. Clinic owners with 5+ staff, or mothers seeking organic snacks)"
                      value={formData.target_audience}
                      onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Average Deal / Order Size
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $85 per order or $2,500 retainer"
                        value={formData.average_deal_size}
                        onChange={(e) => setFormData({ ...formData, average_deal_size: e.target.value })}
                        className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                        Estimated Gross Margin %
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 60% or 75%"
                        value={formData.gross_margin_percentage}
                        onChange={(e) => setFormData({ ...formData, gross_margin_percentage: e.target.value })}
                        className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Acute Buying Trigger / JTBD
                    </label>
                    <input
                      type="text"
                      placeholder="What urgent event compels them to purchase right now?"
                      value={formData.buying_trigger}
                      onChange={(e) => setFormData({ ...formData, buying_trigger: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setModuleStep(2)}
                      className="px-5 py-2.5 border border-[#5F4E4A]/20 text-[#5F4E4A] rounded-xl font-semibold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="button"
                      disabled={!formData.target_audience}
                      onClick={() => setModuleStep(4)}
                      className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 flex items-center gap-2"
                    >
                      <span>Continue to Marketing</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 4: Marketing Reality */}
              {moduleStep === 4 && (
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
                    <div className="p-3 bg-[#F8EFEB] border border-[#D6ADAD] rounded-xl flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#5F4E4A] mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#5F4E4A]" />
                        <span>Autonomous Competitor Discovery</span>
                      </div>
                      <p className="text-[11px] text-[#7E6B66] leading-relaxed">
                        No competitor input required. Yaduka's intelligence engine automatically scours your target territory to benchmark dominant incumbents and expose their review flaws.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-2">
                      Primary Growth Bottleneck *
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

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setModuleStep(3)}
                      className="px-5 py-2.5 border border-[#5F4E4A]/20 text-[#5F4E4A] rounded-xl font-semibold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setModuleStep(5)}
                      className="px-6 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                    >
                      <span>Continue to Goals</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 5: Goals & Operational Limits */}
              {moduleStep === 5 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      90-Day North Star Milestone
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. $40,000 monthly revenue or 150 new active clients"
                      value={formData.north_star_metric}
                      onChange={(e) => setFormData({ ...formData, north_star_metric: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Operational Capacity Limits
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Max 40 clients per month before needing new hires"
                      value={formData.operational_capacity}
                      onChange={(e) => setFormData({ ...formData, operational_capacity: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-[#5F4E4A] block mb-1">
                      Brand & Strategic Guardrails
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. No heavy price cuts; strictly professional tone; preserve 60% gross margin"
                      value={formData.brand_guardrails}
                      onChange={(e) => setFormData({ ...formData, brand_guardrails: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#5F4E4A]/20 rounded-xl font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setModuleStep(4)}
                      className="px-5 py-2.5 border border-[#5F4E4A]/20 text-[#5F4E4A] rounded-xl font-semibold flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      className="px-7 py-3.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-[1.01] flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D6ADAD]" />
                          <span>Dispatching Autonomous Research Engine...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Profile & Launch Market Research Dashboard</span>
                          <ArrowRight className="w-4 h-4 text-[#D6ADAD]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
