import React from "react";
import { AI, APP } from "@/config/app.config";
import { GDGBrackets } from "@/components/Logos";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="w-full mt-10 bg-white border-t-2 border-dark pt-4 pb-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col gap-3">
        {/* Main Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-mono text-dark/75 border-b border-dark/10 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isRoasting ? "bg-amber-500 animate-ping" : "bg-gGreen"
              }`}
            ></span>
            <span className="font-bold">
              STATUS:{" "}
              {isRoasting ? (
                <span className="text-amber-600 font-black">PROCESSING...</span>
              ) : (
                <span className="text-gGreen font-black">
                  ONLINE ({AI.modelLabel.toUpperCase()})
                </span>
              )}
            </span>
            <span className="hidden md:inline text-gray-400">|</span>
            <span className="hidden md:inline font-semibold">
              ENGINE: GOOGLE GEMINI
            </span>
          </div>

          <div className="font-mono text-xs font-bold text-dark/80 tracking-widest uppercase">
            {APP.name} {APP.version} // LIVE
          </div>
        </div>

        {/* Attribution and Workshop Credit Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-ui text-dark font-medium">
            <GDGBrackets className="w-6 h-4 flex-shrink-0" />
            <span>
              Built with <span className="text-gRed font-bold">❤️</span> by{" "}
              <strong className="font-bold text-dark">{APP.organizer}</strong> for{" "}
              <strong className="font-bold text-dark">{APP.event}</strong>
            </span>
          </div>

          {/* Guaranteed permanent workshop note */}
          <div className="font-mono text-xs font-semibold text-dark/70 bg-cream brutal-border px-3 py-1 rounded-full">
            Made at GDG Nashik Pre-DevFest Workshop
          </div>
        </div>
      </div>
    </footer>
  );
}
