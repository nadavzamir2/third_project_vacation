import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Data from "./pages/Data";
import ProtectedRoute from "./components/ProtectedRoute";
import Expenses from "./pages/expenses";
import { RolesProvider } from "./context/roles.context";
import MainLayout from "./components/MainLayout";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </div>
  );
}
