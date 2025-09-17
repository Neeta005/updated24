"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { topPerformers } from "@/data/topperformers"
import { topViolators } from "@/data/topviolators"
import { RankedPerformerCard } from "@/components/ui/ranked-performer-card"
import { ViolatorCard } from "@/components/violators/violator-card"
import { Text } from "@/components/atoms/text"

export function PerformanceTabsPage() {
  const [activeTab, setActiveTab] = useState("Performers")

  const tabs = ["Performers", "Violators"]

  const getCurrentData = () => {
    switch (activeTab) {
      case "Performers":
        return topPerformers
      case "Violators":
        return topViolators
      default:
        return topPerformers
    }
  }

  return (
    <div className="mx-auto sm:px-2 lg:px-2">
      <div className="bg-card rounded-xl p-3 sm:p-4 border border-gray-700">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Text variant="heading" className="text-white text-xl sm:text-2xl font-semibold">
            Top {activeTab}
          </Text>
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap text-sm sm:text-base">
              <ChevronLeft size={16} />
              Back
            </button>
          </Link>
        </div>

        {/* Tabs - Using the same structure as ActiveExamsPage */}
        <div className="mb-6 sm:mb-8 w-full bg-slate-800 rounded-lg px-4 py-1">
          <div className="flex space-x-0 justify-start">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-medium transition-colors rounded-md ${
                  activeTab === tab
                    ? "bg-gray-700 text-orange-500 px-5 py-2"
                    : "text-gray-400 hover:text-white px-6 py-3"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-3">
          {activeTab === "Performers" ? (
            topPerformers.map((performer, index) => (
              <RankedPerformerCard
                key={`${performer.id}-${index}`}
                id={performer.id}
                name={performer.name}
                subject={performer.subject}
                rate={performer.rate}
                avatar="/images/avtar.jpg"
                rank={performer.rank}
              />
            ))
          ) : (
            topViolators.map((violator, index) => (
              <ViolatorCard key={index} violator={violator} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
