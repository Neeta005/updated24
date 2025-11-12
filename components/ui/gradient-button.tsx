import { cn } from "@/lib/utils"

interface GradientButtonProps {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export function GradientButton({
  children,
  size = "md",
  className = "",
  onClick,
  type = "button",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-medium rounded-md transition-colors",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  )
}
