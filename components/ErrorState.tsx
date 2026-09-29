import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[420px]">
      <div className="w-16 h-16 bg-[#FDE8E8] text-gRed brutal-border-3 brutal-shadow rounded-2xl flex items-center justify-center text-3xl font-mono font-black mb-4 transform rotate-3">
        !
      </div>

      <div className="inline-flex items-center gap-1.5 bg-red-100 border border-gRed text-gRed px-3 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider mb-2.5">
        ROAST // INTERRUPTED
      </div>

      <h3 className="font-display font-black text-xl text-dark mb-2 tracking-tight">
        Bhau, Gemini ne chai break le li!
      </h3>

      <p className="font-ui text-xs sm:text-sm text-dark/80 max-w-md mb-6 leading-relaxed bg-white brutal-border p-3 rounded-xl">
        {error || "Something went wrong while generating the roast. Please check your connection or API key."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-mustard hover:bg-mustardHover brutal-border brutal-shadow px-6 py-2 rounded-full font-display font-bold text-xs tracking-tight text-dark flex items-center gap-2 transition-all btn-press"
        >
          <span>RETRY ROAST</span>
          <span>↵</span>
        </button>
      )}
    </div>
  );
}
