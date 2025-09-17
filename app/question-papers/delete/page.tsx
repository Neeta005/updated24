"use client"

import { useRouter, useSearchParams } from "next/navigation"
import DeleteConfirmModal from "@/components/question-papers/delete-confirm"
import { QuestionPapersGrid } from "@/components/question-papers/question-papers-grid"

export default function DeleteQuestionPaperPage() {
  const params = useSearchParams()
  const router = useRouter()
  const id = params.get("id") || undefined

  return (
    <main className="relative flex-1 p-6">
      {/* Background content: the grid remains visible behind the modal */}
      <QuestionPapersGrid />
      {/* Modal on top */}
      <DeleteConfirmModal
        open={true}
        id={id}
        onOpenChange={(open) => {
          if (!open) router.push("/question-papers")
        }}
      />
    </main>
  )
}
