"use client";

import React from "react";
import { PriorityScoreData } from "@/lib/services/dashboardService";

interface PriorityScoreCardProps {
  data?: PriorityScoreData;
}

export const PriorityScoreCard: React.FC<PriorityScoreCardProps> = ({
  data = { score: 85, maxScore: 100, status: "High efficiency today" },
}) => {
  return (
    <div className="flex items-center gap-4 bg-white border border-[#e0e3e5] rounded-lg p-2 pr-6 shadow-xs">
      {/* Circular Progress Gauge */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-[#e0e3e5]"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="text-primary"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray={`${data.score}, 100`}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-mono text-[11px] font-bold text-[#191c1e]">
          {data.score}
        </span>
      </div>

      <div>
        <p className="text-xs uppercase font-bold text-[#191c1e] tracking-wider">Priority Score</p>
        <p className="text-[11px] text-[#565e74] mt-0.5">{data.status}</p>
      </div>
    </div>
  );
};

