import { SectionHeader } from "@/components/ui/section-header"
import { PerformerCard } from "@/components/ui/performer-card"
import { topPerformers } from "@/data/performers"

export function TopPerformers() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 w-full h-full min-h-[400px]">
      <SectionHeader title="Top Performers" viewAllHref="/top-performers" />

      <div className="space-y-3 md:space-y-4 flex-1">
        {topPerformers.map((performer) => (
          <PerformerCard key={performer.id} {...performer} />
        ))}
      </div>
    </div>
  )
}
