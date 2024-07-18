import { USERS_URL, UPLOAD_URL } from "../constants";
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
    uploadDocs: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/info`,
        method: "PUT",
        body: data,
      }),
    }),
    verifyToken: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/verify-token`,
        method: "POST",
        body: token,
      }),
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
    getVisaStatusById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/visa-status/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateVisaStatus: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/visa-status/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    uploadVisaDocument: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/single`,
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
  useUploadDocsMutation,
  useUpdateInfoMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useGetVisaStatusByIdQuery,
  useUpdateVisaStatusMutation,
  useVerifyTokenMutation,
  useUploadVisaDocumentMutation,
} = userApiSlice;
