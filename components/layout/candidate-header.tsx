"use client"

import { Bell, Menu, Search } from 'lucide-react'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CandidateHeaderProps {
  onMenuClick?: () => void
}

export function CandidateHeader({ onMenuClick }: CandidateHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Show menu button on all screen sizes */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-gray-400 hover:text-white"
            title="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="LANTERNS Logo"
              width={80}
              height={32}
              className="w-20 h-8"
            />
          </div>

          {/* Navigation Menu */}
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

        {/* Right side - Search, Notification & Profile */}
        <div className="flex items-center space-x-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="search"
              className="pl-10 pr-4 py-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400 rounded-full w-64"
            />
          </div>

          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>

          {/* Profile Avatar */}
          <div className="flex flex-col items-center w-15 h-12">
            <Avatar className="size-8">
              <AvatarImage src="/images/avtar.jpg" alt="User Avatar" />
              <AvatarFallback className="bg-orange-500 text-white text-xs">JD</AvatarFallback>
            </Avatar>
            <span className="text-white text-xs mt-1">Profile</span>
          </div>
        </div>
      </div>
    </header>
  )
}
