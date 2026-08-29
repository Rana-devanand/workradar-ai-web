import { apiSlice } from "./apiSlice";
import { DashboardOverviewResponse } from "@/lib/services/dashboardService";

export interface DashboardApiResponse {
  success: boolean;
  message?: string;
  data: DashboardOverviewResponse;
}

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<DashboardOverviewResponse, string | void>({
      query: (userId) => ({
        url: userId ? `/dashboards/overview?userId=${userId}` : "/dashboards/overview",
        method: "GET",
      }),
      transformResponse: (response: DashboardApiResponse) => {
        return response.data;
      },
      providesTags: ["Dashboard"],
    }),

    getAllDashboards: builder.query<any, void>({
      query: () => ({
        url: "/dashboards",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery, useGetAllDashboardsQuery } =
  dashboardApi;

