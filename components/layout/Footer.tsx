"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Badge } from "@/components/common/Badge";
import { Radar, ArrowRight, ShieldCheck, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/80 w-full pt-16 pb-12 mt-auto">
      <Container size="xl">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-outline-variant/50">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Radar className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                WorkRadar <span className="text-on-surface text-base font-semibold">AI</span>
              </span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed max-w-sm">
              The continuous AI Chief of Staff that monitors your communications, meetings, and documents so you never miss what matters.
            </p>
            <div className="pt-2">
              <Badge variant="success" dot pulse size="sm">
                Systems Operational • SOC2 Certified
              </Badge>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Product</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="/use-cases" className="hover:text-primary transition-colors">Use Cases</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Trust & Legal</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Data Processing Addendum</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Product Updates</h4>
            <p className="text-xs text-secondary leading-relaxed">
              Subscribe for weekly release notes and executive AI workflows.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You are subscribed to WorkRadar intelligence!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-1.5 text-xs"
                  />
                  <Button type="submit" variant="primary" size="sm" className="px-3 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>256-bit Bank-Grade Encryption • Zero Data Retention Model</span>
          </div>
          <div>
            © {new Date().getFullYear()} WorkRadar AI Inc. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};
