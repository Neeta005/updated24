import { specialDates } from "@/data/calendar"

interface CalendarWeekProps {
  week: string[]
  weekIndex: number
  getDateStyle: (day: string, weekIndex: number, dayIndex: number) => string
}

export function CalendarWeek({ week, weekIndex, getDateStyle }: CalendarWeekProps) {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-1 min-h-0">
      {week.map((day, dayIndex) => {
        const isSpecialDate = specialDates[day as keyof typeof specialDates]
        return (
          <div key={dayIndex} className="flex items-center justify-center w-full h-full">
            <button
              className={`flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-95 size-[18px] text-[10px] font-normal leading-none border-none ${
                isSpecialDate
                  ? `rounded-full ${getDateStyle(day, weekIndex, dayIndex)}`
                  : `rounded-sm ${getDateStyle(day, weekIndex, dayIndex)}`
              }`}
            >
              {day}
            </button>
          </div>
        )
      })}
    </div>
  )
}
