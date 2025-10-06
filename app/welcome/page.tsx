"use client"

import Link from "next/link"
import { Text } from "@/components/atoms/text"

export default function WelcomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted px-6 text-center">
      {/* Hero Heading */}
      <Text as="h1" className="text-4xl md:text-6xl font-extrabold tracking-tight text-card-foreground drop-shadow-lg">
        Welcome to{" "}
        <Text as="span" className="text-blue-600">
          New Exam Proctoring
        </Text>
      </Text>

      {/* Tagline */}
      <Text as="p" className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
        Secure, reliable, and efficient online exam monitoring. Designed to give educators peace of mind and students a
        smooth experience.
      </Text>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>

        <Link
          href="/learn-more"
          className="px-6 py-3 rounded-xl border border-border text-card-foreground font-semibold hover:bg-muted transition-colors"
        >
          Learn More
        </Link>
      </div>
    </main>
  )
}
