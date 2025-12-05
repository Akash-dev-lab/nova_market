"use client"
import { motion } from "framer-motion"

export default function Toast({ message, type = "success" }) {
  const colors = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-red-700",
    info: "from-blue-500 to-indigo-600",
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl text-white shadow-lg bg-gradient-to-r ${colors[type]} z-50`}
    >
      {message}
    </motion.div>
  )
}
