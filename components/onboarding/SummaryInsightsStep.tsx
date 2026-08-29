"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Mail,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
} from "lucide-react";

interface SummaryInsightsStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const SummaryInsightsStep: React.FC<SummaryInsightsStepProps> = ({
  onContinue,
  onBack,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Step Header */}
      <div className="space-y-2 text-center sm:text-left">
        <Badge variant="glow" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-primary" />}>
          Step 7 of 8 • AI Initial Audit
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Initial Workspace Intelligence Discovered
        </h2>
        <p className="text-sm text-secondary">
          Here is an instant breakdown of critical items our radar flagged during initial indexing:
        </p>
      </div>

      {/* Staggered Insight Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3.5"
      >
        {/* Card 1: Score & Urgent Actions */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex flex-col items-center justify-center font-bold shadow-xs">
              <span className="text-lg leading-none">85</span>
              <span className="text-[9px] font-mono text-primary-fixed">/100</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-on-surface">Baseline Priority Efficiency Score</h4>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                  High Baseline
                </span>
              </div>
              <p className="text-xs text-secondary mt-0.5">
                3 urgent items flagged for resolution before 12:00 PM today.
              </p>
            </div>
          </div>
          <Badge variant="primary" size="sm" pulse dot>
            Calculated
          </Badge>
        </motion.div>

        {/* Card 2: High Risk Follow-up */}
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 shadow-xs space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>High Risk Client Thread Detected</span>
            </div>
            <span className="text-xs font-bold text-amber-800 font-mono">$120,000 ARR Exposure</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            <strong>Acme Corp (Sarah Jenkins)</strong> sent a message 3 days ago asking for finalized Q3 renewal numbers. WorkRadar prepared a 1-click draft response.
          </p>
        </motion.div>

        {/* Card 3: Revenue Expansion Opportunity */}
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Expansion Opportunity Identified</span>
            </div>
            <span className="text-xs font-bold text-emerald-800 font-mono">+$24,000 ARR</span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed">
            <strong>HealthPulse Analytics</strong> requested 35 additional team seats in a recent email thread. Intent score calculated at 98%.
          </p>
        </motion.div>

        {/* Card 4: Meeting Optimization */}
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs flex items-start gap-3 text-xs text-secondary"
        >
          <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-on-surface">Schedule Conflict Resolved</span>
            <p>
              Your Design Sync conflict has been identified and can be auto-rescheduled with 1-click inside the dashboard.
            </p>
          </div>
        </motion.div>
      </motion.div>

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
          Finalize Workspace Setup
        </Button>
      </div>
    </div>
  );
};

