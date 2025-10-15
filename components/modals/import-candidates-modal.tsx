"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { ImportCSVModal } from "./import-csv-modal"

interface ImportCandidatesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ImportCandidatesModal: React.FC<ImportCandidatesModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()

  return (
    <ImportCSVModal
      isOpen={isOpen}
      onClose={onClose}
      variant="simple"
      showMappedOnComplete={false}
      onComplete={() => {
        // Redirect back to the All Candidates tab after a successful import
        onClose()
        router.replace("/candidates/table?tab=candidates")
      }}
    />
  )
}
