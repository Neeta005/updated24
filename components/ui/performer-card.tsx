"use client"

import React from "react"
import { useRouter } from "next/navigation"  // ADD THIS LINE
import type { Performer } from "@/types"
import { BaseCard } from "@/components/ui/base-card"
import { UserInfoSection } from "@/components/ui/user-info-section"
import { MetricDisplay } from "@/components/ui/metric-display"

interface PerformerCardProps extends Performer {}

const PerformerCard = React.memo<React.FC<PerformerCardProps>>(
  ({ id, name, subject, avatar, rate }) => {
    const router = useRouter()

    const handleClick = () => {
      router.push(`/candidate/results?id=${id}`)
    }

    return (
      <BaseCard 
        className="p-3 md:p-4 flex items-center justify-between cursor-pointer"
        onClick={handleClick}
      >
        <UserInfoSection name={name} subtitle={subject} avatar={avatar} />
        <MetricDisplay
          percentage={Number.parseInt(rate)}
          label="Success Rate"
          color="hsl(var(--green-primary))"
        />
      </BaseCard>
    )
  }
)

PerformerCard.displayName = "PerformerCard"
export { PerformerCard }
