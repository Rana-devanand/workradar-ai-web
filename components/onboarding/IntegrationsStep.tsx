"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import {
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Video,
  HardDrive,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

interface IntegrationsStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const IntegrationsStep: React.FC<IntegrationsStepProps> = ({ onContinue, onBack }) => {
  const { integrations, toggleIntegration } = useOnboardingStore();

  const freeIntegrations = [
    {
      id: "gmail" as const,
      name: "Gmail / Google Workspace",
      category: "Email & Threads",
      desc: "Continuous inbox radar scanning for missed client replies, SLA breaches, and revenue intent.",
      icon: <Mail className="w-5 h-5 text-red-500" />,
      connected: integrations.gmail,
    },
    {
      id: "googleCalendar" as const,
      name: "Google Calendar",
      category: "Meetings & Schedules",
      desc: "Analyzes meeting preparation, extracts action items, and eliminates calendar scheduling conflicts.",
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      connected: integrations.googleCalendar,
    },
  ];

  const lockedIntegrations = [
    {
      name: "Slack",
      category: "Chat & Channels",
      desc: "Scans channels and DMs for commitments and unanswered client mentions.",
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      plan: "Pro Plan",
    },
    {
      name: "Notion",
      category: "Knowledge & Wikis",
      desc: "Cross-references meeting action items with existing product roadmaps.",
      icon: <FileText className="w-5 h-5 text-slate-700" />,
      plan: "Pro Plan",
    },
    {
      name: "Zoom",
      category: "Video Transcripts",
      desc: "AI extraction of commitments directly from recorded client calls.",
      icon: <Video className="w-5 h-5 text-sky-500" />,
      plan: "Business Plan",
    },
    {
      name: "Google Drive",
      category: "Documents & Contracts",
      desc: "Monitors RFP proposals, statements of work, and contract renewals.",
      icon: <HardDrive className="w-5 h-5 text-amber-500" />,
      plan: "Pro Plan",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      <div className="space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge variant="primary" size="sm">
            Step 4 of 8 • Integrations Setup
          </Badge>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Free Trial Mode Active
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Connect your core tools
        </h2>
        <p className="text-sm text-secondary">
          Your 14-day free trial allows full continuous intelligence on <strong>Gmail</strong> and <strong>Google Calendar</strong>.
        </p>
      </div>

      {/* Free Trial Active Integrations Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Included in 14-Day Free Trial (Ready to sync)
          </span>
          <span className="text-[11px] text-secondary font-mono">1-Click OAuth Connect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {freeIntegrations.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleIntegration(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                item.connected
                  ? "border-primary bg-primary/4 ring-1 ring-primary/30 shadow-xs"
                  : "border-outline-variant/70 bg-surface-container-lowest hover:border-primary/40 opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 shadow-xs">
                  {item.icon}
                </div>
                <button
                  type="button"
                  className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider transition-colors ${
                    item.connected
                      ? "bg-primary text-white"
                      : "bg-surface-container-high text-secondary hover:text-on-surface"
                  }`}
                >
                  {item.connected ? "Connected" : "Connect"}
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-on-surface">{item.name}</h4>
                <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Integrations (Pro / Business Plan) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-secondary" />
            Additional Integrations (Locked during Free Trial)
          </span>
          <span className="text-[11px] text-primary font-semibold hover:underline cursor-pointer">
            View Pro Features &rarr;
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-65">
          {lockedIntegrations.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-dashed border-outline-variant/80 bg-surface-container-lowest/50 flex items-start justify-between gap-3 relative group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container-high/60 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-on-surface">{item.name}</h5>
                    <span className="text-[10px] font-mono font-semibold bg-surface-container-high px-1.5 py-0.5 rounded text-secondary">
                      {item.plan}
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary leading-snug">{item.desc}</p>
                </div>
              </div>
              <Lock className="w-4 h-4 text-outline shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Notice Callout */}
      <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 flex items-center gap-3 text-xs text-primary">
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <span>
          You can connect Slack, Notion, and Zoom anytime from your workspace settings after starting your trial.
        </span>
      </div>

      {/* Buttons */}
      <div className="pt-6 flex items-center justify-between gap-4 border-t border-outline-variant/50">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="text-xs uppercase tracking-wider text-secondary"
        >
          Back
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onContinue}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="px-6 text-xs uppercase tracking-wider font-bold shadow-md shadow-primary/20"
        >
          Continue with Connected Apps
        </Button>
      </div>
    </div>
  );
};

