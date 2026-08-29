"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  Command,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";

interface SearchResult {
  id: string;
  source: "gmail" | "slack" | "drive" | "notion" | "zoom";
  sourceName: string;
  sourceIconColor: string;
  title: string;
  snippet: string;
  timestamp: string;
  relevance: number;
  author: string;
}

const SAMPLE_QUERIES = [
  "What did Stripe decide on pricing for the Enterprise add-on?",
  "Find the latest NDA and contract draft for Acme Corp",
  "What action items were assigned to me in yesterday's Sprint Planning?",
  "Who promised to send the revised Figma tokens before Friday?",
];

const PRESET_RESULTS: Record<
  string,
  {
    aiAnswer: string;
    sources: { name: string; type: string; link: string }[];
    results: SearchResult[];
  }
> = {
  default: {
    aiAnswer:
      "Stripe approved the $12/user tier on Slack #partnerships on May 14th. Legal confirmed the addendum in Drive, and Alex sent the signed amendment via Gmail on May 18th.",
    sources: [
      { name: "Slack #partnerships", type: "slack", link: "slack://channel/partnerships" },
      { name: "Drive /Contracts/Stripe_2026.pdf", type: "drive", link: "https://drive.google.com" },
      { name: "Gmail thread 'Re: Stripe Q3 Addendum'", type: "gmail", link: "https://mail.google.com" },
    ],
    results: [
      {
        id: "res-1",
        source: "slack",
        sourceName: "Slack #partnerships",
        sourceIconColor: "bg-[#4A154B] text-white",
        title: "Patrick Collison: 'Pricing tier approved at $12/seat for annual commit.'",
        snippet:
          "Confirmed with finance team. We can proceed with the $12/seat tier for the European rollout with 50+ seats minimum.",
        timestamp: "May 14, 3:42 PM",
        relevance: 99,
        author: "Patrick C.",
      },
      {
        id: "res-2",
        source: "drive",
        sourceName: "Google Drive /Legal",
        sourceIconColor: "bg-[#0F9D58] text-white",
        title: "Stripe_Enterprise_Addendum_v2_Signed.pdf",
        snippet:
          "Section 4.1 Pricing Schedule: Base fee $12/seat/month billed annually. Effective commencement date October 1st.",
        timestamp: "May 16, 11:20 AM",
        relevance: 96,
        author: "Legal Dept",
      },
      {
        id: "res-3",
        source: "gmail",
        sourceName: "Gmail Inbox",
        sourceIconColor: "bg-[#EA4335] text-white",
        title: "Fwd: Executed Stripe Partnership Amendment",
        snippet:
          "Attached is the countersigned agreement from Stripe VP Partnerships. Onboarding sync scheduled for next week.",
        timestamp: "May 18, 9:15 AM",
        relevance: 92,
        author: "Sarah Jenkins",
      },
      {
        id: "res-4",
        source: "notion",
        sourceName: "Notion /Partnership Hub",
        sourceIconColor: "bg-slate-900 text-white",
        title: "Stripe Account Plan & Integration Milestones",
        snippet:
          "Key Decisions: Agreed to 12-month pilot on custom API endpoints. SLA guaranteed at 99.95% uptime.",
        timestamp: "May 19, 2:30 PM",
        relevance: 88,
        author: "Alex Morgan",
      },
    ],
  },
};

export const AISearchPreview: React.FC = () => {
  const [query, setQuery] = useState("What did Stripe decide on pricing for the Enterprise add-on?");
  const [activeFilter, setActiveFilter] = useState<"all" | "gmail" | "slack" | "drive" | "notion">("all");
  const [isCopied, setIsCopied] = useState(false);

  const currentData = PRESET_RESULTS.default;

  const filteredResults =
    activeFilter === "all"
      ? currentData.results
      : currentData.results.filter((r) => r.source === activeFilter);

  const handleCopyAnswer = () => {
    navigator.clipboard?.writeText(currentData.aiAnswer);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "gmail":
        return <Mail className="w-3.5 h-3.5" />;
      case "slack":
        return <MessageSquare className="w-3.5 h-3.5" />;
      case "drive":
        return <FileText className="w-3.5 h-3.5" />;
      case "notion":
        return <Layers className="w-3.5 h-3.5" />;
      case "zoom":
        return <Video className="w-3.5 h-3.5" />;
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 max-w-container-max mx-auto w-full flex flex-col gap-6 overflow-y-auto bg-background text-on-surface">
      {/* Header & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-outline-variant/60 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight flex items-center gap-2">
            <Command className="w-5 h-5 text-primary" />
            AI Unified Work Search
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Query across <span className="font-semibold text-primary">Gmail, Slack, Drive, Notion, & Zoom</span> with synthesized contextual answers.
          </p>
        </div>
        <Badge variant="primary" size="sm" dot pulse>
          Semantic Vector Engine Active
        </Badge>
      </div>

      {/* Interactive Raycast-Style Command Search Bar */}
      <div className="space-y-3">
        <div className="relative flex items-center bg-surface-container-lowest border-2 border-primary/40 rounded-xl shadow-md focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <Search className="w-5 h-5 absolute left-4 text-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question across all connected work apps..."
            className="w-full bg-transparent pl-12 pr-28 py-3.5 text-sm sm:text-base font-medium text-on-surface placeholder:text-secondary/70 focus:outline-none"
          />
          <div className="absolute right-3 flex items-center gap-2">
            <span className="hidden sm:inline-flex text-[10px] font-mono font-bold text-secondary bg-surface-container-high px-2 py-1 rounded border border-outline-variant/60">
              Enter ↵
            </span>
          </div>
        </div>

        {/* Preset Query Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-secondary font-semibold shrink-0">Try asking:</span>
          {SAMPLE_QUERIES.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(q)}
              className="px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/60 hover:border-primary/40 hover:bg-white text-secondary hover:text-primary transition-colors whitespace-nowrap shrink-0 text-[11px]"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Synthesized Answer Card */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-surface-container-lowest p-5 sm:p-6 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-primary text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              AI Synthesized Contextual Answer
            </h3>
          </div>

          <button
            type="button"
            onClick={handleCopyAnswer}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary hover:text-primary transition-colors bg-white/80 px-2.5 py-1 rounded-md border border-outline-variant/40"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm font-medium text-on-surface leading-relaxed">
          {currentData.aiAnswer}
        </p>

        {/* Source Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-blue-200/50 text-xs">
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
            Verified Sources:
          </span>
          {currentData.sources.map((src, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-white/90 text-on-surface px-2.5 py-1 rounded-md border border-outline-variant/60 shadow-xs text-[11px] font-medium"
            >
              {getSourceIcon(src.type)}
              <span>{src.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Search Results Filter & List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/40 pb-2.5">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Direct Source Evidence ({filteredResults.length} matches)
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            {(["all", "gmail", "slack", "drive", "notion"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider text-[10px] transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-xs"
                    : "bg-surface-container-high text-secondary hover:bg-surface-variant"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Cards List */}
        <div className="space-y-3">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className="rounded-xl border border-outline-variant/70 bg-surface-container-lowest p-4 hover:border-primary/40 transition-all shadow-xs space-y-2 group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`h-7 w-7 rounded-md flex items-center justify-center shrink-0 shadow-xs ${result.sourceIconColor}`}
                  >
                    {getSourceIcon(result.source)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {result.title}
                    </h4>
                    <p className="text-[10px] text-secondary font-mono">
                      {result.sourceName} • By {result.author} • {result.timestamp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {result.relevance}% Match
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
                </div>
              </div>

              <p className="text-xs text-secondary leading-relaxed pl-9 italic">
                "{result.snippet}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

