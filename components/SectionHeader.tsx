import React from "react";

interface SectionHeaderProps {
  number?: number | string;
  title: string;
  meta?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, meta, children }: SectionHeaderProps) {
  const formattedNumber =
    typeof number === "number"
      ? String(number).padStart(2, "0")
      : number;

  return (
    <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-dark/15">
      <div className="flex items-center gap-2">
        {formattedNumber && (
          <span className="font-mono text-[11px] font-bold bg-dark text-white px-2 py-0.5 rounded">
            {formattedNumber} //
          </span>
        )}
        <h3 className="font-display font-bold text-xs sm:text-sm tracking-tight text-dark uppercase">
          {title}
        </h3>
        {meta && (
          <span className="font-mono text-[11px] text-gray-500 font-semibold hidden sm:inline">
            · {meta}
          </span>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
