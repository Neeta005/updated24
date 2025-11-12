"use client"

import React from "react"
import type { Violator } from "@/types"
import { BaseCard } from "@/components/ui/base-card"
import { UserInfoSection } from "@/components/ui/user-info-section"
import { MetricDisplay } from "@/components/ui/metric-display"

const ViolatorCard = React.memo<Violator>(
  ({ id, name, subject, avatar, violations }) => {
    return (
      <BaseCard
        className="
          p-3 md:p-4 flex items-center justify-between 
          cursor-pointer hover:bg-muted hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] hover:border-border/80 hover:scale-[1.01]
        "
      >
        <UserInfoSection name={name} subtitle={subject} avatar={avatar} />
        <MetricDisplay
          percentage={violations}
          label="Violations"
          color="hsl(var(--red-primary))"
        />
      </BaseCard>
    )
  }
)

ViolatorCard.displayName = "ViolatorCard"
export { ViolatorCard }
