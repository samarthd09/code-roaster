"use client";

import React, { useEffect, useRef, useState } from "react";
import { LANGUAGES, LIMITS } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
  onClear: () => void;
  isRoasting?: boolean;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
  onClear,
  isRoasting,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);
  const currentLang = LANGUAGES.find((l) => l.id === language);

  // Sync gutter scroll with textarea
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Cursor tracking
  const updateCursor = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart || 0;
    const linesBefore = code.slice(0, pos).split("\n");
    const currentLine = linesBefore.length;
    const currentCol = (linesBefore[linesBefore.length - 1]?.length || 0) + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  // Handle Tab key insertion without blurring
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      // Restore cursor position after state updates
      setTimeout(() => {
        if (target) {
          target.selectionStart = target.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Editor Header Row */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-dark/15 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold bg-dark text-white px-2 py-0.5 rounded">
            INPUT // SRC
          </span>
          <h3 className="font-display font-bold text-xs sm:text-sm tracking-tight text-dark uppercase">
            YOUR CODE
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadSample}
            disabled={isRoasting}
            className="text-[11px] font-mono font-bold bg-[#FAF8F5] hover:bg-cream brutal-border brutal-shadow-sm px-2.5 py-0.5 rounded-md text-dark transition-all"
            title="Load sample code with bugs"
          >
            SAMPLE BUG
          </button>
          <button
            onClick={onClear}
            disabled={isRoasting}
            className="text-[11px] font-mono font-semibold text-gray-500 hover:text-dark px-1.5 py-0.5 transition-colors"
            title="Clear editor"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Code Window Dark Container */}
      <div className="bg-darkCard brutal-border rounded-[14px] p-3.5 sm:p-4 flex-grow flex flex-col font-mono text-xs leading-relaxed text-editorInk relative overflow-hidden min-h-[380px] lg:min-h-[500px]">
        {/* Fake window title bar */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] inline-block border border-black/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] inline-block border border-black/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block border border-black/40"></span>
            <span className="ml-2 text-[11px] text-gray-400 font-mono">
              solution.{currentLang?.extension || "py"}
            </span>
          </div>
          {errorLine && (
            <span className="text-[10px] uppercase font-bold text-gRed bg-red-950/80 px-2 py-0.5 rounded border border-gRed/40">
              Line {errorLine} Bug Highlighted
            </span>
          )}
        </div>

        {/* Gutter + Textarea Grid */}
        <div className="relative flex-grow flex overflow-hidden">
          {/* Line Numbers Gutter */}
          <div
            ref={gutterRef}
            className="w-10 select-none text-right font-mono flex flex-col pr-2.5 border-r border-gray-800 text-[12px] text-editorGutter overflow-hidden pt-1"
          >
            {Array.from({ length: lineCount }).map((_, i) => {
              const lineNum = i + 1;
              const isError = errorLine === lineNum;
              return (
                <div
                  key={lineNum}
                  className={`leading-[22px] transition-colors ${
                    isError
                      ? "text-gRed font-black bg-red-900/30 rounded px-0.5"
                      : ""
                  }`}
                >
                  {String(lineNum).padStart(2, "0")}
                </div>
              );
            })}
          </div>

          {/* Code Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onSelect={updateCursor}
            onKeyUp={updateCursor}
            onClick={updateCursor}
            onKeyDown={handleKeyDown}
            maxLength={LIMITS.maxCodeLength}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder={`// Paste your ${currentLang?.label || "code"} snippet here...\n// Press Ctrl+Enter (or ⌘+Enter) to roast`}
            className="flex-grow pl-3 pt-1 bg-transparent text-editorInk font-mono text-[12.5px] leading-[22px] resize-none focus:outline-none whitespace-pre overflow-auto scrollbar-thin"
          />
        </div>

        {/* Code Window Footer Stats */}
        <div className="mt-3 pt-2.5 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gGreen"></span>
            <span>
              Ln {cursorPos.line}, Col {cursorPos.col} · {currentLang?.label}
            </span>
          </div>
          <span className="text-gray-400 font-medium">
            {code.length.toLocaleString()} / {LIMITS.maxCodeLength.toLocaleString()} chars
          </span>
        </div>
      </div>
    </div>
  );
}
