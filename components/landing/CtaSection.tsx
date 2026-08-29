"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import {
  Radar,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface CtaSectionProps {
  onStartFree?: (email?: string) => void;
}

interface LocationInfo {
  id: "usa" | "uk" | "india";
  name: string;
  flag: string;
  hubName: string;
  addressLines: string[];
  phone: string;
  email: string;
}

const LOCATIONS: LocationInfo[] = [
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    hubName: "GLOBAL HEADQUARTERS",
    addressLines: [
      "535 Mission St, 14th Floor,",
      "Financial District, San Francisco,",
      "CA 94105, United States",
    ],
    phone: "+1 (415) 800-3490",
    email: "enterprise@workradar.ai",
  },
  {
    id: "uk",
    name: "UK (EMEA)",
    flag: "🇬🇧",
    hubName: "EMEA INTELLIGENCE HUB",
    addressLines: [
      "100 Bishopsgate, Level 19,",
      "City of London, London,",
      "EC2N 4AG, United Kingdom",
    ],
    phone: "+44 20 7946 0912",
    email: "emea@workradar.ai",
  },
  {
    id: "india",
    name: "INDIA (APAC)",
    flag: "🇮🇳",
    hubName: "APAC ENGINEERING & INNOVATION",
    addressLines: [
      "100 Feet Road, HAL 2nd Stage,",
      "Indiranagar, Bangalore,",
      "Karnataka 560038, India",
    ],
    phone: "+91 80 4000 8920",
    email: "apac@workradar.ai",
  },
];

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartFree }) => {
  const [activeLocation, setActiveLocation] = useState<"usa" | "uk" | "india">("usa");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [selectedFlag, setSelectedFlag] = useState("🇺🇸");

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("1-10");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedLoc =
    LOCATIONS.find((loc) => loc.id === activeLocation) || LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onStartFree?.(email);
  };

  const handleCountryChange = (country: "usa" | "uk" | "india") => {
    setActiveLocation(country);
    if (country === "usa") {
      setPhoneCode("+1");
      setSelectedFlag("🇺🇸");
    } else if (country === "uk") {
      setPhoneCode("+44");
      setSelectedFlag("🇬🇧");
    } else {
      setPhoneCode("+91");
      setSelectedFlag("🇮🇳");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-surface relative overflow-hidden">
      {/* Background World Map Pattern & Primary Glow */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: WorkRadar AI Value Prop, Tagline, & Enterprise Hubs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <Badge variant="primary" size="md" pulse dot icon={<Sparkles className="w-3.5 h-3.5" />}>
                Zero-Risk Onboarding
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-[32px] font-bold text-on-surface tracking-tight leading-[1.18]">
                Ready To Stop Missing What Matters With AI-Powered Intelligence?
              </h2>

              <p className="text-sm sm:text-base text-secondary leading-relaxed font-normal">
                We value your time. Connect your workspace or request a personalized walkthrough with our Chief of Staff intelligence specialists within 24 hours.
              </p>
            </div>


            {/* Office & Hub Address Card */}
            <div className="pt-2 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs">
                {/* Landmark / Office Vector Icon in Brand Primary */}
                <div className="w-12 h-16 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-1.5 shrink-0 text-primary">
                  <Building2 className="w-6 h-6" />
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-on-surface flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold tracking-wider uppercase text-primary text-xs">
                      {selectedLoc.hubName}
                    </span>
                    <span className="text-xs text-secondary font-mono">
                      {selectedLoc.name}
                    </span>
                  </div>
                  {selectedLoc.addressLines.map((line, idx) => (
                    <p key={idx} className="text-secondary leading-snug text-xs">
                      {line}
                    </p>
                  ))}
                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="font-semibold text-on-surface flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary" /> {selectedLoc.phone}
                    </span>
                    <span className="text-secondary flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-primary" /> {selectedLoc.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Country Switcher Tabs */}
              <div className="flex items-center gap-6 pt-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleCountryChange(loc.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider pb-1 transition-all border-b-2 ${
                      activeLocation === loc.id
                        ? "border-primary text-primary"
                        : "border-transparent text-secondary hover:text-on-surface"
                    }`}
                  >
                    <span>{loc.name}</span>
                    <span className="text-base">{loc.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enterprise Guarantees */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-secondary">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero LLM Data Retention
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="w-4 h-4 text-primary" /> 60-Second 1-Click Sync
              </span>
            </div>
          </div>

          {/* Right Column: Contact & Consultation Form Card */}
          <div id="contact-form" className="lg:col-span-6">
            <div className="rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-6 sm:p-8 shadow-xl relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-on-surface">Consultation Request Received!</h4>
                  <p className="text-sm text-secondary max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-on-surface">{fullName || "there"}</span>. A WorkRadar AI intelligence advisor will reach out to <span className="font-semibold text-primary">{email}</span> within 24 hours.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs uppercase tracking-wider mt-4"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                    <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <Radar className="w-4 h-4 text-primary" />
                      Get WorkRadar Intelligence Access
                    </h4>
                    <span className="text-[11px] text-secondary font-mono">14-Day Trial</span>
                  </div>

                  {/* Row 1: Full name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                        Full name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email address */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                      Work Email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
                    />
                  </div>

                  {/* Row 3: Phone number with Country Code */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                      Phone number
                    </label>
                    <div className="flex rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-xs">
                      <div className="flex items-center gap-1.5 bg-surface-container-high px-3 border-r border-outline-variant text-xs font-semibold text-on-surface shrink-0 select-none">
                        <span>{selectedFlag}</span>
                        <span>{phoneCode}</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                      Your Priorities & Use Case
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about your team's workflow (e.g. Gmail follow-ups, Zoom meeting action extraction, Notion sync)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-y shadow-xs"
                    />
                  </div>

                  {/* Submit Button in WorkRadar Brand Primary */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="w-full rounded-full uppercase text-xs tracking-wider font-bold py-3.5 shadow-md hover:shadow-primary/25"
                    >
                      Send message & Claim Free Access
                    </Button>
                  </div>

                  <p className="text-[11px] text-center text-secondary pt-1">
                    🔒 No credit card required. SOC2 Type II bank-grade encryption.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
