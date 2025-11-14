"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { candidateMenuItems } from "@/data/candidate-navigation"

interface CandidateSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeIndex?: number
}

export function CandidateSidebar({ isOpen, setIsOpen, activeIndex }: CandidateSidebarProps) {
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
    let idx = candidateMenuItems.findIndex((item) => getFirstSegment(item.href) === currentSeg)
    if (idx !== -1) return idx
    idx = candidateMenuItems.findIndex((item) => startsWithPath(pathname ?? "", item.href))
    if (idx !== -1) return idx
    idx = candidateMenuItems.findIndex((item) =>
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

      <aside
        className={`
          fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border 
          z-40 md:z-0 md:relative flex flex-col
          transform transition-all duration-300
          ${isOpen ? "translate-x-0 w-52" : "-translate-x-full md:translate-x-0 md:w-20"}
        `}
      >
        {/* Vertical spacing added */}
        <div className="mt-19 flex flex-col flex-1 overflow-hidden space-y-2">
          {candidateMenuItems.map((item, index) => {
            const isActive = indexToUse === index

            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.name}
                onClick={() => setIsOpen(false)}
                className="block"
              >
               <div
  className={`
    flex items-center gap-2
    px-3 py-2 rounded-lg transition-all duration-200
    ${isActive
      ? isOpen
        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md w-full"   // expanded → full width
        : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md max-w-fit" // collapsed → small pill
      : "text-sidebar-foreground hover:bg-sidebar-accent"
    }
  `}
>

                  {/* Icon container FIXED SIZE + Centering */}
                  <div className="flex items-center justify-center w-8 h-8">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={22}
                      height={22}
                      className={`
                        transition-all duration-200
                        ${isActive ? "brightness-0 invert" : "opacity-80"}
                      `}
                    />
                  </div>

                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap transition-all
                      ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
                      hidden md:inline
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
