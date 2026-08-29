"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { DemoModal } from "@/components/landing/DemoModal";
import { AuthModal } from "@/components/landing/AuthModal";
import { Users, Award, Shield, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function UseCasesPage() {
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
        {/* Hero Header */}
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <Container size="xl" className="relative z-10 text-center">
            <div className="inline-flex justify-center mb-4">
              <Badge variant="primary" size="md" pulse dot icon={<Users className="w-3.5 h-3.5" />}>
                Tailored Intelligence For High-Performers
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-on-surface max-w-4xl mx-auto leading-tight">
              Designed For High-Stakes <span className="text-primary">Executive Workflows</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
              Whether you're closing venture rounds, scaling agency retainers, or consulting enterprise clients, WorkRadar AI keeps your communication moving forward.
            </p>
          </Container>
        </section>

        {/* Interactive Use Cases Section */}
        <UseCasesSection />

        {/* ROI & Impact Metrics */}
        <section className="py-20 bg-surface-container-lowest border-y border-outline-variant/60">
          <Container size="xl">
            <SectionHeader
              badge="Proven Business Impact"
              badgeVariant="primary"
              title="Quantifiable Results Across 24,000+ Professionals"
              subtitle="See what happens when an autonomous AI Chief of Staff handles inbox triage and follow-up defense."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-xs space-y-1">
                <div className="text-4xl font-extrabold text-primary">6.5 hrs</div>
                <div className="text-sm font-bold text-on-surface">Time Saved Weekly</div>
                <p className="text-xs text-secondary">Eliminates email triage and note-taking overhead</p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-xs space-y-1">
                <div className="text-4xl font-extrabold text-emerald-600">98.4%</div>
                <div className="text-sm font-bold text-on-surface">Follow-up SLA Compliance</div>
                <p className="text-xs text-secondary">Zero missed client replies or proposal deadlines</p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-xs space-y-1">
                <div className="text-4xl font-extrabold text-on-surface">+34%</div>
                <div className="text-sm font-bold text-on-surface">Pipeline Expansion</div>
                <p className="text-xs text-secondary">Captures latent buying signals and scope requests</p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-xs space-y-1">
                <div className="text-4xl font-extrabold text-primary">&lt; 60s</div>
                <div className="text-sm font-bold text-on-surface">Setup Time</div>
                <p className="text-xs text-secondary">Instant OAuth 2.0 connection with zero friction</p>
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

