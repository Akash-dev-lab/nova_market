"use client"
import { motion } from "framer-motion"

export default function RecentOrders({ orders }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
    >
      <h2 className="text-2xl font-semibold">Recent Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-300 mt-2">No recent orders</p>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map(order => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-xl bg-white/10 border border-white/10 flex justify-between"
            >
              <div>
                <p className="font-semibold">Order #{order._id.slice(-5)}</p>
                <p className="text-gray-300 text-sm">Items: {order.items.length}</p>
              </div>
              <p className="font-bold text-green-400">₹{order.totalAmount}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
