"use client"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useState, useEffect } from "react"

export default function SuccessPopup({ message, onClose }) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 2000)
  }, [])

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={250} />}

      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xl z-50">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="p-8 bg-white/10 rounded-3xl border border-white/20 shadow-2xl text-center max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-green-400 mb-2">Success!</h1>
          <p className="text-gray-200 text-lg">{message}</p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white font-semibold shadow-lg"
            onClick={onClose}
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    </>
  )
}
