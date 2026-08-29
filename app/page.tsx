"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { DemoModal } from "@/components/landing/DemoModal";
import { AuthModal } from "@/components/landing/AuthModal";

export default function LandingPage() {
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
      {/* Global Header / Navigation */}
      <Navbar
        onStartFree={() => handleOpenSignup()}
        onLogin={handleOpenLogin}
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* 1. Hero Section + Intelligence Platform Live Engine */}
        <HeroSection
          onStartFree={() => handleOpenSignup()}
          onWatchDemo={() => setIsDemoOpen(true)}
        />

          {/* 3. Works seamlessly with the tools you already rely on */}
          <TrustSection />

        {/* 2. WorkRadar AI - Core Problem & Impact Breakdown */}
        <ProblemSection />

        {/* Global FAQ Section */}
        <FaqSection />

        {/* Global Ready To Stop Missing CTA Section */}
        <CtaSection onStartFree={() => handleOpenSignup()} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Modals */}
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
