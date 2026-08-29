"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { DemoModal } from "@/components/landing/DemoModal";
import { AuthModal } from "@/components/landing/AuthModal";
import { Button } from "@/components/common/Button";
import {
  PlugZap,
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  RefreshCw,
  Cpu,
} from "lucide-react";

export default function HowItWorksPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "signup" | "login";
    plan?: string;
  }>({
    isOpen: false,
    mode: "signup",
  });

  const handleOpenSignup = (planId?: string) => {
    setAuthModal({
      isOpen: true,
      mode: "signup",
      plan: planId,
    });
  };

  const handleOpenLogin = () => {
    setAuthModal({
      isOpen: true,
      mode: "login",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface">
      {/* Global Header */}
      <Navbar
        onStartFree={() => handleOpenSignup()}
        onLogin={handleOpenLogin}
      />

      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <Container size="xl" className="relative z-10 text-center">
            <div className="inline-flex justify-center mb-4">
              <Badge variant="primary" size="md" pulse dot icon={<Cpu className="w-3.5 h-3.5" />}>
                Autonomous Work Intelligence Architecture
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-on-surface max-w-4xl mx-auto leading-tight">
              How WorkRadar AI <span className="text-primary">Understands Your Workday</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
              Discover how our privacy-first LLM orchestration pipeline ingests, correlates, and prioritizes communications across your entire workspace in milliseconds.
            </p>
          </Container>
        </section>

        {/* 3-Step Visual Workflow Section */}
        <SolutionSection />

        {/* Technical Architecture Deep Dive */}
        <section className="py-20 bg-surface relative overflow-hidden border-t border-outline-variant/60">
          <Container size="xl">
            <SectionHeader
              badge="Behind The Engine"
              badgeVariant="primary"
              title="Built on Enterprise Privacy & Continuous SLA Reasoning"
              subtitle="WorkRadar operates on an isolated context layer that never exposes your private company data to foundation model training."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs space-y-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">Zero-Retention Vectorization</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Ephemeral indexing creates semantic relationships without storing raw email or message archives. Data is instantly purged upon disconnection.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs space-y-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">Cross-Tool Context Graph</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  Correlates an email inquiry with a Zoom transcript and a Notion deliverable to determine true urgency and business impact automatically.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">Human-in-the-Loop Execution</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  You stay 100% in control. WorkRadar prepares executive draft responses and action plans, but nothing leaves your desk without your approval.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Global FAQ Section */}
        <FaqSection />

        {/* Global Ready To Stop Missing CTA Section */}
        <CtaSection onStartFree={() => handleOpenSignup()} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onStartFree={() => {
          setIsDemoOpen(false);
          handleOpenSignup();
        }}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        initialMode={authModal.mode}
        defaultPlan={authModal.plan}
      />
    </div>
  );
}

