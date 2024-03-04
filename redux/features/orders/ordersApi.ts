import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `/get-orders`,
        method: "GET",
        credentials: "include" as any,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = ordersApi;
