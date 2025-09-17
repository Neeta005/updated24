"use client"

interface TopicBadgeProps {
  topic: string
  index: number
  onRemove: (index: number) => void
}

export function TopicBadge({ topic, index, onRemove }: TopicBadgeProps) {
  return (
    <div className="flex items-center">
      <div className="relative inline-flex items-center px-3 py-1 bg-muted text-card-foreground rounded-full text-sm">
        {topic}
        <button
          className="ml-2 text-muted-foreground hover:text-card-foreground transition-colors"
          onClick={() => onRemove(index)}
        >
          <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {index === 0 && <span className="text-green-400 text-sm ml-2">●</span>}
      {index === 1 && <span className="text-green-400 text-sm ml-2">●</span>}
    </div>
  )
}
