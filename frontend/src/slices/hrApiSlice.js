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
    }),
});

export const {
    useGetEmployeeProfilesQuery,
    useGetEmployeeFullProfileQuery,
    useUpdateVisaDocumentStatusMutation,
    useGetAllVisaStatusQuery,
    useGetVisaStatusInProgressQuery,
    useSearchEmployeeQuery,
} = hrApiSlice;