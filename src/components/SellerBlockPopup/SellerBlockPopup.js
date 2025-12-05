"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SellerBlockPage() {
  const [counter, setCounter] = useState(5);

  // AUTO REDIRECT (Optional)
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href = "/seller/dashboard";
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-2xl">
      
      {/* POPUP CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="w-[90%] max-w-lg p-10 rounded-3xl 
        bg-gradient-to-br from-[#1b1b1f]/80 to-[#111113]/80 
        border border-white/10 shadow-2xl backdrop-blur-xl
        text-white text-center"
      >
        {/* Red Warning Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.6
          }}
          className="mx-auto mb-6 text-red-500"
        >
          <svg width="80" height="80" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2zm1-15C6.48 0 2 4.48 2 10s4.48 10 10 10 10-4.48 10-10S17.52 0 12 0z"/>
          </svg>
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-wide mb-3">
          Access Denied
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          You're logged in as a <b>Seller</b>.  
          To browse this page, please login as a <b>User</b>.
        </p>

        {/* Magnetic Button */}
        <motion.a
          href="/seller/dashboard"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block px-8 py-4 rounded-xl text-lg font-semibold
          bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg
          hover:shadow-purple-500/40 transition-all duration-300"
        >
          Go to Seller Dashboard →
        </motion.a>

        <p className="text-gray-400 text-sm mt-6">
          Redirecting automatically in <b>{counter}</b> seconds...
        </p>
      </motion.div>
    </div>
  );
}
