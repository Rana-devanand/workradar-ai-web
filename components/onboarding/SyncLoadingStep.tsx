"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/common/Badge";
import {
  Radar,
  CheckCircle2,
  Sparkles,
  Mail,
  Calendar,
  Zap,
  ShieldCheck,
  Brain,
} from "lucide-react";

interface SyncLoadingStepProps {
  onComplete: () => void;
}

const SYNC_STAGES = [
  { id: 1, text: "Establishing secure OAuth 2.0 handshake...", icon: ShieldCheck },
  { id: 2, text: "Scanning recent email threads for open client follow-ups...", icon: Mail },
  { id: 3, text: "Analyzing Google Calendar schedule & meeting prep...", icon: Calendar },
  { id: 4, text: "Calculating Priority Efficiency score & SLA exposure...", icon: Brain },
  { id: 5, text: "Synthesizing executive daily briefing dashboard...", icon: Sparkles },
];

export const SyncLoadingStep: React.FC<SyncLoadingStepProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    // Smooth progress increment timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 38);

    // Stage progression timer
    const stageInterval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < SYNC_STAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(stageInterval);
        return prev;
      });
    }, 750);

    // Auto-advance after sync completion
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto space-y-8 py-4">
      {/* Top Badge */}
      <Badge variant="glow" size="md" pulse dot icon={<Sparkles className="w-3.5 h-3.5 text-primary" />}>
        Live AI Workspace Indexing
      </Badge>

      {/* Central Radar Pulse Animation with Framer Motion */}
      <div className="relative w-48 h-48 flex items-center justify-center my-4">
        {/* Outer Pulsing Waves */}
        <motion.div
          animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1.5], opacity: [0.7, 0.35, 0] }}
          transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30 pointer-events-none"
        />

        {/* Orbiting Tech Nodes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-container-lowest border border-outline-variant/80 shadow-md flex items-center justify-center text-red-500">
            <Mail className="w-4 h-4" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-surface-container-lowest border border-outline-variant/80 shadow-md flex items-center justify-center text-blue-500">
            <Calendar className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Center Glowing Hub */}
        <div className="w-24 h-24 rounded-full bg-primary text-white flex flex-col items-center justify-center shadow-xl shadow-primary/35 relative z-10">
          <Radar className="w-8 h-8 animate-spin" style={{ animationDuration: "4s" }} />
          <span className="text-xs font-mono font-bold mt-1">{progress}%</span>
        </div>
      </div>

      {/* Progress Title & Bar */}
      <div className="space-y-3 w-full">
        <h3 className="text-2xl font-bold text-on-surface tracking-tight">
          Calibrating Your WorkRadar Engine...
        </h3>

        {/* Progress Fill Bar */}
        <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step-by-Step Live Ticker */}
      <div className="w-full space-y-2 text-left bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/70 shadow-xs">
        {SYNC_STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIdx;
          const isCurrent = idx === currentStageIdx;
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{
                opacity: isDone || isCurrent ? 1 : 0.4,
                x: 0,
              }}
              className="flex items-center gap-3 text-xs py-1"
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-surface-container-high shrink-0" />
              )}
              <span
                className={`truncate ${
                  isCurrent
                    ? "font-bold text-primary"
                    : isDone
                    ? "text-on-surface font-medium"
                    : "text-secondary"
                }`}
              >
                {stage.text}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Fast Forward Link if impatient */}
      <button
        type="button"
        onClick={onComplete}
        className="text-[11px] text-secondary hover:text-primary underline underline-offset-4 transition-colors"
      >
        Skip animation &rarr;
      </button>
    </div>
  );
};

