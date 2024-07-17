import { HR_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const hrApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeProfiles: builder.query({
      query: () => ({
        url: `${HR_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["HR"],
    }),
    getEmployeeFullProfile: builder.query({
      query: (id) => ({
        url: `${HR_URL}/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["HR"],
    }),
    updateVisaDocumentStatus: builder.mutation({
      query: (data) => ({
        url: `${HR_URL}/visa-document-status/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HR"],
    }),
    getAllVisaStatus: builder.query({
      query: () => ({
        url: `${HR_URL}/visa-status`,
        method: "GET",
      }),
      providesTags: ["HR"],
    }),
    getVisaStatusInProgress: builder.query({
      query: () => ({
        url: `${HR_URL}/visa-status/in-progress`,
        method: "GET",
      }),
      providesTags: ["HR"],
    }),
    searchEmployee: builder.query({
      query: (data) => ({
        url: `${HR_URL}/search`,
        method: "GET",
        params: data,
      }),
      providesTags: ["HR"],
    }),
    sendToken: builder.mutation({
      query: (data) => ({
        url: `${HR_URL}/send-token`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registration"],
    }),
    sendNotification: builder.mutation({
      query: (data) => ({
        url: `${HR_URL}/send-notification`,
        method: "POST",
        body: data,
      }),
    }),
    getRegistrationHistory: builder.query({
      query: () => ({
        url: `${HR_URL}/registration-history`,
        method: "GET",
      }),
      providesTags: ["Registration"],
    }),
    getOnboardingApplications: builder.query({
      query: ({ sort }) => ({
        url: `${HR_URL}/onboardings`,
        params: { sort },
        method: "GET",
      }),
      providesTags: ["Onboarding"],
    }),
    updateOnboardingStatus: builder.mutation({
      query: ({ username, status, feedback }) => ({
        url: `${HR_URL}/onboarding/${username}`,
        method: "PUT",
        body: { status, feedback },
      }),
      invalidatesTags: ["Onboarding"],
    }),
  }),
});

export const {
  useGetEmployeeProfilesQuery,
  useGetEmployeeFullProfileQuery,
  useUpdateVisaDocumentStatusMutation,
  useGetAllVisaStatusQuery,
  useGetVisaStatusInProgressQuery,
  useSearchEmployeeQuery,
  useSendTokenMutation,
  useGetRegistrationHistoryQuery,
  useGetOnboardingApplicationsQuery,
  useUpdateOnboardingStatusMutation,
  useSendNotificationMutation,
} = hrApiSlice;
