"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, ShoppingBag, DollarSign, Package } from "lucide-react"
import { getSellerDashboardMetrics } from "../../../utils/sellerApi"

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

  const isEmpty =
    !stats ||
    stats.totalOrders === 0 &&
    stats.totalRevenue === 0 &&
    stats.totalProducts === 0 &&
    (!stats.orders || stats.orders.length === 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1d] text-white p-6">

      {/* Header */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black drop-shadow-lg"
      >
        Seller Dashboard
      </motion.h1>

      {/* If No Products / No Stats */}
      {isEmpty ? <EmptyDashboardUI /> : <DashboardContent stats={stats} />}

    </div>
  )
}

/* ==========================
   📌 EMPTY DASHBOARD UI
   ========================== */
function EmptyDashboardUI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 mx-auto max-w-2xl text-center p-10 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
    >
      <h2 className="text-3xl font-bold">No Products Found</h2>
      <p className="text-gray-300 mt-3 text-lg">
        Your seller account is active but you haven't listed any products yet.
      </p>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        className="mt-8"
      >
        <Package size={80} className="mx-auto text-white/40" />
      </motion.div>

      <button className="mt-10 px-6 py-3 text-lg font-semibold 
        bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl 
        hover:scale-105 transition transform shadow-lg">
        Add Your First Product
      </button>
    </motion.div>
  )
}

/* ==========================
   📌 MAIN DASHBOARD CONTENT
   ========================== */
function DashboardContent({ stats }) {
  return (
    <>
      {/* Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <DashboardCard
          title="Total Sales"
          value={`₹${stats.totalRevenue}`}
          icon={<DollarSign size={32} />}
          color="from-blue-500/20 to-blue-700/10"
        />

        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingBag size={32} />}
          color="from-purple-500/20 to-purple-700/10"
        />

        <DashboardCard
          title="Products Listed"
          value={stats.totalProducts}
          icon={<Package size={32} />}
          color="from-green-500/20 to-green-700/10"
        />

        <DashboardCard
          title="Top Product"
          value={stats.topProduct?.name || "None"}
          icon={<BarChart3 size={32} />}
          color="from-pink-500/20 to-pink-700/10"
        />

      </div>

      {/* Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <h2 className="text-2xl font-semibold">Recent Orders</h2>

        {stats.orders?.length === 0 ? (
          <p className="text-gray-300 mt-3">No recent orders</p>
        ) : (
          <div className="mt-6 space-y-4">
            {(stats.orders ?? []).map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-white/10 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">Order #{order._id.slice(-5)}</p>
                  <p className="text-gray-300 text-sm">Items: {order.items.length}</p>
                </div>
                <p className="font-bold text-green-400 text-lg">₹{order.totalAmount}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  )
}

/* ==========================
   📌 CARD COMPONENT
   ========================== */
function DashboardCard({ title, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-3xl bg-gradient-to-br ${color} 
        backdrop-blur-xl border border-white/10 shadow-xl 
        flex flex-col gap-3`}
    >
      <div className="text-white/80">{icon}</div>
      <h3 className="text-lg text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  )
}
