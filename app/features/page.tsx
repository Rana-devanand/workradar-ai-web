"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { DemoModal } from "@/components/landing/DemoModal";
import { AuthModal } from "@/components/landing/AuthModal";
import { Sparkles, Sun, Radar, Video, Search } from "lucide-react";

export default function FeaturesPage() {
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
              <Badge variant="primary" size="md" pulse dot icon={<Sparkles className="w-3.5 h-3.5" />}>
                Complete Product Intelligence Suite
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-on-surface max-w-4xl mx-auto leading-tight">
              Every Tool You Need To <span className="text-primary">Protect Time & Pipeline</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore the four interconnected engines that transform chaotic multi-app workspaces into clear daily action priorities.
            </p>
          </Container>
        </section>

        {/* 2x2 Core Features */}
        <FeaturesSection />

        {/* Interactive Deep Dive Showcase */}
        <ShowcaseSection />

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

