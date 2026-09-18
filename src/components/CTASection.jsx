import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTASection({ onOpenIntakeWithUrl }) {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    if (onOpenIntakeWithUrl) {
      onOpenIntakeWithUrl(inputVal);
    }
  };

  return (
    <section id="embark" className="py-24 bg-[#5F4E4A] text-[#FAF7F2] relative overflow-hidden">
      {/* Ambient Rose Radial Highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6ADAD]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D6ADAD] text-xs font-mono mb-6">
          <span>THE NEXT SUMMIT IS WAITING</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
          Stop burning capital on hope. <br />
          <span className="italic font-normal text-[#D6ADAD]">
            Travel with a strategic compass.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#FAF7F2]/80 max-w-2xl mx-auto leading-relaxed">
          Join the founders who traded panic for mathematical precision. Enter your business website, let Yaduka scour your market terrain, and co-author your immutable scaling roadmap today.
        </p>

        {/* Quick-Start Form */}
        <div className="mt-10 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-[#FAF7F2] rounded-2xl p-2.5 shadow-2xl flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter your website URL (e.g. mycompany.com)..."
              required
              className="flex-1 px-4 py-3.5 bg-transparent text-[#382C29] placeholder-[#7E6B66] text-sm outline-none rounded-xl font-medium"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#5F4E4A] hover:bg-[#382C29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0"
            >
              <span>Scan & Initialize</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6ADAD]" />
            </button>
          </form>

          <p className="mt-4 text-xs text-[#FAF7F2]/60 font-mono flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D6ADAD]" />
            <span>Fast autonomous scan • PostgreSQL backed • 100% Confidential</span>
          </p>
        </div>

      </div>
    </section>
  );
}
