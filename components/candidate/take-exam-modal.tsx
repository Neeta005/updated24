"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import type { ExamItem } from "@/data/candidate-dashboard"

interface TakeExamModalProps {
  isOpen: boolean
  onClose: () => void
  exam: ExamItem
  onStartExam: () => void
}

export function TakeExamModal({ isOpen, onClose, exam, onStartExam }: TakeExamModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
        <DialogContent
          className="bg-slate-900 border border-slate-700 p-0 max-w-4xl w-full overflow-hidden"
          showCloseButton={false}
        >
          <div className="flex flex-col lg:flex-row h-[90vh] lg:h-auto">
            {/* Left Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-white text-3xl font-bold mb-2">Exam: {exam.title}</h1>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Subject : </span>
                    {exam.tags[0]}
                  </p>
                  <p>
                    <span className="text-gray-400">No of questions : </span>
                    {30}
                  </p>
                </div>
              </div>

              {/* Warning Section */}
              <div className="bg-slate-800 rounded-lg p-4 text-sm text-gray-300 space-y-2">
                <p>
                  We are monitoring your activity during the exam, and any unusual behaviour is being tracked. Your
                  admin has set the exam to terminate if a certain number of unusual activities are detected, which
                  could be as low as one. To avoid your exam from being terminated, please refrain from any behaviour
                  that may be considered unusual. All the best!
                </p>
              </div>

              {/* Secure Exam Advice */}
              <div className="space-y-3">
                <h2 className="text-white text-lg font-semibold">Secure Exam Advice</h2>
                <p className="text-sm text-gray-300">
                  This exam is video recorded and live streamed to the administrator. Kindly follow these instructions
                  for a smooth experience and avoid any hitches
                </p>
                <ul className="space-y-2 ml-4 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Please ensure that the room has appropriate lighting.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Please ensure that the camera is facing towards you.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Please remain seated during the exam.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Make sure that no one else can see your screen during the exam.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Please refrain from using your mobile phone during the exam.</span>
                  </li>
                </ul>
              </div>

              {/* Not Supported Actions */}
              <div className="space-y-3">
                <h2 className="text-white text-lg font-semibold">
                  The following actions are also not supported during your exam.
                </h2>
                <ul className="space-y-2 ml-4 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Minimizing the browser</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Resizing the browser</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Open a new tab</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Open a new program</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Taking a screenshot</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Pressing Ctrl + C</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Pressing Ctrl + V</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Pressing Print Screen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 mt-0.5">•</span>
                    <span>Pressing F12</span>
                  </li>
                </ul>
              </div>

              {/* Checkbox & Error */}
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 border border-gray-500 rounded cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                    Have Read And Understood The Instructions. I Agree To Accept The Results Generated By This System.
                  </label>
                </div>
                {!agreedToTerms && (
                  <div className="flex items-center gap-2 ml-7 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>This needs to be checked</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:flex w-64 bg-gradient-to-br from-blue-900 to-blue-950 items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <p className="text-blue-200 text-sm font-medium">Secure Exam Environment</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-slate-700 p-6 flex gap-3 justify-end bg-slate-800">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-slate-700 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (agreedToTerms) {
                    onStartExam()
                    onClose()
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={!agreedToTerms}
              >
                Start Exam
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
