"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { gradientButtonStyle } from "@/data/syllabus"
import Image from "next/image"


export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter">("recruiter")
  const [email, setEmail] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "recruiter" && !email.trim()) {
      alert("Please enter an email address")
      return
    }

    if (activeTab === "candidate" && (!mobileNumber.trim() || !otp.trim())) {
      alert("Please enter mobile number and OTP")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (activeTab === "candidate") {
        router.push("/candidate/dashboard")
      } else {
        router.push("/welcome")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      alert("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      {/* Curved Wave Patterns */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0,400 Q300,200 600,400 T1200,400 L1200,0 L0,0 Z" fill="currentColor" />
          <path d="M0,600 Q400,400 800,600 T1200,600 L1200,200 L0,200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Logo */}
      <div className="absolute top-2 left-8 z-10 flex items-center space-x-2">
        <img
          src="/images/logo.png"
          alt="Lanterns Logo"
          className="w-25 h-25 object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Sign In Card */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
              <p className="text-slate-400">Welcome back, please sign in to continue.</p>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-2 mb-6 justify-start">
              <button
                onClick={() => setActiveTab("candidate")}
                className={`w-32 py-2 px-4 rounded-lg font-medium border transition-all duration-200
                  ${activeTab === "candidate"
                    ? `${gradientButtonStyle} text-white border-transparent`
                    : "bg-transparent text-white border-white hover:bg-slate-700/20"}`}
              >
                Candidate
              </button>
              <button
                onClick={() => setActiveTab("recruiter")}
                className={`w-32 py-2 px-4 rounded-lg font-medium border transition-all duration-200
                  ${activeTab === "recruiter"
                    ? `${gradientButtonStyle} text-white border-transparent`
                    : "bg-transparent text-white border-white hover:bg-slate-700/20"}`}
              >
                Recruiter
              </button>
            </div>

            {activeTab === "recruiter" ? (
              <>
                {/* Recruiter Form including LinkedIn Input */}
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="relative w-full mb-6">
                   <Image
  src="\icons\linkedin.png"
  alt="LinkedIn"
  width={32}
  height={32}
  className="absolute left-3 top-1/2 -translate-y-1/2"
/>
                    <input
                      type="text"
                      placeholder="With LinkedIn"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full pl-15 pr-4 py-3 text-white border border-white rounded-lg bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="flex-1 h-px bg-slate-600"></div>
                    <span className="px-4 text-slate-400 text-sm">or with email</span>
                    <div className="flex-1 h-px bg-slate-600"></div>
                  </div>

                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-white text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                    required
                    disabled={isLoading}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`${gradientButtonStyle} w-full hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </>
            ) : (
              /* Candidate Form */
              <form onSubmit={handleSignIn} className="space-y-6">
                <Input
                  type="tel"
                  placeholder="Mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-transparent border border-white text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />

                <Input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-transparent border border-white text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />

                {/* Remember Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-transparent border border-white rounded focus:ring-orange-500 focus:ring-2"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="text-white text-sm">
                    Remember
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className= {`${gradientButtonStyle} w-full hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            )}

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-slate-400">Don't have an account? </span>
              <Link href="/sign-up" className="text-orange-500 hover:text-orange-400 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
