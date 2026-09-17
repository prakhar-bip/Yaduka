import React from 'react';
import YadukaLogo from './YadukaLogo';
import { ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenIntake }) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#5F4E4A]/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="group transition-transform duration-300 hover:scale-[1.02]">
          <YadukaLogo size={42} showText={true} />
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5F4E4A]">
          <a href="#philosophy" className="hover:text-[#382C29] transition-colors">Philosophy</a>
          <a href="#expedition" className="hover:text-[#382C29] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6ADAD]" />
            The Travelling Journey
          </a>
          <a href="#dialogue-room" className="hover:text-[#382C29] transition-colors">Strategy Dialogue</a>
          <a href="#blueprint" className="hover:text-[#382C29] transition-colors">Live Simulator</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenIntake}
            className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-[#5F4E4A] px-4 py-2.5 rounded-xl border border-[#5F4E4A]/20 hover:border-[#5F4E4A] transition-all"
          >
            Start Diagnostic
          </button>
          <button 
            onClick={onOpenIntake}
            className="inline-flex items-center gap-2 bg-[#5F4E4A] text-[#FAF7F2] px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#382C29] shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            <span>Embark Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
          </button>
        </div>

      </div>
    </header>
  );
}
