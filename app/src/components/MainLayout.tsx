import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import { VacationsPage } from "@/pages/VacationsPage";
import { EditVacationPage } from "@/pages/EditVacationPage";
import { MetricsPage } from "@/pages/MetricsPage";
import { AddVacationPage } from "@/pages/AddVacationPage";
import { ManageVacationsPage } from "@/pages/ManageVacationPage";
import { Role } from "@/types";


export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute roles={[Role.User]}>
                <VacationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vacations"
            element={
              <ProtectedRoute roles={[Role.User]}>
                <VacationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/metrics"
            element={
              <ProtectedRoute roles={[Role.Admin]}>
                <MetricsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute roles={[Role.Admin]}>
                <AddVacationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute roles={[Role.Admin]}>
                <EditVacationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <ProtectedRoute roles={[Role.Admin]}>
                <ManageVacationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="card">
                <h2>Not Found</h2>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
