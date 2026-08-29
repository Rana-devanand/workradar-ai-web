"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import {
  Sparkles,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface HeroSectionProps {
  onStartFree: () => void;
  onWatchDemo: () => void;
}

const TYPEWRITER_PHRASES = [
  "what matters.",
  "critical follow-ups.",
  "urgent deadlines.",
  "meeting commitments.",
  "key priorities.",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartFree, onWatchDemo }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTarget = TYPEWRITER_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentTarget) {
      // Completed phrase, hold smoothly for 2.4s
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayedText === "") {
      // Deleted phrase, switch to next and pause briefly
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      timer = setTimeout(() => {}, 350);
    } else {
      // Smooth dynamic typing cadence
      const speed = isDeleting ? 30 : 65;
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentTarget.substring(0, prev.length - 1)
            : currentTarget.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Soft Ambient Radial Glow (No square grid lines) */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[350px] sm:h-[480px] bg-gradient-to-tr from-primary/15 via-blue-500/10 to-indigo-500/5 blur-[140px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-sky-400/8 blur-[120px] rounded-full pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Hero Header Text */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center justify-center">
            <Badge
              variant="glow"
              size="md"
              pulse
              dot
              icon={<Sparkles className="w-3.5 h-3.5 text-primary" />}
              className="px-3.5 py-1.5 shadow-sm font-medium"
            >
              AI-Powered Work Intelligence Platform
            </Badge>
          </div>

          {/* Single-Line Fluid Headline with Ultra-Smooth Typewriter Effect */}
          <div className="flex items-center justify-center min-h-[50px] sm:min-h-[70px] lg:min-h-[84px]">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-tight text-center inline-flex items-center justify-center flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-3">
              <span className="shrink-0">Never miss</span>
              <span className="text-primary inline-flex items-center shrink-0">
                <span>{displayedText}</span>
                <span className="inline-block w-[3px] sm:w-[4px] h-[1.1em] bg-primary ml-1.5 align-middle rounded-full animate-pulse opacity-90" />
              </span>
            </h1>
          </div>

          {/* Subheadline (Refined without revenue references) */}
          <p className="text-base sm:text-lg lg:text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-normal">
            WorkRadar continuously monitors your emails, meetings, documents, and tasks to eliminate inbox overload, surface critical follow-ups, and keep your daily commitments on track.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onStartFree}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto px-8 text-sm uppercase tracking-wider font-bold shadow-md hover:shadow-primary/20"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onWatchDemo}
              leftIcon={<PlayCircle className="w-5 h-5 text-primary" />}
              className="w-full sm:w-auto px-6 text-sm uppercase tracking-wider font-bold"
            >
              Watch Interactive Demo
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-secondary">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free 14-day trial
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 60-second setup
            </span>
          </div>
        </div>

        {/* Dashboard Visual Preview - WorkRadar AI Chief of Staff Live Engine */}
        <div className="mt-14 sm:mt-20 max-w-[1240px] mx-auto">
          <DashboardPreview />
        </div>
      </Container>
    </section>
  );
};
