"use client"

import CreateForm from "@/components/question-papers/create-form"
import { Suspense } from "react"

export default function CreateQuestionPaperPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-300">Loading form…</div>}>
      <CreateForm />
    </Suspense>
  )
}
