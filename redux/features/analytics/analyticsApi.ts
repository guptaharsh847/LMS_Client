import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: "/get-courses-analytics",
        method: "GET",
        credentials: "include" as any,
      }),
    }),
    getOrderAnalytics: builder.query({
      query: () => ({
        url: "/get-orders-analytics",
        method: "GET",
        credentials: "include" as any,
      }),
    }),
    getUserAnalytics: builder.query({
        query: () => ({
          url: "/get-users-analytics",
          method: "GET",
          credentials: "include" as any,
        }),
      }),
  }),
});

export const { useGetCourseAnalyticsQuery,useGetOrderAnalyticsQuery,useGetUserAnalyticsQuery } = analyticsApi;
