export interface PriorityScoreData {
  score: number;
  maxScore: number;
  status: string;
  changePercentage?: string;
}

export interface DailyBriefData {
  summary: string;
  urgentCount: number;
  suggestedActionsCount: number;
}

export interface SuggestedActionItem {
  id: string;
  title: string;
  estimatedTime: string;
  category: "response" | "calendar" | "general";
}

export interface UrgentEmailItem {
  id: string;
  sender: string;
  subject: string;
  urgencyScore: number;
}

export interface RevenueRadarItem {
  id: string;
  name: string;
  status: string;
  value: string;
}

export interface MissedFollowupItem {
  id: string;
  title: string;
  dueText: string;
  completed?: boolean;
}

export interface UpcomingDeadlineItem {
  id: string;
  title: string;
  time: string;
}

export interface ActivityLogItem {
  id: string;
  text: string;
  timestamp: string;
  icon: string;
}

export interface OrganizationData {
  companyName: string;
  roleTitle?: string;
  timezone?: string;
  workdayHours?: string;
  connectedIntegrations?: string[];
}

export interface DashboardOverviewResponse {
  date: string;
  greeting: string;
  organization?: OrganizationData;
  priorityScore: PriorityScoreData;
  dailyBrief: DailyBriefData;
  suggestedActions: SuggestedActionItem[];
  urgentEmails: UrgentEmailItem[];
  revenueRadar: RevenueRadarItem[];
  missedFollowups: MissedFollowupItem[];
  upcomingDeadlines: UpcomingDeadlineItem[];
  activityLogs: ActivityLogItem[];
}

const FALLBACK_DASHBOARD: DashboardOverviewResponse = {
  date: "Tuesday, October 24",
  greeting: "Good Morning, Alex",
  priorityScore: {
    score: 85,
    maxScore: 100,
    status: "High efficiency today",
    changePercentage: "+4.2%",
  },
  dailyBrief: {
    summary:
      "You have 3 urgent emails requiring attention before noon. The Q3 strategy meeting prep is mostly complete, but you're missing the latest revenue figures from Sarah.",
    urgentCount: 3,
    suggestedActionsCount: 2,
  },
  suggestedActions: [
    {
      id: "act-1",
      title: "Draft response to TechCorp RFP",
      estimatedTime: "Takes ~15 mins",
      category: "response",
    },
    {
      id: "act-2",
      title: "Reschedule 1:1 with Design Team",
      estimatedTime: "Conflict detected",
      category: "calendar",
    },
  ],
  urgentEmails: [
    {
      id: "urg-1",
      sender: "Michael Chang",
      subject: "Critical block on deployment pipeline...",
      urgencyScore: 99,
    },
    {
      id: "urg-2",
      sender: "Elena Rostova",
      subject: "Contract revision required before EoD.",
      urgencyScore: 95,
    },
  ],
  revenueRadar: [
    {
      id: "rev-1",
      name: "Acme Corp Upsell",
      status: "High Intent detected",
      value: "+$45k",
    },
    {
      id: "rev-2",
      name: "Nexus Renewal",
      status: "At risk - Action needed",
      value: "$12k",
    },
  ],
  missedFollowups: [
    {
      id: "task-1",
      title: "Send API docs to DevTeam",
      dueText: "Due yesterday",
      completed: false,
    },
    {
      id: "task-2",
      title: "Review Q3 Marketing Spend",
      dueText: "Due 2 days ago",
      completed: false,
    },
  ],
  upcomingDeadlines: [
    {
      id: "dl-1",
      title: "Board Deck Finalization",
      time: "Today, 2:00 PM",
    },
    {
      id: "dl-2",
      title: "Weekly Sync",
      time: "Tomorrow, 10:00 AM",
    },
  ],
  activityLogs: [
    {
      id: "log-1",
      text: "Analyzed 42 incoming emails and flagged 3 as critical.",
      timestamp: "2 mins ago",
      icon: "mail",
    },
    {
      id: "log-2",
      text: "Automatically rescheduled Design Sync to avoid conflict.",
      timestamp: "15 mins ago",
      icon: "calendar",
    },
    {
      id: "log-3",
      text: "Synced latest CRM data and updated Revenue Radar.",
      timestamp: "1 hour ago",
      icon: "database",
    },
    {
      id: "log-4",
      text: "Generated Daily Briefing based on overnight activity.",
      timestamp: "3 hours ago",
      icon: "file-text",
    },
  ],
};

export const fetchDashboardOverview = async (
  userId: string = "usr_alex_morgan"
): Promise<DashboardOverviewResponse> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  try {
    const res = await fetch(`${apiUrl}/dashboards/overview?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return FALLBACK_DASHBOARD;
    }

    const responseData = await res.json();
    return responseData.data || FALLBACK_DASHBOARD;
  } catch (error) {
    // Return production fallback if backend is running separately or offline
    return FALLBACK_DASHBOARD;
  }
};

