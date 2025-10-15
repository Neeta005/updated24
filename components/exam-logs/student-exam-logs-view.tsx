"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  Clock,
  TriangleAlert,
  ChevronLeft,
  ChevronRight,
  Monitor,
  MapPin,
  Globe,
  Webcam,
  Mic,
  AppWindow,
  Wifi,
} from "lucide-react"
import type { StudentExamLog } from "@/types"

interface Props {
  student?: StudentExamLog
}

export function StudentExamLogsView({ student }: Props) {
  const name = student?.name ?? "Bessie Cooper"
  const examTitle = "Mid-Term: Network Security"
  const date = "05 Aug, 2025"
  const time = "10:00 AM - 11:30 AM"
  const violationsCount = student?.violations ?? 8

  const violations = [
    { label: "Tab Switch", count: 8, icon: "/icons/Tab switch 1.png" },
    { label: "Opened Other Applications", count: 4, icon: "/icons/applicatioon 1.png" },
    { label: "Multiple Faces Found", count: 5, icon: "/icons/faces 1.png" },
    { label: "Noise Detected", count: 1, icon: "/icons/niose 1.png" },
  ]

  const captures = [
    { src: "/images/avtar.jpg", time: "10:12 AM" },
    { src: "/images/avtar.jpg", time: "10:20 AM" },
    { src: "/images/avtar.jpg", time: "10:30 AM" },
    { src: "/images/avtar.jpg", time: "10:45 AM" },
    { src: "/images/avtar.jpg", time: "11:00 AM" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 3

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? captures.length - visibleCount : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= captures.length - visibleCount ? 0 : prev + 1
    )
  }

  const visibleImages = captures.slice(currentIndex, currentIndex + visibleCount)

  return (
    <div className="container-responsive space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
        Exam Logs
      </h1>

      {/* Performance Card */}
      <section className="bg-card border border-border rounded-xl p-5 md:p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            {name}
            {"'"}s Performance
          </h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Exam Title */}
            <div className="w-full max-w-lg">
              <div className="border border-white rounded-lg px-4 py-3 text-sm text-foreground flex items-center justify-between">
                <span>{examTitle}</span>
                <span className="text-muted-foreground">▼</span>
              </div>
            </div>

            {/* Meta Chips */}
            <div className="flex flex-wrap items-center gap-3">
              <MetaChip
                icon={<CalendarDays className="size-4" />}
                label="Date"
                value={date}
              />
              <MetaChip
                icon={<Clock className="size-4" />}
                label="Duration"
                value={time}
              />
              <MetaChip
                icon={<TriangleAlert className="size-4" />}
                label="Violations"
                value={`${violationsCount} Violations`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Captures + Violations */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Captures */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 relative">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Live Captures
          </h3>

          {/* Carousel Arrows */}
          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="absolute top-1/2 left-3 -translate-y-1/2 p-2 rounded-full bg-card border border-border hover:bg-muted z-10 shadow-md"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-card border border-border hover:bg-muted z-10 shadow-md"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Show 3 images at a time */}
          <div className="flex gap-3 overflow-hidden px-14 justify-center">
            {visibleImages.map((c, i) => (
              <figure
                key={currentIndex + i}
                className="relative rounded-lg overflow-hidden border border-border flex-1 max-w-[calc(33.333%-0.5rem)]"
              >
                <Image
                  src={c.src || "/placeholder.svg"}
                  alt="Live capture"
                  width={640}
                  height={480}
                  className="w-full h-48 object-cover"
                />
                <figcaption className="absolute bottom-0 w-full bg-black/60 text-white text-xs md:text-sm px-3 py-2 flex items-center gap-2">
                  <Clock className="size-4" />
                  {c.time}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Progress Rail */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground/20 transition-all duration-500"
              style={{
                width: `${((currentIndex + visibleCount) / captures.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Violations */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Violations
          </h3>
          <ul className="divide-y divide-border">
            {violations.map((v) => (
              <li key={v.label} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="size-6 inline-flex items-center justify-center rounded-md ">
                    <Image
                      src={v.icon}
                      alt={v.label}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="text-foreground">{v.label}</span>
                </div>
                <span className="text-foreground/80">
                  {v.count.toString().padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* System Information */}
      <section className="bg-card border border-border rounded-xl p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          System Information
        </h3>

        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
            <InfoItem
              icon={<Monitor className="size-4" />}
              label="Operating System"
              value="Windows 11"
            />
            <InfoItem icon={<Globe className="size-4" />} label="IP Address" value="182.176.192.1" />
            <InfoItem icon={<MapPin className="size-4" />} label="Location" value="Delhi, India" />
            <InfoItem icon={<Globe className="size-4" />} label="Browser Version" value="Chrome 116.0" />
          </div>

          {/* Horizontal Divider */}
          <div className="border-t border-border"></div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
            <InfoItem icon={<Webcam className="size-4" />} label="Camera" value="Logitech HD 1080p (Good Quality)" />
            <InfoItem icon={<Mic className="size-4" />} label="Microphone" value="Built-in Mic (Average)" />
            <InfoItem icon={<AppWindow className="size-4" />} label="Application Opened" value="WhatsApp, Excel" />
            <InfoItem icon={<Wifi className="size-4" />} label="Internet Speed" value="15 Mbps (Good)" />
          </div>
        </div>
      </section>
    </div>
  )
}

/* ----------- CLEAN CHIP (NO BORDER OR BG) ----------- */
function MetaChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-transparent">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-sm text-foreground/80">{label}</span>
      <span className="text-sm text-foreground/90 font-medium">{value}</span>
    </div>
  )
}

/* ----------- INFO ITEMS (INLINE LAYOUT) ----------- */
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-sm text-foreground font-medium">{value}</span>
      </div>
    </div>
  )
}
