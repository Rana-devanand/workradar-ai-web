"use client";

import React, { useEffect, use } from "react";
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
import { Building2 } from "lucide-react";

interface PageProps {
  params: Promise<{ orgSlug: string }>;
}

export default function OrgDashboardPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const orgSlug = resolvedParams.orgSlug;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // Parse Google OAuth / Supabase redirect session on mount
  useEffect(() => {
    async function checkOAuthSession() {
      if (typeof window === "undefined") return;

      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        const sbUser = sessionData.session.user;
        const realName =
          sbUser.user_metadata?.full_name ||
          sbUser.user_metadata?.name ||
          sbUser.email?.split("@")[0] ||
          "User";

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
              companyName:
                localStorage.getItem("workradar_organization") ||
                decodeURIComponent(orgSlug).replace(/-/g, " "),
            },
            accessToken: sessionData.session.access_token,
            refreshToken: sessionData.session.refresh_token,
          })
        );
      }
    }

    checkOAuthSession();
  }, [dispatch, orgSlug]);

  const storedOrg =
    typeof window !== "undefined"
      ? localStorage.getItem("workradar_organization") || user?.companyName
      : user?.companyName;

  // Format display company name
  const rawOrg =
    dataOrg(storedOrg) ||
    decodeURIComponent(orgSlug)
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const { data, isLoading } = useGetDashboardOverviewQuery(rawOrg || user?.id);
  const companyName = data?.organization?.companyName || rawOrg || "Organization Workspace";

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
            {/* Dashboard Header - Displays Company Name Prominently */}
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
                {/* Replaced "Good Morning" with Company Name */}
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

function dataOrg(name?: string) {
  if (!name || name === "Acme Innovations") return undefined;
  return name;
}

