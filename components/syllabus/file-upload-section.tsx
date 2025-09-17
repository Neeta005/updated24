"use client"

import React, { useRef } from "react"
import type { UploadedFile } from "@/types/syllabus"
import Image from "next/image"

interface FileUploadSectionProps {
  uploadedFiles: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
}

export function FileUploadSection({ uploadedFiles, onFilesChange }: FileUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: UploadedFile[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const sizeInKB = file.size / 1024
      const sizeInMB = sizeInKB / 1024

      let fileSize: string
      if (sizeInMB >= 1) {
        fileSize = `${sizeInMB.toFixed(2)} MB`
      } else {
        fileSize = `${sizeInKB.toFixed(2)} KB`
      }

      newFiles.push({
        id: Date.now().toString() + i,
        name: file.name,
        size: fileSize,
      })
    }

    const updatedFiles = [...uploadedFiles, ...newFiles]
    onFilesChange(updatedFiles)
    e.target.value = ""
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (!files) return

    const newFiles: UploadedFile[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const sizeInKB = file.size / 1024
      const sizeInMB = sizeInKB / 1024

      let fileSize: string
      if (sizeInMB >= 1) {
        fileSize = `${sizeInMB.toFixed(2)} MB`
      } else {
        fileSize = `${sizeInKB.toFixed(2)} KB`
      }

      newFiles.push({
        id: Date.now().toString() + i,
        name: file.name,
        size: fileSize,
      })
    }

    const updatedFiles = [...uploadedFiles, ...newFiles]
    onFilesChange(updatedFiles)
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Uploaded Files</h3>

        {/* Upload area */}
        <div
          className="border-2 border-dashed border-orange-500 rounded-lg p-12 text-center bg-slate-800/20"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-300 text-base mb-2">
              Pick the syllabus you want to add
            </p>

            {/* Upload Icon Circle */}
            <div className="rounded-full flex items-center justify-center mb-4">
              <Image
                src="/icons/Group 1171276763.png"
                alt="Upload"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            <div className="text-gray-300 text-sm">
              <span>Drag your file or </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-orange-500 underline hover:text-orange-400"
              >
                click here
              </button>
              <span> to upload the file</span>
            </div>

            <div className="text-gray-400 text-xs mt-2">
              <span className="font-medium">Note:</span> Only .docs, .csv, .pdf are allowed (Max 5MB)
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}
