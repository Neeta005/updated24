"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { GradientButton } from "@/components/ui/gradient-button" // Adjust the path as needed


export default function TakeExamPage() {
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()

  const handleStartExam = () => {
    if (isChecked) {
      router.push("/candidate/system-check")
    }
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Border Wrapper */}
        <div className="border border-gray-700 rounded-lg p-8  shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Exam Details */}
              <div>
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
            {/* Monitoring Warning */}
<div className="space-y-4 w-full">
  <p className="text-gray-300 text-sm leading-relaxed w-full">
    We are monitoring your activity during the exam, and any unusual behaviour is being tracked. Your admin
    has set the exam to terminate if certain unusual activities are detected. Please refrain from any behaviour
    that may be considered unusual. Good luck!
  </p>
</div>


              {/* Secure Exam Advice */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Secure Exam Advice</h3>
                <p className="text-gray-400 text-sm">
                  This exam is video recorded and live streamed to the administrator. Kindly follow these instructions for
                  a smooth experience:
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
                  {[
                    "Minimizing the browser",
                    "Resizing the browser",
                    "Opening a new tab",
                    "Opening a new program",
                    "Taking a screenshot",
                    "Pressing Ctrl + C",
                    "Pressing Ctrl + V",
                    "Pressing Print Screen",
                    "Pressing F12",
                  ].map((action, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-orange-400 mt-0.5">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Illustration */}
        <div className="flex items-center justify-center lg:min-h-[600px]">
  <div className="relative w-64 h-80">
    <Image
      src="/icons/illusion.png" // Path to your image in public folder
      alt="Exam Illustration"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>
          </div>

          {/* Buttons inside border */}
          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
           <GradientButton
  onClick={handleStartExam}
  disabled={!isChecked}
  size="md"
>
  Start Exam
</GradientButton>

          </div>
        </div>

        {/* Checkbox and Agreement (outside border) */}
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
              I have read and understood the instructions. I agree to accept the results generated by this system.
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
    </div>
  )
}
