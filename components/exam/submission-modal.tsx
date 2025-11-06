"use client"

interface SubmissionModalProps {
  isOpen: boolean
  unattemptedCount: number
  bookmarkedCount: number
  skippedCount: number
  onReviewUnattempted: () => void
  onSubmitAnyway: () => void
}

export function SubmissionModal({
  isOpen,
  unattemptedCount,
  bookmarkedCount,
  skippedCount,
  onReviewUnattempted,
  onSubmitAnyway,
}: SubmissionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0  bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 border border-slate-700">
        <div className="flex justify-center mb-6">
          <div className="text-6xl">😢</div>
        </div>

        <h2 className="text-center text-xl font-bold text-white mb-2">
          Are You Sure You Want to Submit?
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          These questions were not attempted
        </p>

        <div className="bg-slate-700 rounded-lg p-4 mb-6 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-gray-300 text-sm">{bookmarkedCount} Bookmarked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-gray-300 text-sm">{skippedCount} Skipped</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReviewUnattempted}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-white hover:bg-slate-700 transition-colors"
          >
            Review Unattempted
          </button>
          <button
            onClick={onSubmitAnyway}
            className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Submit Anyway
          </button>
        </div>
      </div>
    </div>
  )
}
