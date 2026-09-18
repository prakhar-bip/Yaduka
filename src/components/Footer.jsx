import React from 'react';
import YadukaLogo from './YadukaLogo';

export default function Footer() {
  return (
    <footer className="bg-[#382C29] text-[#FAF7F2]/70 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-2">
          <YadukaLogo size={38} showText={true} light={true} />
          <p className="mt-4 text-xs text-[#FAF7F2]/70 max-w-sm leading-relaxed">
            The strategic marketing and advertising engine for startups and small businesses who refuse to stay small. Every victory reveals higher mountains and deeper fulfillment.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-4">
            Expedition
          </h5>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#philosophy" className="hover:text-white transition-colors">The Awakening</a></li>
            <li><a href="#expedition" className="hover:text-white transition-colors">Travelling Journey</a></li>
            <li><a href="#dialogue-room" className="hover:text-white transition-colors">Strategy Dialogue</a></li>
            <li><a href="#blueprint" className="hover:text-white transition-colors">Roadmap Simulator</a></li>
          </ul>
        </div>

        {/* Brand System */}
        <div>
          <h5 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-4">
            Brand Identity
          </h5>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-md bg-[#D6ADAD] border border-white/20 shrink-0" />
              <span>Pale Rose (#D6ADAD)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-md bg-[#5F4E4A] border border-white/20 shrink-0" />
              <span>Umber Brown (#5F4E4A)</span>
            </div>
          </div>
          <p className="text-[11px] text-[#FAF7F2]/50 mt-3">
            Designed for thoughtful clarity, grounded authority, and human warmth.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/50">
        <p>&copy; 2026 Yaduka Inc. All rights reserved. Strategic Growth Expedition.</p>
        <p className="mt-2 sm:mt-0 font-mono">Precision over guesswork.</p>
      </div>
    </footer>
  );
}
