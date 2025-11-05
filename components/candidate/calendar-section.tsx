"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function CalendarSection() {
  const [currentMonth] = useState(7) // July
  const [currentYear] = useState(2025)

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(currentYear, currentMonth - 1)
  )

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  
  // Calendar grid starting from Monday with proper dates
  const calendarDays = [
    28, 29, 30, 31, // June dates
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, // July dates
    1, 2, 3, 4, 5, 6, 7 // August dates
  ]

  return (
    <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-base font-semibold">
          {monthName} {currentYear}
        </h3>
        <div className="flex gap-1">
          <button className="text-gray-400 hover:text-white p-1 hover:bg-slate-700 rounded transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white p-1 hover:bg-slate-700 rounded transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-gray-400 text-xs font-semibold py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar dates */}
        {calendarDays.map((day, index) => {
          const isCurrentMonth = index >= 4 && index < 35
          const isToday = day === 14 && isCurrentMonth
          
          return (
            <div
              key={index}
              className={`
                text-center py-2 text-xs rounded cursor-pointer transition-colors
                ${!isCurrentMonth ? "text-gray-600" : "text-gray-300"}
                ${isToday ? "bg-red-500 text-white font-bold" : "hover:bg-slate-700"}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

