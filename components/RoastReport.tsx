"use client";

import React, { useState } from "react";
import { PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FixedCode } from "@/components/FixedCode";
import { IssueCard } from "@/components/IssueCard";
import { LoadingState } from "@/components/LoadingState";
import { LanguageId, PersonaId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  persona: PersonaId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
  onLoadSample: () => void;
  onRoastAgain: () => void;
  onNewCode: () => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  persona,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
  onLoadSample,
  onRoastAgain,
  onNewCode,
}: RoastReportProps) {
  const [shareCopied, setShareCopied] = useState(false);

  if (state === "empty") {
    return <EmptyState onLoadSample={onLoadSample} />;
  }

  if (state === "loading") {
    return <LoadingState />;
  }

  if (state === "error") {
    return <ErrorState error={errorMsg} onRetry={onRetry} />;
  }

  if (!result) {
    return <EmptyState onLoadSample={onLoadSample} />;
  }

  const currentLevel = ROAST_LEVELS.find((l) => l.id === roastLevel);
  const currentPersona = PERSONAS.find((p) => p.id === persona);

  const handleShare = async () => {
    const shareText = `🔥 My code got roasted by ${currentPersona?.label || "Hostel Bhau"} on Code Roaster (${currentLevel?.label})!\n\nVerdict: ${result.scoreLabel || "ATTENDANCE SHORT"}\nScore: ${result.score || 72}/100\n\n"${result.roast.slice(0, 120)}..."\n\nTry it at DevFest Nashik 2026! #CodeRoaster #DevFestNashik`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Code Roaster Critique",
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#FCFBF8] p-4 sm:p-6 overflow-y-auto scrollbar-thin">
      <div className="space-y-5">
        {/* Header Row */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold bg-mustard text-dark px-2 py-0.5 rounded brutal-border brutal-shadow-sm">
                AUDIT // REPORT
              </span>
              <span className="text-xs font-mono uppercase font-bold text-dark/70 tracking-wider">
                {currentLevel?.label}
              </span>
            </div>
            <span className="font-mono text-[11px] text-gray-500 font-semibold">
              Gemini AI Engine · Clean JSON
            </span>
          </div>

          {/* Savage Headline Card */}
          <div className="bg-white brutal-border brutal-shadow p-4 sm:p-5 rounded-[18px] relative overflow-hidden">
            <div className="absolute -right-3 -bottom-3 text-7xl select-none opacity-5 font-black font-sans">
              ROAST
            </div>
            <p className="font-display font-black text-lg sm:text-xl md:text-2xl text-dark leading-snug tracking-tight">
              &ldquo;{result.roast}&rdquo;
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-gray-600">
              <span className="font-bold text-dark">Roaster Persona:</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold text-dark">
                {currentPersona?.label} ({currentPersona?.tagline})
              </span>
            </div>
          </div>
        </div>

        {/* Score Stamp Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-block transform -rotate-2 bg-mustard brutal-border-3 brutal-shadow-md px-4 py-2 rounded-xl">
            <div className="font-mono text-[10px] font-black uppercase tracking-widest text-dark/80">
              OVERALL VERDICT
            </div>
            <div className="font-display font-black text-sm sm:text-base md:text-lg text-dark tracking-tight leading-none mt-0.5">
              {result.score ?? 72} / 100 — {result.scoreLabel || "CODE REVIEW COMPLETE"}
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-dark bg-white border-2 border-dark px-3 py-1.5 rounded-lg flex items-center gap-1.5 brutal-shadow-sm">
            <span>⚠️ {result.issues.length} Issue{result.issues.length === 1 ? "" : "s"} Found</span>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-bold text-dark/80 uppercase tracking-wider">
            Detected Issues &amp; Blunders:
          </div>

          {result.issues.length === 0 ? (
            <div className="bg-green-50 border-2 border-gGreen p-4 rounded-xl text-center font-mono text-xs text-gGreen font-bold">
              ✓ No critical issues found. Suspiciously clean code!
            </div>
          ) : (
            result.issues.map((issue, idx) => (
              <IssueCard key={idx} index={idx} issue={issue} />
            ))
          )}
        </div>

        {/* Redemption Arc: Corrected Code */}
        {result.correctedCode && (
          <FixedCode
            sectionNumber={3}
            language={language}
            code={result.correctedCode}
            onApply={onApplyFix}
          />
        )}

        {/* Takeaway Section */}
        {result.takeaway && (
          <div className="bg-cream brutal-border rounded-xl p-3.5 text-xs font-mono leading-relaxed border-l-4 border-l-dark">
            <span className="font-bold text-dark block mb-1">💡 TAKEAWAY NOTE:</span>
            <span className="text-dark/85">{result.takeaway}</span>
          </div>
        )}
      </div>

      {/* Closing Action Bar & Encouragement */}
      <div className="mt-8 pt-4 border-t-2 border-dark/15">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleShare}
              className="bg-white hover:bg-cream brutal-border brutal-shadow-sm px-3.5 py-1.5 rounded-full font-mono text-xs font-bold text-dark transition-all btn-press flex items-center gap-1.5"
            >
              <span>{shareCopied ? "✓ COPIED LINK" : "SHARE ROAST ↗"}</span>
            </button>
            <button
              onClick={onRoastAgain}
              className="bg-mustard hover:bg-mustardHover brutal-border brutal-shadow-sm px-4 py-1.5 rounded-full font-mono text-xs font-bold text-dark transition-all btn-press flex items-center gap-1.5"
            >
              <span>ROAST AGAIN, SPICIER</span>
              <span>🔥</span>
            </button>
            <button
              onClick={onNewCode}
              className="bg-white hover:bg-cream brutal-border brutal-shadow-sm px-3.5 py-1.5 rounded-full font-mono text-xs font-bold text-dark transition-all btn-press"
            >
              NEW CODE
            </button>
          </div>

          {/* Sincere Encouragement Quote */}
          <div className="font-ui text-xs font-semibold text-dark/75 italic">
            “Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga.”
          </div>
        </div>
      </div>
    </div>
  );
}
