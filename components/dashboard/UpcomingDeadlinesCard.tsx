"use client";

import React from "react";
import { UpcomingDeadlineItem } from "@/lib/services/dashboardService";

interface UpcomingDeadlinesCardProps {
  items?: UpcomingDeadlineItem[];
}

export const UpcomingDeadlinesCard: React.FC<UpcomingDeadlinesCardProps> = ({
  items = [
    { id: "dl-1", title: "Board Deck Finalization", time: "Today, 2:00 PM" },
    { id: "dl-2", title: "Weekly Sync", time: "Tomorrow, 10:00 AM" },
  ],
}) => {
  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg shadow-xs overflow-hidden flex flex-col text-left">
      <div className="px-4 py-2.5 border-b border-[#e0e3e5] bg-white">
        <h3 className="text-xs uppercase font-bold text-[#191c1e] tracking-wider">
          Upcoming Deadlines
        </h3>
      </div>

      <div className="p-4 flex flex-col gap-4 relative">
        {/* Vertical Timeline line */}
        <div className="absolute left-[22px] top-[24px] bottom-[24px] w-px bg-[#e0e3e5]" />

        {items.map((item, idx) => (
          <div key={item.id || idx} className="flex items-start gap-3 relative z-10">
            <div
              className={`w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-[0_0_0_4px_white] ${
                idx === 0
                  ? "bg-primary"
                  : "border-2 border-[#e0e3e5] bg-white"
              }`}
            />
            <div>
              <p className="text-xs font-medium text-[#191c1e]">{item.title}</p>
              <p className="font-mono text-[10px] text-[#565e74]">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

