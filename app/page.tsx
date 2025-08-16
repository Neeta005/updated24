import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#1a1f2e] overflow-x-hidden">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-0 lg:ml-16 transition-all duration-300">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
