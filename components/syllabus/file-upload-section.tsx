"use client"

import React, { useRef } from "react"
import { Upload } from "lucide-react"
import type { UploadedFile } from "@/data/syllabus"
import { FileItem } from "@/components/ui/file-item"
import { GradientButton } from "@/components/ui/gradient-button"

interface FileUploadSectionProps {
  uploadedFiles: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
}

export function FileUploadSection({ uploadedFiles, onFilesChange }: FileUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: UploadedFile[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      newFiles.push({
        id: Date.now().toString() + i,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      })
    }

    onFilesChange([...uploadedFiles, ...newFiles])

    // Reset input so same file can be uploaded again if needed
    e.target.value = ""
  }

  const removeFile = (fileId: string) => {
    onFilesChange(uploadedFiles.filter((file) => file.id !== fileId))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-foreground text-lg font-semibold mb-4">Uploaded Files</h3>

        {uploadedFiles.length > 0 ? (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">Files you want to add</p>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <FileItem
                  key={file.id}
                  name={file.name}
                  size={file.size}
                  onRemove={() => removeFile(file.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No files uploaded yet</p>
        )}
      </div>

      <div className="border-2 border-dashed border-orange-600 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload className="w-12 h-12 text-muted-foreground" />
          <p className="text-foreground font-medium">
            Drop your file or click below to upload
          </p>
          <p className="text-muted-foreground text-sm">
            Supported formats: PDF, DOC, DOCX
          </p>

          {/* Hidden input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
          />

          {/* Button opens file picker */}
          <GradientButton onClick={() => fileInputRef.current?.click()}>
            Upload Files
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
