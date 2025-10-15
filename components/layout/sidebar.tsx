"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { menuItems } from "@/data/navigation"

interface SidebarProps {
  activeIndex?: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ activeIndex, isOpen, setIsOpen }: SidebarProps) {
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

  const getFirstSegment = (p: string | null | undefined): string => {
    if (!p) return ""
    const clean = p.split("?")[0].split("#")[0]
    const seg = clean.replace(/^\/+/, "").split("/")[0]
    return seg || ""
  }

  const computedActiveIndex = useMemo(() => {
    const currentSeg = getFirstSegment(pathname)
    // 1) segment equality
    let idx = menuItems.findIndex((item) => getFirstSegment(item.href) === currentSeg)
    if (idx !== -1) return idx
    // 2) href prefix match
    idx = menuItems.findIndex((item) => startsWithPath(pathname ?? "", item.href))
    if (idx !== -1) return idx
    // 3) activeMatch patterns
    idx = menuItems.findIndex((item) =>
      (item.activeMatch ?? []).some((pattern) => startsWithPath(pathname ?? "", pattern)),
    )
    return idx // can be -1, we won't force Dashboard
  }, [pathname])

  const indexToUse = activeIndex ?? computedActiveIndex


  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
      <aside
        className={`fixed left-0 top-0 h-full w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center z-40 
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex`}
      >
        <div className="mt-18 flex flex-col items-center">
          {menuItems.map((item, index) => {
            const isActive = indexToUse === index
            return (
            <Link
  key={item.id}
  href={item.href}
  className={`w-12 h-11 flex items-center justify-center transition-all duration-200
    ${isActive ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg rounded-lg" : "hover:bg-sidebar-accent rounded-lg"}`}
  title={item.name}
  onClick={() => setIsOpen(false)}
>
  <Image
    src={item.icon || "/placeholder.svg?height=40&width=40&query=sidebar%20icon"}
    alt={item.name}
    width={40}
    height={40}
    className={`size-10 transition-all duration-200 
      ${isActive ? "brightness-0 invert" : "opacity-80 hover:opacity-100"}`}
  />
</Link>

            )
          })}
        </div>
      </aside>
    </>
  )
}
