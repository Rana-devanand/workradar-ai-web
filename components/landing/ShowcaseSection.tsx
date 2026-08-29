"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Tabs } from "@/components/common/Tabs";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SHOWCASE_TABS } from "@/lib/data/landing-data";
import { FollowUpCenterPreview } from "./FollowUpCenterPreview";
import {
  AlertCircle,
  Clock,
  DollarSign,
  CheckCircle,
  Sparkles,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const ShowcaseSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState(SHOWCASE_TABS[0].id);
  const [actionDone, setActionDone] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"cards" | "followup_center">("cards");

  const currentTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];

  const handleAction = (index: number) => {
    setActionDone((prev) => ({
      ...prev,
      [`${activeTabId}-${index}`]: true,
    }));
  };

  const tabOptions = SHOWCASE_TABS.map((t) => ({
    id: t.id,
    label: t.label,
    icon:
      t.alertType === "urgent" ? (
        <AlertCircle className="w-4 h-4 text-rose-500" />
      ) : t.alertType === "revenue" ? (
        <DollarSign className="w-4 h-4 text-emerald-500" />
      ) : t.alertType === "followup" ? (
        <Clock className="w-4 h-4 text-amber-500" />
      ) : (
        <CheckCircle className="w-4 h-4 text-primary" />
      ),
  }));

  return (
    <section className="py-20 sm:py-28 bg-surface-container-lowest border-y border-outline-variant/60 relative overflow-hidden">
      <Container size="xl">
        <SectionHeader
          badge="Interactive Follow-up & Intelligence Center"
          badgeVariant="primary"
          title="Your AI Chief of Staff in Action"
          subtitle="Explore how WorkRadar isolates critical signals, drafts executive responses, and protects your pipeline from stalled deals."
        />

        {/* View Mode & Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex justify-center flex-1">
            <Tabs
              tabs={tabOptions}
              activeTab={activeTabId}
              onChange={(id) => {
                setActiveTabId(id);
                if (id === "follow-ups") {
                  setViewMode("followup_center");
                }
              }}
              variant="pills"
            />
          </div>

          {/* Quick Toggle for Follow-up Center View */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-container-high rounded-xl border border-outline-variant/60">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "cards"
                  ? "bg-white text-primary shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Signal Feed
            </button>
            <button
              type="button"
              onClick={() => setViewMode("followup_center")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "followup_center"
                  ? "bg-white text-primary shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Full Follow-up Center
            </button>
          </div>
        </div>

        {/* Dynamic Display: Full Follow-up Center OR Feed Cards */}
        {viewMode === "followup_center" ? (
          <div className="max-w-6xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-low/40 shadow-xl overflow-hidden">
            <FollowUpCenterPreview />
          </div>
        ) : (
          /* Feed Cards View */
          <div className="max-w-5xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-low/40 p-6 sm:p-8 shadow-lg">
            {/* Header Description & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/60">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface">
                  {currentTab.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-outline-variant/50 shadow-xs">
                {currentTab.stats.map((stat, i) => (
                  <div key={i} className="text-center px-2">
                    <div className="text-xs text-secondary font-medium">{stat.label}</div>
                    <div className="text-sm font-bold text-on-surface mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Active Feed */}
            <div className="mt-6 space-y-4">
              {currentTab.mockData.map((item, index) => {
                const isDone = actionDone[`${activeTabId}-${index}`];
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border transition-all ${
                      isDone
                        ? "bg-emerald-50/50 border-emerald-300 opacity-70"
                        : "bg-white border-outline-variant/80 hover:border-primary/40 shadow-xs"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/20">
                          {item.avatar}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-on-surface">
                              {item.sender}
                            </span>
                            <span className="text-xs text-secondary">• {item.time}</span>
                            <Badge
                              variant={
                                item.impactScore > 90
                                  ? "error"
                                  : item.impactScore > 80
                                  ? "warning"
                                  : "primary"
                              }
                              size="sm"
                            >
                              Impact Score: {item.impactScore}%
                            </Badge>
                          </div>

                          <h4 className="text-sm font-semibold text-on-surface">
                            {item.subject}
                          </h4>

                          {/* AI Recommendation Box */}
                          <div className="mt-3 p-3 rounded-lg bg-blue-50/60 border border-blue-200/60 flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div className="text-xs text-on-surface">
                              <span className="font-bold text-primary">AI Assessment: </span>
                              {item.aiRecommendation}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 sm:self-center">
                        <Button
                          variant={isDone ? "secondary" : "primary"}
                          size="sm"
                          onClick={() => handleAction(index)}
                          rightIcon={isDone ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
                          className="w-full sm:w-auto text-xs"
                        >
                          {isDone ? "Action Executed" : item.actionLabel}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Security Note */}
            <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-secondary">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" /> Autonomous LLM triage running with SOC2 safeguards
              </span>
              <button
                type="button"
                onClick={() => setViewMode("followup_center")}
                className="text-primary font-bold hover:underline"
              >
                Open Full Follow-up Center &rarr;
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
