'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../utils/authApi";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const data = await login(form);

      if (data?.user?.role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/");
      }
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* 🔹 Background neon blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-purple-700/10 to-black blur-3xl"></div>

      {/* 🔹 Floating Lights */}
      <div className="absolute w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full top-10 left-[-30px]"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full bottom-10 right-[-30px]"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-6 z-20 p-6"
      >

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col justify-center p-10 rounded-2xl 
                     bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">Welcome Back 👋</h2>
          <p className="text-gray-300 mb-6">
            Login to continue shopping or manage your seller store.
          </p>

          <ul className="text-gray-300 space-y-3">
            <li>✓ Secure Login</li>
            <li>✓ Fast Access</li>
            <li>✓ Account Protection</li>
          </ul>
        </motion.div>

        {/* RIGHT SECTION — LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
          <p className="text-gray-400 mb-6">Sign in to your Nova Market account</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-gray-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                required
                className="w-full p-3 rounded-lg bg-black/40 text-white outline-none 
                           border border-white/10 focus:border-blue-500 transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-300 block mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                required
                className="w-full p-3 rounded-lg bg-black/40 text-white outline-none 
                           border border-white/10 focus:border-purple-500 transition-all"
              />
            </div>

            {/* ERROR */}
            {err && <div className="text-red-400 text-sm">{err}</div>}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r 
                         from-blue-600 to-purple-600 hover:opacity-90 transition flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>

          </form>

          {/* SOCIAL LOGIN */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] bg-white/20 flex-1"></div>
            <span className="text-gray-400 text-sm">or continue with</span>
            <div className="h-[1px] bg-white/20 flex-1"></div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition">
              <img src="/google.svg" className="w-6 h-6" />
            </button>
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition">
              <img src="/github.svg" className="w-6 h-6" />
            </button>
          </div>

          {/* SIGNUP */}
          <p className="text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/auth/signup" className="text-blue-400 hover:underline">
              Sign up here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
