"use client";

import React from "react";
import { TrendingUp, Building2, Landmark } from "lucide-react";
import { RevenueRadarItem } from "@/lib/services/dashboardService";

interface RevenueRadarCardProps {
  items?: RevenueRadarItem[];
}

export const RevenueRadarCard: React.FC<RevenueRadarCardProps> = ({
  items = [
    {
      id: "rev-1",
      name: "Acme Corp Upsell",
      status: "High Intent detected",
      value: "+$45k",
    },
    {
      id: "rev-2",
      name: "Nexus Renewal",
      status: "At risk - Action needed",
      value: "$12k",
    },
  ],
}) => {
  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg shadow-xs overflow-hidden flex flex-col text-left">
      <div className="px-4 py-2.5 border-b border-[#e0e3e5] bg-white flex justify-between items-center">
        <h3 className="text-xs uppercase font-bold text-[#191c1e] tracking-wider">Revenue Radar</h3>
        <TrendingUp className="text-primary w-4 h-4" />
      </div>

      <div className="p-4 flex flex-col gap-3">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center border border-[#e0e3e5]">
                {idx === 0 ? (
                  <Building2 className="w-4 h-4 text-[#191c1e]" />
                ) : (
                  <Landmark className="w-4 h-4 text-[#191c1e]" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-[#191c1e]">{item.name}</p>
                <p className="font-mono text-[10px] text-[#565e74]">{item.status}</p>
              </div>
            </div>
            <span
              className={`font-mono text-xs font-semibold ${
                item.value.startsWith("+") ? "text-primary font-bold" : "text-[#191c1e]"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

