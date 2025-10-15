"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import { ImportCandidatesModal } from "@/components/modals/import-candidates-modal"

export default function ImportCandidatesPage() {
  const router = useRouter()
  const [isImportOpen, setIsImportOpen] = useState(false)

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Candidates</h1>

        <GradientButton className="px-4 py-2.5 text-sm font-medium" onClick={() => setIsImportOpen(true)}>
          Import Candidates
        </GradientButton>
      </div>

      {/* Tabs */}
      <div className="w-full bg-slate-800 p-1.5 mb-6 rounded-md">
        <div className="flex gap-2">
          <button
            onClick={() => router.replace("/candidates/table?tab=groups")}
            className="flex items-center justify-center min-w-[93px] h-[32px] px-[12px] gap-[10px] rounded-md bg-transparent text-slate-400 font-semibold hover:text-slate-300 text-[12px] leading-[18px] font-poppins whitespace-nowrap"
          >
            All Groups
          </button>

          <button
            onClick={() => router.replace("/candidates/table?tab=candidates")}
            className="flex items-center justify-center min-w-[110px] h-[32px] px-[12px] gap-[10px] rounded-md
                       bg-gradient-to-b from-[rgba(240,89,33,0.2)] to-[rgba(240,89,33,0)]
                       text-[#F05921] font-semibold text-[12px] leading-[18px] font-poppins whitespace-nowrap"
          >
            All Candidates
          </button>
        </div>
      </div>

      {/* Empty state card */}
      <section className="bg-card rounded-xl p-6 shadow-lg border border-slate-800">
        <div className="min-h-[520px] rounded-xl bg-[#0F1D30] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Illustration */}
          <img src="/icons/canddidate 1.png" alt="No Candidates" className="h-28 w-28 opacity-80 mb-4" />

          {/* Text */}
          <h2 className="text-white/90 text-lg font-semibold">No Candidates!</h2>
          <p className="text-slate-400 text-sm">Add some candidates to view here</p>
        </div>
      </section>

      {/* Modal mount */}
      <ImportCandidatesModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
    </main>
  )
}
