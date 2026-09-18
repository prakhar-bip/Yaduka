import React from 'react';
import { X, Check, Flame, Compass } from 'lucide-react';

export default function Philosophy() {
  return (
    <section id="philosophy" class="py-20 bg-white border-b border-[#5F4E4A]/10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#5F4E4A] uppercase block mb-3">
          The Awakening
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#382C29] leading-tight">
          Why do 90% of small businesses <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#5F4E4A]">burn out their marketing runway?</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#5F4E4A] max-w-3xl mx-auto leading-relaxed">
          Founders are told that scaling is just a series of mechanical buttons: <em>"Run Facebook ads, hire a freelancer, post 3x a day on TikTok, build a funnel."</em> They spend thousands buying traffic for an unexamined offer in an uncharted market.
        </p>

        {/* Contrast Grid: Guesswork vs. Expedition */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* The Conventional Trap */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#5F4E4A]/15 relative">
            <div className="w-11 h-11 rounded-2xl bg-[#5F4E4A]/10 flex items-center justify-center text-[#5F4E4A] mb-5">
              <Flame className="w-5 h-5 text-[#5F4E4A]" />
            </div>
            <span className="font-mono text-xs text-[#7E6B66] uppercase tracking-wider block mb-1">
              The Guesswork Trap
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#382C29]">
              The Ad Spend Black Hole
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-[#5F4E4A]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#5F4E4A]/10 text-[#5F4E4A] flex items-center justify-center text-xs shrink-0 mt-0.5">&times;</span>
                <span>Throwing capital at algorithms hoping they magically find profitable buyers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#5F4E4A]/10 text-[#5F4E4A] flex items-center justify-center text-xs shrink-0 mt-0.5">&times;</span>
                <span>Copying competitor campaigns without knowing if their unit economics work.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#5F4E4A]/10 text-[#5F4E4A] flex items-center justify-center text-xs shrink-0 mt-0.5">&times;</span>
                <span>Founder anxiety: waking up every Monday morning guessing what to test next.</span>
              </li>
            </ul>
          </div>

          {/* The Yaduka Strategic Approach */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FAF7F2] to-[#F8EFEB] border-2 border-[#D6ADAD] relative shadow-lg">
            <div className="w-11 h-11 rounded-2xl bg-[#5F4E4A] flex items-center justify-center text-[#FAF7F2] mb-5">
              <Compass className="w-5 h-5 text-[#D6ADAD]" />
            </div>
            <span className="font-mono text-xs text-[#5F4E4A] uppercase tracking-wider font-semibold block mb-1">
              The Yaduka Way
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#382C29]">
              The Strategic Growth Expedition
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-[#382C29]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#5F4E4A] text-[#FAF7F2] flex items-center justify-center text-xs shrink-0 mt-0.5">&check;</span>
                <span>Autonomous market research uncovering customer whitespace before ad spend begins.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#5F4E4A] text-[#FAF7F2] flex items-center justify-center text-xs shrink-0 mt-0.5">&check;</span>
                <span>A rigorous strategy dialogue that stresses-tests unit economics and creative positioning.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#5F4E4A] text-[#FAF7F2] flex items-center justify-center text-xs shrink-0 mt-0.5">&check;</span>
                <span>An immutable, step-by-step roadmap that evolves as each level of success is unlocked.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Highlight quote */}
        <div className="mt-14 py-6 border-y border-[#5F4E4A]/10">
          <p className="font-serif text-xl sm:text-2xl text-[#382C29] italic font-medium">
            "Most platforms sell you clicks. Yaduka engineers your market position."
          </p>
        </div>

      </div>
    </section>
  );
}
