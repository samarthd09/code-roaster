import React from "react";
import { APP } from "@/config/app.config";

export function Hero() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
      <div className="inline-flex items-center gap-2 bg-mustard brutal-border brutal-shadow-sm px-3.5 py-1 rounded-full font-mono text-xs font-bold tracking-widest text-dark uppercase mb-3">
        <span>🌶️</span>
        <span>CODE BOL RAHA HAI · मला वाचवा!</span>
      </div>
      <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-dark tracking-tight leading-tight mb-2.5">
        {APP.name} <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-dark/70">({APP.edition})</span>
      </h1>
      <p className="font-ui text-sm sm:text-base md:text-lg text-dark/85 font-medium max-w-2xl mx-auto leading-relaxed">
        Paste your code. Pick your roast level. Get humbled. Get the fix. <br className="hidden sm:inline" />
        <span className="font-bold text-dark">Desi debugging with zero filter</span>, powered by Gemini.
      </p>
    </div>
  );
}
