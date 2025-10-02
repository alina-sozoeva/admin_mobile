import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drugApi = createApi({
  reducerPath: "drugApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["DrugList", "DrugGroupList"],
  endpoints: (builder) => ({
    getDrug: builder.query({
      query: (search) => ({
        url: "/drug",
        method: "GET",
        params: search,
      }),
      providesTags: ["DrugList"],
    }),
    getGroupDrug: builder.query({
      query: () => ({
        url: "/group-drug",
        method: "GET",
      }),
      providesTags: ["DrugGroupList"],
    }),
    addDrug: builder.mutation({
      query: (newDrug) => ({
        url: "/drug",
        method: "POST",
        body: newDrug,
      }),
      invalidatesTags: ["DrugList"],
    }),
    addGroupDrug: builder.mutation({
      query: (newDrug) => ({
        url: "/group-drug",
        method: "POST",
        body: newDrug,
      }),
      invalidatesTags: ["DrugGroupList"],
    }),
  }),
});

export const {
  useGetDrugQuery,
  useGetGroupDrugQuery,
  useAddGroupDrugMutation,
  useAddDrugMutation,
} = drugApi;
