import { Text } from "@/components/atoms/text"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  label: string
  value: string
}

export function StatCard({ icon: IconComponent, iconColor, bgColor, label, value }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center gap-3">
        <div className={`size-10 ${bgColor} rounded-lg flex items-center justify-center`}>
          <IconComponent size={20} className={iconColor} />
        </div>
        <div>
          <Text variant="body" size="sm" color="primary">
            {label}
          </Text>
          <Text variant="body" size="lg" color="muted">
            {value}
          </Text>
        </div>
      </div>
    </div>
  )
}
