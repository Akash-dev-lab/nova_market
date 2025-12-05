"use client"
import { motion } from "framer-motion"

export default function DashboardCard({ title, value, icon, color, onClick, isClickable }) {
  return (
    <motion.div
      onClick={isClickable ? onClick : undefined}
      className={`p-6 rounded-3xl bg-gradient-to-br ${color}
      backdrop-blur-xl border border-white/10 shadow-xl 
      flex flex-col gap-3 cursor-${isClickable ? "pointer" : "default"}`}
      whileHover={isClickable ? { scale: 1.05 } : {}}
    >
      <div className="text-white/80">{icon}</div>
      <h3 className="text-lg text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  )
}
