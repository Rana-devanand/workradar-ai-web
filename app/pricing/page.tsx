"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { DemoModal } from "@/components/landing/DemoModal";
import { AuthModal } from "@/components/landing/AuthModal";
import { Check, DollarSign, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";

const COMPARISON_FEATURES = [
  {
    category: "Data Sync & Intelligence",
    items: [
      { name: "Gmail & Outlook Accounts", starter: "1 Account", pro: "Unlimited", business: "Unlimited Team" },
      { name: "Google Calendar & Meetings", starter: "1 Calendar", pro: "Unlimited", business: "Shared Calendar Sync" },
      { name: "AI Daily Executive Brief", starter: "Standard", pro: "Real-time Prioritized", business: "Custom Brand Voice" },
      { name: "Follow-up SLA Radar", starter: "50 queries/mo", pro: "Continuous Real-time", business: "Team SLA Dashboards" },
      { name: "Meeting Action Item Extraction", starter: "—", pro: "Full Video & Notes", business: "Shared Action Assignment" },
      { name: "Universal Cross-Tool AI Search", starter: "—", pro: "Included", business: "Team-wide Knowledge Graph" },
      { name: "Revenue & Upsell Opportunity Radar", starter: "—", pro: "Included", business: "Shared Pipeline Insights" },
    ],
  },
  {
    category: "Security & Governance",
    items: [
      { name: "SOC2 Type II Compliance", starter: "✓", pro: "✓", business: "✓" },
      { name: "Zero-Data Retention Policy", starter: "✓", pro: "✓", business: "✓" },
      { name: "OAuth 2.0 Read-Only Scopes", starter: "✓", pro: "✓", business: "✓" },
      { name: "Dedicated Support Specialist", starter: "Community", pro: "Priority Email", business: "Dedicated Account Lead" },
      { name: "Custom API & Webhooks", starter: "—", pro: "—", business: "Included" },
    ],
  },
];

export default function PricingPage() {
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
                14-Day Free Pro Trial • No Credit Card Required
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-on-surface max-w-4xl mx-auto leading-tight">
              Predictable, Transparent <span className="text-primary">Intelligence Pricing</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
              Start free forever. Upgrade when you require continuous follow-up radar, multi-app search, and team collaboration.
            </p>
          </Container>
        </section>

        {/* Pricing Cards Section */}
        <PricingSection onSelectPlan={(planId) => handleOpenSignup(planId)} />

        {/* Detailed Feature Comparison Table */}
        <section className="py-20 bg-surface relative overflow-hidden border-t border-outline-variant/60">
          <Container size="xl">
            <SectionHeader
              badge="Detailed Comparison"
              badgeVariant="primary"
              title="Compare Plans & Feature Matrix"
              subtitle="Everything included across all tiers with zero hidden fees."
            />

            <div className="max-w-5xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/60 bg-surface-container-low/60">
                      <th className="p-4 sm:p-5 font-bold text-on-surface">Capability</th>
                      <th className="p-4 sm:p-5 font-bold text-on-surface">Starter (Free)</th>
                      <th className="p-4 sm:p-5 font-bold text-primary">Pro ($19/mo)</th>
                      <th className="p-4 sm:p-5 font-bold text-on-surface">Business ($49/mo)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FEATURES.map((section, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <tr className="bg-surface-container-high/40 border-b border-outline-variant/40">
                          <td colSpan={4} className="p-3 px-5 font-bold text-[11px] uppercase tracking-wider text-secondary">
                            {section.category}
                          </td>
                        </tr>
                        {section.items.map((item, iIdx) => (
                          <tr key={iIdx} className="border-b border-outline-variant/30 hover:bg-surface-container-low/30 transition-colors">
                            <td className="p-4 sm:p-5 font-medium text-on-surface">{item.name}</td>
                            <td className="p-4 sm:p-5 text-secondary">{item.starter}</td>
                            <td className="p-4 sm:p-5 font-bold text-primary">{item.pro}</td>
                            <td className="p-4 sm:p-5 font-semibold text-on-surface">{item.business}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
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

