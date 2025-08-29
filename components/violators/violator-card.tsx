import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Text } from "@/components/atoms/text"

interface ViolatorCardProps {
  violator: {
    rank: number
    name: string
    subject: string
    rate: string
    violations: string
  }
}

export function ViolatorCard({ violator }: ViolatorCardProps) {
  return (
    <div className="bg-card rounded-lg p-3 border border-gray-600 flex items-center justify-between">
      {/* Rank + Avatar + Info */}
      <div className="flex items-center space-x-4">
        <Text variant="body" className="text-white text-xl font-bold w-7">
          {violator.rank}
        </Text>
        <Avatar className="size-9">
          <AvatarImage src="/images/avtar.jpg" />
          <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">
            {violator.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
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
    </div>
  )
}
