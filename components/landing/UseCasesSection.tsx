"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Tabs } from "@/components/common/Tabs";
import { Badge } from "@/components/common/Badge";
import { USE_CASES } from "@/lib/data/landing-data";
import { Check, Quote, Users, Briefcase, Building, Award } from "lucide-react";

export const UseCasesSection: React.FC = () => {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);

  const tabs = USE_CASES.map((uc) => ({
    id: uc.id,
    label: uc.role,
    badge: uc.badge,
  }));

  const activeUseCase = USE_CASES.find((uc) => uc.id === activeId) || USE_CASES[0];

  return (
    <section id="use-cases" className="py-24 bg-surface relative overflow-hidden">
      <Container size="xl">
        <SectionHeader
          badge="Tailored For High-Performers"
          badgeVariant="primary"
          title="Built for those who manage high-stakes communication"
          subtitle="Whether you lead a venture-backed startup or manage high-ticket client retainers, WorkRadar keeps you operating at peak efficiency."
        />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <Tabs
            tabs={tabs}
            activeTab={activeId}
            onChange={setActiveId}
            variant="pills"
          />
        </div>

        {/* Active Use Case View */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="primary" size="sm">
                  {activeUseCase.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-on-surface">
                  {activeUseCase.tagline}
                </h3>
                <p className="text-sm sm:text-base text-secondary leading-relaxed">
                  {activeUseCase.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3 pt-2">
                {activeUseCase.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium text-on-surface">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Verified Impact: {activeUseCase.metrics}</span>
                </div>
              </div>
            </div>

            {/* Right Testimonial Quote Card */}
            <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-7 rounded-xl border border-outline-variant/60 relative">
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <p className="text-sm italic text-on-surface leading-relaxed relative z-10">
                "{activeUseCase.quote.text}"
              </p>
              <div className="mt-6 pt-4 border-t border-outline-variant/50">
                <div className="font-bold text-sm text-on-surface">
                  {activeUseCase.quote.author}
                </div>
                <div className="text-xs text-secondary">
                  {activeUseCase.quote.role}, <span className="font-semibold text-primary">{activeUseCase.quote.company}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

