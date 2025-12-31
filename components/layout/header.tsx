"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Menu, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false)
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border px-4 lg:px-6 py-2 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onMenuClick}
            title="Toggle sidebar"
          >
            <Menu className="size-5" />
          </button>

          <Image
            src="/images/logo.png"
            alt="World of Interns"
            width={80}
            height={32}
            className="w-20 h-8"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bell className="size-6" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-md shadow-lg">
                <div className="px-4 py-2 border-b text-sm font-medium">
                  Notifications
                </div>

                <div className="max-h-64 overflow-auto">
                  <div className="px-4 py-3 text-sm hover:bg-muted cursor-pointer">
                    📢 New internship posted
                  </div>
                  <div className="px-4 py-3 text-sm hover:bg-muted cursor-pointer">
                    ✅ Application approved
                  </div>
                  <div className="px-4 py-3 text-sm hover:bg-muted cursor-pointer">
                    ⏰ Interview scheduled
                  </div>
                </div>

                <div className="px-4 py-2 text-center text-xs text-muted-foreground border-t cursor-pointer hover:text-foreground">
                  View all
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center w-15 h-12"
            >
              <Avatar className="size-8">
                <AvatarImage src="/images/avtar.jpg" />
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1 text-foreground">Profile</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-md shadow-lg">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                >
                  <Settings className="size-4 mr-2" />
                  Settings
                </button>

                <button
                  onClick={() => router.replace("/")}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-muted"
                >
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
