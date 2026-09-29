"use client";

import React, { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai…",
  "Sharma ji ke bete se comparison chal raha hai…",
  "Bhau, roast tayyar ho raha hai…",
  "Panchavati Express se bhi late chal raha hai tumhara code…",
  "Checking for off-by-one errors and zero-effort loops…",
  "Gemini is analyzing your stack trace… almost cooked! 🔥",
];

export function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[420px]">
      {/* Tilted Outlined Square Loader */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-mustard brutal-border-3 brutal-shadow rounded-2xl flex items-center justify-center animate-spin duration-1000">
          <span className="font-mono text-2xl font-black text-dark">/</span>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gRed animate-ping"></div>
      </div>

      <div className="inline-flex items-center gap-2 bg-dark text-mustard px-3 py-1 rounded-full font-mono text-[11px] font-bold tracking-widest uppercase mb-3">
        <span>ANALYZING CODE</span>
      </div>

      <p className="font-display font-black text-lg sm:text-xl text-dark max-w-md h-12 flex items-center justify-center transition-all duration-300">
        “{LOADING_MESSAGES[msgIndex]}”
      </p>

      <span className="font-mono text-xs text-gray-500 mt-4">
        Powered by Gemini · Desi Critique Engine
      </span>
    </div>
  );
}
