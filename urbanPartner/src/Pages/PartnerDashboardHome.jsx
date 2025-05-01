import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const PartnerDashboardHome = () => {
  const earningsData = [1200, 1900, 3000, 2500, 2700, 3200];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const calculatePercentageChange = (current, previous) => {
    return ((current - previous) / previous) * 100;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Earnings",
        data: earningsData,
        borderColor: "#3b82f6",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#374151",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      title: {
        display: true,
        text: "Earnings Overview (Last 6 Months)",
        color: "#111827",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { top: 10, bottom: 30 },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        padding: 10,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context) {
            const currentMonthEarnings = context.raw;
            const currentMonthIndex = context.dataIndex;
            const previousMonthEarnings = earningsData[currentMonthIndex - 1];
            let percentageChange = "N/A";

            if (currentMonthIndex > 0) {
              percentageChange = calculatePercentageChange(
                currentMonthEarnings,
                previousMonthEarnings
              ).toFixed(2);
            }

            return `₹${currentMonthEarnings} | Change: ${percentageChange}%`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          beginAtZero: true,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default PartnerDashboardHome;
