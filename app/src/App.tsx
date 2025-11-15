import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./context/user.context";
import MainLayout from "./components/MainLayout";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login text="Please log in" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<UserProvider><MainLayout /></UserProvider>} />
      </Routes>
    </div>
  );
}