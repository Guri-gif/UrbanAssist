import { Routes, Route } from "react-router-dom";
import PartnerDashboard from "./Pages/PartnerDashboard";
import ServiceManagement from "./Pages/ServiceManagement";
import PartnerBookings from "./Pages/PartnerBookings";
import ProfileSettings from "./Pages/ProfileSettings";
import LoginPage from "./Pages/LoginPage";
import { ToastContainer } from "react-toastify";
import PartnerDashboardHome from "./Pages/PartnerDashboardHome";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/partnerdashboard"
          element={
            <ProtectedRoute>
              <PartnerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<PartnerDashboardHome />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="bookings" element={<PartnerBookings />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
