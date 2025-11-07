import type { GradeRangeItem } from "@/data/results-data"

interface ResultsGradeLegendProps {
  grades: GradeRangeItem[]
}

export function ResultsGradeLegend({ grades }: ResultsGradeLegendProps) {
  const colorMap: Record<string, string> = {
    blue: "#60A5FA",
    orange: "#F97316",
    green: "#22C55E",
    yellow: "#EAB308",
    red: "#EF4444",
  }

  return (
    <div className="mt-8 border border-slate-700 rounded-lg p-6 bg-slate-800/50">
      <div className="grid grid-cols-5 gap-4">
        {grades.map((grade) => (
          <div key={grade.grade} className="text-center">
            <div className="flex justify-center mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-2"
                style={{
                  borderColor: colorMap[grade.color],
                  backgroundColor: colorMap[grade.color] + "20",
                }}
              >
                <span style={{ color: colorMap[grade.color] }}>{grade.grade}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1">{grade.range}</p>
            <p className="text-xs font-semibold text-gray-300">{grade.percentage}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
