import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TravellingJourney from './components/TravellingJourney';
import StrategyDialogue from './components/StrategyDialogue';
import RoadmapSimulator from './components/RoadmapSimulator';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ComprehensiveIntakeModal from './components/ComprehensiveIntakeModal';
import MarketResearchDashboard from './components/MarketResearchDashboard';
import StrategyWarRoom from './components/StrategyWarRoom';
import MasterExecutionPlanView from './components/MasterExecutionPlanView';
import { Sparkles, ArrowRight, BarChart2, MessageSquare, FileText } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'research-dashboard' | 'strategy-room' | 'master-plan'
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [initialIntakeUrl, setInitialIntakeUrl] = useState('');
  const [activeProfile, setActiveProfile] = useState(null);
  const [masterPlanData, setMasterPlanData] = useState(null);

  const handleOpenIntake = (url = '') => {
    setInitialIntakeUrl(typeof url === 'string' ? url : '');
    setIsIntakeOpen(true);
  };

  const handleIntakeSuccess = (profile) => {
    setActiveProfile(profile);
    // User requested: "when i click on the button open new page where all these details are shown"
    setView('research-dashboard');
  };

  const handleOpenWarRoom = () => {
    if (!activeProfile) {
      handleOpenIntake();
      return;
    }
    setView('strategy-room');
  };

  const handlePlanGenerated = (planData) => {
    setMasterPlanData(planData);
    setView('master-plan');
  };

  // View: Strategy War Room (Step 4)
  if (view === 'strategy-room' && activeProfile) {
    return (
      <StrategyWarRoom
        businessProfile={activeProfile}
        onBackToDashboard={() => setView('research-dashboard')}
        onPlanGenerated={handlePlanGenerated}
      />
    );
  }

  // View: Master Execution Plan (Step 5)
  if (view === 'master-plan' && activeProfile) {
    return (
      <MasterExecutionPlanView
        businessProfile={activeProfile}
        planData={masterPlanData}
        onBackToWarRoom={() => setView('strategy-room')}
        onBackToDashboard={() => setView('research-dashboard')}
      />
    );
  }

  // View: Research Dashboard (Step 2 & 3)
  if (view === 'research-dashboard' && activeProfile) {
    return (
      <MarketResearchDashboard
        businessProfile={activeProfile}
        onBackToHome={() => setView('landing')}
        onOpenDialogue={handleOpenWarRoom}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#382C29] flex flex-col selection:bg-[#D6ADAD] selection:text-[#382C29]">
      
      {/* Active Expedition Ingested Banner */}
      {activeProfile ? (
        <div className="bg-[#382C29] text-[#FAF7F2] py-2.5 px-4 text-xs font-medium border-b border-white/10 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Active Expedition:</strong> {activeProfile.business_name} ({activeProfile.target_territory})
            </span>
            <span className="px-2 py-0.5 rounded bg-[#D6ADAD] text-[#382C29] font-mono text-[10px] font-bold">
              Readiness: {activeProfile.readiness_score}%
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] font-mono">
            <button
              onClick={() => setView('research-dashboard')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#D6ADAD] text-[#382C29] font-bold rounded-lg hover:bg-white transition-all shadow-sm"
            >
              <BarChart2 className="w-3 h-3" />
              <span>Research</span>
            </button>
            <button
              onClick={handleOpenWarRoom}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#5F4E4A] text-white font-bold rounded-lg hover:bg-[#FAF7F2] hover:text-[#382C29] transition-all shadow-sm border border-white/20"
            >
              <MessageSquare className="w-3 h-3 text-[#D6ADAD]" />
              <span>War Room</span>
            </button>
            {masterPlanData && (
              <button
                onClick={() => setView('master-plan')}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all shadow-sm"
              >
                <FileText className="w-3 h-3" />
                <span>Master Plan</span>
              </button>
            )}
            <button 
              onClick={() => handleOpenIntake()} 
              className="underline text-white/80 hover:text-white ml-1 text-[10px]"
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        /* Top Announcement Banner */
        <div className="bg-[#5F4E4A] text-[#FAF7F2] py-2 px-4 text-xs font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#382C29]/20 text-center">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D6ADAD] animate-pulse" />
          <span>
            <strong>The Founder’s Reality:</strong> Most businesses don’t fail from lack of effort. They fail from shouting into an empty canyon.
          </span>
          <button 
            onClick={() => handleOpenIntake()}
            className="underline decoration-[#D6ADAD] hover:text-[#D6ADAD] ml-1 transition-colors font-semibold"
          >
            Start Diagnostic &rarr;
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar onOpenIntake={() => handleOpenIntake()} />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        <Hero onOpenIntake={() => handleOpenIntake()} />
        <Philosophy />
        <TravellingJourney />
        <StrategyDialogue />
        <RoadmapSimulator />
        <CTASection onOpenIntakeWithUrl={(url) => handleOpenIntake(url)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Comprehensive Intake Modal (5 Modules + URL Auto-Scan) */}
      <ComprehensiveIntakeModal 
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onIntakeSuccess={handleIntakeSuccess}
        initialUrl={initialIntakeUrl}
      />

    </div>
  );
}
