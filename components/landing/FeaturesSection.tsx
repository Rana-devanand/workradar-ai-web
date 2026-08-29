import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { CORE_FEATURES } from "@/lib/data/landing-data";
import { Sun, Radar, Video, Search, CheckCircle, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  sun: <Sun className="w-5 h-5 text-amber-500" />,
  radar: <Radar className="w-5 h-5 text-primary" />,
  video: <Video className="w-5 h-5 text-indigo-500" />,
  search: <Search className="w-5 h-5 text-cyan-600" />,
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-surface relative overflow-hidden">
      <Container size="xl">
        <SectionHeader
          badge="Core Capabilities"
          badgeVariant="primary"
          title="Engineered to protect your time and revenue"
          subtitle="Four interconnected intelligence engines working non-stop in the background so nothing slips through."
        />

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORE_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:border-outline transition-all group shadow-xs"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/50 group-hover:scale-105 transition-transform">
                      {ICON_MAP[feature.icon] || <Radar className="w-5 h-5 text-primary" />}
                    </div>
                    <Badge variant="neutral" size="sm">
                      {feature.badge}
                    </Badge>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded">
                    {feature.highlight}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Simulated UI Feature Preview Box */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface">
                      {feature.previewContent.title}
                    </span>
                    <span className="text-[10px] font-semibold text-primary bg-white px-2 py-0.5 rounded border border-outline-variant/40">
                      {feature.previewContent.actionTag}
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {feature.previewContent.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metric Footer */}
              <div className="mt-6 pt-5 border-t border-outline-variant/40 flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">
                  {feature.metrics.label}:
                </span>
                <span className="font-bold text-on-surface text-sm">
                  {feature.metrics.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

