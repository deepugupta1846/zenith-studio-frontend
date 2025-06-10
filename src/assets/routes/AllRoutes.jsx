// routes/AllRoutes.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../../components/login/Login";
import RegisterPage from "../../components/login/RegisterPage";
import Dashboard from "../../components/dashboard/Dashboard";
import ActivatePage from "../../components/login/ActivatePage";
import ProtectedRoute from "./ProtectedRoute";
import App from "../../App";
import OrderPage from "../../components/orderPage/OrderPage";
import Orders from "../../components/dashboard/orders/Orders";
import Pricing from "../../components/dashboard/orders/Pricing";
import CheckOrderStatus from "../../components/landingPages/CheckOrderStatus";

export default function AllRoutes() {
  return (
    <Routes>
            <Route path="/" element={<App />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/dashboard/order-list" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/dashboard/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/activate" element={<ActivatePage />} />
            <Route path="/check-status" element={<CheckOrderStatus />} />
          </Routes>
  );
}
