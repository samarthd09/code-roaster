"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber?: number | string;
  language: LanguageId;
  code: string;
  onApply?: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const currentLang = LANGUAGES.find((l) => l.id === language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("failed");
      setTimeout(() => setCopyStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white brutal-border brutal-shadow-md rounded-[18px] p-4 border-l-8 border-l-gGreen mt-4">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-base">✨</span>
          {sectionNumber && (
            <span className="font-mono text-[10px] font-bold bg-dark text-white px-1.5 py-0.5 rounded">
              {String(sectionNumber).padStart(2, "0")} //
            </span>
          )}
          <h4 className="font-display font-bold text-xs sm:text-sm text-dark tracking-tight uppercase">
            REDEMPTION ARC · Ab Asli Fix Dekh, Bhau
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="bg-cream hover:bg-mustard brutal-border brutal-shadow-sm px-2.5 py-1 rounded-md font-mono text-[11px] font-bold text-dark flex items-center gap-1.5 transition-all btn-press"
          >
            {copyStatus === "copied" ? (
              <>
                <span className="text-gGreen">✓</span>
                <span>COPIED!</span>
              </>
            ) : copyStatus === "failed" ? (
              <>
                <span className="text-gRed">✕</span>
                <span>SELECT MANUALLY</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>COPY CODE</span>
              </>
            )}
          </button>

          {onApply && (
            <button
              onClick={() => onApply(code)}
              className="bg-dark text-white hover:bg-neutral-800 px-3 py-1 rounded-md font-mono text-[11px] font-bold flex items-center gap-1 transition-all btn-press"
              title="Apply fixed code directly to editor"
            >
              <span>APPLY TO EDITOR</span>
              <span>↵</span>
            </button>
          )}
        </div>
      </div>

      {/* Corrected Code Block */}
      <div className="bg-darkCard brutal-border rounded-[12px] p-3.5 font-mono text-[12px] text-editorInk leading-snug overflow-x-auto whitespace-pre max-h-[360px] scrollbar-thin">
        <code>{code}</code>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span>solution.{currentLang?.extension || "py"} · Ready to test</span>
        <span className="text-gGreen font-bold">Tested & Syntax-Checked ✓</span>
      </div>
    </div>
  );
}
