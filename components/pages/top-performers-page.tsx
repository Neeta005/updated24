"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { topPerformers } from "@/data/topperformers"
import { RankedPerformerCard } from "@/components/ui/ranked-performer-card"

export function TopPerformersPage() {
  return (
    <div className=" mx-auto sm:px-2 lg:px-2">
      <div className="bg-card rounded-xl p-3 sm:p-4 border border-gray-700">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-white text-xl sm:text-2xl font-semibold">Top Performers</h1>
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap text-sm sm:text-base">
              <ChevronLeft size={16} />
              Back
            </button>
          </Link>
        </div>

        {/* Performers List */}
        <div className="space-y-3">
          {topPerformers.map((performer, index) => (
            <RankedPerformerCard
              key={`${performer.id}-${index}`} // Unique key
              id={performer.id}
              name={performer.name}
              subject={performer.subject}
              rate={performer.rate}
              avatar="/images/avtar.jpg"
              rank={performer.rank}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
