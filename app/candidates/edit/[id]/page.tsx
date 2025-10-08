"use client"

import { useRouter, useParams } from "next/navigation"
import { GroupEdit } from "@/components/candidates/group-edit"

export default function CandidateGroupEditPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  return (
    <GroupEdit
      onBack={() => router.push(id ? `/candidates/view/${id}` : "/candidates/table")}
      onSave={() => router.push(id ? `/candidates/view/${id}` : "/candidates/table")}
    />
  )
}
