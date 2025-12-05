"use client"
import DashboardCard from "./DashboardCard"
import { DollarSign, ShoppingBag, Package, BarChart3 } from "lucide-react"

export default function MetricsGrid({ stats }) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-10">

      <DashboardCard
        title="Total Sales"
        value={`₹${stats.totalSales}`}
        icon={<DollarSign size={32} />}
        color="from-blue-500/20 to-blue-700/10"
      />

      <DashboardCard
        title="Revenue"
        value={stats.totalRevenue}
        icon={<ShoppingBag size={32} />}
        color="from-purple-500/20 to-purple-700/10"
      />

      <DashboardCard
        title="Products Listed"
        value={stats.totalProducts}
        icon={<Package size={32} />}
        className="cursor-pointer"
        isClickable={true}
        onClick={() => window.location.href = "/seller/products"}
        color="from-green-500/20 to-green-700/10"
      />

      <DashboardCard
        title="Top Product"
        value={stats.topProduct?.title || "None"}
        icon={<BarChart3 size={32} />}
        color="from-pink-500/20 to-pink-700/10"
      />

    </div>
  )
}
