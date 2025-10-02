import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pharmacistsApi = createApi({
  reducerPath: "pharmacistsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["PharmacistsList"],
  endpoints: (builder) => ({
    getPharmacists: builder.query({
      query: (pharmacy_codeid) => ({
        url: "/pharmacists",
        method: "GET",
        params: pharmacy_codeid,
      }),
      providesTags: ["PharmacistsList"],
    }),
    addPharmacist: builder.mutation({
      query: (newPharmacist) => ({
        url: "/create-pharmacist",
        method: "POST",
        body: newPharmacist,
      }),
      invalidatesTags: ["PharmacistsList"],
    }),
    deletePharmacist: builder.mutation({
      query: (codeid) => ({
        url: "/delete-pharmacist",
        method: "POST",
        body: codeid,
      }),
      invalidatesTags: ["PharmacistsList"],
    }),
  }),
});

export const {
  useGetPharmacistsQuery,
  useAddPharmacistMutation,
  useDeletePharmacistMutation,
} = pharmacistsApi;
