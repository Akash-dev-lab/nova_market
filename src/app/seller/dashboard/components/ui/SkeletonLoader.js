"use client"
import React from "react"

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6 mt-10">
      {/* Title Bar */}
      <div className="h-10 w-1/3 bg-white/10 rounded-xl"></div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-32 rounded-3xl bg-white/10"></div>
        ))}
      </div>

      {/* big box */}
      <div className="h-60 rounded-3xl bg-white/10"></div>
    </div>
  )
}
