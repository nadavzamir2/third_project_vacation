import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import { VacationsPage } from "@/pages/VacationsPage";
import { EditVacationPage } from "@/pages/EditVacationPage";
import { MetricsPage } from "@/pages/metricsPage";
import { AddVacationPage } from "@/pages/AddVacationPage";
import { ManageVacationsPage } from "@/pages/ManageVacationPage";


export default function MainLayout() {
  return (
      <>
      <Header />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <VacationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vacations"
            element={
              <ProtectedRoute>
                <VacationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/metrics"
            element={
              <ProtectedRoute>
                <MetricsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <AddVacationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditVacationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <ProtectedRoute>
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
