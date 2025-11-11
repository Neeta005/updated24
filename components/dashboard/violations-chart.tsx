"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { violationChart } from "@/data/violationChart"
import { ViolationBar } from "@/components/ui/violation-bar"

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export function ViolationsChart() {
  const currentDate = new Date()
  const [month, setMonth] = useState(currentDate.getMonth()) // 0-11
  const [year, setYear] = useState(currentDate.getFullYear())

  // 🔹 Handle navigation
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  // 🔹 Mock dynamic data by adding randomization (replace with API later)
  const dynamicData = violationChart.map((item) => ({
    ...item,
    value: Math.floor(item.value * (0.8 + Math.random() * 0.4)), // small variation
  }))

  const maxValue = Math.max(...dynamicData.map((d) => d.value))

  return (
    <div className="bg-card rounded-xl border border-border shadow-tertiary p-4 w-full h-full min-h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm md:text-base font-semibold">Violations Per Exam</h2>
        <div className="flex items-center space-x-1 md:space-x-2">
          <button onClick={handlePrevMonth} className="p-1 text-gray-400 hover:text-white">
            <ChevronLeft className="size-3 md:size-4" />
          </button>
          <span className="text-gray-300 text-xs md:text-sm font-medium">
            {months[month]} {year}
          </span>
          <button onClick={handleNextMonth} className="p-1 text-gray-400 hover:text-white">
            <ChevronRight className="size-3 md:size-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 flex flex-col relative h-[300px]">
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-[10px] md:text-xs py-1">
          <span>60%</span>
          <span>50%</span>
          <span>40%</span>
          <span>30%</span>
          <span>20%</span>
          <span>10%</span>
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end justify-between ml-8 md:ml-10 mb-4 space-x-1 md:space-x-2">
          {dynamicData.map((item, index) => (
            <ViolationBar key={index} label={item.label} value={item.value} maxValue={maxValue} />
          ))}
        </div>

        {/* Avg Point Marker */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[45%] bg-border px-2 py-1 rounded-md">
          <span className="text-white text-[10px] md:text-xs">Avg Point</span>
        </div>
      </div>
    </div>
  )
}
