"use client";

import React, { useState } from "react";
import {
  Radar,
  LayoutDashboard,
  Repeat,
  Search,
  Settings,
  Bell,
  Sparkles,
  Lightbulb,
  FileEdit,
  Clock,
  TrendingUp,
  Building2,
  Calendar,
  Database,
  FileText,
  Mail,
  ArrowRight,
} from "lucide-react";
import { FollowUpCenterPreview } from "./FollowUpCenterPreview";
import { AISearchPreview } from "./AISearchPreview";

export const DashboardPreview: React.FC = () => {
  const [activeNav, setActiveNav] = useState<"dashboard" | "followup" | "search" | "settings">("dashboard");
  const [checkedFollowups, setCheckedFollowups] = useState<Record<string, boolean>>({
    "task-1": false,
    "task-2": false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCheck = (id: string) => {
    setCheckedFollowups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-outline-variant/80 bg-white shadow-2xl transition-all text-on-surface">
      {/* Window Title Bar */}
      <div className="h-10 bg-surface-container-low border-b border-outline-variant/60 flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs font-mono text-secondary hidden sm:inline">
            WorkRadar AI Chief of Staff — Live Engine
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync Active
          </span>
        </div>
      </div>

      {/* Main App Window Layout */}
      <div className="flex flex-col lg:flex-row min-h-[640px] bg-background overflow-hidden relative">
        {/* Left Side Navigation */}
        <aside className="w-full lg:w-60 bg-surface-container-low border-r border-outline-variant/60 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            {/* Logo in SideNav */}
            <div className="pb-3 border-b border-surface-variant flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-xs">
                <Radar className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface leading-none">WorkRadar AI</h3>
                <p className="text-[10px] text-secondary mt-0.5">Intelligence Platform</p>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              <button
                type="button"
                onClick={() => setActiveNav("dashboard")}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg lg:rounded-l-none lg:rounded-r-full transition-all text-left ${
                  activeNav === "dashboard"
                    ? "bg-secondary-container text-on-secondary-container border-l-2 border-primary shadow-xs font-bold"
                    : "text-secondary hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-primary shrink-0" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("followup")}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg lg:rounded-l-none lg:rounded-r-full transition-all text-left ${
                  activeNav === "followup"
                    ? "bg-secondary-container text-on-secondary-container border-l-2 border-primary shadow-xs font-bold"
                    : "text-secondary hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <Repeat className="w-4 h-4 shrink-0" />
                <span>Follow-up Center</span>
                <span className="ml-auto bg-error text-white rounded-full px-1.5 py-0.2 text-[9px] font-bold">
                  4
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("search")}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg lg:rounded-l-none lg:rounded-r-full transition-all text-left ${
                  activeNav === "search"
                    ? "bg-secondary-container text-on-secondary-container border-l-2 border-primary shadow-xs font-bold"
                    : "text-secondary hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <Search className="w-4 h-4 shrink-0" />
                <span>AI Search</span>
                <span className="ml-auto text-[9px] font-mono text-secondary bg-surface-container-high px-1 rounded">
                  ⌘K
                </span>
              </button>
            </nav>
          </div>

          <div className="pt-3 border-t border-outline-variant/40 hidden lg:block">
            <button
              type="button"
              onClick={() => setActiveNav("settings")}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-r-full transition-all w-full text-left ${
                activeNav === "settings"
                  ? "bg-secondary-container text-on-secondary-container border-l-2 border-primary"
                  : "text-secondary hover:bg-surface-container-high"
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </button>
          </div>
        </aside>

        {/* Center/Right Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top App Bar Header */}
          <header className="h-14 bg-white/90 backdrop-blur-md border-b border-outline-variant/60 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
            {/* Search Input Bar - Clicking triggers AI Search */}
            <div className="flex-1 max-w-md">
              <div
                onClick={() => setActiveNav("search")}
                className="relative flex items-center cursor-pointer group"
              >
                <Search className="w-4 h-4 absolute left-3 text-secondary group-hover:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Ask AI to find anything (e.g. Stripe pricing, Acme NDA)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeNav !== "search") setActiveNav("search");
                  }}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-md pl-9 pr-12 py-1.5 text-xs text-on-surface placeholder:text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
                />
                <kbd className="hidden md:inline-block absolute right-2.5 text-[10px] font-mono font-bold text-secondary bg-surface-container-high border border-outline-variant/60 rounded px-1.5 py-0.5">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Trailing Icons (Notification & Profile) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveNav("followup")}
                className="relative p-2 rounded-full text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/40">
                <div className="h-7 w-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  A
                </div>
                <span className="text-xs font-semibold text-on-surface hidden sm:inline">
                  Alex Morgan
                </span>
              </div>
            </div>
          </header>

          {/* Conditional View: Dashboard vs Follow-up Center vs AI Search */}
          {activeNav === "search" ? (
            <AISearchPreview />
          ) : activeNav === "followup" ? (
            <FollowUpCenterPreview />
          ) : (
            /* Scrollable Main Dashboard View */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Dashboard Header Bar & Priority Score */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-secondary mb-0.5">Tuesday, October 24</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                    Good Morning, Alex
                  </h2>
                </div>

                {/* Priority Score Gauge Widget */}
                <div className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/60 rounded-lg p-2.5 pr-5 shadow-xs shrink-0 self-start sm:self-auto">
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container-highest"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                      />
                      <path
                        className="text-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="85, 100"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute font-mono text-xs font-bold text-on-surface">
                      85
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                      Priority Score
                    </p>
                    <p className="text-[11px] text-secondary">High efficiency today</p>
                  </div>
                </div>
              </div>

              {/* Main 12-Column Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left 8 Columns */}
                <div className="lg:col-span-8 space-y-5">
                  {/* Top Row: AI Daily Brief & Suggested Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* AI Daily Brief Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4.5 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-bl-full pointer-events-none" />
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <h3 className="text-sm font-bold text-on-surface">AI Daily Brief</h3>
                        </div>
                        <p className="text-xs text-secondary leading-relaxed mb-3">
                          You have <strong className="text-on-surface font-semibold">3 urgent emails</strong> requiring attention before noon. The Q3 strategy meeting prep is mostly complete, but you're missing the latest revenue figures from Sarah.
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => setActiveNav("followup")}
                          className="text-primary font-bold text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
                        >
                          <span>View Full Summary & Follow-ups</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Suggested Actions Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <h3 className="text-sm font-bold text-on-surface">Suggested Actions</h3>
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="space-y-2">
                          <div
                            onClick={() => setActiveNav("followup")}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group"
                          >
                            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <FileEdit className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                                Draft response to TechCorp RFP
                              </p>
                              <p className="text-[10px] text-secondary font-mono">Takes ~15 mins</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                            <div className="w-6 h-6 rounded bg-tertiary-container/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Clock className="w-3.5 h-3.5 text-tertiary" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                                Reschedule 1:1 with Design Team
                              </p>
                              <p className="text-[10px] text-secondary font-mono">Conflict detected</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2x2 Data Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Urgent Emails Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="px-4 py-2.5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-low/40">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                            Urgent Emails
                          </h3>
                          <span className="bg-error-container text-on-error-container text-[10px] px-2 py-0.5 rounded-full font-bold">
                            3 New
                          </span>
                        </div>
                        <div className="divide-y divide-outline-variant/40">
                          <div
                            onClick={() => setActiveNav("followup")}
                            className="p-3 hover:bg-surface-container-low/40 transition-colors cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-0.5">
                              <p className="text-xs font-bold text-on-surface">Michael Chang</p>
                              <span className="text-[10px] text-error font-mono font-bold">
                                99% Urgent
                              </span>
                            </div>
                            <p className="text-xs text-secondary truncate">
                              Critical block on deployment pipeline...
                            </p>
                          </div>

                          <div
                            onClick={() => setActiveNav("followup")}
                            className="p-3 hover:bg-surface-container-low/40 transition-colors cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-0.5">
                              <p className="text-xs font-bold text-on-surface">Elena Rostova</p>
                              <span className="text-[10px] text-error font-mono font-bold">
                                95% Urgent
                              </span>
                            </div>
                            <p className="text-xs text-secondary truncate">
                              Contract revision required before EoD.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 border-t border-outline-variant/40 text-center bg-surface-container-low/20">
                        <button
                          type="button"
                          onClick={() => setActiveNav("followup")}
                          className="text-[11px] font-bold text-secondary hover:text-primary transition-colors"
                        >
                          View All Follow-ups &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Revenue Radar Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="px-4 py-2.5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-low/40">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                            Revenue Radar
                          </h3>
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="p-3.5 space-y-3">
                          <div
                            onClick={() => setActiveNav("followup")}
                            className="flex justify-between items-center group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center border border-outline-variant/60 text-secondary">
                                <Building2 className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                  Acme Corp Upsell
                                </p>
                                <p className="text-[10px] text-secondary font-mono">
                                  High Intent detected
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-600">
                              +$45k
                            </span>
                          </div>

                          <div
                            onClick={() => setActiveNav("followup")}
                            className="flex justify-between items-center group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center border border-outline-variant/60 text-secondary">
                                <Building2 className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                  Nexus Renewal
                                </p>
                                <p className="text-[10px] text-secondary font-mono">
                                  At risk - Action needed
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-on-surface">
                              $12k
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Missed Follow-ups Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xs overflow-hidden flex flex-col">
                      <div className="px-4 py-2.5 border-b border-outline-variant/50 bg-surface-container-low/40">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                          Missed Follow-ups
                        </h3>
                      </div>
                      <div className="p-3.5 space-y-2.5">
                        <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                          <input
                            type="checkbox"
                            checked={checkedFollowups["task-1"]}
                            onChange={() => toggleCheck("task-1")}
                            className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary/20"
                          />
                          <div>
                            <p
                              className={`text-xs font-semibold transition-colors ${
                                checkedFollowups["task-1"]
                                  ? "line-through text-secondary/60"
                                  : "text-on-surface group-hover:text-primary"
                              }`}
                            >
                              Send API docs to DevTeam
                            </p>
                            <p className="text-[10px] text-amber-600 font-mono">Due yesterday</p>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                          <input
                            type="checkbox"
                            checked={checkedFollowups["task-2"]}
                            onChange={() => toggleCheck("task-2")}
                            className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary/20"
                          />
                          <div>
                            <p
                              className={`text-xs font-semibold transition-colors ${
                                checkedFollowups["task-2"]
                                  ? "line-through text-secondary/60"
                                  : "text-on-surface group-hover:text-primary"
                              }`}
                            >
                              Review Q3 Marketing Spend
                            </p>
                            <p className="text-[10px] text-amber-600 font-mono">Due 2 days ago</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Upcoming Deadlines Card */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xs overflow-hidden flex flex-col">
                      <div className="px-4 py-2.5 border-b border-outline-variant/50 bg-surface-container-low/40">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                          Upcoming Deadlines
                        </h3>
                      </div>
                      <div className="p-3.5 space-y-3.5 relative">
                        {/* Vertical line connecting events */}
                        <div className="absolute left-[20px] top-[22px] bottom-[22px] w-px bg-outline-variant/60" />

                        <div className="flex items-start gap-3 relative z-10">
                          <div className="w-3 h-3 rounded-full bg-primary mt-1 shrink-0 ring-4 ring-white shadow-xs" />
                          <div>
                            <p className="text-xs font-bold text-on-surface">
                              Board Deck Finalization
                            </p>
                            <p className="text-[10px] text-secondary font-mono">Today, 2:00 PM</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 relative z-10">
                          <div className="w-3 h-3 rounded-full border-2 border-outline-variant bg-white mt-1 shrink-0 ring-4 ring-white shadow-xs" />
                          <div>
                            <p className="text-xs font-bold text-on-surface">Weekly Sync</p>
                            <p className="text-[10px] text-secondary font-mono">
                              Tomorrow, 10:00 AM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 4 Columns: AI Activity Log */}
                <div className="lg:col-span-4 flex flex-col">
                  <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4.5 shadow-xs flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-outline-variant/40">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                        AI Activity Log
                      </h3>
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                    </div>

                    <div className="flex-1 relative space-y-4">
                      {/* Continuous vertical timeline line */}
                      <div className="absolute left-[13px] top-[8px] bottom-[8px] w-[2px] bg-surface-container-high -z-0" />

                      {/* Log Item 1 */}
                      <div className="flex gap-3 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center shrink-0 shadow-xs">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="text-xs">
                          <p className="text-on-surface leading-snug">
                            Analyzed <span className="font-semibold text-primary">42 incoming emails</span> and flagged 3 as critical.
                          </p>
                          <p className="text-[10px] text-secondary font-mono mt-0.5">2 mins ago</p>
                        </div>
                      </div>

                      {/* Log Item 2 */}
                      <div className="flex gap-3 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-white border-2 border-outline-variant flex items-center justify-center shrink-0 shadow-xs">
                          <Calendar className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        <div className="text-xs">
                          <p className="text-on-surface leading-snug">
                            Automatically rescheduled <span className="font-semibold">Design Sync</span> to avoid conflict.
                          </p>
                          <p className="text-[10px] text-secondary font-mono mt-0.5">15 mins ago</p>
                        </div>
                      </div>

                      {/* Log Item 3 */}
                      <div className="flex gap-3 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-white border-2 border-outline-variant flex items-center justify-center shrink-0 shadow-xs">
                          <Database className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        <div className="text-xs">
                          <p className="text-on-surface leading-snug">
                            Synced latest CRM data and updated <span className="font-semibold text-emerald-700">Revenue Radar</span>.
                          </p>
                          <p className="text-[10px] text-secondary font-mono mt-0.5">1 hour ago</p>
                        </div>
                      </div>

                      {/* Log Item 4 */}
                      <div className="flex gap-3 relative z-10">
                        <div className="w-7 h-7 rounded-full bg-white border-2 border-outline-variant flex items-center justify-center shrink-0 shadow-xs">
                          <FileText className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        <div className="text-xs">
                          <p className="text-on-surface leading-snug">
                            Generated <span className="font-semibold">Daily Briefing</span> based on overnight activity.
                          </p>
                          <p className="text-[10px] text-secondary font-mono mt-0.5">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
