import React from "react";

interface EmptyStateProps {
  onLoadSample?: () => void;
}

export function EmptyState({ onLoadSample }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[420px]">
      <div className="w-16 h-16 bg-cream brutal-border-3 brutal-shadow rounded-2xl flex items-center justify-center text-2xl font-mono font-black text-dark mb-4 transform -rotate-3">
        ?_?
      </div>
      <h3 className="font-display font-black text-xl text-dark mb-2 tracking-tight">
        Your code is suspiciously quiet...
      </h3>
      <p className="font-ui text-sm text-dark/70 max-w-sm mb-6 leading-relaxed">
        Paste some code on the left, pick your roast spice level, and let&apos;s find out what&apos;s really going on.
      </p>

      {onLoadSample && (
        <button
          onClick={onLoadSample}
          className="bg-mustard hover:bg-mustardHover brutal-border brutal-shadow px-5 py-2 rounded-full font-display font-bold text-xs tracking-tight text-dark flex items-center gap-2 transition-all btn-press"
        >
          <span>TRY SAMPLE BUG</span>
          <span>→</span>
        </button>
      )}
    </div>
  );
}
