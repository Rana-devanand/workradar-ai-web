"use client";

import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Badge } from "@/components/common/Badge";
import { Radar, Sparkles, CheckCircle2, ShieldCheck, Mail, Lock } from "lucide-react";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signup" | "login";
  defaultPlan?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "signup",
  defaultPlan,
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === "signup"
          ? defaultPlan
            ? `Start Free Trial (${defaultPlan.toUpperCase()} Plan)`
            : "Create your WorkRadar AI Account"
          : "Sign in to WorkRadar AI"
      }
      description={
        mode === "signup"
          ? "Get instant 14-day access to your continuous AI Chief of Staff."
          : "Access your intelligence hub and active priority radar."
      }
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-4 animate-in fade-in duration-200">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-on-surface">Welcome to WorkRadar AI!</h4>
          <p className="text-xs text-secondary max-w-xs mx-auto">
            We've sent a magic activation link to <span className="font-semibold text-on-surface">{email || "your email"}</span>. Click it to connect your first integration.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            className="w-full text-xs uppercase tracking-wider font-bold"
          >
            Close & Go to Inbox
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsSuccess(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors text-xs font-semibold text-on-surface shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSuccess(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors text-xs font-semibold text-on-surface shadow-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/60" />
            </div>
            <span className="relative bg-surface-container-lowest px-2 text-[10px] uppercase font-bold text-secondary">
              Or with work email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Work Email"
              type="email"
              required
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full text-xs uppercase tracking-wider font-bold py-3 mt-2"
            >
              {mode === "signup" ? "Start Free 14-Day Trial" : "Sign In"}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="pt-2 text-center text-xs text-secondary">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-primary hover:underline"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-bold text-primary hover:underline"
                >
                  Sign up free
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

