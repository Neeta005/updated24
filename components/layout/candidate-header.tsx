"use client"

import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CandidateHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-lg">LANTERNS</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/candidate/dashboard" className="text-white hover:text-orange-400 transition-colors">
              Home
            </a>
            <a href="/candidate/dashboard" className="text-white hover:text-orange-400 transition-colors">
              Dashboard
            </a>
            <a href="/candidate/jobs" className="text-white hover:text-orange-400 transition-colors">
              Jobs
            </a>
            <a href="/candidate/messages" className="text-white hover:text-orange-400 transition-colors">
              Message
            </a>
          </nav>
        </div>

        {/* Right side - Search and Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="search"
              className="pl-10 pr-4 py-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400 rounded-full w-64"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-sm">Profile</span>
          </div>
        </div>
      </div>
    </header>
  )
}
