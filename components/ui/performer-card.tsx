"use client"

import React from "react"
import type { Performer } from "@/types"
import { BaseCard } from "@/components/ui/base-card"
import { UserInfoSection } from "@/components/ui/user-info-section"
import { MetricDisplay } from "@/components/ui/metric-display"

interface PerformerCardProps {
  performer: Performer
}

const PerformerCard = React.memo<PerformerCardProps>(({ performer }) => {
  return (
    <BaseCard className="p-3 md:p-4 flex items-center justify-between">
      <UserInfoSection name={performer.name} subtitle={performer.subject} avatar={performer.avatar} />
      <MetricDisplay
        percentage={Number.parseInt(performer.rate)}
        label="Success Rate"
        color="hsl(var(--green-primary))"
      />
    </BaseCard>
  )
})

PerformerCard.displayName = "PerformerCard"
export { PerformerCard }
