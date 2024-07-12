import { apiSlice } from "./apiSlice";

export const onboardingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOnboardingApplications: builder.query({
      query: ({ sort }) => ({
        url: "/api/onboarding",
        params: { sort },
        method: "GET",
      }),
      providesTags: ["Onboarding"],
    }),
    getApplicationById: builder.query({
      query: (id) => ({
        url: `/api/onboarding/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Onboarding", id }],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, feedback }) => ({
        url: `/api/onboarding/${id}`,
        method: "PUT",
        body: { status, feedback },
      }),
      invalidatesTags: ["Onboarding"],
    }),
  }),
});

export const {
  useGetOnboardingApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
} = onboardingApiSlice;
