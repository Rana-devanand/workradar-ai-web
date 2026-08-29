import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { STEP_ITEMS } from "@/lib/data/landing-data";
import { PlugZap, BrainCircuit, Sparkles, Check, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  "plug-zap": <PlugZap className="w-6 h-6 text-primary" />,
  "brain-circuit": <BrainCircuit className="w-6 h-6 text-cyan-600" />,
  sparkles: <Sparkles className="w-6 h-6 text-indigo-600" />,
};

export const SolutionSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface-container-lowest relative overflow-hidden border-t border-outline-variant/60">
      <Container size="xl">
        <SectionHeader
          badge="Intelligent Architecture"
          badgeVariant="primary"
          title="One AI that understands your entire workday."
          subtitle="Three simple steps to transition from overwhelmed and reactive to razor-sharp executive focus."
        />

        {/* 3 Step Visual Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {STEP_ITEMS.map((step, index) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-outline-variant/80 bg-surface-container-low/30 p-8 flex flex-col justify-between hover:border-primary/50 transition-all group shadow-xs"
            >
              <div>
                {/* Step Index & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-outline-variant/60 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[step.icon] || <Sparkles className="w-6 h-6 text-primary" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      STEP {step.step}
                    </span>
                  </div>
                  {index < STEP_ITEMS.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-outline hidden lg:block" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-on-surface">{step.title}</h3>
                <p className="text-xs font-semibold text-primary mt-1 uppercase tracking-wider">
                  {step.subtitle}
                </p>

                <p className="text-sm text-secondary mt-3 leading-relaxed">
                  {step.description}
                </p>

                {/* Key Bullet points */}
                <div className="mt-6 pt-5 border-t border-outline-variant/40 space-y-2.5">
                  {step.items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs text-on-surface">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all group-hover:w-full"
                    style={{ width: `${(index + 1) * 33.33}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

