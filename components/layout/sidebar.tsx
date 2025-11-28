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
    let idx = menuItems.findIndex((item) => getFirstSegment(item.href) === currentSeg)
    if (idx !== -1) return idx

    idx = menuItems.findIndex((item) => startsWithPath(pathname ?? "", item.href))
    if (idx !== -1) return idx

    idx = menuItems.findIndex((item) =>
      (item.activeMatch ?? []).some((pattern) => startsWithPath(pathname ?? "", pattern)),
    )
    return idx
  }, [pathname])

  const indexToUse = activeIndex ?? computedActiveIndex

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border 
          z-40 flex flex-col
          transform transition-all duration-300
          ${isOpen ? "translate-x-0 w-52" : "-translate-x-full md:translate-x-0 md:w-20"}
        `}
      >
        {/* Scroll inside only if long menu */}
        <div className="mt-17 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item, index) => {
            const isActive = indexToUse === index
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 
                    transition-all duration-200 rounded-xl w-full
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }
                  `}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={isOpen ? 38 : 36}
                    height={isOpen ? 38 : 36}
                    className={`
                      transition-all duration-200
                      ${isActive ? "brightness-0 invert" : "opacity-80"}
                    `}
                  />

                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap transition-all
                      hidden md:inline
                      ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
                    `}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
