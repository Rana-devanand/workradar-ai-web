"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pills" | "underline" | "cards";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "pills",
  className,
}) => {
  if (variant === "pills") {
    return (
      <div
        className={cn(
          "inline-flex p-1.5 bg-surface-container-high rounded-xl border border-outline-variant/60 gap-1 shadow-xs max-w-full overflow-x-auto",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "bg-white text-primary shadow-xs"
                  : "text-secondary hover:text-on-surface hover:bg-white/40"
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded",
                    isActive ? "bg-primary/10 text-primary" : "bg-surface-variant text-secondary"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div
        className={cn(
          "flex border-b border-outline-variant/60 gap-6 max-w-full overflow-x-auto",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 py-3 px-1 border-b-2 font-semibold text-sm transition-colors whitespace-nowrap focus:outline-none",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return null;
};

