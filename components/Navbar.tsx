"use client";

import React from "react";
import { APP } from "@/config/app.config";
import { DevFestBadge, GDGNashikHeader } from "@/components/Logos";

export function Navbar() {
  return (
    <header className="w-full px-4 sm:px-6 pt-6">
      <div className="max-w-[1140px] mx-auto bg-white brutal-border brutal-shadow rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all">
        {/* Left: GDG Nashik Logo */}
        <GDGNashikHeader />

        {/* Center: Brand Title */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 border border-dark text-sm animate-pulse">
            🔥
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-dark uppercase">
              {APP.name}
            </span>
            <span className="bg-dark text-mustard px-2 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-widest hidden sm:inline-block">
              {APP.version}
            </span>
          </div>
        </div>

        {/* Right: DevFest Nashik 2026 Badge */}
        <DevFestBadge className="hidden sm:flex" />
      </div>
    </header>
  );
}
