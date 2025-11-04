"use client"

import type { ViolationItem } from "@/data/candidate-dashboard"

interface ViolationsListProps {
  violations: ViolationItem[]
}

export function ViolationsList({ violations }: ViolationsListProps) {
  const totalViolations = violations.reduce((sum, v) => sum + v.count, 0)

  return (
    <div className="space-y-6">
      {/* Header with total and severity */}
      <div className="flex items-center justify-between gap-6 pb-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Donut chart background */}
            <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="#374151"
                strokeWidth="8"
              />
              {/* Yellow arc */}
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="#FCD34D"
                strokeWidth="8"
                strokeDasharray="150.8"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold">●</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">{totalViolations}</div>
            <div className="text-xs text-gray-400">Total Violations</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Gauge chart */}
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
              {/* Multi-color gauge */}
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
              {/* Needle indicator */}
              <circle cx="25" cy="25" r="8" fill="#475569" />
              <circle cx="25" cy="25" r="4" fill="#94A3B8" />
            </svg>
          </div>
          <div>
            <div className="text-yellow-400 font-bold text-base">Medium</div>
            <div className="text-xs text-gray-400">Severity</div>
          </div>
        </div>
      </div>

      {/* Violations list */}
      <div className="space-y-1">
        {violations.map((violation) => (
          <div
            key={violation.id}
            className="flex justify-between items-center py-3 border-b border-slate-700/50 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm">{violation.type}</span>
              {violation.badge && (
                <span className="bg-green-600/20 text-green-400 text-xs px-2.5 py-1 rounded-full border border-green-600/30 font-medium">
                  {violation.badge}
                </span>
              )}
            </div>
            <span className="text-white font-bold text-base">
              {String(violation.count).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}