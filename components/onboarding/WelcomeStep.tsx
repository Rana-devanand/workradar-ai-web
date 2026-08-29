"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import {
  Radar,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Clock,
} from "lucide-react";

interface WelcomeStepProps {
  onContinue: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
      {/* Top Animated Logo Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/25 relative z-10">
          <Radar className="w-10 h-10 animate-pulse" />
        </div>
        {/* Ambient Ring Glow */}
        <div className="absolute inset-0 w-20 h-20 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
      </motion.div>

      {/* Main Copy */}
      <div className="space-y-3">
        <Badge variant="primary" size="md" pulse dot icon={<Sparkles className="w-3.5 h-3.5" />}>
          Autonomous Work Intelligence
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
          Welcome to WorkRadar AI
        </h1>
        <p className="text-base sm:text-lg text-secondary max-w-xl mx-auto leading-relaxed">
          Your executive-grade AI Chief of Staff is ready to continuously monitor your communication channels, eliminate forgotten follow-ups, and keep your commitments on track.
        </p>
      </div>

      {/* Value Prop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full text-left">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs space-y-2 hover:border-primary/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Zero Effort</h4>
          <p className="text-xs text-secondary leading-relaxed">
            Auto-surfaces buried replies and high-risk client threads in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs space-y-2 hover:border-primary/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Never Miss SLAs</h4>
          <p className="text-xs text-secondary leading-relaxed">
            Tracks promised deadlines and alerts you before key commitments breach.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs space-y-2 hover:border-primary/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Total Privacy</h4>
          <p className="text-xs text-secondary leading-relaxed">
            SOC2 Type II certified with Zero LLM retention of private data.
          </p>
        </motion.div>
      </div>

      {/* CTA Button with Keyboard Hint */}
      <div className="pt-4 flex flex-col items-center space-y-3 w-full sm:w-auto">
        <Button
          variant="primary"
          size="lg"
          onClick={onContinue}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-80 py-3.5 text-sm uppercase tracking-wider font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30"
        >
          Set Up Your Workspace
        </Button>
        <span className="text-[11px] text-secondary font-mono">
          Takes less than 2 minutes • No credit card needed
        </span>
      </div>
    </div>
  );
};
