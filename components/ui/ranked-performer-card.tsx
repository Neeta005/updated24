"use client"

import { useRouter } from "next/navigation"  // ADD THIS LINE
import { BaseCard } from "@/components/ui/base-card"
import { UserInfoSection } from "@/components/ui/user-info-section"
import { MetricDisplay } from "@/components/ui/metric-display"
import { Text } from "@/components/atoms/text"

interface Performer {
  id: string  // ADD id property
  name: string
  subject: string
  avatar?: string
  rate: string
}

interface RankedPerformerCardProps extends Performer {
  rank: number
}

export function RankedPerformerCard({ id, rank, name, subject, avatar, rate }: RankedPerformerCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/candidate/results?id=${id}`)
  }

  return (
    <BaseCard 
      className="p-3 md:p-4 flex items-center justify-between border border-gray-600 rounded-lg bg-card cursor-pointer"
      onClick={handleClick}
    >
      {/* Rank + Info */}
      <div className="flex items-center gap-3 md:gap-4">
        <Text variant="body" className="text-white text-xl font-bold w-7 text-center">
          {rank}
        </Text>
        <UserInfoSection name={name} subtitle={subject} avatar={avatar} />
      </div>

      {/* Success Rate */}
      <MetricDisplay
        percentage={Number.parseInt(rate)}
        label="Success Rate"
        color="hsl(var(--green-primary))"
        className="ml-auto"
      />
    </BaseCard>
  )
}