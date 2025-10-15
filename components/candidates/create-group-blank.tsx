"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { gradientButtonStyle } from "@/data/syllabus"
import { TabButton } from "@/components/ui/tab-button" // adjust import path as needed

export function CreateGroupBlank() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"groups" | "candidates">("groups")

  const handleTabClick = (tab: "groups" | "candidates") => {
    setActiveTab(tab)

    // redirect only when switching to "candidates"
    if (tab === "candidates") {
      router.push("/candidates/table?tab=candidates")
    }
  }

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Candidates</h1>
        <div className="flex items-center gap-3">
          <button
            className={`${gradientButtonStyle} px-4 py-2 text-white rounded-lg text-sm font-medium`}
            onClick={() => router.push("/candidates/create/new")}
          >
            + Create New Group
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="w-full bg-slate-800 p-1.5 mb-6 rounded-md">
        <div className="flex">
          <TabButton
            active={activeTab === "groups"}
            onClick={() => handleTabClick("groups")}
            position="left"
          >
            All Groups
          </TabButton>

          <TabButton
            active={activeTab === "candidates"}
            onClick={() => handleTabClick("candidates")}
            position="right"
          >
            All Candidates
          </TabButton>
        </div>
      </div>

      {/* Empty State Card */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900 p-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Image from public folder */}
          <div className="mx-auto flex items-center justify-center overflow-hidden">
            <Image
              src="/icons/grouppp 1.png"
              alt="No Group Icon"
              width={90}
              height={90}
              className="object-contain opacity-80"
            />
          </div>

          <div className="space-y-1">
            <p className="text-white/90 text-base font-medium">
              {activeTab === "groups" ? "No Group Added yet!" : "No Candidates Added yet!"}
            </p>
            <p className="text-slate-400 text-sm">
              {activeTab === "groups"
                ? "Create Group to manage them"
                : "Add candidates to view them here"}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
