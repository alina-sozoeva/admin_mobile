import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["DoctorsList"],
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => ({
        url: "/doctors",
        method: "GET",
      }),
      providesTags: ["DoctorsList"],
    }),
    addDoctor: builder.mutation({
      query: (newDoctor) => ({
        url: "/create-doctor",
        method: "POST",
        body: newDoctor,
      }),
      invalidatesTags: ["DoctorsList"],
    }),
    loginDoctor: builder.mutation({
      query: (doc) => ({
        url: "/login-doctor",
        method: "POST",
        body: doc,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          console.error("Login failed", err);
        }
      },
      invalidatesTags: ["DoctorsList"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useLoginDoctorMutation,
} = doctorApi;
