import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      // Automatically attach JWT token from state or localStorage
      const token =
        (getState() as any)?.auth?.accessToken ||
        (typeof window !== "undefined" ? localStorage.getItem("workradar_token") : null);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Dashboard", "Followup", "Integration", "Consultation"],
  endpoints: () => ({}),
});

