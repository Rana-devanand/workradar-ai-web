"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopAppBar } from "@/components/dashboard/TopAppBar";
import { PriorityScoreCard } from "@/components/dashboard/PriorityScoreCard";
import { AIDailyBriefCard } from "@/components/dashboard/AIDailyBriefCard";
import { SuggestedActionsCard } from "@/components/dashboard/SuggestedActionsCard";
import { UrgentEmailsCard } from "@/components/dashboard/UrgentEmailsCard";
import { RevenueRadarCard } from "@/components/dashboard/RevenueRadarCard";
import { MissedFollowupsCard } from "@/components/dashboard/MissedFollowupsCard";
import { UpcomingDeadlinesCard } from "@/components/dashboard/UpcomingDeadlinesCard";
import { AIActivityLogCard } from "@/components/dashboard/AIActivityLogCard";
import { useGetDashboardOverviewQuery } from "@/lib/redux/services/dashboardApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";
import { supabase } from "@/lib/supabaseClient";
import { slugifyOrg } from "@/lib/utils/slugify";
import { Building2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // Check stored organization
  const storedOrg =
    typeof window !== "undefined"
      ? localStorage.getItem("workradar_organization") || user?.companyName
      : user?.companyName;

  // Auto-redirect to /[orgSlug]/dashboard if organization is known
  useEffect(() => {
    if (storedOrg) {
      const slug = slugifyOrg(storedOrg);
      router.replace(`/${slug}/dashboard`);
    }
  }, [storedOrg, router]);

  // Parse Google OAuth / Supabase redirect session on mount
  useEffect(() => {
    async function checkOAuthSession() {
      if (typeof window === "undefined") return;

      // 1. Check Supabase OAuth Session
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        const sbUser = sessionData.session.user;
        const realName =
          sbUser.user_metadata?.full_name ||
          sbUser.user_metadata?.name ||
          sbUser.email?.split("@")[0] ||
          "User";

        const currentOrg =
          localStorage.getItem("workradar_organization") || "Acme Innovations";

        dispatch(
          setCredentials({
            user: {
              id: sbUser.id,
              email: sbUser.email || "",
              name: realName,
              fullName: realName,
              image: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture,
              role: "USER",
              planTier: "PRO",
              companyName: currentOrg,
            },
            accessToken: sessionData.session.access_token,
            refreshToken: sessionData.session.refresh_token,
          })
        );

        router.replace(`/${slugifyOrg(currentOrg)}/dashboard`);
        return;
      }

      // 2. Check Direct Google OAuth Hash in URL
      if (window.location.hash.includes("access_token=")) {
        const params = new URLSearchParams(window.location.hash.replace("#", "?"));
        const accessToken = params.get("access_token");

        if (accessToken) {
          try {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.ok) {
              const googleProfile = await res.json();
              const currentOrg =
                localStorage.getItem("workradar_organization") || "Acme Innovations";

              dispatch(
                setCredentials({
                  user: {
                    id: googleProfile.sub,
                    email: googleProfile.email,
                    name: googleProfile.name,
                    fullName: googleProfile.name,
                    image: googleProfile.picture,
                    role: "USER",
                    planTier: "PRO",
                    companyName: currentOrg,
                  },
                  accessToken,
                })
              );

              window.history.replaceState(null, "", window.location.pathname);
              router.replace(`/${slugifyOrg(currentOrg)}/dashboard`);
            }
          } catch (err) {
            // Handled
          }
        }
      }
    }

    checkOAuthSession();
  }, [dispatch, router]);

  const { data, isLoading } = useGetDashboardOverviewQuery(storedOrg || user?.id);
  const companyName = data?.organization?.companyName || storedOrg || "Acme Innovations";

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] antialiased flex h-screen overflow-hidden font-sans">
      {/* Side Navigation Bar */}
      <Sidebar />

      {/* Main Content Area (pl-[240px]) */}
      <div className="flex-1 pl-[240px] flex flex-col h-full bg-[#f7f9fb] relative">
        {/* Top App Bar with Search, Notifications, and Session Logout */}
        <TopAppBar />

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 w-full">
          <div className="max-w-[1280px] mx-auto flex flex-col gap-6 pb-8">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-[#565e74]">
                    {data?.date || "Tuesday, October 24"}
                  </p>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>Active Organization</span>
                  </span>
                </div>
                {/* Shows Company Name in headline */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#191c1e] tracking-tight flex items-center gap-2">
                  <span>{companyName}</span>
                </h2>
              </div>

              {/* Priority Score Widget */}
              <PriorityScoreCard data={data?.priorityScore} />
            </div>

            {/* Main Layout Grid (12 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Main Data (8 Cols) */}
              <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
                {/* Top Row: AI Brief & Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AIDailyBriefCard data={data?.dailyBrief} />
                  <SuggestedActionsCard items={data?.suggestedActions} />
                </div>

                {/* 2x2 Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UrgentEmailsCard items={data?.urgentEmails} />
                  <RevenueRadarCard items={data?.revenueRadar} />
                  <MissedFollowupsCard items={data?.missedFollowups} />
                  <UpcomingDeadlinesCard items={data?.upcomingDeadlines} />
                </div>
              </div>

              {/* Right Column: AI Activity Log (4 Cols) */}
              <div className="col-span-1 md:col-span-4 flex flex-col h-full">
                <AIActivityLogCard logs={data?.activityLogs} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
