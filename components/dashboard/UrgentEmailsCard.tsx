"use client";

import React from "react";
import { UrgentEmailItem } from "@/lib/services/dashboardService";

interface UrgentEmailsCardProps {
  items?: UrgentEmailItem[];
}

export const UrgentEmailsCard: React.FC<UrgentEmailsCardProps> = ({
  items = [
    {
      id: "urg-1",
      sender: "Michael Chang",
      subject: "Critical block on deployment pipeline...",
      urgencyScore: 99,
    },
    {
      id: "urg-2",
      sender: "Elena Rostova",
      subject: "Contract revision required before EoD.",
      urgencyScore: 95,
    },
  ],
}) => {
  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg shadow-xs overflow-hidden flex flex-col text-left">
      <div className="px-4 py-2.5 border-b border-[#e0e3e5] bg-white flex justify-between items-center">
        <h3 className="text-xs uppercase font-bold text-[#191c1e] tracking-wider">Urgent Emails</h3>
        <span className="bg-[#ffdad6] text-[#93000a] text-[10px] px-2 py-0.5 rounded-full font-bold">
          3 New
        </span>
      </div>

      <div className="flex flex-col divide-y divide-[#e0e3e5]">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 hover:bg-[#f7f9fb] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-1">
              <p className="text-xs font-medium text-[#191c1e]">{item.sender}</p>
              <span className="font-mono text-[10px] text-[#ba1a1a] font-medium">
                {item.urgencyScore}% Urgent
              </span>
            </div>
            <p className="text-xs text-[#565e74] truncate">{item.subject}</p>
          </div>
        ))}
      </div>

      <div className="p-2 mt-auto border-t border-[#e0e3e5] text-center bg-white">
        <button
          type="button"
          className="text-[11px] uppercase font-bold text-[#565e74] hover:text-primary transition-colors cursor-pointer"
        >
          View All Inbox
        </button>
      </div>
    </div>
  );
};

