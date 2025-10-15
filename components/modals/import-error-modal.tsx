"use client"

import type React from "react"

import { X } from "lucide-react"
import { Text } from "@/components/atoms/text"

interface ImportErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  subtext?: string
}

export const ImportErrorModal: React.FC<ImportErrorModalProps> = ({
  isOpen,
  onClose,
  title = "Import CSV",
  message = "Invalid File Type!",
  subtext = "An error occured!",
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
      <div className="relative w-[560px] rounded-2xl bg-gray-800 p-6 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Close error"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <Text variant="heading" size="2xl" weight="bold" color="primary" as="h2" className="mb-6">
          {title}
        </Text>

        {/* Red dashed panel */}
        <div className="rounded-xl border-2 border-dashed border-red-500/80 bg-red-500/10 px-6 py-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600">
            <span className="text-2xl leading-none text-white">!</span>
          </div>
          <Text variant="heading" size="lg" weight="semibold" color="primary" className="mb-1">
            {message}
          </Text>
          <Text variant="body" size="sm" color="muted">
            {subtext}
          </Text>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/60 px-6 py-2 text-white transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-lg px-6 py-2 font-semibold text-white bg-gradient-to-r from-rose-600 to-orange-500 hover:opacity-90"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  )
}
