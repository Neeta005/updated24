"use client"

import React, { useState } from "react"
import { ChevronLeft } from "@/components/icons/chevron-left"
import { ChevronRight } from "@/components/icons/chevron-right"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Example special dates
const specialDates: Record<string, string> = {
  "2025-08-15": "bg-red-500", // Independence Day
  "2025-08-20": "bg-blue-500",
  "2025-08-25": "bg-green-500",
}

export function ExamCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7)) // August 2025

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // ✅ Get all days for the month (fill prev + next days to make full 6 weeks)
  const getMonthDays = (year: number, month: number) => {
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)
    const days = []

    const startDay = startDate.getDay()
    for (let i = 0; i < startDay; i++) {
      const prevDate = new Date(year, month, -i)
      days.unshift({ date: prevDate, currentMonth: false })
    }

    for (let i = 1; i <= endDate.getDate(); i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true })
    }

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

  // Styling each date
  const getDateStyle = (date: Date, isCurrent: boolean) => {
    const dateStr = date.toISOString().split("T")[0]
    if (specialDates[dateStr])
      return `${specialDates[dateStr]} text-white font-semibold rounded-full hover:scale-110 hover:shadow-lg hover:shadow-${specialDates[dateStr].replace(
        "bg-",
        ""
      )}/50`
    if (!isCurrent)
      return "text-gray-500 hover:text-white/70 hover:bg-gray-700 rounded-full hover:scale-105"
    return "text-white hover:bg-accent hover:scale-105 rounded-full"
  }

  const monthName = currentDate.toLocaleString("default", { month: "long" })

  return (
    <div className="bg-card rounded-xl p-3 sm:p-4 lg:p-5 border border-border w-full h-[342px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-white text-lg sm:text-xl font-semibold">Exam Calendar</h2>
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="size-3 sm:size-4 text-gray-text cursor-pointer hover:text-white"
            onClick={handlePrevMonth}
          />
          <span className="text-gray-text text-xs sm:text-sm font-medium">
            {monthName} {year}
          </span>
          <ChevronRight
            className="size-3 sm:size-4 text-gray-text cursor-pointer hover:text-white"
            onClick={handleNextMonth}
          />
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-5 sm:h-6 text-gray-text text-xs font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Fixed-height Month Grid (6 weeks) */}
      <div className="flex-1 grid grid-cols-7 gap-1 sm:gap-2">
        {days.map(({ date, currentMonth }, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-xs sm:text-sm rounded-md transition-all duration-200 transform ${getDateStyle(
              date,
              currentMonth
            )}`}
            style={{
              height: "calc((100% - 12px) / 6)", // 6 rows fit perfectly
            }}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
}
