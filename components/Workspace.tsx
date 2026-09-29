"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { CodeEditor } from "@/components/CodeEditor";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { RoastControls } from "@/components/RoastControls";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";
import { StatsRow } from "@/components/StatsRow";
import { WarliStrip } from "@/components/WarliStrip";
import { requestRoast } from "@/lib/api";
import { LanguageId, PersonaId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  // Error line is only highlighted when editor still holds the exact roasted code
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim() === "") {
      setApiError("No code provided. I can't roast the void! 😅 Paste some code first.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        persona,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      setApiError(err?.message || "Failed to generate roast.");
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, persona, roastLevel]);

  // Global Ctrl+Enter / Cmd+Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
    if (SAMPLE.errorMessage) {
      setErrorMessage(SAMPLE.errorMessage);
      setErrorDrawerOpen(true);
    }
  };

  const handleClear = () => {
    setCode("");
    setErrorMessage("");
    setErrorDrawerOpen(false);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
    setRoastedCode(fixedCode);
  };

  const handleRoastAgain = () => {
    // Escalate roast spice level to zanzanit (savage)
    setRoastLevel("zanzanit");
    setTimeout(() => {
      handleRoast();
    }, 100);
  };

  const handleNewCode = () => {
    setCode("");
    setErrorMessage("");
    setErrorDrawerOpen(false);
    setReportState("empty");
    setRoastResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-grow">
        <Hero />

        {/* Main Split-Pane Tool Card */}
        <div className="bg-white brutal-border brutal-shadow-lg rounded-[22px] sm:rounded-[24px] overflow-hidden flex flex-col transition-all">
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            persona={persona}
            onPersonaChange={setPersona}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />

          {errorDrawerOpen && (
            <ErrorMessageInput
              value={errorMessage}
              onChange={setErrorMessage}
              onClose={() => setErrorDrawerOpen(false)}
            />
          )}

          {/* Split Pane: Code Editor + Roast Report */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left Column: Code Editor */}
            <div className="lg:col-span-5 p-4 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-dark flex flex-col bg-white">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                errorLine={errorLine}
                onLoadSample={handleLoadSample}
                onClear={handleClear}
                isRoasting={isRoasting}
              />
            </div>

            {/* Right Column: Roast Report */}
            <div className="lg:col-span-7 flex flex-col">
              <RoastReport
                state={reportState}
                roastLevel={roastLevel}
                language={language}
                persona={persona}
                result={roastResult}
                errorMsg={apiError}
                onRetry={handleRoast}
                onApplyFix={handleApplyFix}
                onLoadSample={handleLoadSample}
                onRoastAgain={handleRoastAgain}
                onNewCode={handleNewCode}
              />
            </div>
          </div>
        </div>

        {/* Community Live Stats */}
        <StatsRow />

        {/* Warli Folk Art & Rangoli Divider Strip */}
        <WarliStrip />
      </main>

      <StatusBar isRoasting={isRoasting} />
    </div>
  );
}
