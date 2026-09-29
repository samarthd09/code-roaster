import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export function IssueCard({ index, issue }: IssueCardProps) {
  const getSeverityBadge = () => {
    switch (issue.severity) {
      case "FATAL BUG":
        return "bg-[#FDE8E8] text-gRed border-gRed/40";
      case "CODE SMELL":
        return "bg-[#FEF3D6] text-[#B45309] border-[#B45309]/40";
      case "OPTIMIZATION":
      default:
        return "bg-[#E6F4EA] text-gGreen border-gGreen/40";
    }
  };

  return (
    <div className="bg-white brutal-border brutal-shadow-md rounded-[14px] p-4 relative transition-transform hover:-translate-y-0.5">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black bg-dark text-white px-2 py-0.5 rounded">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs font-bold text-dark/70 tracking-wide uppercase">
            LINE {issue.line}
          </span>
          <span
            className={`border px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black tracking-wider uppercase ${getSeverityBadge()}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-sans font-bold text-xs text-dark/85 break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Box */}
      {issue.codeSnippet && (
        <div className="bg-[#1A1A1A] text-editorInk font-mono text-xs p-2.5 rounded-lg border-l-4 border-l-mustard mb-3 overflow-x-auto whitespace-pre">
          <code>{issue.codeSnippet}</code>
        </div>
      )}

      {/* Diagnosis with Roast */}
      <div className="font-ui text-xs sm:text-sm text-dark font-medium mb-2.5 leading-relaxed">
        <span className="font-bold text-gRed mr-1.5">✕ Diagnosis:</span>
        <span>{issue.diagnosis}</span>
      </div>

      {/* Expected Fix */}
      <div className="bg-[#F8F9FA] border border-dark/15 rounded-lg p-2.5 text-xs font-mono flex items-start gap-2">
        <span className="text-gGreen font-bold flex-shrink-0">✓ Expected:</span>
        <span className="text-dark font-medium leading-relaxed">{issue.expected}</span>
      </div>
    </div>
  );
}
