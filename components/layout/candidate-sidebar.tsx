"use client"
import Link from "next/link"
import { candidateMenuItems } from "@/data/candidate-navigation"
import { cn } from "@/lib/utils"
import { Home, BookOpen, FileText, BarChart3 } from "lucide-react"

interface CandidateSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeIndex?: number
}

const iconMap = {
  home: Home,
  exams: BookOpen,
  "exam-logs": FileText,
  results: BarChart3,
}

export function CandidateSidebar({ isOpen, setIsOpen, activeIndex }: CandidateSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-20 bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full pt-20">
          <nav className="flex-1 px-2 py-4 space-y-2">
            {candidateMenuItems.map((item, index) => {
              const IconComponent = iconMap[item.id as keyof typeof iconMap] || Home
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg text-xs font-medium transition-colors group",
                    activeIndex === index
                      ? "bg-orange-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-slate-700",
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-5 h-5 mb-1",
                      activeIndex === index ? "text-white" : "text-gray-400 group-hover:text-white",
                    )}
                  />
                  <span className="text-center leading-tight">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
