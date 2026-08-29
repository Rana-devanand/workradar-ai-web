"use client";

import React from "react";
import { Lightbulb, FileEdit, Clock } from "lucide-react";
import { SuggestedActionItem } from "@/lib/services/dashboardService";

interface SuggestedActionsCardProps {
  items?: SuggestedActionItem[];
}

export const SuggestedActionsCard: React.FC<SuggestedActionsCardProps> = ({
  items = [
    {
      id: "act-1",
      title: "Draft response to TechCorp RFP",
      estimatedTime: "Takes ~15 mins",
      category: "response",
    },
    {
      id: "act-2",
      title: "Reschedule 1:1 with Design Team",
      estimatedTime: "Conflict detected",
      category: "calendar",
    },
  ],
}) => {
  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg p-6 shadow-xs flex flex-col text-left">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[#191c1e]">Suggested Actions</h3>
        <Lightbulb className="text-[#565e74] w-4.5 h-4.5" />
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              {item.category === "calendar" ? (
                <Clock className="w-3.5 h-3.5 text-primary" />
              ) : (
                <FileEdit className="w-3.5 h-3.5 text-primary" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-[#191c1e] group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <p className="font-mono text-[10px] text-[#565e74]">{item.estimatedTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

