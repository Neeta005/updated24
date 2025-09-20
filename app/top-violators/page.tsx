// app/top-violators/page.tsx
import { PerformanceTabsPage } from "@/components/pages/performance-tabs-page"

export default function TopViolators() {
  return (
    <div className="p-4">
      <PerformanceTabsPage initialTab="Violators" />
    </div>
  )
}
