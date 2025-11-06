"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface ExamTimerProps {
  totalSeconds: number
  onTimeUp?: () => void
}

export function ExamTimer({ totalSeconds, onTimeUp }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const isWarning = timeLeft < 300 // Less than 5 minutes

  return (
    <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
      <Clock className={`w-5 h-5 ${isWarning ? "text-red-400" : "text-green-400"}`} />
      <div className="text-right">
        <p className="text-xs text-gray-400">Time Left</p>
        <p className={`text-lg font-mono font-bold ${isWarning ? "text-red-400" : "text-green-400"}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  )
}
