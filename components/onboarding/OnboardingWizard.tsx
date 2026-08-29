"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { WelcomeStep } from "./WelcomeStep";
import { WorkspaceInfoStep } from "./WorkspaceInfoStep";
import { PreferencesStep } from "./PreferencesStep";
import { IntegrationsStep } from "./IntegrationsStep";
import { PermissionsStep } from "./PermissionsStep";
import { SyncLoadingStep } from "./SyncLoadingStep";
import { SummaryInsightsStep } from "./SummaryInsightsStep";
import { FinalReadyStep } from "./FinalReadyStep";
import { Radar, X } from "lucide-react";

export const OnboardingWizard: React.FC = () => {
  const { currentStep, totalSteps, nextStep, prevStep } = useOnboardingStore();

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Slide variants for smooth step transitions
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" as const } },
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-between relative overflow-hidden">
      {/* Soft Ambient Radial Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-outline-variant/50 bg-surface/80 backdrop-blur-md relative z-20">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-xs">
            <Radar className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-base tracking-tight text-primary">WorkRadar</span>
            <span className="font-bold text-xs text-on-surface">AI</span>
          </div>
        </Link>

        {/* Center Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 max-w-xs w-full">
          <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-secondary shrink-0">
            {currentStep}/{totalSteps}
          </span>
        </div>

        {/* Exit / Skip to Home */}
        <Link
          href="/"
          className="text-xs font-semibold text-secondary hover:text-on-surface flex items-center gap-1 p-1.5 rounded-lg hover:bg-surface-container-high transition-colors"
        >
          <span>Exit</span>
          <X className="w-4 h-4" />
        </Link>
      </header>

      {/* Main Dynamic Step Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {currentStep === 1 && <WelcomeStep onContinue={nextStep} />}
              {currentStep === 2 && (
                <WorkspaceInfoStep onContinue={nextStep} onBack={prevStep} />
              )}
              {currentStep === 3 && (
                <PreferencesStep onContinue={nextStep} onBack={prevStep} />
              )}
              {currentStep === 4 && (
                <IntegrationsStep onContinue={nextStep} onBack={prevStep} />
              )}
              {currentStep === 5 && (
                <PermissionsStep onContinue={nextStep} onBack={prevStep} />
              )}
              {currentStep === 6 && <SyncLoadingStep onComplete={nextStep} />}
              {currentStep === 7 && (
                <SummaryInsightsStep onContinue={nextStep} onBack={prevStep} />
              )}
              {currentStep === 8 && <FinalReadyStep />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Minimal Footer Info */}
      <footer className="w-full py-4 text-center text-[11px] text-secondary border-t border-outline-variant/40 bg-surface/50 relative z-20">
        <span>🔒 SOC2 Type II Certified • Zero LLM Data Retention • 14-Day Free Access</span>
      </footer>
    </div>
  );
};
