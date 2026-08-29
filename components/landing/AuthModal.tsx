"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
} from "@/lib/redux/services/authApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";
import { supabase } from "@/lib/supabaseClient";
import {
  CheckCircle2,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // RTK Query Mutations
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

  const isLoading = isLoginLoading || isRegisterLoading || isGoogleLoading;

  // Real Email & Password Login / Signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (mode === "login") {
        const response = await loginMutation({ email, password }).unwrap();

        if (response.success && response.data?.accessToken) {
          dispatch(
            setCredentials({
              user: response.data.user,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          onClose();
          router.push("/dashboard");
        } else {
          setErrorMessage(response.message || "Invalid email or password");
        }
      } else {
        const response = await registerMutation({
          name: fullName || email.split("@")[0],
          fullName: fullName || email.split("@")[0],
          email,
          password,
        }).unwrap();

        if (response.success) {
          if (response.data?.accessToken && response.data?.user) {
            dispatch(
              setCredentials({
                user: response.data.user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              })
            );
          }
          setIsSuccess(true);
        } else {
          setErrorMessage(response.message || "Failed to create account");
        }
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.data?.error ||
        err?.error ||
        "Authentication failed. Please check your credentials and try again.";
      setErrorMessage(typeof msg === "string" ? msg : "Authentication request failed");
    }
  };

  // Real Google OAuth Flow via Supabase & Google Client ID
  const handleGoogleOAuth = async () => {
    setErrorMessage(null);
    try {
      // 1. Trigger real Google OAuth with Supabase / Google OAuth 2.0
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        // Direct OAuth URL fallback with Google Client ID
        const googleClientId =
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
          "637926928192-g0lcl8dhafr9fbdqmn9cvadrcsngjh90.apps.googleusercontent.com";
        const redirectUri = encodeURIComponent(
          typeof window !== "undefined" ? `${window.location.origin}/dashboard` : "http://localhost:3000/dashboard"
        );
        const scope = encodeURIComponent("openid email profile");
        const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`;

        window.location.href = oauthUrl;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Google authentication failed");
    }
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
          <h4 className="text-lg font-bold text-on-surface">Account Created Successfully!</h4>
          <p className="text-xs text-secondary max-w-xs mx-auto">
            Welcome to WorkRadar AI. Let&apos;s set up your workspace operating preferences.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/onboarding"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-primary text-white text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-hover transition-colors"
            >
              Set Up Workspace &rarr;
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClose();
                router.push("/dashboard");
              }}
              className="w-full text-xs text-secondary"
            >
              Go Directly to Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Real Google OAuth Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleOAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all text-xs font-bold text-on-surface shadow-xs cursor-pointer disabled:opacity-50"
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
              <span>Continue with Google</span>
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

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <Input
                label="Full Name"
                type="text"
                required
                placeholder="Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
              />
            )}

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
              disabled={isLoading}
              className="w-full text-xs uppercase tracking-wider font-bold py-3 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{mode === "signup" ? "Start Free 14-Day Trial" : "Sign In"}</span>
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="pt-2 text-center text-xs text-secondary">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage(null);
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage(null);
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
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
