import React from "react";
import { AI } from "@/config/app.config";

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-8 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="bg-white brutal-border brutal-shadow p-4 rounded-[18px] flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-red-100 brutal-border flex items-center justify-center font-bold text-lg flex-shrink-0">
          🌶️
        </div>
        <div>
          <div className="font-display font-black text-xl text-dark">4,820+ Bugs</div>
          <div className="font-mono text-xs text-dark/70 font-semibold">Roasted live at DevFest Nashik</div>
        </div>
      </div>

      <div className="bg-white brutal-border brutal-shadow p-4 rounded-[18px] flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-yellow-100 brutal-border flex items-center justify-center font-bold text-lg flex-shrink-0">
          🏆
        </div>
        <div>
          <div className="font-display font-black text-xl text-dark">Hostel Bhau</div>
          <div className="font-mono text-xs text-dark/70 font-semibold">Most picked savage roaster persona</div>
        </div>
      </div>

      <div className="bg-white brutal-border brutal-shadow p-4 rounded-[18px] flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-blue-100 brutal-border flex items-center justify-center font-bold text-lg flex-shrink-0">
          ⚡
        </div>
        <div>
          <div className="font-display font-black text-xl text-dark">{AI.modelLabel}</div>
          <div className="font-mono text-xs text-dark/70 font-semibold">Fast parsing &amp; redemption fixes</div>
        </div>
      </div>
    </div>
  );
}
