export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface Integration {
  name: string;
  category: string;
  iconName: string;
  color: string;
  description: string;
  status: "active" | "connected" | "synced";
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  impact: string;
  icon: string;
  stat: string;
  withoutAi: string;
  withRadar: string;
}

export interface StepItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  items: string[];
  gradient: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
  highlight: string;
  metrics: { label: string; value: string };
  previewContent: {
    type: "brief" | "radar" | "meeting" | "search";
    title: string;
    details: string[];
    actionTag: string;
  };
}

export interface ShowcaseTab {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  alertType: "urgent" | "revenue" | "followup" | "meeting";
  mockData: {
    sender: string;
    avatar: string;
    subject: string;
    time: string;
    impactScore: number;
    aiRecommendation: string;
    actionLabel: string;
  }[];
}

export interface UseCase {
  id: string;
  role: string;
  badge: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  metrics: string;
  quote: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  ctaText: string;
  ctaVariant: "primary" | "secondary" | "outline";
  features: string[];
  notIncluded?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

