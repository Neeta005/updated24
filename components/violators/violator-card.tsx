"use client"

import { useRouter } from "next/navigation"
import { BaseCard } from "@/components/ui/base-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Text } from "@/components/atoms/text"

interface Violator {
  rank: number
  name: string
  subject: string
  rate: string
  violations: string
  avatar?: string
}

interface ViolatorCardProps {
  violator: Violator
}

export function ViolatorCard({ violator }: ViolatorCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push("/exam-logs/view")
  }

  return (
    <BaseCard 
      className="p-3 md:p-4 flex items-center justify-between border border-gray-600 rounded-lg bg-card  hover:border-primary/50 "
      onClick={handleClick}
    >
      {/* Rank + Avatar + Info */}
      <div className="flex items-center gap-3 md:gap-4">
        <Text variant="body" className="text-white text-xl font-bold w-7 text-center">
          {violator.rank}
        </Text>
        <Avatar className="w-9 h-9">
          {violator.avatar ? (
            <AvatarImage src={violator.avatar} />
          ) : (
            <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">
              {violator.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <Text variant="body" className="text-white font-semibold text-base">
            {violator.name}
          </Text>
          <Text variant="caption" className="text-gray-400">
            {violator.subject}
          </Text>
        </div>
      </div>

      {/* Violation Rate */}
      <div className="flex flex-col items-center">
        <CircularProgress
          percentage={Number.parseInt(violator.rate)}
          size={48}
          strokeWidth={4}
          color="hsl(var(--destructive))"
          className="mb-1"
        />
        <Text variant="caption" className="text-gray-400">
          {violator.violations}
        </Text>
      </div>
    </BaseCard>
  )
}
