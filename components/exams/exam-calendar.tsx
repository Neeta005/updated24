"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft } from "@/components/icons/chevron-left"
import { ChevronRight } from "@/components/icons/chevron-right"
import { Check } from "lucide-react"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Example special dates
const specialDates: Record<string, { color: string; label?: string }> = {
  "2025-08-15": { color: "bg-red-500", label: "Independence Day" },
  "2025-08-20": { color: "bg-blue-500" },
  "2025-08-25": { color: "bg-green-500" },
}

interface ExamCalendarProps {
  currentDate?: Date
  onDateSelect?: (date: Date) => void
}

export function ExamCalendar({ currentDate: propDate, onDateSelect }: ExamCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(propDate || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(propDate || null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Generate all days in the month including padding
  const getMonthDays = (year: number, month: number) => {
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)
    const days: { date: Date; currentMonth: boolean }[] = []

    // Previous month padding
    const startDay = startDate.getDay()
    for (let i = startDay; i > 0; i--) {
      days.push({ date: new Date(year, month, 1 - i), currentMonth: false })
    }

    // Current month days
    for (let i = 1; i <= endDate.getDate(); i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true })
    }

    // Next month padding
    let nextDay = 1
    while (days.length < 42) {
      days.push({ date: new Date(year, month + 1, nextDay), currentMonth: false })
      nextDay++
    }

    return days
  }

  const days = getMonthDays(year, month)

  // Month navigation
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1))
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1))
  const handlePrevYear = () => setCurrentDate(new Date(year - 1, month))
  const handleNextYear = () => setCurrentDate(new Date(year + 1, month))

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onDateSelect && onDateSelect(date)
  }

  const monthName = currentDate.toLocaleString("default", { month: "long" })

  return (
    <div className="bg-card rounded-xl p-4 border border-border w-full h-[342px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <h2 className="text-white text-sm md:text-lg font-semibold whitespace-nowrap">Exam Calendar</h2>
        <div className="flex items-center gap-4">
          {/* Month Navigation */}
          <div className="flex items-center gap-1">
            <ChevronLeft
              className="text-gray-400 cursor-pointer hover:text-white w-4 h-4"
              onClick={handlePrevMonth}
            />
            <span className="text-gray-400 text-sm font-medium min-w-[60px] text-center">{monthName}</span>
            <ChevronRight
              className="text-gray-400 cursor-pointer hover:text-white w-4 h-4"
              onClick={handleNextMonth}
            />
          </div>
          {/* Year Navigation */}
          <div className="flex items-center gap-1">
            <ChevronLeft
              className="text-gray-400 cursor-pointer hover:text-white w-4 h-4"
              onClick={handlePrevYear}
            />
            <span className="text-gray-400 text-sm font-medium min-w-[45px] text-center">{year}</span>
            <ChevronRight
              className="text-gray-400 cursor-pointer hover:text-white w-4 h-4"
              onClick={handleNextYear}
            />
          </div>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="flex items-center justify-center h-6 text-gray-400 text-xs font-medium">
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
            "flex items-center justify-center text-sm rounded-md transition-transform duration-200 transform cursor-pointer"

          if (!currentMonth) {
            baseClasses += " text-gray-500 hover:text-white/70 hover:bg-gray-700"
          } else {
            baseClasses += " text-white hover:bg-accent hover:scale-105"
          }

          if (selectedDate?.toDateString() === date.toDateString()) {
            baseClasses += " ring-2 ring-orange-500"
          }

          return (
            <div
              key={idx}
              onClick={() => currentMonth && handleDateClick(date)}
              className={`${baseClasses} ${special ? `${special.color} text-white font-semibold relative` : ""}`}
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
