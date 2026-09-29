import React from "react";

export function WarliStrip() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 my-8">
      {/* Folk Art Strip Card */}
      <div className="bg-white brutal-border brutal-shadow rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="bg-mustard brutal-border px-2.5 py-0.5 rounded font-mono text-[11px] font-black text-dark">
            नाशिक वारली कला × CODE
          </span>
          <span className="font-ui text-xs font-semibold text-dark/70 hidden md:inline">
            Nashik Folk Art &amp; Code Roast
          </span>
        </div>

        {/* Warli Figures SVG */}
        <div className="flex items-center gap-6 select-none opacity-90">
          {/* Warli Dev with Laptop */}
          <div className="flex items-center gap-1.5" title="Warli Coder">
            <svg width="34" height="38" viewBox="0 0 34 38" fill="none" className="text-dark stroke-current stroke-2">
              <circle cx="17" cy="6" r="4" fill="currentColor" />
              <path d="M12 10 L22 10 L17 19 Z" fill="currentColor" />
              <path d="M12 28 L22 28 L17 19 Z" fill="currentColor" />
              <path d="M10 28 L6 36 M24 28 L28 36" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 14 L7 20 L13 22 M20 14 L27 20 L21 22" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[10px] font-bold bg-cream px-1.5 py-0.5 rounded border border-dark/20">
              💻
            </span>
          </div>

          {/* Warli Inspector with Magnifying Glass */}
          <div className="flex items-center gap-1.5" title="Bug Hunter">
            <svg width="34" height="38" viewBox="0 0 34 38" fill="none" className="text-dark stroke-current stroke-2">
              <circle cx="17" cy="6" r="4" fill="currentColor" />
              <path d="M12 10 L22 10 L17 19 Z" fill="currentColor" />
              <path d="M12 28 L22 28 L17 19 Z" fill="currentColor" />
              <path d="M12 28 L8 36 M22 28 L26 36" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 13 L6 15 M20 13 L27 10" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[10px] font-bold bg-cream px-1.5 py-0.5 rounded border border-dark/20">
              🔍 🐛
            </span>
          </div>

          {/* Warli Tribal Celebration: 0 Errors */}
          <div className="flex items-center gap-2" title="Zero Errors Celebration">
            <svg width="40" height="38" viewBox="0 0 40 38" fill="none" className="text-dark stroke-current stroke-2">
              <circle cx="20" cy="6" r="4" fill="currentColor" />
              <path d="M15 10 L25 10 L20 19 Z" fill="currentColor" />
              <path d="M15 28 L25 28 L20 19 Z" fill="currentColor" />
              <path d="M15 28 L10 36 M25 28 L30 36" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16 13 L8 7 M24 13 L32 7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[10px] font-bold bg-gGreen text-white px-2 py-0.5 rounded border border-dark">
              &gt; 0 ERRORS BUILD PASS
            </span>
          </div>
        </div>

        <div className="font-mono text-xs font-black text-dark">
          DEVFEST &apos;26
        </div>
      </div>

      {/* Rangoli Chevron Divider Strip */}
      <div className="w-full mt-6 flex items-center justify-center gap-2 select-none overflow-hidden opacity-60 text-[11px] font-mono tracking-[0.35em] text-dark font-black">
        ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼ ● ▲ ▼ ▲ ▼
      </div>
    </div>
  );
}
