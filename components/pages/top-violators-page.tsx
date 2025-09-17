"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { topViolators } from "@/data/topviolators"
import { Text } from "@/components/atoms/text"
import { ViolatorCard } from "@/components/violators/violator-card"

export function TopViolatorsPage() {
  return (
    <div className="mx-auto sm:px-2 lg:px-2">
      <div className="bg-card rounded-xl p-3 sm:p-4 border border-gray-700">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Text variant="heading" className="text-white text-xl sm:text-2xl font-semibold">
            Top Violators
          </Text>
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm sm:text-base">
              <ChevronLeft size={16} />
              Back
            </button>
          </Link>
        </div>

        {/* Violators List */}
        <div className="space-y-3">
          {topViolators.map((violator, index) => (
            <ViolatorCard key={index} violator={violator} />
          ))}
        </div>
      </div>
    </div>
  )
}
