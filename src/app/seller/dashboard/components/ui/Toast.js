"use client";
import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext(null);

// -------------------------------
// PROVIDER
// -------------------------------
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white 
              bg-gradient-to-r ${
                toast.type === "success"
                  ? "from-green-500 to-emerald-600"
                  : toast.type === "error"
                  ? "from-red-500 to-red-700"
                  : "from-blue-500 to-indigo-600"
              } z-50`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

// -------------------------------
// HOOK — CALL INSIDE COMPONENT
// -------------------------------
export function useToast() {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast must be used inside <ToastProvider>");
  return {
    success: (msg) => show(msg, "success"),
    error: (msg) => show(msg, "error"),
  };
}
