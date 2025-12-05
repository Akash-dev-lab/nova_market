"use client";

import { useEffect, useState } from "react";
import { getSellerDashboardMetrics } from "../../../utils/sellerApi";

import MetricsGrid from "./components/MetricsGrid";
import UploadProductBox from "./components/UploadProductBox";
import RecentOrders from "./components/RecentOrders";
import AccessBlockPopup from "../../../components/SellerBlockPopup/AccessBlockPopup"; 
import SkeletonLoader from "./components/ui/SkeletonLoader";
// ⬆️ using your REAL popup with animation + countdown

export default function SellerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getSellerDashboardMetrics();

        // If this succeeds → user is a seller
        setUserRole("seller");
        setStats(data);
      } catch (err) {
        console.log("Dashboard Error:", err?.response?.data);

        // If unauthorized → user is not a seller
        setUserRole("not-seller");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Loading state
  if (loading) return <SkeletonLoader />


  // ⛔ Block normal users — show popup EXACTLY like your example UI
  if (userRole !== "seller") {
    return (
      <AccessBlockPopup
        title="Access Restricted"
        message="You are not authorized to view the Seller Dashboard."
        buttonText="Go to Marketplace →"
        redirectTo="/"
        autoRedirect={true}
        countdownStart={5}
      />
    );
  }

  // ✅ Seller dashboard UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0c] to-[#1a1a1d] text-white p-6">
      <h1 className="text-4xl font-black">Seller Dashboard</h1>

      <MetricsGrid stats={stats} />

      <UploadProductBox />

      <RecentOrders orders={stats.orders || []} />
    </div>
  );
}
