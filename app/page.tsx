"use client"

import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted px-6 text-center">
      {/* Hero Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-card-foreground drop-shadow-lg">
        Welcome to <span className="text-blue-600">New Exam Proctoring</span>
      </h1>

      {/* Tagline */}
      <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
        Secure, reliable, and efficient online exam monitoring.  
        Designed to give educators peace of mind and students a smooth experience.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
        <button className="px-6 py-3 rounded-xl border border-border text-card-foreground font-semibold hover:bg-muted transition-colors">
          Learn More
        </button>
      </div>
    </main>
  )
}
