"use client";

import React from "react";
import { History, Mail, Calendar, Database, FileText } from "lucide-react";
import { ActivityLogItem } from "@/lib/services/dashboardService";

interface AIActivityLogCardProps {
  logs?: ActivityLogItem[];
}

export const AIActivityLogCard: React.FC<AIActivityLogCardProps> = ({
  logs = [
    {
      id: "log-1",
      text: "Analyzed 42 incoming emails and flagged 3 as critical.",
      timestamp: "2 mins ago",
      icon: "mail",
    },
    {
      id: "log-2",
      text: "Automatically rescheduled Design Sync to avoid conflict.",
      timestamp: "15 mins ago",
      icon: "calendar",
    },
    {
      id: "log-3",
      text: "Synced latest CRM data and updated Revenue Radar.",
      timestamp: "1 hour ago",
      icon: "database",
    },
    {
      id: "log-4",
      text: "Generated Daily Briefing based on overnight activity.",
      timestamp: "3 hours ago",
      icon: "file-text",
    },
  ],
}) => {
  const getIcon = (iconName: string, idx: number) => {
    switch (iconName) {
      case "mail":
        return <Mail className="w-3 h-3 text-primary" />;
      case "calendar":
        return <Calendar className="w-3 h-3 text-[#565e74]" />;
      case "database":
        return <Database className="w-3 h-3 text-[#565e74]" />;
      case "file-text":
      default:
        return <FileText className="w-3 h-3 text-[#565e74]" />;
    }
  };

  return (
    <div className="bg-white border border-[#e0e3e5] rounded-lg p-4 shadow-xs h-full flex flex-col text-left">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-semibold text-[#191c1e]">AI Activity Log</h3>
        <History className="text-[#565e74] w-4.5 h-4.5" />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="relative flex flex-col gap-6">
          {/* Vertical Connecting Line */}
          <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-[#e6e8ea] -z-0" />

          {logs.map((log, idx) => (
            <div key={log.id || idx} className="flex gap-4 relative z-10">
              <div
                className={`w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border-2 ${
                  idx === 0 ? "border-primary" : "border-[#e0e3e5]"
                }`}
              >
                {getIcon(log.icon, idx)}
              </div>
              <div className="flex flex-col mt-0.5">
                <p className="text-xs text-[#191c1e] leading-tight font-normal">
                  {log.text}
                </p>
                <p className="font-mono text-[10px] text-[#565e74] mt-1">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

