import { configureStore } from "@reduxjs/toolkit";
import {
  clinicsApi,
  doctorApi,
  drugApi,
  drugFormApi,
  patientsApi,
  pharmacistsApi,
  pharmacyApi,
} from "./api";

export const store = configureStore({
  reducer: {
    [doctorApi.reducerPath]: doctorApi.reducer,
    [clinicsApi.reducerPath]: clinicsApi.reducer,
    [drugApi.reducerPath]: drugApi.reducer,
    [drugFormApi.reducerPath]: drugFormApi.reducer,
    [pharmacyApi.reducerPath]: pharmacyApi.reducer,
    [pharmacistsApi.reducerPath]: pharmacistsApi.reducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      doctorApi.middleware,
      clinicsApi.middleware,
      drugApi.middleware,
      drugFormApi.middleware,
      pharmacyApi.middleware,
      pharmacistsApi.middleware,
      patientsApi.middleware,
    ]),
});
