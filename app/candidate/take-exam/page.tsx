"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function TakeExamPage() {
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()

  const handleStartExam = () => {
    if (isChecked) {
      router.push("/candidate/system-check")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-20">
      {/* Success Banner */}
      <div className="bg-emerald-900 border-b border-emerald-700 px-6 py-3 flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-emerald-200 text-sm">
          Your system is fully compatible with our software, you can take exams anytime
        </span>
        <button className="ml-auto text-emerald-200 hover:text-emerald-100">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Check your system compatibility</h1>
        <p className="text-gray-400 text-sm mb-8">
          To ensure uninterrupted exam delivery, please check your system compatibility and proximity to our exam sever.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Exam Details */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">Exam: Mathematics</h2>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>
                  <span className="text-gray-400">Subject : </span>Algebra
                </p>
                <p>
                  <span className="text-gray-400">No of questions : </span>30
                </p>
              </div>
            </div>

            {/* Monitoring Warning */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                We are monitoring your activity during the exam, and any unusual behaviour is being tracked. Your admin
                has set the exam to terminate if a certain number of unusual activities are detected, which could be as
                low as one. To avoid your exam from being terminated, please refrain from any behaviour that may be
                considered unusual. All the best!
              </p>
            </div>

            {/* Secure Exam Advice */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Secure Exam Advice</h3>
              <p className="text-gray-400 text-sm">
                This exam is video recorded and live streamed to the administrator. Kindly follow these instructions for
                a smooth experience and avoid any hitches
              </p>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Please ensure that the room has appropriate lighting.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Please ensure that the camera is facing towards you.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Please remain seated during the exam.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Make sure that no one else can see your screen during the exam.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Please refrain from using your mobile phone during the exam.</span>
                </li>
              </ul>
            </div>

            {/* Unsupported Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                The following actions are also not supported during your exam.
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Minimizing the browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Resizing the browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Open a new tab</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Open a new program</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Taking a screenshot</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Pressing Ctrl + C</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Pressing Ctrl + V</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Pressing Print Screen</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Pressing F12</span>
                </li>
              </ul>
            </div>

            {/* Checkbox and Agreement */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-4 h-4 mt-1 accent-orange-500 cursor-pointer"
                />
                <label htmlFor="agreement" className="text-gray-300 text-sm cursor-pointer">
                  Have Read And Understood The Instructions. I Agree To Accept The Results Generated By This System.
                </label>
              </div>
              {!isChecked && (
                <p className="text-red-400 text-xs flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-red-400 flex items-center justify-center text-xs">
                    !
                  </span>
                  This needs to be checked
                </p>
              )}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex items-center justify-center lg:min-h-[600px]">
            <div className="relative w-64 h-80">
              <svg viewBox="0 0 200 250" className="w-full h-full">
                {/* Background shapes */}
                <circle cx="100" cy="80" r="60" fill="rgba(59, 130, 246, 0.1)" />
                <rect x="40" y="100" width="120" height="140" rx="8" fill="rgba(59, 130, 246, 0.2)" />

                {/* Shield */}
                <path
                  d="M 100 60 L 140 80 L 140 140 Q 100 180 100 180 Q 60 140 60 80 Z"
                  fill="rgba(79, 70, 229, 0.3)"
                  stroke="rgba(79, 70, 229, 0.8)"
                  strokeWidth="2"
                />

                {/* Checkmarks */}
                <g transform="translate(85, 110)">
                  <circle cx="0" cy="0" r="4" fill="#ff6b6b" />
                </g>
                <g transform="translate(115, 115)">
                  <path d="M 0 0 L 5 5 L 12 -3" stroke="#10b981" strokeWidth="2" fill="none" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            onClick={handleStartExam}
            disabled={!isChecked}
          >
            Start Exam
          </Button>
        </div>
      </div>
    </div>
  )
}
