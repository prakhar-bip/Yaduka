import React from 'react';
import { ArrowRight, MessageSquare, Compass } from 'lucide-react';

export default function Hero({ onOpenIntake }) {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden border-b border-[#5F4E4A]/10">
      {/* Ambient Rose/Umber Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D6ADAD]/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#5F4E4A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6ADAD]/20 border border-[#D6ADAD]/40 text-[#5F4E4A] text-xs font-medium mb-6">
          <Compass className="w-3.5 h-3.5 text-[#5F4E4A]" />
          <span>A Strategic Awakening for Small Businesses & Startups</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Philosophy */}
          <div className="lg:col-span-7">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#382C29] leading-[1.12] tracking-tight">
              Growth isn’t a checklist. <br />
              <span className="italic font-normal text-[#5F4E4A]">It is an expedition.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#5F4E4A] font-normal leading-relaxed max-w-2xl">
              You don’t need louder ads. <strong>You need clearer truth.</strong> Yaduka absorbs your business reality, scours your market terrain for hidden openings, and climbs alongside you through every peak of triumph and the higher mountains beyond.
            </p>

            {/* Philosophical Callout Quote */}
            <div className="mt-8 p-5 bg-[#F4EFEA] border-l-4 border-[#5F4E4A] rounded-r-xl max-w-2xl">
              <p className="text-sm font-medium text-[#382C29] italic">
                "When you reach your first level of success, the climb doesn’t end. It awards you the happiness of victory, followed immediately by the thrill of higher, steeper mountains."
              </p>
              <span className="block mt-2 text-[11px] font-mono text-[#7E6B66] uppercase tracking-wider">
                — The Yaduka Expedition Doctrine
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button 
                onClick={onOpenIntake}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#5F4E4A] text-[#FAF7F2] rounded-xl text-sm font-semibold tracking-wide hover:bg-[#382C29] shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Begin Your Travelling Journey</span>
                <ArrowRight className="w-4 h-4 text-[#D6ADAD]" />
              </button>
              
              <a 
                href="#dialogue-room" 
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#5F4E4A] border border-[#5F4E4A]/20 rounded-xl text-sm font-semibold hover:border-[#5F4E4A] hover:bg-[#F8EFEB] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#5F4E4A]" />
                <span>Enter Strategy Room</span>
              </a>
            </div>

            {/* Proof Metrics Strip */}
            <div className="mt-10 pt-8 border-t border-[#5F4E4A]/10 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#382C29]">63%</span>
                <span className="text-xs text-[#7E6B66] font-medium">Ad budget saved from blind testing</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#382C29]">100%</span>
                <span className="text-xs text-[#7E6B66] font-medium">Objective market reconnaissance</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#382C29]">30-60-90</span>
                <span className="text-xs text-[#7E6B66] font-medium">Day actionable execution roadmap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated SVG Radar Reconnaissance */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#5F4E4A]/15">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#5F4E4A]/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#5F4E4A]" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#382C29] uppercase">
                    Yaduka Reconnaissance Radar
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-[#D6ADAD]/30 text-[#382C29] text-[11px] font-mono font-medium rounded-full">
                  LIVE SCANNING
                </span>
              </div>

              {/* Animated SVG Radar */}
              <div className="relative flex items-center justify-center p-3">
                <svg className="w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="150" cy="150" r="140" stroke="#5F4E4A" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="6 4" />
                  <circle cx="150" cy="150" r="105" stroke="#5F4E4A" strokeOpacity="0.15" strokeWidth="1.5" />
                  <circle cx="150" cy="150" r="70" stroke="#D6ADAD" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="150" cy="150" r="35" stroke="#5F4E4A" strokeOpacity="0.2" strokeWidth="1.5" />

                  <line x1="10" y1="150" x2="290" y2="150" stroke="#5F4E4A" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="150" y1="10" x2="150" y2="290" stroke="#5F4E4A" strokeOpacity="0.15" strokeWidth="1" />

                  {/* Rotating Radar Sweep Beam */}
                  <g className="radar-sweep-beam">
                    <path d="M 150 150 L 290 150 A 140 140 0 0 0 249 51 Z" fill="url(#heroSweepGradient)" opacity="0.45" />
                  </g>

                  <defs>
                    <linearGradient id="heroSweepGradient" x1="150" y1="150" x2="290" y2="150">
                      <stop offset="0%" stopColor="#D6ADAD" stopOpacity="0" />
                      <stop offset="100%" stopColor="#5F4E4A" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Identified Blips */}
                  <g className="float-slow">
                    <circle cx="210" cy="95" r="5" fill="#D6ADAD" />
                    <circle cx="210" cy="95" r="12" stroke="#D6ADAD" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                  </g>
                  
                  <g className="float-delayed">
                    <circle cx="85" cy="190" r="6" fill="#5F4E4A" />
                    <circle cx="85" cy="190" r="14" stroke="#5F4E4A" strokeWidth="1.5" opacity="0.5" />
                  </g>
                  
                  <circle cx="195" cy="220" r="4.5" fill="#382C29" />

                  {/* Central Beacon */}
                  <circle cx="150" cy="150" r="8" fill="#5F4E4A" className="beacon-active" />
                  <circle cx="150" cy="150" r="3" fill="#FAF7F2" />
                </svg>

                {/* Floating Context Badges */}
                <div className="absolute top-2 right-2 bg-[#FAF7F2] border border-[#D6ADAD] px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-mono text-[#382C29]">
                  <span className="text-[#5F4E4A] font-bold">TERRAIN:</span> 3 Untapped Niches
                </div>
                <div className="absolute bottom-2 left-2 bg-[#FAF7F2] border border-[#5F4E4A]/20 px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-mono text-[#5F4E4A]">
                  <span className="font-bold text-[#382C29]">SAVINGS:</span> 42% Ad Waste Saved
                </div>
              </div>

              {/* Status footer with direct scan action */}
              <div className="mt-4 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#5F4E4A]/10 text-xs text-[#5F4E4A]">
                <div className="flex items-center justify-between font-mono mb-1 text-[11px] text-[#382C29]">
                  <span>STEP 1: INGESTION</span>
                  <button 
                    onClick={onOpenIntake}
                    className="font-bold underline text-[#5F4E4A] hover:text-[#382C29]"
                  >
                    SCAN YOUR WEBSITE &rarr;
                  </button>
                </div>
                <p className="text-[12px] leading-relaxed">
                  Synthesizing real buyer intent against rival ad spend to chart your highest-conviction climbing route.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
