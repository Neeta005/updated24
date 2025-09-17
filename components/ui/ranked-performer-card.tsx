"use client"
import type { Performer } from "@/types"
import { BaseCard } from "@/components/ui/base-card"
import { UserInfoSection } from "@/components/ui/user-info-section"
import { MetricDisplay } from "@/components/ui/metric-display"

interface RankedPerformerCardProps extends Performer {
  rank: number
}

export function RankedPerformerCard({ rank, name, subject, avatar, rate }: RankedPerformerCardProps) {
  return (
    <BaseCard className="p-3 md:p-4 flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-white text-base md:text-xl font-bold w-6 md:w-7 text-center">{rank}</div>
        <UserInfoSection name={name} subtitle={subject} avatar={avatar} />
      </div>
      <MetricDisplay percentage={Number.parseInt(rate)} label="Success Rate" color="hsl(var(--green-primary))" />
    </BaseCard>
  )
}
