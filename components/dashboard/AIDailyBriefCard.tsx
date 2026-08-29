"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { DailyBriefData } from "@/lib/services/dashboardService";

interface AIDailyBriefCardProps {
  data?: DailyBriefData;
}

export const AIDailyBriefCard: React.FC<AIDailyBriefCardProps> = ({
  data = {
    summary:
      "You have 3 urgent emails requiring attention before noon. The Q3 strategy meeting prep is mostly complete, but you're missing the latest revenue figures from Sarah.",
    urgentCount: 3,
    suggestedActionsCount: 2,
  },
}) => {
  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg p-6 shadow-xs flex flex-col relative overflow-hidden text-left">
      {/* Background ambient radial flare */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 pointer-events-none" />

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-primary w-5 h-5" />
        <h3 className="text-base font-semibold text-[#191c1e]">AI Daily Brief</h3>
      </div>

      <p className="text-xs text-[#565e74] leading-relaxed mb-4">
        You have <strong className="text-[#191c1e] font-medium">{data.urgentCount} urgent emails</strong> requiring attention before noon. The Q3 strategy meeting prep is mostly complete, but you're missing the latest revenue figures from Sarah.
      </p>

      <div className="mt-auto">
        <button
          type="button"
          className="text-primary text-xs uppercase font-bold tracking-wider flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span>View Full Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

