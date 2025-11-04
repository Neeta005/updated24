"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SystemCheckPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [cameraAllowed, setCameraAllowed] = useState(true)
  const [microphoneAllowed, setMicrophoneAllowed] = useState(true)
  const [cameraCertified, setCameraCertified] = useState(false)
  const [microphoneCertified, setMicrophoneCertified] = useState(false)

  const systemChecksList = [
    { id: "os", label: "Operating System", value: "Windows", status: "compatible" },
    { id: "browser", label: "Browser", value: "Chrome", status: "incompatible", note: "To fix the issue contact us!" },
    { id: "version", label: "Browser Version", value: "135.0.0.0 Safari/537.36", status: "compatible" },
    { id: "resolution", label: "Screen Resolution", value: "1600×1000", status: "compatible" },
    { id: "connectivity", label: "Exam Server Connectivity", value: "18.01 Mbps", status: "compatible" },
    { id: "server", label: "Server Status", value: "200 Ok", status: "compatible" },
    { id: "js", label: "Javascript", value: "Enabled", status: "compatible" },
    { id: "mic1", label: "Microphone", value: "Enabled", status: "compatible" },
    { id: "mic2", label: "Microphone", value: "Enabled", status: "compatible" },
  ]

  const [systemChecksState, setSystemChecksState] = useState<Record<string, boolean>>(
    systemChecksList.reduce((acc, check) => ({ ...acc, [check.id]: false }), {}),
  )

  const allSystemsChecked = Object.values(systemChecksState).every((checked) => checked)
  const allCertificationsChecked = cameraCertified && microphoneCertified
  const isAllComplete = allSystemsChecked && allCertificationsChecked

  const handleContinue = async () => {
    console.log("[v0] Continue clicked")
    console.log("[v0] System checks:", systemChecksState)
    console.log("[v0] All systems checked:", allSystemsChecked)
    console.log("[v0] Certifications checked:", cameraCertified, microphoneCertified)

    if (!allSystemsChecked || !allCertificationsChecked) {
      console.log("[v0] Validation failed - not all checked")
      toast({
        title: "Incomplete",
        description: "Please check all system requirements before continuing.",
        variant: "destructive",
      })
      return
    }

    console.log("[v0] All checks passed - navigating to exam")
    toast({
      title: "Success",
      description: "System check passed. Starting exam...",
    })

    setTimeout(() => {
      router.push("/candidate/exam")
    }, 500)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {isAllComplete && (
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
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-3">Check your system compatibility</h1>
        <p className="text-gray-400 text-sm mb-8">
          To ensure uninterrupted exam delivery, please check your system compatibility and proximity to our exam
          server.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - System Checks Table */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              {systemChecksList.map((check, idx) => (
                <div
                  key={check.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-slate-700 last:border-0 bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  {/* Left: Checkbox + Labels */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Checkbox
                      id={check.id}
                      checked={systemChecksState[check.id]}
                      onCheckedChange={(checked) => {
                        console.log("[v0] Checkbox changed:", check.id, checked)
                        setSystemChecksState((prev) => ({ ...prev, [check.id]: checked }))
                      }}
                      className="flex-shrink-0"
                    />
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <span className="text-gray-300 text-sm font-medium whitespace-nowrap">{check.label}</span>
                      <span className="text-gray-400 text-sm truncate">{check.value}</span>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <span
                      className={`text-sm font-medium ${
                        check.status === "compatible" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {check.status === "compatible" ? "Compatible" : "Incompatible"}
                    </span>
                    {check.status === "compatible" ? (
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                    )}
                    {check.note && <span className="text-gray-400 text-xs whitespace-nowrap">{check.note}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Permissions Section */}
          <div className="space-y-6">
            {/* Camera Icon */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center aspect-square">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-400 text-sm text-center">Camera & Microphone</p>
            </div>

            <div className="space-y-4">
              {/* Camera Permission */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-medium">Camera</span>
                  <Switch checked={cameraAllowed} onCheckedChange={setCameraAllowed} />
                </div>
                <p className="text-gray-400 text-xs">{cameraAllowed ? "Allowed Camera" : "Camera Not Allowed"}</p>
                <div className="flex items-center gap-2">
                  <Checkbox id="camera-cert" checked={cameraCertified} onCheckedChange={setCameraCertified} />
                  <label htmlFor="camera-cert" className="text-gray-300 text-xs cursor-pointer">
                    I certify camera is properly positioned
                  </label>
                </div>
              </div>

              {/* Microphone Permission */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-medium">Microphone</span>
                  <Switch checked={microphoneAllowed} onCheckedChange={setMicrophoneAllowed} />
                </div>
                <p className="text-gray-400 text-xs">
                  {microphoneAllowed ? "Allowed Microphone" : "Microphone Not Allowed"}
                </p>
                <div className="flex items-center gap-2">
                  <Checkbox id="mic-cert" checked={microphoneCertified} onCheckedChange={setMicrophoneCertified} />
                  <label htmlFor="mic-cert" className="text-gray-300 text-xs cursor-pointer">
                    I certify microphone is working
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-12 pb-8">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 bg-transparent">
            Re-Check
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 disabled:opacity-50"
            onClick={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Continue to Exam"}
          </Button>
        </div>
      </div>
    </div>
  )
}
