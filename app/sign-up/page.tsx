"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter">("recruiter")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // After successful sign up, redirect to welcome
      router.push("/welcome")
    } catch (error) {
      console.error("Sign up error:", error)
      alert("Sign up failed. Please try again.")
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
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-white font-bold text-xl">LANTERNS</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Sign Up Card */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Sign up</h1>
              <p className="text-slate-400">Create your account to get started.</p>
            </div>

            {/* Tab Buttons */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab("candidate")}
                className={`flex-1 py-2 px-4 rounded-l-lg font-medium transition-colors ${
                  activeTab === "candidate"
                    ? "bg-orange-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Candidate
              </button>
              <button
                onClick={() => setActiveTab("recruiter")}
                className={`flex-1 py-2 px-4 rounded-r-lg font-medium transition-colors ${
                  activeTab === "recruiter"
                    ? "bg-orange-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Recruiter
              </button>
            </div>

            {/* LinkedIn Button */}
            <Button variant="outline" className="w-full mb-6 bg-blue-600 hover:bg-blue-700 border-blue-600 text-white">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              With LinkedIn
            </Button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-slate-600"></div>
              <span className="px-4 text-slate-400 text-sm">or with</span>
              <div className="flex-1 h-px bg-slate-600"></div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <span className="text-slate-400">Already have an account? </span>
              <Link href="/" className="text-orange-500 hover:text-orange-400 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
