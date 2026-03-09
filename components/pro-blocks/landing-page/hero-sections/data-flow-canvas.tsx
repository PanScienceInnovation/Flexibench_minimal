"use client";

import { useEffect, useState } from "react";

interface AnnotationRow {
  id: string;
  type: string;
  status: "LABELED" | "REVIEW" | "AI ASSIST" | "PENDING";
  confidence: number;
}

const initialRows: AnnotationRow[] = [
  { id: "#A001", type: "TEXT", status: "LABELED", confidence: 98.2 },
  { id: "#A002", type: "IMAGE", status: "REVIEW", confidence: 91.5 },
  { id: "#A003", type: "AUDIO", status: "LABELED", confidence: 96.8 },
  { id: "#A004", type: "VIDEO", status: "AI ASSIST", confidence: 84.1 },
  { id: "#A005", type: "TEXT", status: "LABELED", confidence: 99.1 },
  { id: "#A006", type: "IMAGE", status: "LABELED", confidence: 97.3 },
  { id: "#A007", type: "AUDIO", status: "PENDING", confidence: 62.4 },
  { id: "#A008", type: "VIDEO", status: "LABELED", confidence: 95.7 },
];

const statusConfig = {
  LABELED: { bg: "bg-[#0A0A0A]", text: "text-white", border: "" },
  REVIEW: { bg: "bg-[#F7F6F3]", text: "text-[#0A0A0A]", border: "border border-[#E3E3E0]" },
  "AI ASSIST": { bg: "bg-[#1A1AFF]", text: "text-white", border: "" },
  PENDING: { bg: "bg-[#F7F6F3]", text: "text-[#A3A3A3]", border: "border border-[#E3E3E0]" },
};

export function DataFlowCanvas() {
  const [rows, setRows] = useState<AnnotationRow[]>(initialRows);
  const [processingIndex, setProcessingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) => {
        // Remove bottom row, add new row at top
        const newRow: AnnotationRow = {
          id: `#A${String(Math.floor(Math.random() * 9000) + 1000)}`,
          type: ["TEXT", "IMAGE", "AUDIO", "VIDEO"][Math.floor(Math.random() * 4)],
          status: ["LABELED", "REVIEW", "AI ASSIST", "PENDING"][Math.floor(Math.random() * 4)] as AnnotationRow["status"],
          confidence: Math.floor(Math.random() * 40) + 60,
        };
        return [newRow, ...prev.slice(0, 7)];
      });
      
      // Cycle processing indicator
      setProcessingIndex((prev) => (prev + 1) % 8);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[#E3E3E0] bg-white rounded-[4px] max-w-[480px] w-full flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#F7F6F3] border-b border-[#E3E3E0] px-3 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E3E3E0]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E3E3E0]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E3E3E0]" />
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] tracking-widest">
          LIVE ANNOTATION FEED
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[15%_25%_35%_25%] border-b border-[#E3E3E0] px-3 sm:px-4 py-2 bg-white">
        <div className="font-mono text-[8px] sm:text-[9px] text-[#A3A3A3] uppercase tracking-wider">ID</div>
        <div className="font-mono text-[8px] sm:text-[9px] text-[#A3A3A3] uppercase tracking-wider">TYPE</div>
        <div className="font-mono text-[8px] sm:text-[9px] text-[#A3A3A3] uppercase tracking-wider">STATUS</div>
        <div className="font-mono text-[8px] sm:text-[9px] text-[#A3A3A3] uppercase tracking-wider">CONFIDENCE</div>
      </div>

      {/* Animated Rows */}
      <div className="flex-1 overflow-hidden">
        {rows.map((row, index) => {
          const config = statusConfig[row.status];
          const isProcessing = index === processingIndex;
          
          return (
            <div
              key={`${row.id}-${index}`}
              className={`grid grid-cols-[15%_25%_35%_25%] border-b border-[#F0EFE9] px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[10px] sm:text-[11px] text-[#0A0A0A] ${
                index % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"
              } ${isProcessing ? "border-l-2 border-l-[#1A1AFF]" : ""} animate-row-in`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div>{row.id}</div>
              <div>{row.type}</div>
              <div>
                <span className={`inline-block rounded-[2px] px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wide ${config.bg} ${config.text} ${config.border}`}>
                  {row.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-[50px] sm:w-[60px] h-1 sm:h-1.5 bg-[#E3E3E0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A0A0A] opacity-20"
                    style={{ width: `${row.confidence}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px]">{row.confidence.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#F7F6F3] border-t border-[#E3E3E0] px-3 sm:px-4 py-2 font-mono text-[8px] sm:text-[9px] text-[#A3A3A3]">
        2,400,000+ annotations processed · avg quality 4.9/5
      </div>

      <style jsx>{`
        @keyframes row-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-row-in {
          animation: row-in 300ms ease forwards;
        }
      `}</style>
    </div>
  );
}
