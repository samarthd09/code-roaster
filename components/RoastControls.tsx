"use client";

import React from "react";
import { LANGUAGES, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, PersonaId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (lvl: RoastLevel) => void;
  persona: PersonaId;
  onPersonaChange: (p: PersonaId) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  persona,
  onPersonaChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="bg-[#FAF8F5] border-b-2 border-dark px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
      {/* Left controls: Roast Level, Persona, Language */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
        {/* Segmented Roast Level Selector */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold uppercase text-dark/70 mr-0.5 tracking-wider hidden sm:inline">
            Tikhat Level:
          </span>
          <div className="bg-cream brutal-border rounded-full p-1 flex items-center gap-1">
            {ROAST_LEVELS.map((lvl) => {
              const isActive = roastLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => onRoastLevelChange(lvl.id as RoastLevel)}
                  title={lvl.description}
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all ${
                    isActive
                      ? "bg-mustard text-dark brutal-border brutal-shadow-sm"
                      : "text-dark/80 hover:bg-black/5"
                  }`}
                >
                  <span>{lvl.label.split(" ")[0]}</span>{" "}
                  <span>{lvl.emoji}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Persona Dropdown */}
        <div className="relative">
          <div className="bg-white brutal-border brutal-shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 cursor-pointer hover:bg-cream transition-colors">
            <span className="text-[11px] font-mono text-gray-500 font-bold hidden md:inline">
              PERSONA:
            </span>
            <select
              value={persona}
              onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
              className="bg-transparent font-sans font-bold text-xs text-dark focus:outline-none cursor-pointer pr-1"
            >
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} ({p.tagline})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <div className="bg-white brutal-border brutal-shadow-sm rounded-full px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-cream transition-colors">
            <span className="w-2 h-2 rounded-full bg-gGreen"></span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
              className="bg-transparent font-mono font-bold text-xs text-dark focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label} (.{l.extension})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right controls: Error Drawer Toggle & Roast CTA */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={onToggleErrorDrawer}
          className={`border-2 border-dashed px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
            errorDrawerOpen
              ? "border-dark bg-dark text-white"
              : "border-dark/60 hover:border-dark bg-white hover:bg-cream/60 text-dark"
          }`}
        >
          <span>{errorDrawerOpen ? "− ERROR MSG" : "+ ERROR MESSAGE"}</span>
        </button>

        <button
          onClick={onRoast}
          disabled={isRoasting}
          className={`btn-press brutal-border brutal-shadow px-5 sm:px-6 py-2 rounded-full font-display font-black text-xs sm:text-sm tracking-tight text-dark flex items-center gap-2 transition-all ${
            isRoasting
              ? "bg-gray-300 opacity-80 cursor-wait"
              : "bg-mustard hover:bg-mustardHover"
          }`}
        >
          {isRoasting ? (
            <>
              <span className="w-2 h-2 rounded-full bg-dark animate-ping"></span>
              <span>ANALYZING CODE...</span>
            </>
          ) : (
            <>
              <span>Roast Me / भाजून काढ</span>
              <span>🔥 →</span>
              <kbd className="hidden lg:inline-block font-mono text-[10px] bg-dark text-white px-1.5 py-0.2 rounded font-bold ml-1">
                Ctrl ⏎
              </kbd>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
