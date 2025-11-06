"use client"

import type { ViolationItem } from "@/data/candidate-dashboard"

interface ViolationsListProps {
  violations: ViolationItem[]
}

export function ViolationsList({ violations }: ViolationsListProps) {
  const totalViolations = violations.reduce((sum, v) => sum + v.count, 0)
  const maxViolations = 100 // Change according to required max range
  const progressPercent = Math.min((totalViolations / maxViolations) * 100, 100)
  const progressOffset = 150.8 - (150.8 * progressPercent) / 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
        {/* Total Violations */}
        <div className="flex items-center justify-between w-[240px] bg-slate-800 rounded-xl px-4 py-3 shadow-[0_0_12px_rgba(255,255,255,0.15)] border border-white/10">
          <div>
            <div className="text-[10px] text-gray-400 tracking-wide">Total Violations</div>
            <div className="text-[28px] leading-none font-extrabold text-yellow-400 mt-1">
              {totalViolations}
            </div>
          </div>

          <div className="relative w-[60px] h-[60px]">
            <svg width="60" height="60" viewBox="0 0 60 60" className="rotate-[-90deg]">
              {/* Background circle */}
              <circle cx="30" cy="30" r="24" fill="none" stroke="#374151" strokeWidth="8" />
              {/* Progress circle */}
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="#FCD34D"
                strokeWidth="8"
                strokeDasharray="150.8"
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-[10px] font-medium opacity-80">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>
        </div>

        {/* Severity */}
        <div className="flex items-center justify-between w-[240px] bg-slate-800 rounded-xl px-4 py-3 shadow-[0_0_12px_rgba(255,255,255,0.15)] border border-white/10">
          <div>
            <div className="text-[10px] text-gray-400 tracking-wide">Severity</div>
            <div className="text-yellow-400 font-bold text-[15px] leading-none mt-1">Medium</div>
          </div>

          <div className="relative w-[50px] h-[50px]">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="18"
                fill="none"
                stroke="#374151"
                strokeWidth="6"
                strokeDasharray="113"
                strokeDashoffset="28"
                transform="rotate(-135 25 25)"
              />
              <circle
                cx="25"
                cy="25"
                r="18"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="6"
                strokeDasharray="85"
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-135 25 25)"
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <circle cx="25" cy="25" r="8" fill="#475569" />
              <circle cx="25" cy="25" r="4" fill="#94A3B8" />
            </svg>
          </div>
        </div>
      </div>

      {/* Violations List */}
      <div className="space-y-1">
        {violations.map((violation) => (
          <div
            key={violation.id}
            className="flex justify-between items-center py-3 border-b border-[#2A2D31] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-[14px]">{violation.type}</span>
              {violation.badge && (
                <span className="bg-green-600/25 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-600/40 font-medium leading-none">
                  {violation.badge}
                </span>
              )}
            </div>
            <span className="text-white font-semibold text-[17px] leading-none tabular-nums">
              {String(violation.count).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
