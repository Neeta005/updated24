"use client"

import React, { useState } from "react"
import { ChevronLeft } from "@/components/icons/chevron-left"
import { ChevronRight } from "@/components/icons/chevron-right"
import { Check } from "lucide-react" // optional tick icon

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Example special dates
const specialDates: Record<string, { color: string; label?: string }> = {
  "2025-08-15": { color: "bg-red-500", label: "Independence Day" },
  "2025-08-20": { color: "bg-blue-500" },
  "2025-08-25": { color: "bg-green-500" },
}

export function ExamCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7)) // August 2025

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // ✅ Get all days for the month (fill prev + next days to make full 6 weeks)
  const getMonthDays = (year: number, month: number) => {
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)
    const days: { date: Date; currentMonth: boolean }[] = []

    // Previous month padding
    const startDay = startDate.getDay()
    for (let i = 0; i < startDay; i++) {
      const prevDate = new Date(year, month, -i)
      days.unshift({ date: prevDate, currentMonth: false })
    }

    // Current month
    for (let i = 1; i <= endDate.getDate(); i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true })
    }

    // Next month padding
    while (days.length < 42) {
      const nextDate = new Date(year, month, days.length - startDay + 1)
      days.push({ date: nextDate, currentMonth: false })
    }

    return days
  }

  const days = getMonthDays(year, month)

  // Month navigation
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1))
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1))

  const monthName = currentDate.toLocaleString("default", { month: "long" })

  return (
    <div className="bg-card rounded-xl p-4 border border-border w-full h-[342px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-lg font-semibold">Exam Calendar</h2>
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="text-gray-400 cursor-pointer hover:text-white"
            onClick={handlePrevMonth}
          />
          <span className="text-gray-400 text-sm font-medium">
            {monthName} {year}
          </span>
          <ChevronRight
            className="text-gray-400 cursor-pointer hover:text-white"
            onClick={handleNextMonth}
          />
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center h-6 text-gray-400 text-xs font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="flex-1 grid grid-cols-7 gap-1">
        {days.map(({ date, currentMonth }, idx) => {
          const dateStr = date.toISOString().split("T")[0]
          const special = specialDates[dateStr]

          let baseClasses =
            "flex items-center justify-center text-sm rounded-md transition-transform duration-200 transform"

          if (!currentMonth) {
            baseClasses += " text-gray-500 hover:text-white/70 hover:bg-gray-700"
          } else {
            baseClasses += " text-white hover:bg-accent hover:scale-105"
          }

          return (
            <div
              key={idx}
              className={`${baseClasses} ${
                special ? `${special.color} text-white font-semibold relative` : ""
              }`}
            >
              {date.getDate()}
              {/* Tick for special dates */}
              {special && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
