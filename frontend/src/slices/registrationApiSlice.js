import { apiSlice } from "./apiSlice";

export const registrationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendToken: builder.mutation({
      query: (data) => ({
        url: "/api/users/send-token",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registration"],
    }),
    getRegistrationHistory: builder.query({
      query: () => ({
        url: "/api/users/registration-history",
        method: "GET",
      }),
      providesTags: ["Registration"],
    }),
  }),
});

export const { useSendTokenMutation, useGetRegistrationHistoryQuery } =
  registrationApiSlice;
