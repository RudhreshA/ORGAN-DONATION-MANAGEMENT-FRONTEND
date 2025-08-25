import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./shared/LoadingSpinner";
import { AuthProvider } from "./auth/useAuth";
import ProtectedRoute from "./auth/ProtectedRoute";

// Shared Layouts
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// Donor
import DonorDashboard from "./donor/DonorDashboard";
import DonorProfile from "./donor/DonorProfile";
import UploadDocuments from "./donor/UploadDocuments";

// Hospital
import HospitalDashboard from "./hospital/HospitalDashboard";
import OrganRequestForm from "./hospital/OrganRequestForm";
import RequestList from "./hospital/RequestList";

// Organ Bank
import OrganBankDashboard from "./organbank/OrganBankDashboard";
import AvailableOrgans from "./organbank/AvailableOrgans";
import AddOrganForm from "./organbank/AddOrganForm";
import RequestManager from "./organbank/RequestManager";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./admin/UserManagement";
import HospitalBankManagement from "./admin/HospitalBankManagement";
import ReportsAnalytics from "./admin/ReportsAnalytics";


// 👉 Auth layout (for login/register)
function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-container">{children}</div>
    </div>
  );
}

// 👉 Main app layout (with navbar + sidebar + footer)
function AppLayout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth routes */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Donor */}
          <Route path="/donor/dashboard" element={
            <ProtectedRoute roles={["DONOR"]}><AppLayout><DonorDashboard /></AppLayout></ProtectedRoute>
          } />
          <Route path="/donor/profile" element={
            <ProtectedRoute roles={["DONOR"]}><AppLayout><DonorProfile /></AppLayout></ProtectedRoute>
          } />
          <Route path="/donor/documents" element={
            <ProtectedRoute roles={["DONOR"]}><AppLayout><UploadDocuments /></AppLayout></ProtectedRoute>
          } />

          {/* Hospital */}
          <Route path="/hospital/dashboard" element={
            <ProtectedRoute roles={["HOSPITAL_STAFF"]}><AppLayout><HospitalDashboard /></AppLayout></ProtectedRoute>
          } />
          <Route path="/hospital/request" element={
            <ProtectedRoute roles={["HOSPITAL_STAFF"]}><AppLayout><OrganRequestForm /></AppLayout></ProtectedRoute>
          } />
          <Route path="/hospital/request-list" element={
            <ProtectedRoute roles={["HOSPITAL_STAFF"]}><AppLayout><RequestList /></AppLayout></ProtectedRoute>
          } />

          {/* Organ Bank */}
          <Route path="/organbank/dashboard" element={
            <ProtectedRoute roles={["ORGAN_BANK_STAFF"]}><AppLayout><OrganBankDashboard /></AppLayout></ProtectedRoute>
          } />
          <Route path="/organbank/availability" element={
            <ProtectedRoute roles={["ORGAN_BANK_STAFF"]}><AppLayout><AvailableOrgans /></AppLayout></ProtectedRoute>
          } />
          <Route path="/organbank/add-organ" element={
            <ProtectedRoute roles={["ORGAN_BANK_STAFF"]}><AppLayout><AddOrganForm /></AppLayout></ProtectedRoute>
          } />
          <Route path="/organbank/requests" element={
            <ProtectedRoute roles={["ORGAN_BANK_STAFF"]}><AppLayout><RequestManager /></AppLayout></ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={["ADMIN"]}><AppLayout><AdminDashboard /></AppLayout></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute roles={["ADMIN"]}><AppLayout><UserManagement /></AppLayout></ProtectedRoute>
          } />
          <Route path="/admin/hospitals-banks" element={
            <ProtectedRoute roles={["ADMIN"]}><AppLayout><HospitalBankManagement /></AppLayout></ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute roles={["ADMIN"]}><AppLayout><ReportsAnalytics /></AppLayout></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<AppLayout><div className="card">Not Found</div></AppLayout>} />
        </Routes>
      </React.Suspense>
    </AuthProvider>
  );
}
