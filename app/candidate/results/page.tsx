"use client"

import { ResultsModal } from "@/components/candidate/results-modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CandidateResults() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // open modal automatically when component mounts
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // small delay so modal closes smoothly before navigating
    setTimeout(() => {
      router.push("/results") // 👈 change this to your desired route
    }, 200)
  }

  return (
    <>
      {isOpen && <ResultsModal isOpen={isOpen} onClose={handleClose} />}
    </>
  )
}
