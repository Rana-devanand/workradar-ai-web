"use client";

import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  Clock,
  Send,
  Edit,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Mail,
  ArrowRight,
  DollarSign,
  ShieldAlert,
  Flame,
  UserCheck,
  Check,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

// ==========================================
// PENDING REPLIES DATA
// ==========================================
interface PendingThread {
  id: string;
  avatar: string;
  avatarBg: string;
  name: string;
  contact: string;
  lastTouched: string;
  badgeType: "error" | "warning" | "revenue";
  badgeLabel: string;
  snippet: string;
  revenueImpact: string;
  churnRisk: string;
  recommendedAction: string;
  draft: string;
}

const PENDING_THREADS: PendingThread[] = [
  {
    id: "thread-1",
    avatar: "AC",
    avatarBg: "bg-tertiary-container text-on-tertiary-container",
    name: "Acme Corp",
    contact: "Sarah Jenkins (VP Product)",
    lastTouched: "3 days ago",
    badgeType: "error",
    badgeLabel: "High Risk",
    snippet:
      '"Hi team, just checking in on the Q3 Enterprise License Renewal numbers we discussed last Tuesday. We need to finalize this before the quarter ends or we\'ll have to push to Q4."',
    revenueImpact: "$120,000 ARR",
    churnRisk: "45% increase in churn risk if unaddressed today",
    recommendedAction:
      "Send the finalized pricing tier PDF immediately. Assure them implementation can begin on the 1st.",
    draft: `Hi Sarah,

Apologies for the slight delay. I've attached the finalized Q3 Enterprise License Renewal numbers as discussed.

We are fully prepared to meet your end-of-quarter deadline and can begin implementation immediately upon sign-off.

Let me know if you need to schedule a quick 10-minute sync to review.

Best,
Alex Morgan`,
  },
  {
    id: "thread-2",
    avatar: "TG",
    avatarBg: "bg-secondary-container text-on-secondary-container",
    name: "TechGlobal",
    contact: "David Chen (Managing Partner)",
    lastTouched: "5 days ago",
    badgeType: "warning",
    badgeLabel: "Waiting on Us",
    snippet:
      '"Thanks for the demo. Could you send over the technical integration specs for the API? Our engineering lead wants to review them before we sign off."',
    revenueImpact: "$65,000 Deal Value",
    churnRisk: "Prospect may stall without technical validation",
    recommendedAction:
      "Attach the REST API & Webhook documentation and offer technical onboarding support.",
    draft: `Hi David,

Thanks for your patience! I've attached our complete technical integration architecture specifications and sandbox credentials.

Our solution architect is also available for a 15-minute sync with your engineering lead if helpful.

Best,
Alex Morgan`,
  },
  {
    id: "thread-3",
    avatar: "SL",
    avatarBg: "bg-emerald-100 text-emerald-800",
    name: "SparkLabs",
    contact: "Rachel Kim (Founder)",
    lastTouched: "2 days ago",
    badgeType: "revenue",
    badgeLabel: "Expansion Intent",
    snippet:
      '"Loved the executive dashboard! Can we add 15 more user seats and mobile licenses for our European growth team next month?"',
    revenueImpact: "+$18,500 Expansion ARR",
    churnRisk: "Hot expansion opportunity ready to close",
    recommendedAction:
      "Generate seat upgrade checkout link and offer multi-seat bundle discount.",
    draft: `Hi Rachel,

Thrilled to hear your team is getting immense value from WorkRadar!

I've generated an upgrade link with the 15-seat tier pre-applied with your existing volume discount.

Best,
Alex Morgan`,
  },
];

// ==========================================
// FOLLOW-UP RISKS DATA
// ==========================================
interface RiskThread {
  id: string;
  client: string;
  contact: string;
  avatar: string;
  avatarBg: string;
  daysIdle: number;
  slaStatus: "breached" | "warning" | "critical";
  dealSize: string;
  probabilityDrop: string;
  summary: string;
  lastMessage: string;
  suggestedNudge: string;
}

const RISK_THREADS: RiskThread[] = [
  {
    id: "risk-1",
    client: "ScaleWorks Enterprise",
    contact: "Marcus Vance (CTO)",
    avatar: "SW",
    avatarBg: "bg-rose-100 text-rose-800",
    daysIdle: 6,
    slaStatus: "critical",
    dealSize: "$85,000 ARR",
    probabilityDrop: "Close probability dropped from 80% → 42%",
    summary: "Sent revised SLA addendum 6 days ago with zero response. Follow-up SLA breached by 72 hours.",
    lastMessage: "'Send over the revised terms by Wednesday and we will sign off with legal.'",
    suggestedNudge: `Hi Marcus,

Hope your week is going smoothly! Checking in to see if you and legal had a chance to review the revised SLA terms sent last week.

Happy to jump on a brief 5-minute call if there are any lingering questions on section 3.2.

Best,
Alex Morgan`,
  },
  {
    id: "risk-2",
    client: "Finova Digital",
    contact: "Elena Rostova (VP Operations)",
    avatar: "FD",
    avatarBg: "bg-amber-100 text-amber-800",
    daysIdle: 4,
    slaStatus: "warning",
    dealSize: "$42,000 Annual Retainer",
    probabilityDrop: "Risk of competitor evaluation",
    summary: "Client asked for customer case studies in fintech after Tuesday demo. No materials sent yet.",
    lastMessage: "'Can you share 2 case studies of similar fintech companies using your platform?'",
    suggestedNudge: `Hi Elena,

Following up on our Tuesday demo! Attached are two case studies from Stripe and Revolut detailing how they implemented WorkRadar to reduce missed client follow-ups by 98%.

Let me know what you think!

Best,
Alex Morgan`,
  },
  {
    id: "risk-3",
    client: "Apex Venture Labs",
    contact: "Jonathan Reed (Partner)",
    avatar: "AV",
    avatarBg: "bg-blue-100 text-primary",
    daysIdle: 5,
    slaStatus: "warning",
    dealSize: "$30,000 Portfolio Pilot",
    probabilityDrop: "High intent fading",
    summary: "Promised to follow up regarding portfolio company rollout tier pricing.",
    lastMessage: "'Send me the portfolio package tiers when you get a chance.'",
    suggestedNudge: `Hi Jonathan,

As promised, here is the portfolio rollout package with volume licensing for your founders.

Let me know if this aligns with your portfolio roadmap!

Best,
Alex Morgan`,
  },
];

// ==========================================
// REVENUE OPPORTUNITIES DATA
// ==========================================
interface RevenueOp {
  id: string;
  company: string;
  contact: string;
  avatar: string;
  avatarBg: string;
  estimatedValue: string;
  intentScore: number;
  category: "Seat Upgrade" | "Custom Scope" | "Contract Renewal" | "Add-on Module";
  snippet: string;
  aiStrategy: string;
  draftProposal: string;
}

const REVENUE_OPS: RevenueOp[] = [
  {
    id: "rev-1",
    company: "HealthPulse Analytics",
    contact: "Tom Gallagher (Tech Lead)",
    avatar: "HP",
    avatarBg: "bg-emerald-100 text-emerald-800",
    estimatedValue: "+$24,000 ARR",
    intentScore: 98,
    category: "Seat Upgrade",
    snippet:
      '"Our clinical research team loved the demo. Can we add 35 more seats for the European division starting next billing cycle?"',
    aiStrategy: "High-probability expansion. Offer enterprise volume tier with 1-click self-serve checkout link.",
    draftProposal: `Hi Tom,

Delighted to hear the clinical research team is ready to onboard!

I've configured the 35-seat expansion tier with your existing volume discount applied ($24,000 ARR). You can approve with 1-click below:

[Upgrade HealthPulse Workspace →]

Best,
Alex Morgan`,
  },
  {
    id: "rev-2",
    company: "Vanguard Design Studio",
    contact: "Jordan Vance (Managing Director)",
    avatar: "VD",
    avatarBg: "bg-indigo-100 text-indigo-800",
    estimatedValue: "+$15,000 Scope",
    intentScore: 92,
    category: "Custom Scope",
    snippet:
      '"We love the Zoom meeting action item extractor. Can your team build a custom webhook integration to our internal Jira instance?"',
    aiStrategy: "Latent professional services & webhook add-on request. Attach custom integration scope brief.",
    draftProposal: `Hi Jordan,

Yes, absolutely! We support dedicated custom webhook pipelines for enterprise Jira workspaces.

I've attached our 2-week implementation milestone scope ($15,000 one-time). Let me know if you'd like to initiate setup.

Best,
Alex Morgan`,
  },
  {
    id: "rev-3",
    company: "Lumina Cloud",
    contact: "Maya Lin (VP Design)",
    avatar: "LC",
    avatarBg: "bg-cyan-100 text-cyan-800",
    estimatedValue: "+$9,500 Add-on",
    intentScore: 89,
    category: "Add-on Module",
    snippet:
      '"Can we enable the AI Unified Work Search across our 40,000 historical customer support transcripts?"',
    aiStrategy: "Semantic Search Index expansion tier query. High buying intent.",
    draftProposal: `Hi Maya,

Yes! Our high-volume semantic index add-on can ingest and vector-index all 40k historical transcripts within 2 hours.

I've attached the add-on module specification ($9,500/year). Let me know if you'd like me to activate it on your workspace.

Best,
Alex Morgan`,
  },
];

export const FollowUpCenterPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "risks" | "revenue">("pending");

  // State for Pending Replies Tab
  const [selectedPendingId, setSelectedPendingId] = useState<string>("thread-1");
  const [sentPending, setSentPending] = useState<Record<string, boolean>>({});

  // State for Follow-up Risks Tab
  const [selectedRiskId, setSelectedRiskId] = useState<string>("risk-1");
  const [sentRiskNudges, setSentRiskNudges] = useState<Record<string, boolean>>({});

  // State for Revenue Opportunities Tab
  const [selectedRevId, setSelectedRevId] = useState<string>("rev-1");
  const [sentRevProposals, setSentRevProposals] = useState<Record<string, boolean>>({});

  // Active items
  const currentPending =
    PENDING_THREADS.find((t) => t.id === selectedPendingId) || PENDING_THREADS[0];
  const currentRisk =
    RISK_THREADS.find((r) => r.id === selectedRiskId) || RISK_THREADS[0];
  const currentRev =
    REVENUE_OPS.find((r) => r.id === selectedRevId) || REVENUE_OPS[0];

  return (
    <div className="flex-1 p-4 sm:p-6 max-w-container-max mx-auto w-full flex flex-col gap-6 overflow-y-auto bg-background text-on-surface">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 border-b border-outline-variant/60 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Follow-up Center
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              AI has identified <span className="font-semibold text-primary">12 critical threads</span> requiring your attention today.
            </p>
          </div>
          <Badge variant="primary" size="sm" dot pulse>
            Continuous Radar Active
          </Badge>
        </div>

        {/* 3 Main Interactive Tabs */}
        <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-semibold border-b border-outline-variant/40 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`pb-2.5 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "pending"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-secondary hover:text-on-surface"
            }`}
          >
            <span>Pending Replies</span>
            <span className="bg-error text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
              3 New
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("risks")}
            className={`pb-2.5 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "risks"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-secondary hover:text-on-surface"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Follow-up Risks</span>
            <span className="bg-amber-100 text-amber-800 rounded-full px-1.5 py-0.2 text-[10px] font-bold">
              $157k at risk
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("revenue")}
            className={`pb-2.5 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "revenue"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-secondary hover:text-on-surface"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Revenue Opportunities</span>
            <span className="bg-emerald-100 text-emerald-800 rounded-full px-1.5 py-0.2 text-[10px] font-bold">
              +$48.5k
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PENDING REPLIES VIEW */}
      {/* ========================================================================= */}
      {activeTab === "pending" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Thread List */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            {PENDING_THREADS.map((thread) => {
              const isSelected = thread.id === selectedPendingId;
              const isSent = sentPending[thread.id];

              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedPendingId(thread.id)}
                  className={`rounded-xl p-4 sm:p-5 transition-all cursor-pointer relative overflow-hidden border ${
                    isSelected
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-surface-container-lowest border-outline-variant/70 hover:border-primary/40 shadow-xs"
                  }`}
                >
                  {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}

                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${thread.avatarBg}`}
                      >
                        {thread.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface leading-tight">
                          {thread.name} - {thread.contact}
                        </h3>
                        <p className="text-[11px] text-secondary font-mono">
                          Last touched: {thread.lastTouched}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                        thread.badgeType === "error"
                          ? "bg-error-container text-on-error-container"
                          : thread.badgeType === "revenue"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-secondary-container text-on-secondary-container"
                      }`}
                    >
                      {thread.badgeLabel}
                    </span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed mb-3 line-clamp-2 italic">
                    {thread.snippet}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-outline-variant/40">
                    <Button
                      variant={isSent ? "secondary" : "primary"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSentPending((prev) => ({ ...prev, [thread.id]: true }));
                      }}
                      rightIcon={
                        isSent ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )
                      }
                      className="text-xs py-1.5 px-3"
                    >
                      {isSent ? "Reply Dispatched" : "Draft Reply"}
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs py-1.5 px-3">
                      Snooze
                    </Button>
                    <span className="text-xs text-secondary ml-auto font-semibold">
                      Impact: {thread.revenueImpact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Insights Sidebar */}
          <aside className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/80 rounded-xl overflow-hidden shadow-sm flex flex-col shrink-0 p-4 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  AI Insight & Action
                </h3>
              </div>
              <span className="text-[10px] font-mono text-secondary">{currentPending.name}</span>
            </div>

            <div className="bg-error-container/20 rounded-lg p-3 border border-error-container/50 space-y-1">
              <h4 className="font-bold text-error uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Revenue Impact Warning
              </h4>
              <p className="text-secondary leading-relaxed">
                {currentPending.churnRisk}. This contract represents{" "}
                <strong className="text-on-surface">{currentPending.revenueImpact}</strong>.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-secondary text-[11px]">
                Recommended Action
              </h4>
              <p className="text-on-surface font-medium leading-relaxed">
                {currentPending.recommendedAction}
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <h4 className="font-bold uppercase tracking-wider text-secondary text-[11px]">
                AI Generated Draft
              </h4>
              <div className="bg-surface-container-low border border-outline-variant/60 rounded-lg p-3 text-on-surface font-sans leading-relaxed whitespace-pre-wrap shadow-inner text-xs max-h-52 overflow-y-auto">
                {currentPending.draft}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setSentPending((prev) => ({ ...prev, [currentPending.id]: true }))}
              rightIcon={
                sentPending[currentPending.id] ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )
              }
              className="w-full text-xs py-2.5 justify-center"
            >
              {sentPending[currentPending.id] ? "Reply Sent via Gmail" : "Send Reply Now"}
            </Button>
          </aside>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FOLLOW-UP RISKS VIEW */}
      {/* ========================================================================= */}
      {activeTab === "risks" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Risks Thread List */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            {/* Risk Summary Header Metric */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-amber-950">3 Deals At Immediate Churn Risk</span>
                  <p className="text-amber-800 text-[11px]">
                    Total Pipeline Exposure: <strong>$157,000</strong> without follow-up within 24 hours.
                  </p>
                </div>
              </div>
              <Badge variant="warning" size="sm">
                SLA Breached
              </Badge>
            </div>

            {RISK_THREADS.map((risk) => {
              const isSelected = risk.id === selectedRiskId;
              const isNudged = sentRiskNudges[risk.id];

              return (
                <div
                  key={risk.id}
                  onClick={() => setSelectedRiskId(risk.id)}
                  className={`rounded-xl p-4 sm:p-5 transition-all cursor-pointer relative overflow-hidden border ${
                    isSelected
                      ? "bg-amber-50/30 border-amber-500/80 shadow-sm"
                      : "bg-surface-container-lowest border-outline-variant/70 hover:border-amber-500/40 shadow-xs"
                  }`}
                >
                  {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${risk.avatarBg}`}
                      >
                        {risk.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface leading-tight">
                          {risk.client} - {risk.contact}
                        </h3>
                        <p className="text-[11px] text-rose-700 font-mono font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3 text-rose-600" />
                          {risk.daysIdle} Days Idle • {risk.slaStatus.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-on-surface bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/60">
                      {risk.dealSize}
                    </span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed mb-2 line-clamp-2">
                    {risk.summary}
                  </p>

                  <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-[11px] text-secondary italic mb-3">
                    Last Message: {risk.lastMessage}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40 text-xs">
                    <Button
                      variant={isNudged ? "secondary" : "primary"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSentRiskNudges((prev) => ({ ...prev, [risk.id]: true }));
                      }}
                      rightIcon={
                        isNudged ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )
                      }
                      className="text-xs py-1.5 px-3"
                    >
                      {isNudged ? "Nudge Dispatched" : "Send 1-Click Nudge"}
                    </Button>
                    <span className="text-[11px] text-amber-700 font-medium">
                      ⚠️ {risk.probabilityDrop}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk Detail Sidebar */}
          <aside className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/80 rounded-xl overflow-hidden shadow-sm flex flex-col shrink-0 p-4 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/60">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Risk Recovery Plan
                </h3>
              </div>
              <span className="text-[10px] font-mono text-secondary">{currentRisk.client}</span>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 flex items-center justify-between">
                <span>Deal Exposure: {currentRisk.dealSize}</span>
                <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono">
                  {currentRisk.daysIdle} Days Inactive
                </span>
              </div>
              <p className="text-secondary text-[11px] leading-relaxed">
                {currentRisk.probabilityDrop}. A quick, personalized message recovers 84% of delayed B2B threads.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <h4 className="font-bold uppercase tracking-wider text-secondary text-[11px]">
                Pre-Generated Polite Re-Engagement Nudge
              </h4>
              <div className="bg-surface-container-low border border-outline-variant/60 rounded-lg p-3 text-on-surface font-sans leading-relaxed whitespace-pre-wrap text-xs max-h-52 overflow-y-auto shadow-inner">
                {currentRisk.suggestedNudge}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setSentRiskNudges((prev) => ({ ...prev, [currentRisk.id]: true }))}
              rightIcon={
                sentRiskNudges[currentRisk.id] ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )
              }
              className="w-full text-xs py-2.5 justify-center"
            >
              {sentRiskNudges[currentRisk.id] ? "Re-engagement Nudge Sent" : "Send Recovery Nudge"}
            </Button>
          </aside>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: REVENUE OPPORTUNITIES VIEW */}
      {/* ========================================================================= */}
      {activeTab === "revenue" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Revenue Ops List */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            {/* Revenue Radar Header Metric */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950">
                    3 Expansion Opportunities Detected
                  </span>
                  <p className="text-emerald-800 text-[11px]">
                    Identified <strong>+$48,500 ARR</strong> in latent upsell and expansion requests.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                Active Intent
              </Badge>
            </div>

            {REVENUE_OPS.map((op) => {
              const isSelected = op.id === selectedRevId;
              const isProposed = sentRevProposals[op.id];

              return (
                <div
                  key={op.id}
                  onClick={() => setSelectedRevId(op.id)}
                  className={`rounded-xl p-4 sm:p-5 transition-all cursor-pointer relative overflow-hidden border ${
                    isSelected
                      ? "bg-emerald-50/30 border-emerald-500/80 shadow-sm"
                      : "bg-surface-container-lowest border-outline-variant/70 hover:border-emerald-500/40 shadow-xs"
                  }`}
                >
                  {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${op.avatarBg}`}
                      >
                        {op.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface leading-tight">
                          {op.company} - {op.contact}
                        </h3>
                        <p className="text-[11px] text-emerald-700 font-mono font-bold">
                          {op.category} • {op.intentScore}% Buying Intent
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      {op.estimatedValue}
                    </span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed mb-3 italic">
                    {op.snippet}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40 text-xs">
                    <Button
                      variant={isProposed ? "secondary" : "primary"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSentRevProposals((prev) => ({ ...prev, [op.id]: true }));
                      }}
                      rightIcon={
                        isProposed ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <ArrowRight className="w-3 h-3" />
                        )
                      }
                      className="text-xs py-1.5 px-3"
                    >
                      {isProposed ? "Proposal Sent" : "Send Upgrade Proposal"}
                    </Button>
                    <span className="text-[11px] text-secondary font-medium">
                      Strategy: {op.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revenue Opportunity Sidebar */}
          <aside className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/80 rounded-xl overflow-hidden shadow-sm flex flex-col shrink-0 p-4 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/60">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Expansion Strategy & Draft
                </h3>
              </div>
              <span className="text-[10px] font-mono text-secondary">{currentRev.company}</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center justify-between">
                <span>Estimated Value: {currentRev.estimatedValue}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                  {currentRev.intentScore}% Intent
                </span>
              </div>
              <p className="text-secondary text-[11px] leading-relaxed">
                {currentRev.aiStrategy}
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <h4 className="font-bold uppercase tracking-wider text-secondary text-[11px]">
                AI Formatted Proposal & Checkout Link
              </h4>
              <div className="bg-surface-container-low border border-outline-variant/60 rounded-lg p-3 text-on-surface font-sans leading-relaxed whitespace-pre-wrap text-xs max-h-52 overflow-y-auto shadow-inner">
                {currentRev.draftProposal}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setSentRevProposals((prev) => ({ ...prev, [currentRev.id]: true }))}
              rightIcon={
                sentRevProposals[currentRev.id] ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )
              }
              className="w-full text-xs py-2.5 justify-center"
            >
              {sentRevProposals[currentRev.id] ? "Upgrade Offer Dispatched" : "Send Upgrade Proposal"}
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
};
