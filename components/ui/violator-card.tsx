"use client"

import React from "react"
import type { Violator } from "@/types"
import { BaseCard } from "@/components/ui/base-card"
import { UserInfoSection } from "@/components/ui/user-info-section"
import { MetricDisplay } from "@/components/ui/metric-display"

interface ViolatorCardProps {
  violator: Violator
}

const ViolatorCard = React.memo<ViolatorCardProps>(({ violator }) => {
  return (
    <BaseCard className="p-3 md:p-4 flex items-center justify-between">
      <UserInfoSection name={violator.name} subtitle={violator.subject} avatar={violator.avatar} />
      <MetricDisplay percentage={violator.violations} label="Violations" color="hsl(var(--red-primary))" />
    </BaseCard>
  )
})

ViolatorCard.displayName = "ViolatorCard"
export { ViolatorCard }
