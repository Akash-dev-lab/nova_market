"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AccessBlockPopup({
  title = "Access Denied",
  message = "You don't have permission to view this page.",
  buttonText = "Go Back",
  redirectTo = "/",
  autoRedirect = false,
  countdownStart = 5,
}) {
  const [counter, setCounter] = useState(countdownStart);
  const router = useRouter();

  // Auto Redirect + Countdown (if enabled)
  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCounter((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => {
      router.push(redirectTo);
    }, countdownStart * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [autoRedirect, countdownStart, redirectTo, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-2xl z-50">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="w-[90%] max-w-lg p-10 rounded-3xl 
        bg-gradient-to-br from-[#1b1b1f]/80 to-[#111113]/80 
        border border-white/10 shadow-2xl backdrop-blur-xl
        text-white text-center"
      >

        {/* Warning Icon */}
        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1.1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="mx-auto mb-6 text-red-500"
        >
          <svg width="80" height="80" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2zm1-15C6.48 0 2 4.48 2 10s4.48 10 10 10 10-4.48 10-10S17.52 0 12 0z"/>
          </svg>
        </motion.div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold tracking-wide mb-3">
          {title}
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {message}
        </p>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push(redirectTo)}
          className="inline-block px-8 py-4 rounded-xl text-lg font-semibold
          bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg
          hover:shadow-purple-500/40 transition-all duration-300"
        >
          {buttonText}
        </motion.button>

        {/* Countdown (only when enabled) */}
        {autoRedirect && (
          <p className="text-gray-400 text-sm mt-6">
            Redirecting automatically in <b>{counter}</b> seconds...
          </p>
        )}
      </motion.div>
    </div>
  );
}
