import { createBrowserRouter, Navigate } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../common";
import { pathName } from "../enums";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Pages.LoginPage />,
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to={pathName.medications} replace /> },
      { path: pathName.notFound, element: <Pages.WIPPage /> },
      { path: pathName.medications, element: <Pages.MedicationsPage /> },
      { path: pathName.users, element: <Pages.UsersPage /> },
      { path: pathName.pharmacies, element: <Pages.PharmaciesPage /> },
      { path: pathName.clinics, element: <Pages.ClinicsPage /> },
      { path: pathName.patients, element: <Pages.PatientsPage /> },
      { path: pathName.doctors, element: <Pages.DoctorsPage /> },
    ],
  },
]);
