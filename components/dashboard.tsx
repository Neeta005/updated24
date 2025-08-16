import { StatsCards } from "./stats-cards"
import { ActiveExams } from "./active-exams"
import { ViolationsChart } from "./violations-chart"
import { TopPerformers } from "./top-performers"
import { TopViolators } from "./top-violators"
import { ExamCalendar } from "./exam-calendar"

export function Dashboard() {
  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 min-h-screen">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
        <div className="xl:col-span-8">
          <ActiveExams />
        </div>
        <div className="xl:col-span-4">
          <ExamCalendar />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <ViolationsChart />
        <TopPerformers />
        <TopViolators />
      </div>
    </div>
  )
}
