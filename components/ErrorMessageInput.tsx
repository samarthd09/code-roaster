"use client";

import React from "react";
import { LIMITS } from "@/config/app.config";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="bg-lavender border-b-2 border-dark px-6 py-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gRed inline-block animate-ping"></span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-dark">
            Attach Terminal Traceback / Compiler Error (Optional)
          </span>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-xs font-bold text-dark/70 hover:text-dark px-2 py-0.5 rounded hover:bg-black/5 transition-colors"
          title="Dismiss"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={LIMITS.maxErrorMessageLength}
        rows={3}
        placeholder={`e.g. Traceback (most recent call last):\n  File "solution.py", line 4, in <module>\n    TypeError: can only concatenate str (not "float") to str`}
        className="w-full bg-white brutal-border rounded-lg p-2.5 font-mono text-xs text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mustard resize-y"
      />
      <div className="flex justify-between items-center mt-1 text-[11px] font-mono text-gray-500">
        <span>Help Gemini pinpoint exact runtime bugs and fatal exceptions.</span>
        <span>
          {value.length.toLocaleString()} / {LIMITS.maxErrorMessageLength.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
