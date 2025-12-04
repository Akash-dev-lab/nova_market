"use client"

import { useEffect, useState } from "react"
import { getSellerDashboardMetrics } from "../../../utils/sellerApi"

import MetricsGrid from "./components/MetricsGrid"
import UploadProductBox from "./components/UploadProductBox"
import RecentOrders from "./components/RecentOrders"

export default function SellerDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getSellerDashboardMetrics()
        setStats(data)
      } catch (err) {
        console.log("Dashboard Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-white">
        Loading Dashboard...
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0c] to-[#1a1a1d] text-white p-6">
      <h1 className="text-4xl font-black">Seller Dashboard</h1>

      <MetricsGrid stats={stats} />

      <UploadProductBox />

      <RecentOrders orders={stats.orders || []} />
    </div>
  )
}
