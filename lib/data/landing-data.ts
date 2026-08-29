import {
  NavItem,
  Integration,
  ProblemItem,
  StepItem,
  FeatureItem,
  ShowcaseTab,
  UseCase,
  PricingPlan,
  FaqItem,
} from "@/types/landing";

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Integrations", href: "/integrations" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
];

export const INTEGRATIONS: Integration[] = [
  {
    name: "Gmail",
    category: "Email",
    iconName: "mail",
    color: "#EA4335",
    description: "Detects unanswered client threads and time-sensitive requests",
    status: "active",
  },
  {
    name: "Google Calendar",
    category: "Calendar",
    iconName: "calendar",
    color: "#4285F4",
    description: "Extracts preparation briefings and prep notes before calls",
    status: "active",
  },
  {
    name: "Google Drive",
    category: "Documents",
    iconName: "file-text",
    color: "#0F9D58",
    description: "Indexes proposals, contracts, briefs, and deliverables",
    status: "synced",
  },
  {
    name: "Slack",
    category: "Chat",
    iconName: "message-square",
    color: "#4A154B",
    description: "Monitors client DMs, team commitments, and blocked tasks",
    status: "active",
  },
  {
    name: "Notion",
    category: "Knowledge",
    iconName: "layers",
    color: "#000000",
    description: "Syncs project roadmaps, client databases, and notes",
    status: "synced",
  },
  {
    name: "Zoom",
    category: "Meetings",
    iconName: "video",
    color: "#2D8CFF",
    description: "Transcribes transcripts into clear action items with owners",
    status: "connected",
  },
  {
    name: "GitHub",
    category: "Dev",
    iconName: "git-pull-request",
    color: "#24292F",
    description: "Tracks pull requests, issue mentions, and critical reviews",
    status: "connected",
  },
  {
    name: "Microsoft Outlook",
    category: "Email",
    iconName: "inbox",
    color: "#0078D4",
    description: "Enterprise email and meeting sync with privacy compliance",
    status: "active",
  },
];

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    id: "followups",
    title: "Missed Follow-Ups",
    description: "High-value prospects and key clients slip through when conversations get buried in inbox clutter.",
    impact: "$24k+ lost pipeline / year",
    icon: "clock-alert",
    stat: "68% of warm leads never get a second follow-up",
    withoutAi: "Forget to reply after 3 days; prospect signs with competitor.",
    withRadar: "WorkRadar surfaces the thread with a 1-click draft before the lead goes cold.",
  },
  {
    id: "action-items",
    title: "Forgotten Action Items",
    description: "Agreed next steps inside 45-minute Zoom calls get lost in note apps and never make it to execution.",
    impact: "3.5 hrs wasted per week",
    icon: "check-square-offset",
    stat: "73% of meeting commitments are forgotten within 48h",
    withoutAi: "Dig through meeting notes or slack history trying to remember who owns what.",
    withRadar: "Action items are instantly parsed, assigned, and synchronized into your daily brief.",
  },
  {
    id: "revenue",
    title: "Hidden Revenue Opportunities",
    description: "Existing clients casually asking for add-ons or scope upgrades go unnoticed by busy founders.",
    impact: "15-25% uncaptured ARR",
    icon: "trending-up",
    stat: "1 in 4 emails contains latent upsell or referral intent",
    withoutAi: "Treat expansion questions as casual chit-chat and overlook the sale.",
    withRadar: "AI flags high-intent keywords and estimates expansion deal size automatically.",
  },
  {
    id: "overload",
    title: "Information Overload",
    description: "Switching between 6 different apps to piece together project status destroys deep work.",
    impact: "2.1 hrs lost context switching / day",
    icon: "layers-overflow",
    stat: "Knowledge workers check email & chat apps 77 times daily",
    withoutAi: "Constantly reactive, stressed by unread notification counters.",
    withRadar: "One centralized AI intelligence dashboard summarizes everything that actually matters.",
  },
];

export const STEP_ITEMS: StepItem[] = [
  {
    step: "01",
    title: "Connect",
    subtitle: "Zero-configuration 1-click sync",
    description: "Connect your existing stack in under 60 seconds. WorkRadar securely hooks into Gmail, Calendar, Slack, Drive, and Notion.",
    icon: "plug-zap",
    items: ["OAuth 2.0 zero password storage", "SOC2 Type II bank-grade encryption", "Read-only permission scopes"],
    gradient: "from-blue-600/10 to-indigo-600/10",
  },
  {
    step: "02",
    title: "Analyze",
    subtitle: "Continuous Context Intelligence",
    description: "Our privacy-first LLMs understand client relationships, pending commitments, deadlines, and urgency levels in real time.",
    icon: "brain-circuit",
    items: ["Detects intent, tone & urgency", "Cross-references meetings with emails", "Filters 95% of noise automatically"],
    gradient: "from-blue-600/10 to-cyan-600/10",
  },
  {
    step: "03",
    title: "Act",
    subtitle: "AI Chief of Staff Guidance",
    description: "Receive a proactive morning briefing and real-time radar alerts. Approve AI-suggested responses and actions with a single click.",
    icon: "sparkles",
    items: ["Daily 8:00 AM prioritized executive brief", "1-click response drafting with tone matching", "Deadline radar with smart push alerts"],
    gradient: "from-indigo-600/10 to-purple-600/10",
  },
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: "daily-brief",
    title: "AI Daily Brief",
    description: "Start every morning knowing exactly what deserves your attention. No more morning inbox dread.",
    badge: "Morning Routine",
    icon: "sun",
    highlight: "Delivered at 8:00 AM daily",
    metrics: { label: "Time saved every morning", value: "45 mins" },
    previewContent: {
      type: "brief",
      title: "Today's Executive Focus",
      details: [
        "2 Urgent Client Responses (Sarah @ Acme, Dave @ Venture)",
        "1 Scope Extension Proposal Due at 3:00 PM ($18,500)",
        "Prep brief ready for 11:30 AM Product Review call",
      ],
      actionTag: "Focus Mode Active",
    },
  },
  {
    id: "followup-radar",
    title: "Follow-Up Radar",
    description: "Continuously tracks every thread awaiting reply or requiring client check-in. Never lose a deal to silence.",
    badge: "Pipeline Protection",
    icon: "radar",
    highlight: "Autonomous SLA tracking",
    metrics: { label: "Follow-up recovery rate", value: "98.4%" },
    previewContent: {
      type: "radar",
      title: "Follow-Up Risk Alert",
      details: [
        "Marc (CTO at ScaleWorks) has not replied in 4 days",
        "Last message: 'Send contract draft by Thursday'",
        "AI Generated follow-up draft ready to review",
      ],
      actionTag: "Send in 1-Click",
    },
  },
  {
    id: "meeting-intel",
    title: "Meeting Intelligence",
    description: "Automatically extracts action items, assigned owners, and agreed commitments directly from calls and calendar notes.",
    badge: "Zero Manual Notes",
    icon: "video",
    highlight: "Instant post-call breakdown",
    metrics: { label: "Commitments tracked", value: "100%" },
    previewContent: {
      type: "meeting",
      title: "Sync with Design Agency (35m)",
      details: [
        "Action: Send updated Figma tokens (Assigned to Alex)",
        "Action: Confirm Phase 2 milestone budget by Friday",
        "Key Decision: Shift launch date to Oct 12th",
      ],
      actionTag: "3 Tasks Synced to Notion",
    },
  },
  {
    id: "ai-search",
    title: "AI Unified Work Search",
    description: "Ask natural language questions across all connected tools and receive synthesized answers with direct source citations.",
    badge: "Universal Context",
    icon: "search",
    highlight: "Cross-platform query engine",
    metrics: { label: "Average query speed", value: "0.4s" },
    previewContent: {
      type: "search",
      title: "Command: 'What did Stripe decide on pricing?'",
      details: [
        "Stripe approved $12/user tier on Slack #partnerships (May 14)",
        "Legal confirmed addendum attached in Drive /Contracts/Stripe_2026.pdf",
      ],
      actionTag: "2 Sources Verified",
    },
  },
];

export const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: "urgent-emails",
    label: "Urgent Emails",
    icon: "alert-circle",
    title: "Priority Inbox & High-Impact Threads",
    description: "WorkRadar filters hundreds of newsletters and spam to highlight the 3 emails that genuinely impact your business today.",
    alertType: "urgent",
    stats: [
      { label: "Emails Scanned", value: "142" },
      { label: "Urgent Flags", value: "3" },
      { label: "Avg Response Time", value: "12m" },
    ],
    mockData: [
      {
        sender: "Sarah Jenkins (VP Product, Lumina)",
        avatar: "SJ",
        subject: "Urgent: Need confirmation on Q3 contract terms before board call",
        time: "14m ago",
        impactScore: 98,
        aiRecommendation: "Requires immediate approval of section 4.2. Board meets at 2 PM.",
        actionLabel: "Approve Draft Reply",
      },
      {
        sender: "David Chen (Managing Partner, Apex)",
        avatar: "DC",
        subject: "Feedback on revised term sheet and cap table allocation",
        time: "1h ago",
        impactScore: 92,
        aiRecommendation: "Awaiting legal signature. No blocking terms identified.",
        actionLabel: "Review & Send",
      },
    ],
  },
  {
    id: "follow-ups",
    label: "Missed Follow-Ups",
    icon: "clock",
    title: "Intelligent Follow-Up Radar",
    description: "Identifies promising threads where the other party hasn't responded or where you promised to send something.",
    alertType: "followup",
    stats: [
      { label: "Pending Replies", value: "6" },
      { label: "Risk Score", value: "Low" },
      { label: "Deals Protected", value: "$48,000" },
    ],
    mockData: [
      {
        sender: "Marcus Vance (Director of Ops, CloudNest)",
        avatar: "MV",
        subject: "Re: Enterprise Pilot Implementation Timeline",
        time: "4 days ago",
        impactScore: 89,
        aiRecommendation: "Prospect requested pricing 4 days ago. High probability of closing if followed up today.",
        actionLabel: "Send Polite Nudge",
      },
      {
        sender: "Elena Rostova (Head of Growth, Finova)",
        avatar: "ER",
        subject: "Introductory chat next steps + case studies request",
        time: "3 days ago",
        impactScore: 85,
        aiRecommendation: "Promised Fintech case study during Tuesday Zoom call.",
        actionLabel: "Attach Case Study & Send",
      },
    ],
  },
  {
    id: "revenue-ops",
    label: "Revenue Opportunities",
    icon: "dollar-sign",
    title: "Latent Revenue & Expansion Radar",
    description: "Detects subtle buying signals, upsell queries, and referral opportunities inside client conversations.",
    alertType: "revenue",
    stats: [
      { label: "Opportunities", value: "4 Detected" },
      { label: "Estimated Value", value: "$32,500" },
      { label: "Conversion Rate", value: "+34%" },
    ],
    mockData: [
      {
        sender: "Tom Gallagher (Tech Lead, HealthPulse)",
        avatar: "TG",
        subject: "Can we add 15 more user seats for the European team?",
        time: "2h ago",
        impactScore: 95,
        aiRecommendation: "Expansion opportunity: $7,200 ARR upsell. User requested upgrade info.",
        actionLabel: "Generate Upgrade Link",
      },
      {
        sender: "Rachel Kim (Founder, SparkLabs)",
        avatar: "RK",
        subject: "Loved the dashboard! Can your team help us build the mobile version?",
        time: "5h ago",
        impactScore: 91,
        aiRecommendation: "Project expansion request. Recommended retainer scope: $15,000.",
        actionLabel: "Draft Proposal Brief",
      },
    ],
  },
  {
    id: "meeting-actions",
    label: "Meeting Actions",
    icon: "check-circle",
    title: "Automated Meeting Action Pipeline",
    description: "Zero manual note-taking. Action items and owners are parsed directly from video transcripts and synced to your project tools.",
    alertType: "meeting",
    stats: [
      { label: "Meetings Analyzed", value: "5 Today" },
      { label: "Action Items Extracted", value: "11 Items" },
      { label: "Owners Assigned", value: "100%" },
    ],
    mockData: [
      {
        sender: "Sprint Review & Planning (38m call)",
        avatar: "SR",
        subject: "Q4 Launch Strategy & API Migration",
        time: "Today 10:30 AM",
        impactScore: 88,
        aiRecommendation: "3 tasks assigned to you: (1) Finalize API schema, (2) Review AWS pricing, (3) Email marketing brief.",
        actionLabel: "Sync All Tasks to Notion",
      },
    ],
  },
];

export const USE_CASES: UseCase[] = [
  {
    id: "founders",
    role: "Founders & CEOs",
    badge: "Leadership & Scale",
    tagline: "Stay on top of investors, customers, and key strategic priorities without drowning in noise.",
    description:
      "When you wear ten hats, critical investor updates or enterprise deal blockers can easily slip. WorkRadar acts as your 24/7 AI Chief of Staff.",
    keyBenefits: [
      "Prioritizes investor and key customer communications automatically",
      "Flags contract and proposal deadlines with 48h lead time",
      "Executive morning summary in under 2 minutes",
    ],
    metrics: "Saves 7+ hours per week on inbox triage",
    quote: {
      text: "WorkRadar feels like having a world-class Chief of Staff who reads every message and hands me the 3 things that actually move the needle.",
      author: "Alex Rivera",
      role: "Founder & CEO",
      company: "Synthetix AI",
    },
  },
  {
    id: "freelancers",
    role: "Freelancers & Solopreneurs",
    badge: "Client Retention",
    tagline: "Manage multiple high-paying clients and never lose an opportunity or forget a deliverable.",
    description:
      "Solo operators don't have project managers. WorkRadar ensures every client gets fast follow-ups, invoices go out on time, and deliverables never get missed.",
    keyBenefits: [
      "Never miss a client follow-up or revision request",
      "Track scopes and promises made on video calls",
      "Instant 1-click draft responses in your exact voice",
    ],
    metrics: "32% increase in repeat client retainers",
    quote: {
      text: "I haven't lost a single client lead since turning WorkRadar on. It spotted a \$9k project scope request I almost glossed over in email.",
      author: "Maya Lin",
      role: "Senior Product Designer",
      company: "Independent Consultant",
    },
  },
  {
    id: "agencies",
    role: "Digital & Creative Agencies",
    badge: "Account Management",
    tagline: "Track dozens of client projects, SLAs, and hidden scope creep across your entire agency.",
    description:
      "Agencies juggle hundreds of daily client threads. WorkRadar tracks client commitments, extracts deliverables, and flags accounts requiring immediate touchpoints.",
    keyBenefits: [
      "Account-by-account health and response SLA monitoring",
      "Catch scope creep before unpaid work happens",
      "Unified client search across Slack, Gmail, and Google Drive",
    ],
    metrics: "100% SLA compliance on key client retainers",
    quote: {
      text: "Our account managers can handle 2x more clients without dropping the ball. The revenue opportunity detector alone paid for the year in week one.",
      author: "Jordan Vance",
      role: "Managing Director",
      company: "Vanguard Studio",
    },
  },
  {
    id: "consultants",
    role: "Management Consultants",
    badge: "Knowledge & Delivery",
    tagline: "Effortlessly organize complex client meetings, action items, and executive deliverables.",
    description:
      "Turn 20 hours of weekly client workshops into structured action item databases and executive summaries without spending evenings typing notes.",
    keyBenefits: [
      "Automated meeting synthesis with owner attribution",
      "Universal AI search across all engagement documents",
      "Security compliance and strict data compartmentalization",
    ],
    metrics: "4.5 hours saved per client engagement",
    quote: {
      text: "The meeting intelligence and semantic search across my past 6 months of client notes is extraordinary. Instant recall of any client decision.",
      author: "David Sterling",
      role: "Principal Advisor",
      company: "Sterling Advisory Group",
    },
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 0,
    priceAnnual: 0,
    description: "Essential intelligence for individual professionals and solo creators.",
    ctaText: "Start Free Forever",
    ctaVariant: "outline",
    features: [
      "1 Connected Gmail Account",
      "1 Google Calendar Integration",
      "Daily Morning Intelligence Brief",
      "50 AI Follow-Up Queries / month",
      "Standard 48-hour email history sync",
      "Web Dashboard & Chrome Extension",
    ],
    notIncluded: ["Meeting video action item extractor", "Multi-app unified AI search", "Revenue opportunity detector"],
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Most Popular",
    isPopular: true,
    priceMonthly: 19,
    priceAnnual: 15,
    description: "Complete AI Chief of Staff for ambitious founders, consultants, and freelancers.",
    ctaText: "Start 14-Day Free Trial",
    ctaVariant: "primary",
    features: [
      "Unlimited Gmail & Outlook Accounts",
      "Google Calendar, Notion & Slack Sync",
      "AI Follow-Up Radar & Urgent Triage",
      "Meeting Intelligence & Action Extractor",
      "Full Unified AI Natural Language Search",
      "Revenue Opportunity & Upsell Hunter",
      "Priority SLA Response drafting",
      "Full 1-year historical context memory",
    ],
  },
  {
    id: "business",
    name: "Business",
    badge: "For Teams & Agencies",
    priceMonthly: 49,
    priceAnnual: 39,
    description: "Shared intelligence and collaborative account management for growing teams.",
    ctaText: "Get Started with Business",
    ctaVariant: "secondary",
    features: [
      "Everything in Pro, plus:",
      "Team Workspaces & Shared Intelligence",
      "Client Account SLA Health Dashboards",
      "Shared Meeting Action Assignment",
      "Custom Tone & Brand Voice Guidelines",
      "Dedicated Account Manager",
      "SOC2 Type II & HIPAA Compliance reports",
      "Custom API & Webhook Integrations",
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    category: "General",
    question: "What exactly does WorkRadar AI do?",
    answer:
      "WorkRadar AI acts as your proactive AI Chief of Staff. Instead of requiring you to prompt a chatbot, WorkRadar continuously monitors your connected tools (Gmail, Calendar, Slack, Drive, Notion, Zoom) in the background to automatically identify missed client follow-ups, urgent deadlines, pending meeting commitments, and hidden revenue opportunities.",
  },
  {
    category: "General",
    question: "Does WorkRadar send emails or messages automatically?",
    answer:
      "No. You remain in complete control. WorkRadar generates high-fidelity draft responses and suggested action items, but nothing is ever sent without your explicit review and 1-click approval.",
  },
  {
    category: "Security",
    question: "How secure is my data and email content?",
    answer:
      "Security and privacy are foundational. WorkRadar uses bank-grade 256-bit AES encryption at rest and TLS 1.3 in transit. We are SOC2 Type II certified. Crucially, your private data is never used to train foundational AI models, and we operate under strict zero-retention policies for raw message content.",
  },
  {
    category: "Integrations",
    question: "How difficult is it to connect my existing tools?",
    answer:
      "Setup takes less than 60 seconds. We use standard OAuth 2.0 authorization for Google Workspace, Microsoft 365, Slack, Notion, and Zoom. There are no browser scripts or complex API keys required.",
  },
  {
    category: "Integrations",
    question: "Can I disconnect integrations or delete my data anytime?",
    answer:
      "Yes, absolutely. With a single click in your Settings dashboard, you can revoke any tool connection, and request instant permanent purging of all indexed vectors and cached summaries.",
  },
  {
    category: "Product",
    question: "How does the Follow-Up Radar track pending client threads?",
    answer:
      "WorkRadar tracks sentiment, SLA timers, and conversational context across all outgoing threads. When a prospect or high-value client has not replied within the optimal timeframe, WorkRadar alerts you with a pre-written, context-aware nudge draft.",
  },
  {
    category: "Intelligence",
    question: "What AI models does WorkRadar use under the hood?",
    answer:
      "We utilize state-of-the-art reasoning LLMs combined with private semantic vector embeddings. All processing is isolated and adheres to enterprise zero-retention compliance guarantees.",
  },
  {
    category: "Meetings",
    question: "Can WorkRadar extract action items from Zoom & Google Meet calls?",
    answer:
      "Yes! When synced with your calendar or video recorder, WorkRadar ingests call transcripts to automatically isolate commitments, decisions, assigned owners, and deliverables—syncing them directly to your Notion or task manager.",
  },
  {
    category: "Revenue",
    question: "How does WorkRadar detect hidden revenue opportunities?",
    answer:
      "Our natural language models identify latent buying signals, add-on scope inquiries, seat upgrade requests, and referral introductions that often get lost in casual email and Slack threads.",
  },
  {
    category: "Pricing",
    question: "Is there a free trial for the Pro plan?",
    answer:
      "Yes! We offer a full 14-day free trial on the Pro plan with no credit card required upfront. You can experience the full power of the AI Chief of Staff risk-free.",
  },
  {
    category: "Teams",
    question: "Does WorkRadar support team workspaces & shared intelligence?",
    answer:
      "Yes! On the Business plan, team members can collaborate on client accounts, view shared response SLAs, assign meeting action items, and maintain unified customer visibility.",
  },
  {
    category: "Customization",
    question: "Can I customize the AI's tone of voice and brand guidelines?",
    answer:
      "Yes. WorkRadar analyzes your existing sent communications to adapt to your natural writing style, and allows custom tone instructions (concise, executive, consultative, technical).",
  },
];

export const HERO_METRICS = [
  { label: "Active Professionals", value: "24,000+" },
  { label: "Revenue Protected", value: "\$18.4M" },
  { label: "Missed Follow-ups Saved", value: "480,000+" },
  { label: "Average Time Saved / Week", value: "6.5 hrs" },
];

