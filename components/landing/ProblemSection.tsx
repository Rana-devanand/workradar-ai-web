import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PROBLEM_ITEMS } from "@/lib/data/landing-data";
import { Clock, CheckSquare, TrendingUp, Layers, AlertCircle, Sparkles } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  "clock-alert": <Clock className="w-5 h-5 text-rose-500" />,
  "check-square-offset": <CheckSquare className="w-5 h-5 text-amber-500" />,
  "trending-up": <TrendingUp className="w-5 h-5 text-emerald-500" />,
  "layers-overflow": <Layers className="w-5 h-5 text-indigo-500" />,
};

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <SectionHeader
          badge="The Silent Cost of Disorganization"
          badgeVariant="error"
          title={
            <>
              Work is falling through the cracks.{" "}
              <span className="text-secondary font-normal block sm:inline">
                Every single day.
              </span>
            </>
          }
          subtitle="Every day professionals lose revenue, miss deals, and breach client commitments because critical signals are scattered across fragmented inboxes and chats."
        />

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROBLEM_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-outline transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/40">
                      {ICON_MAP[item.icon] || <AlertCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    {item.impact}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-secondary leading-relaxed">
                  {item.description}
                </p>

                <div className="p-3 bg-surface-container-low rounded-xl text-xs font-medium text-secondary">
                  💡 <span className="font-semibold text-on-surface">{item.stat}</span>
                </div>
              </div>

              {/* Before vs After Contrast */}
              <div className="mt-6 pt-5 border-t border-outline-variant/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-200/60 text-secondary">
                  <span className="font-bold text-rose-800 uppercase tracking-wider block mb-1">
                    Without AI
                  </span>
                  <p>{item.withoutAi}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200/60 text-secondary">
                  <span className="font-bold text-primary uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" /> With WorkRadar
                  </span>
                  <p className="text-on-surface">{item.withRadar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

