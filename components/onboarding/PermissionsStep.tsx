"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import {
  ShieldCheck,
  Lock,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Key,
} from "lucide-react";

interface PermissionsStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const PermissionsStep: React.FC<PermissionsStepProps> = ({ onContinue, onBack }) => {
  const { permissions, togglePermission } = useOnboardingStore();

  const permissionItems = [
    {
      id: "emailMetadata" as const,
      title: "Read-Only Email Thread Metadata",
      desc: "Analyzes sender names, timestamps, and thread context to detect forgotten replies and churn risks.",
      enabled: permissions.emailMetadata,
    },
    {
      id: "calendarSchedule" as const,
      title: "Calendar Schedule & Agenda Reading",
      desc: "Discovers scheduling conflicts, missing prep materials, and links meeting actions to relevant threads.",
      enabled: permissions.calendarSchedule,
    },
    {
      id: "executiveBriefs" as const,
      title: "Automated Daily AI Executive Briefings",
      desc: "Generates prioritized morning action lists and drafts proposed replies for your 1-click review.",
      enabled: permissions.executiveBriefs,
    },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-8 text-left">
      <div className="space-y-2 text-center sm:text-left">
        <Badge variant="primary" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5 text-primary" />}>
          Step 5 of 8 • Security & Permissions
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Your Privacy & Data Security
        </h2>
        <p className="text-sm text-secondary">
          WorkRadar AI operates under strict read-only parameters and enterprise-grade isolation.
        </p>
      </div>

      {/* Trust & Guarantees Banner */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/80 shadow-xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" />
          Enterprise Security Guarantees
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-secondary">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Zero LLM training on private data</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Bank-grade 256-bit AES encryption</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>No automatic sending without approval</span>
          </div>
        </div>
      </div>

      {/* Permissions Switches */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Requested Access Permissions
        </span>

        <div className="space-y-2.5">
          {permissionItems.map((item) => (
            <div
              key={item.id}
              onClick={() => togglePermission(item.id)}
              className="p-4 rounded-xl border border-outline-variant/70 bg-surface-container-lowest flex items-start justify-between gap-4 cursor-pointer hover:border-primary/40 transition-all shadow-xs"
            >
              <div className="space-y-1 pr-2">
                <h5 className="text-sm font-bold text-on-surface">{item.title}</h5>
                <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
              </div>

              {/* Toggle Switch */}
              <div
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 mt-0.5 ${
                  item.enabled ? "bg-primary" : "bg-surface-container-highest"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    item.enabled ? "left-6" : "left-1"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
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
          Authorize & Sync Workspace
        </Button>
      </div>
    </div>
  );
};

