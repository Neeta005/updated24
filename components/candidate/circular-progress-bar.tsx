interface CircularProgressBarProps {
  value: number
  maxValue: number
  color: string
  label: string
}

export function CircularProgressBar({ value, maxValue, color, label }: CircularProgressBarProps) {
  const percentage = (value / maxValue) * 100
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference

  const colorMap: Record<string, string> = {
    blue: "#60A5FA",
    orange: "#F97316",
    green: "#22C55E",
    yellow: "#EAB308",
    red: "#EF4444",
  }

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Background circle */}
      <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-600" />

      {/* Progress circle */}
      <circle
        cx="60"
        cy="60"
        r="45"
        fill="none"
        stroke={colorMap[color]}
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300"
      />

      {/* Label text */}
      <text x="60" y="70" textAnchor="middle" className="text-2xl font-bold fill-white" fontSize="24">
        {label}
      </text>
    </svg>
  )
}
