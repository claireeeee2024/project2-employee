import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    postOnboarding: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/onboarding`,
        method: "POST",
        body: data,
      }),
    }),
    getOnboarding: builder.query({
      query: ({ username }) => ({
        url: `${USERS_URL}/onboarding`,
        method: "GET",
        params: { username },
      }),
      providesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  usePostOnboardingMutation,
  useGetOnboardingQuery,
  useLogoutMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
} = userApiSlice;
