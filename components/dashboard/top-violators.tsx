import { SectionHeader } from "@/components/ui/section-header"
import { ViolatorCard } from "@/components/ui/violator-card"
import { topViolators } from "@/data/performers"

export function TopViolators() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 w-full h-full min-h-[400px]">
      <SectionHeader title="Top Violators" viewAllHref="/top-violators" />

      <div className="space-y-3 md:space-y-4 flex-1">
        {topViolators?.map((violator) => (
          <ViolatorCard key={violator.id} {...violator} />
        ))}
      </div>
    </div>
  )
}
