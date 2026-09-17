import React from 'react';

export default function YadukaLogo({ 
  size = 40, 
  showText = true, 
  light = false,
  className = "" 
}) {
  const primaryUmber = light ? '#FAF7F2' : '#5F4E4A';
  const darkUmber = light ? '#FFFFFF' : '#382C29';
  const accentRose = '#D6ADAD';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Pure Vector SVG Monogram */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="50" cy="50" r="46" fill={accentRose} fillOpacity={light ? "0.2" : "0.18"} />
        <circle cx="50" cy="50" r="46" stroke={accentRose} strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Mountain Ascent Contour */}
        <path d="M 22 74 L 50 24 L 78 74 Z" fill="none" stroke={primaryUmber} strokeWidth="2" strokeOpacity="0.25" />
        
        {/* Ascending Vector 'Y' Paths */}
        <path d="M 32 30 C 38 42, 44 54, 50 62" stroke={accentRose} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 68 30 C 62 42, 56 54, 50 62" stroke={primaryUmber} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 50 62 L 50 86" stroke={darkUmber} strokeWidth="6" strokeLinecap="round" />
        
        {/* Summit Beacon & Compass Star */}
        <circle cx="50" cy="62" r="5" fill="#FAF7F2" stroke={primaryUmber} strokeWidth="3" />
        <circle cx="50" cy="22" r="4" fill={accentRose} />
        <path d="M 50 14 L 50 30 M 42 22 L 58 22" stroke={accentRose} strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="leading-tight">
          <span className={`font-serif text-2xl font-bold tracking-tight block ${light ? 'text-white' : 'text-[#382C29]'}`}>
            YADUKA
          </span>
          <span className={`text-[9px] font-mono font-semibold tracking-[0.22em] uppercase block mt-0.5 ${light ? 'text-[#D6ADAD]' : 'text-[#5F4E4A]'}`}>
            Growth Expedition
          </span>
        </div>
      )}
    </div>
  );
}
