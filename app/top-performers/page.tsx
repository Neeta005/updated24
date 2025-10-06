// app/top-performers/page.tsx
import { PerformanceTabsPage } from "@/components/pages/performance-tabs-page"

export default function TopPerformers() {
  return (
    <div className="p-4">
      <PerformanceTabsPage initialTab="Performers" />
    </div>
  )
}
