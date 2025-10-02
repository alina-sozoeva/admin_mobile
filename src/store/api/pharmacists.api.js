import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pharmacistsApi = createApi({
  reducerPath: "pharmacistsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["PharmacistsList"],
  endpoints: (builder) => ({
    getPharmacists: builder.query({
      query: () => ({
        url: "/pharmacists",
        method: "GET",
      }),
      providesTags: ["PharmacistsList"],
    }),
  }),
});

export const { useGetPharmacistsQuery } = pharmacistsApi;
