import React from "react";
import PartnerNavbar from "../Components/PartnerNavbar";
import { Outlet } from "react-router-dom";

const PartnerDashboard = () => {
  const analytics = {
    totalServices: 12,
    totalBookings: 87,
    profileViews: 134,
  };

  return (
    <div className="flex">
      <PartnerNavbar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Partner Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-medium text-green-600 mb-2">
              Total Services
            </h2>
            <p className="text-3xl font-bold text-gray-800">
              {analytics.totalServices}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-medium text-green-600 mb-2">
              Total Bookings
            </h2>
            <p className="text-3xl font-bold text-gray-800">
              {analytics.totalBookings}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-medium text-green-600 mb-2">
              Profile Views
            </h2>
            <p className="text-3xl font-bold text-gray-800">
              {analytics.profileViews}
            </p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default PartnerDashboard;
