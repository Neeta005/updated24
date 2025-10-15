"use client"

import { useRouter } from "next/navigation"
import { CandidatesTable } from "@/components/candidates/candidates-table"

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function CandidatesTablePage() {
  const router = useRouter()
  return (
    <CandidatesTable
      onClose={() => router.push("/candidates")}
      onViewGroup={(id) => router.push(`/candidates/view/${id}`)}
      onEditGroup={(id) => router.push(`/candidates/edit/${id}`)}
    />
  )
}