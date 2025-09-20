"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { menuItems } from "@/data/navigation"

// ✅ Explicit props type
interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: Readonly<ClientLayoutProps>) {
  // ✅ Explicit state type
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const isAuthPage = pathname === "/" || pathname === "/sign-up"
  // ✅ Fixed: Changed from "/candidate" to "/candidate/" to only match individual candidate pages
  // This way "/candidates" (plural) will still show header and sidebar
  const isCandidatePage = pathname?.startsWith("/candidate/")

  const toggleSidebar = (): void => setSidebarOpen((prev) => !prev)

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

  const getFirstSegment = (p: string | null | undefined): string => {
    if (!p) return ""
    const clean = p.split("?")[0].split("#")[0]
    const seg = clean.replace(/^\/+/, "").split("/")[0]
    return seg || ""
  }

  const getActiveIndex = (): number => {
    if (!pathname) return -1
    const currentSeg = getFirstSegment(pathname)

    // 1) try top-level segment equality
    let idx = menuItems.findIndex((item) => getFirstSegment(item.href) === currentSeg)
    if (idx !== -1) return idx

    // 2) try href prefix match
    idx = menuItems.findIndex((item) => startsWithPath(pathname, item.href))
    if (idx !== -1) return idx

    // 3) try activeMatch patterns
    idx = menuItems.findIndex((item) => (item.activeMatch ?? []).some((pattern) => startsWithPath(pathname, pattern)))
    return idx // might be -1; we won't force Dashboard
  }

  const activeIdx = getActiveIndex()

  if (isAuthPage || isCandidatePage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} activeIndex={activeIdx >= 0 ? activeIdx : undefined} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 pt-16 pl-0 lg:pl-20 bg-dark-bg overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
