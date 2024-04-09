
import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: `/get-notification`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
   updateNotification: builder.mutation({
      query: (id) => ({
        url: `/update-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,

  }),
}),

  }),
});

export const {
    useGetAllNotificationsQuery,
    useUpdateNotificationMutation,
} = notificationsApi;
