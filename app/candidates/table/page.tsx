"use client"

import { useRouter } from "next/navigation"
import { CandidatesTable } from "@/components/candidates/candidates-table"
import { Suspense } from "react"

export default function CandidatesTablePage() {
  const router = useRouter()
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-300">Loading candidates…</div>}>
      <CandidatesTable
        onClose={() => router.push("/candidates")}
        onViewGroup={(id) => router.push(`/candidates/view/${id}`)}
        onEditGroup={(id) => router.push(`/candidates/edit/${id}`)}
      />
    </Suspense>
  )
}
