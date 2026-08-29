"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Radar,
  LayoutDashboard,
  CalendarClock,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-[18px] h-[18px]" />,
      active: pathname === "/dashboard" || pathname === "/",
    },
    {
      name: "Follow-up Center",
      href: "/dashboard#followup",
      icon: <CalendarClock className="w-[18px] h-[18px]" />,
      active: false,
    },
    {
      name: "AI Search",
      href: "/dashboard#search",
      icon: <Search className="w-[18px] h-[18px]" />,
      active: false,
    },
  ];

  return (
    <nav className="flex flex-col h-full w-[240px] fixed left-0 py-4 gap-2 bg-[#f2f4f6] border-r border-[#c3c6d7] z-50 select-none">
      {/* Brand Header */}
      <div className="px-6 pb-4 mb-4 border-b border-[#e0e3e5] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
          <Radar className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-base text-[#191c1e] leading-tight flex items-center gap-1">
            <span>WorkRadar</span>
            <span className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded font-mono font-bold">AI</span>
          </h1>
          <p className="text-[10px] uppercase font-bold text-[#565e74] tracking-wider mt-0.5">
            Intelligence Platform
          </p>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex flex-col gap-1 pl-2 pr-4 flex-1">
        {navItems.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold tracking-wide rounded-r-full transition-all duration-200 ${
                item.active
                  ? "bg-[#dae2fd] text-[#00174b] border-l-2 border-primary scale-[0.98] font-bold shadow-2xs"
                  : "text-[#565e74] hover:bg-[#e6e8ea] hover:text-[#191c1e] pl-4 border-l-2 border-transparent"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Upgrade Callout Card */}
        <div className="mt-auto mb-4 mx-2 p-3 rounded-xl bg-surface-container-lowest border border-[#c3c6d7]/70 shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>14-Day Pro Trial</span>
          </div>
          <p className="text-[11px] text-secondary leading-snug">
            All AI Chief of Staff capabilities unlocked.
          </p>
        </div>

        {/* Settings at bottom */}
        <Link
          href="/dashboard#settings"
          className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-[#565e74] hover:bg-[#e6e8ea] hover:text-[#191c1e] rounded-r-full transition-all duration-200 pl-4 border-l-2 border-transparent"
        >
          <Settings className="w-[18px] h-[18px]" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
};

