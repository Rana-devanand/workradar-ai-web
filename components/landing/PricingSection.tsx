"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { PRICING_PLANS } from "@/lib/data/landing-data";
import { Check, X, Sparkles, ArrowRight, Shield } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan?: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-surface-container-lowest border-t border-outline-variant/60 relative overflow-hidden">
      <Container size="xl">
        <SectionHeader
          badge="Transparent Pricing"
          badgeVariant="primary"
          title="Simple, predictable plans for every stage"
          subtitle="Start for free, upgrade when you need advanced intelligence, multi-app search, and team collaboration."
        />

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-sm font-semibold cursor-pointer ${
              !isAnnual ? "text-primary" : "text-secondary"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly Billing
          </span>

          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle annual billing discount"
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsAnnual(true)}
          >
            <span
              className={`text-sm font-semibold ${
                isAnnual ? "text-primary" : "text-secondary"
              }`}
            >
              Annual Billing
            </span>
            <Badge variant="success" size="sm" className="font-bold">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 ${
                  plan.isPopular
                    ? "bg-white border-2 border-primary shadow-xl ring-4 ring-primary/10 lg:-translate-y-2"
                    : "bg-surface-container-low/40 border border-outline-variant hover:border-outline shadow-sm"
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">{plan.name}</h3>
                    <p className="text-xs text-secondary mt-1.5 min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-outline-variant/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-on-surface">
                        ${price}
                      </span>
                      <span className="text-xs text-secondary font-medium">
                        {price === 0 ? "forever" : isAnnual ? "/ month, billed yearly" : "/ month"}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 text-xs">
                    <span className="font-bold uppercase tracking-wider text-secondary block">
                      What's included:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="h-4 w-4 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-on-surface font-medium leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}

                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2.5 opacity-60">
                        {plan.notIncluded.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="h-4 w-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-2.5 h-2.5" />
                            </div>
                            <span className="text-secondary line-through">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Button
                    variant={plan.ctaVariant}
                    size="md"
                    onClick={() => onSelectPlan?.(plan.id)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full text-xs uppercase tracking-wider font-bold py-3"
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-on-surface">Need custom Enterprise SLA or HIPAA compliance?</h4>
              <p className="text-xs text-secondary">Dedicated isolated LLM instances, SSO/SAML, and custom data processing agreements.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 text-xs uppercase font-bold">
            Contact Enterprise Sales
          </Button>
        </div>
      </Container>
    </section>
  );
};

