"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { questionPapers } from "@/data/question-papers"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type DeleteConfirmProps = {
  open: boolean
  id?: string
  onOpenChange?: (open: boolean) => void
}

export default function DeleteConfirmModal({ open, id, onOpenChange }: DeleteConfirmProps) {
  const router = useRouter()
  const paper = useMemo(() => questionPapers.find((p) => p.id === id) ?? questionPapers[0], [id])

  const handleClose = () => {
    // close -> navigate back to listing
    router.push("/question-papers")
    onOpenChange?.(false)
  }

  const handleConfirm = () => {
    // hook up deletion here if needed, then navigate
    router.push("/question-papers")
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? handleClose() : onOpenChange?.(next))}>
      <DialogContent className="bg-card border border-gray-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Delete Question Paper?</DialogTitle>
        </DialogHeader>

        <p className="text-slate-400 text-sm -mt-2">
          Are you sure you want to delete “{paper.title}”? You won’t be able to recover it.
        </p>

        <div className="rounded-xl border border-slate-700 p-4 mt-4">
          <div className="text-white font-semibold">{paper.title}</div>
          <div className="mt-3 space-y-1 text-slate-300 text-sm">
            <div>
              <span className="text-slate-400">Subject</span> &nbsp; {paper.tags.map((t) => t.name).join(" · ")}
            </div>
            <div>
              <span className="text-slate-400">Total Question</span> &nbsp; {paper.questionCount}
            </div>
            <div>
              <span className="text-slate-400">Total marks</span> &nbsp; {paper.marks}
            </div>
            <div>
              <span className="text-slate-400">Target audience</span> &nbsp; {paper.targetAudience}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-primary to-red-primary text-white"
          >
            Confirm
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
