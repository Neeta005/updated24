export function ExamCalendar() {
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]
  const calendarDays = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ]

  return (
    <div className="bg-[#252b3d] rounded-xl p-4 lg:p-5 border border-[#3a4052] h-[280px] lg:h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h2 className="text-white text-lg lg:text-xl font-semibold">Exam Calendar</h2>
        <div className="flex items-center space-x-1 lg:space-x-2">
          <button className="p-1 text-gray-400 hover:text-white">
            <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-400 text-xs lg:text-sm">Aug 2025</span>
          <button className="p-1 text-gray-400 hover:text-white">
            <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center text-gray-400 text-xs font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {calendarDays.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div key={dayIndex} className="flex items-center justify-center h-6 lg:h-7">
                {day && (
                  <button
                    className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full text-xs font-medium transition-colors ${
                      day === 5
                        ? "bg-red-500 text-white"
                        : day === 23
                          ? "bg-purple-500 text-white"
                          : day === 31
                            ? "bg-blue-500 text-white"
                            : "text-gray-300 hover:bg-[#3a4052] hover:text-white"
                    }`}
                  >
                    {day.toString().padStart(2, "0")}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
