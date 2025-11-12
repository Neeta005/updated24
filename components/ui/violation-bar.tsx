"use client"

import React from "react"

interface ViolationBarProps {
  label: string
  value: number
  maxValue: number
}

export function ViolationBar({ label, value, maxValue }: ViolationBarProps) {
  // Ensure consistent percentage and avoid NaN
  const percentage =
    maxValue > 0
      ? Math.round((value / maxValue) * 100 * 100) / 100
      : 0

  const safePercentage = Number.isFinite(percentage) ? percentage : 0
  const [exam, time = ""] = label.split(":")

  return (
    <div className="flex flex-col items-center flex-1 max-w-[40px] md:max-w-[60px]">
      <div className="w-full bg-secondary rounded-t-lg relative mb-2 h-[200px] overflow-hidden">
        <div
          className="bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-500"
          style={{ height: `${safePercentage}%` }}
        />
      </div>
      <span className="text-gray-400 text-[8px] md:text-[10px] text-center leading-tight max-w-full">
        {exam}
        <br />
        {time}
      </span>
    </div>
  )
}
