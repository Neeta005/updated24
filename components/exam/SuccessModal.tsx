"use client"

interface SuccessModalProps {
  isOpen: boolean
  attempted: number
  bookmarked: number
  skipped: number
  onGoToDashboard: () => void
  onViewResult: () => void
}

export function SuccessModal({
  isOpen,
  attempted,
  bookmarked,
  skipped,
  onGoToDashboard,
  onViewResult,
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0  bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 border border-slate-700 text-center">
        <div className="text-6xl mb-4">✅</div>

        <h2 className="text-xl font-bold text-white mb-2">
          Successfully Submitted!
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Your answers have been successfully submitted.
        </p>

        <div className="bg-slate-700 rounded-lg p-4 mb-6 flex justify-center gap-6 text-sm">
          <span className="text-blue-400">{bookmarked} Bookmarked</span>
          <span className="text-green-400">{attempted} Attempted</span>
          <span className="text-red-400">{skipped} Skipped</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onViewResult}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-white hover:bg-slate-700 transition-colors"
          >
            View Result
          </button>
          <button
            onClick={onGoToDashboard}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
