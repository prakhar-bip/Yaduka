import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Sparkles, Shield, CheckCircle, ChevronRight, 
  MessageSquare, Loader2, Target, DollarSign, Award, AlertCircle, RefreshCw
} from 'lucide-react';
import YadukaLogo from './YadukaLogo';
import { startStrategySession, sendStrategyMessage, finalizeMasterPlan } from '../services/api';

export default function StrategyWarRoom({ businessProfile, onBackToDashboard, onPlanGenerated }) {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [error, setError] = useState(null);
  const [agreedDecisions, setAgreedDecisions] = useState({});
  const chatBottomRef = useRef(null);

  // Initialize session on mount
  useEffect(() => {
    async function initSession() {
      if (!businessProfile?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await startStrategySession(businessProfile.id);
        setSession(data);
        setMessages(data.messages || []);
      } catch (err) {
        setError(err.message || 'Failed to initialize strategy war room');
      } finally {
        setIsLoading(false);
      }
    }
    initSession();
  }, [businessProfile?.id]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || !session?.session_id || isSending) return;

    // Optimistically append founder message
    const updatedMessages = [...messages, { role: 'founder', content: text }];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await sendStrategyMessage(session.session_id, text);
      setSession(prev => ({ ...prev, ...response }));
      setMessages(response.messages || []);
      if (response.agreed_decisions) {
        setAgreedDecisions(response.agreed_decisions);
      }
    } catch (err) {
      alert(`Message error: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleFinalizePlan = async () => {
    if (!businessProfile?.id || isFinalizing) return;
    setIsFinalizing(true);
    try {
      const planData = await finalizeMasterPlan(businessProfile.id, agreedDecisions);
      if (onPlanGenerated) {
        onPlanGenerated(planData);
      }
    } catch (err) {
      alert(`Error generating plan: ${err.message}`);
    } finally {
      setIsFinalizing(false);
    }
  };

  const report = businessProfile?.research_report || {};
  const areaGiants = report?.area_giants?.primary_giants || [];
  const primaryGiant = areaGiants[0] || { name: 'Category Incumbent', mined_review_flaws: ['bureaucracy and hidden fees'] };
  const currentBattle = session?.current_battle || 'positioning';
  const battleNumber = session?.battle_number || 1;
  const isReadyForPlan = session?.is_ready_for_plan || battleNumber >= 3 || Object.keys(agreedDecisions).length >= 2;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#382C29] flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#5F4E4A]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#5F4E4A]/20 text-xs font-semibold text-[#5F4E4A] hover:text-[#382C29] hover:bg-[#F8EFEB] transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Research Dashboard</span>
            </button>
            <div className="h-6 w-px bg-[#5F4E4A]/20 hidden sm:block" />
            <YadukaLogo size={34} showText={true} />
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono text-[#7E6B66] uppercase block">Current Altitude</span>
              <span className="text-xs font-bold font-mono text-[#5F4E4A]">Elevation 3,400m — Strategy War Room</span>
            </div>
            {isReadyForPlan && (
              <button
                onClick={handleFinalizePlan}
                disabled={isFinalizing}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5F4E4A] hover:bg-[#382C29] text-[#FAF7F2] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-[1.02] disabled:opacity-50"
              >
                {isFinalizing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D6ADAD]" />
                    <span>Synthesizing Master Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#D6ADAD]" />
                    <span>Generate Master Execution Plan &rarr;</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main War Room Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center Column: The Tactical Sparring Chat (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl border border-[#5F4E4A]/15 shadow-xl overflow-hidden min-h-[650px]">
          
          {/* Sparring Room Header & Battle Progress */}
          <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#5F4E4A]/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F4E4A]">
                  Step 4 // Founder & Yaduka CMO Sparring Room
                </span>
              </div>
              <p className="text-xs text-[#7E6B66] mt-0.5">
                Debating tactics for <strong className="text-[#382C29]">{businessProfile?.business_name}</strong> in {businessProfile?.target_territory}
              </p>
            </div>

            {/* 3-Battle Step Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`px-2.5 py-1 rounded-lg font-bold ${
                currentBattle === 'positioning' 
                  ? 'bg-[#5F4E4A] text-white shadow-sm' 
                  : agreedDecisions.positioning_decision ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-[#7E6B66]'
              }`}>
                1. Positioning
              </span>
              <span className="text-[#5F4E4A]/40">&rarr;</span>
              <span className={`px-2.5 py-1 rounded-lg font-bold ${
                currentBattle === 'channels' 
                  ? 'bg-[#5F4E4A] text-white shadow-sm' 
                  : agreedDecisions.channels_decision ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-[#7E6B66]'
              }`}>
                2. Budget
              </span>
              <span className="text-[#5F4E4A]/40">&rarr;</span>
              <span className={`px-2.5 py-1 rounded-lg font-bold ${
                currentBattle === 'offer' || currentBattle === 'completed'
                  ? 'bg-[#5F4E4A] text-white shadow-sm' 
                  : agreedDecisions.offer_decision ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-[#7E6B66]'
              }`}>
                3. Offer
              </span>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#5F4E4A] animate-spin" />
                <p className="font-mono text-xs text-[#7E6B66]">
                  Calibrating War Room with autonomous intelligence...
                </p>
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isYaduka = msg.role === 'yaduka';
                return (
                  <div 
                    key={index}
                    className={`flex flex-col ${isYaduka ? 'items-start' : 'items-end'} animate-fadeIn`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="font-mono text-[11px] font-bold text-[#7E6B66]">
                        {isYaduka ? 'Yaduka Strategic Co-Pilot' : 'Founder'}
                      </span>
                    </div>

                    <div 
                      className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4.5 text-sm leading-relaxed shadow-sm ${
                        isYaduka 
                          ? 'bg-[#FAF7F2] border border-[#5F4E4A]/15 text-[#382C29]' 
                          : 'bg-[#5F4E4A] text-white'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Render Quick Decision Chips if present on Yaduka's latest message */}
                      {isYaduka && msg.quick_options && msg.quick_options.length > 0 && index === messages.length - 1 && (
                        <div className="mt-4 pt-3 border-t border-[#5F4E4A]/10 space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#7E6B66] block">
                            Recommended Decisions (Click to lock):
                          </span>
                          <div className="space-y-1.5">
                            {msg.quick_options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => handleSendMessage(opt)}
                                disabled={isSending}
                                className="w-full text-left text-xs p-2.5 rounded-xl bg-white hover:bg-[#F8EFEB] border border-[#5F4E4A]/15 hover:border-[#D6ADAD] text-[#382C29] transition-all flex items-start gap-2 group shadow-xs disabled:opacity-50"
                              >
                                <ChevronRight className="w-3.5 h-3.5 text-[#5F4E4A] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                                <span className="font-medium leading-snug">{opt}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {isSending && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#7E6B66] p-2 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5F4E4A]" />
                <span>Yaduka is analyzing your decision against territory metrics...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#FAF7F2] border-t border-[#5F4E4A]/10">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your strategic decision, challenge assumptions, or request advice..."
                disabled={isSending || isLoading}
                className="flex-1 px-4 py-3 bg-white border border-[#5F4E4A]/20 rounded-xl text-sm text-[#382C29] outline-none focus:border-[#5F4E4A] transition-all shadow-inner font-medium disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending || isLoading}
                className="px-5 py-3 bg-[#5F4E4A] hover:bg-[#382C29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-[1.02] flex items-center gap-1.5 shrink-0 disabled:opacity-40"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 text-[#D6ADAD]" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Strategic Alignment Briefcase (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Target Territory & Incumbent Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#5F4E4A]/15 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[#5F4E4A]">
                Territory Recon Intel
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FAF7F2] border border-[#5F4E4A]/10 rounded text-[#7E6B66]">
                Autonomous
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#7E6B66] uppercase block">Dominant Area Incumbent</span>
              <h4 className="font-serif font-bold text-base text-[#382C29] mt-0.5">
                {primaryGiant.name}
              </h4>
              <p className="text-xs text-[#5F4E4A] mt-1">
                Estimated Share: {primaryGiant.estimated_market_share || '35-45%'}
              </p>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-rose-900 uppercase block mb-1">
                Mined Review Flaw to Attack:
              </span>
              <p className="text-xs text-rose-950 font-medium leading-relaxed">
                "{primaryGiant.mined_review_flaws?.[0] || 'Slow response times and bureaucratic support'}"
              </p>
            </div>

            <div className="text-xs font-mono space-y-1.5 pt-2 border-t border-[#5F4E4A]/10 text-[#7E6B66]">
              <div>Budget: <strong className="text-[#382C29]">{businessProfile?.monthly_marketing_budget}</strong></div>
              <div>Territory: <strong className="text-[#382C29]">{businessProfile?.target_territory}</strong></div>
              <div>Flagship MVP: <strong className="text-[#382C29]">{businessProfile?.mvp_offer}</strong></div>
            </div>
          </div>

          {/* Locked Strategic Decisions Status */}
          <div className="bg-white rounded-3xl p-6 border border-[#5F4E4A]/15 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[#5F4E4A]">
                Agreed Strategic Pillars
              </span>
              <span className="text-[10px] font-mono text-[#7E6B66]">
                {Object.keys(agreedDecisions).length} / 3 Locked
              </span>
            </div>

            {/* Pillar 1 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#5F4E4A]/10">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-mono font-bold text-[#382C29]">1. Positioning Angle</span>
                {agreedDecisions.positioning_decision ? (
                  <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> LOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#7E6B66]">In Debate</span>
                )}
              </div>
              <p className="text-xs text-[#5F4E4A] leading-relaxed">
                {agreedDecisions.positioning_decision || 'Attacking incumbent review flaws with fast, guaranteed turnaround.'}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#5F4E4A]/10">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-mono font-bold text-[#382C29]">2. Channel & Budget Split</span>
                {agreedDecisions.channels_decision ? (
                  <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> LOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#7E6B66]">Pending</span>
                )}
              </div>
              <p className="text-xs text-[#5F4E4A] leading-relaxed">
                {agreedDecisions.channels_decision || '65% High-Intent Search Intent / 35% Social Video Proof.'}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#5F4E4A]/10">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-mono font-bold text-[#382C29]">3. Risk-Reversal Offer</span>
                {agreedDecisions.offer_decision ? (
                  <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> LOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#7E6B66]">Pending</span>
                )}
              </div>
              <p className="text-xs text-[#5F4E4A] leading-relaxed">
                {agreedDecisions.offer_decision || 'Milestone guarantee with zero upfront commitment.'}
              </p>
            </div>

            {/* Master Plan Generator CTA */}
            <div className="pt-2">
              <button
                onClick={handleFinalizePlan}
                disabled={isFinalizing}
                className="w-full py-3.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isFinalizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#D6ADAD]" />
                    <span>Compiling Master Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D6ADAD]" />
                    <span>Lock & Generate Master Plan</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-[#5F4E4A]/10 py-5 px-6 text-center text-xs text-[#7E6B66] font-mono">
        Yaduka Strategic Growth Engine • Elevation 3,400m Strategy War Room Active
      </footer>

    </div>
  );
}
