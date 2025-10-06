import { Award, Users, Timer } from "lucide-react"
import type { ReactNode } from "react"

export const examOptions = [
  { value: "students-fresher", label: "Students & Fresher" },
  { value: "mid-level", label: "Mid Level" },
  { value: "senior", label: "Senior" },
]

export const kpis: { title: string; value: string; delta: string; iconPath: string }[] = [
  {
    title: "Total Students",
    value: "246",
    delta: "+12%",
    iconPath: "/icons/result1icon.png", 
  },
  {
    title: "Average Score",
    value: "5",
    delta: "+12%",
    iconPath: "/icons/result2icon.png",
  },
  {
    title: "Pass Rate",
    value: "1 hr 55 min",
    delta: "-12%",
    iconPath: "/icons/result3icon.png",
  },
]

export type ResultRow = {
  id: string
  name: string
  email: string
  score: string
  violations: number
  grade: string
}

export const resultsRows: ResultRow[] = Array.from({ length: 32 }).map((_, i) => ({
  id: `r-${i + 1}`,
  name: "Bessie Cooper",
  email: "bessiecooper@gmail.com",
  score: "90/100",
  violations: [7, 11, 1][i % 3],
  grade: ["F", "B1", "B1", "F"][i % 4],
}))

export const gradeLegend = [
  { code: "A1", label: "90% - 100% Excellent", color: "#7dafc6ff", percentage: 95 },
  { code: "A2", label: "70% - 80% Good", color: "#ff1818ff", percentage: 95 },
  { code: "B1", label: "50% - 60% Average", color: "#4bd164ff", percentage: 95 },
  { code: "B2", label: "30% - 40% Below Average", color: "#fbbf24", percentage: 95 },
  { code: "C1", label: "10% - 20% Fail", color: "#ef4444", percentage: 95 },
]
