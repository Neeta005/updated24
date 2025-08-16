import { Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-[#252b3d] border-b border-[#3a4052] px-4 lg:px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Image src="/images/logo.png" alt="World of Interns" width={120} height={32} className="h-6 lg:h-8 w-auto" />
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6 lg:w-8 lg:h-8">
              <AvatarImage src="/images/profile.png" />
              <AvatarFallback className="bg-gray-600 text-white text-xs">JD</AvatarFallback>
            </Avatar>
            <span className="text-white text-xs lg:text-sm hidden sm:block">Profile</span>
          </div>
        </div>
      </div>
    </header>
  )
}
