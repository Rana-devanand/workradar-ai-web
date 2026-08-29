"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { NAV_ITEMS } from "@/lib/data/landing-data";
import { cn } from "@/lib/utils";
import { Radar, Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onStartFree?: () => void;
  onLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartFree, onLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-outline-variant/80 shadow-xs"
          : "bg-surface/90 backdrop-blur-sm border-outline-variant/50"
      )}
    >
      <Container size="xl">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg pr-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs group-hover:bg-primary-hover transition-colors">
              <Radar className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-primary">
                WorkRadar
              </span>
              <span className="text-sm font-bold text-on-surface">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary font-extrabold shadow-xs"
                      : "text-secondary hover:text-on-surface hover:bg-surface-container-high"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogin}
              className="text-xs uppercase tracking-wider font-bold text-secondary hover:text-on-surface"
            >
              Login
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onStartFree}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs uppercase tracking-wider font-bold px-4 py-2 shadow-xs hover:shadow-primary/20"
            >
              Start Free
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onStartFree}
              className="sm:hidden text-xs uppercase tracking-wider px-3 py-1.5"
            >
              Start
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-secondary hover:text-on-surface rounded-lg hover:bg-surface-container-high focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-outline-variant/60 py-4 px-2 space-y-3 bg-surface-container-lowest/95 backdrop-blur-md rounded-b-2xl shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3.5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-secondary hover:text-primary hover:bg-surface-container-low"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-outline-variant/40 flex flex-col gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogin?.();
                }}
                className="w-full justify-center text-xs uppercase tracking-wider font-bold"
              >
                Login to Account
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartFree?.();
                }}
                className="w-full justify-center text-xs uppercase tracking-wider font-bold"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
