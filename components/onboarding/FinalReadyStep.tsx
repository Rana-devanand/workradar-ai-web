"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateUser } from "@/lib/redux/slices/authSlice";
import { slugifyOrg } from "@/lib/utils/slugify";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Radar,
  Mail,
  Calendar,
  Building2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const FinalReadyStep: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { workspaceInfo, preferences, integrations } = useOnboardingStore();

  const handleGoToDashboard = () => {
    const realCompanyName = workspaceInfo.companyName || "Acme Innovations";
    const realRole = workspaceInfo.role || "Founder / CEO";

    // 1. Update Redux store with real organization details
    dispatch(
      updateUser({
        companyName: realCompanyName,
        role: "USER",
      })
    );

    // 2. Persist real organization to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("workradar_organization", realCompanyName);
      localStorage.setItem(
        "workradar_workspace_details",
        JSON.stringify({
          companyName: realCompanyName,
          role: realRole,
          preferences,
          integrations,
        })
      );
    }

    // 3. Navigate directly to org-scoped dashboard
    const orgSlug = slugifyOrg(realCompanyName);
    router.push(`/${orgSlug}/dashboard`);
  };

  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-8 py-2">
      {/* Top Celebratory Sparkle Badge */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-300 flex items-center justify-center shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg"
        />
      </motion.div>

      {/* Main Headline */}
      <div className="space-y-2.5">
        <Badge variant="success" size="md" pulse dot icon={<Sparkles className="w-3.5 h-3.5" />}>
          Setup Complete • 14-Day Pro Access Active
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Your Workspace is Live!
        </h2>
        <p className="text-sm sm:text-base text-secondary max-w-md mx-auto">
          WorkRadar AI is now continuously monitoring your active channels for <strong>{workspaceInfo.companyName || "your workspace"}</strong>.
        </p>
      </div>

      {/* Workspace Summary Card */}
      <div className="w-full p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/80 shadow-xs space-y-3.5 text-left text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/50">
          <span className="font-bold uppercase tracking-wider text-secondary">
            Workspace Summary
          </span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <Radar className="w-3.5 h-3.5 animate-pulse" /> Live Monitoring
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-secondary">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-outline">Organization:</span>
            <div className="font-bold text-on-surface text-sm flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              {workspaceInfo.companyName || "Acme Innovations"}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-outline">Operating Hours:</span>
            <div className="font-bold text-on-surface text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {preferences.workStartTime} - {preferences.workEndTime}
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-4 text-xs">
          <span className="text-[11px] font-mono text-outline">Connected:</span>
          <div className="flex items-center gap-3">
            <span className="font-medium text-on-surface flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-red-500" /> Gmail
            </span>
            <span className="font-medium text-on-surface flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" /> Google Calendar
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="pt-4 flex flex-col items-center space-y-3 w-full sm:w-auto">
        <Button
          variant="primary"
          size="lg"
          onClick={handleGoToDashboard}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-80 py-4 text-sm uppercase tracking-wider font-bold shadow-xl shadow-primary/25 hover:shadow-primary/35"
        >
          Go to Dashboard
        </Button>
        <span className="text-[11px] text-secondary font-mono flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Bank-grade encryption • Real-time AI Chief of Staff
        </span>
      </div>
    </div>
  );
};
