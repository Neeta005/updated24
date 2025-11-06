"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { CandidateHeader } from "@/components/layout/candidate-header"
import { CandidateSidebar } from "@/components/layout/candidate-sidebar"
import { candidateMenuItems } from "@/data/candidate-navigation"

interface CandidateLayoutProps {
  children: ReactNode
}

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const normalizePath = (p: string | null | undefined): string => {
    if (!p) return "/"
    const clean = p.split("?")[0].split("#")[0]
    const withLeading = clean.startsWith("/") ? clean : `/${clean}`
    const noTrailing = withLeading.replace(/\/+$/, "")
    return noTrailing === "" ? "/" : noTrailing
  }

  const startsWithPath = (path: string, base: string): boolean => {
    const a = normalizePath(path)
    const b = normalizePath(base)
    if (b === "/") return a === "/"
    return a === b || a.startsWith(`${b}/`)
  }

  const getActiveIndex = (): number => {
    if (!pathname) return -1

    const idx = candidateMenuItems.findIndex(
      (item) =>
        startsWithPath(pathname, item.href) ||
        (item.activeMatch ?? []).some((pattern) => startsWithPath(pathname, pattern)),
    )
    return idx
  }

  const activeIdx = getActiveIndex()

  // Show sidebar only on dashboard and exam logs main page
  const showSidebarPaths = ["/candidate/dashboard", "/candidate/exam-logs"]
  const shouldShowSidebar = showSidebarPaths.includes(normalizePath(pathname))

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {shouldShowSidebar && (
        <CandidateSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          activeIndex={activeIdx >= 0 ? activeIdx : undefined}
        />
      )}

      <div className="flex-1 flex flex-col">
        <CandidateHeader />
        <main
          className={`flex-1 pt-20 ${
            shouldShowSidebar ? "pl-0 lg:pl-20" : "pl-0"
          } bg-slate-900 overflow-x-hidden`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
