"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { TrustSection } from "@/components/landing/TrustSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { DemoModal } from "@/components/landing/DemoModal";
import { AuthModal } from "@/components/landing/AuthModal";
import { INTEGRATIONS } from "@/lib/data/landing-data";
import {
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  Layers,
  Video,
  GitPullRequest,
  Inbox,
  Shield,
  Lock,
  CheckCircle,
  Plug,
} from "lucide-react";

const EXTENDED_INTEGRATIONS = [
  ...INTEGRATIONS,
  {
    name: "Microsoft Teams",
    category: "Chat",
    iconName: "message-square",
    color: "#5B5FC7",
    description: "Monitors channel mentions, executive chats, and direct commitments",
    status: "active" as const,
  },
  {
    name: "HubSpot CRM",
    category: "Sales",
    iconName: "layers",
    color: "#FF7A59",
    description: "Syncs pipeline stages, deal amounts, and contact timelines",
    status: "synced" as const,
  },
  {
    name: "Jira Software",
    category: "Dev",
    iconName: "git-pull-request",
    color: "#0052CC",
    description: "Extracts sprint commitments, bug triage items, and blockers",
    status: "connected" as const,
  },
  {
    name: "Asana",
    category: "Project",
    iconName: "layers",
    color: "#F06A6A",
    description: "Bi-directional sync of tasks and priority milestones",
    status: "connected" as const,
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <Mail className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  "file-text": <FileText className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  "git-pull-request": <GitPullRequest className="w-5 h-5" />,
  inbox: <Inbox className="w-5 h-5" />,
};

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "signup" | "login";
    plan?: string;
  }>({
    isOpen: false,
    mode: "signup",
  });

  const categories = ["All", "Email", "Calendar", "Chat", "Documents", "Meetings", "Dev", "Sales"];

  const filteredIntegrations =
    selectedCategory === "All"
      ? EXTENDED_INTEGRATIONS
      : EXTENDED_INTEGRATIONS.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

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
              <Badge variant="primary" size="md" pulse dot icon={<Plug className="w-3.5 h-3.5" />}>
                60-Second Instant Sync
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-on-surface max-w-4xl mx-auto leading-tight">
              Works Seamlessly With <span className="text-primary">Your Entire Stack</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
              Connect your email, calendars, video calls, and project repositories via read-only OAuth 2.0. No browser extensions or complex scripts required.
            </p>
          </Container>
        </section>

        {/* Directory Grid with Category Filter */}
        <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/60">
          <Container size="xl">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-xs"
                      : "bg-surface-container-high text-secondary hover:bg-surface-variant"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((tool) => (
                <div
                  key={tool.name}
                  className="p-6 rounded-2xl border border-outline-variant/70 bg-surface-container-low/40 hover:bg-surface-container-low hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: tool.color }}
                    >
                      {ICON_MAP[tool.iconName] || <Mail className="w-6 h-6" />}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync Ready
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-mono text-secondary uppercase">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between text-xs text-secondary">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-primary" /> Read-Only Scopes
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenSignup()}
                      className="font-bold text-primary hover:underline text-[11px]"
                    >
                      Connect &rarr;
                    </button>
                  </div>
                </div>
              ))}
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

