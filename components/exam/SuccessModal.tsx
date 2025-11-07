"use client"

import Image from "next/image"
import { GradientButton } from "@/components/ui/gradient-button" // <-- import GradientButton

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
    <div className="fixed inset-0 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 border border-slate-700 text-center">
        {/* Tick image from public folder */}
        <div className="flex justify-center mb-4">
          <Image
            src="/icons/checkcircle.png" // <-- place your tick image in public/icons/
            alt="Success Tick"
            width={80}
            height={80}
          />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          Successfully Submitted!
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Your answers have been successfully submitted.
        </p>

        <div className="rounded-lg p-4 mb-6 flex justify-center gap-6 text-sm">
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

          {/* Go to Dashboard using GradientButton */}
          <GradientButton onClick={onGoToDashboard} className="flex-1" size="md">
            Go to Dashboard
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
