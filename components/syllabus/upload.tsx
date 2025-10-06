"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { FormField } from "@/components/ui/form-field"
import { SearchInput } from "@/components/ui/search-input"
import { TabButton } from "@/components/ui/tab-button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ChevronRight, X, FileText, Check } from "lucide-react"
import { targetAudienceOptions } from "@/data/manual2"
import { Text } from "@/components/atoms/text"
import { SectionsPreview } from "./sections-preview"
import type { Section, UploadedFile } from "@/types/syllabus"

interface FormData {
  subject: string
  targetAudience: string
  sections: Section[]
  uploadedFiles: UploadedFile[]
}

const MAX_FILE_SIZE_MB = 5

export function Upload() {
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("upload")
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    targetAudience: "",
    sections: [],
    uploadedFiles: []
  })

  // Load data from sessionStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem("syllabusFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  const updateSubject = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }))
  }

  const updateTargetAudience = (targetAudience: string) => {
    setFormData((prev) => ({ ...prev, targetAudience }))
  }

  const removeFile = (fileId: string) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((file) => file.id !== fileId)
    }))
  }

  // ✅ Handle file upload
  const handleFileUpload = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024)

    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      const fileSize = fileSizeMB >= 1
        ? `${fileSizeMB.toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(2)} KB`

      sessionStorage.setItem(
        "syllabusFormData",
        JSON.stringify({
          ...formData,
          uploadedFiles: [
            {
              id: crypto.randomUUID(),
              name: file.name,
              size: fileSize
            }
          ]
        })
      )

      window.location.href = "/syllabus/upload-error"
      return
    }

    const fileSizeKB = file.size / 1024
    const fileSize = fileSizeMB >= 1
      ? `${fileSizeMB.toFixed(2)} MB`
      : `${fileSizeKB.toFixed(2)} KB`

    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [
        ...prev.uploadedFiles,
        {
          id: crypto.randomUUID(),
          name: file.name,
          size: fileSize
        }
      ]
    }))
  }

  const handleAddSyllabus = () => {
    sessionStorage.removeItem("syllabusFormData")
    window.location.href = "/syllabus"
  }

  return (
    <div className="min-h-screen">
      <div className="bg-card rounded-lg p-6 max-w-none">
        {/* Header */}
        <Text as="h1" className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
          Add Syllabus
        </Text>

        {/* Tabs */}
        <div className="flex gap-0 mb-6">
          <TabButton active={activeTab === "manual"} onClick={() => setActiveTab("manual")} position="left">
            Manual
          </TabButton>
          <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")} position="right">
            File Upload
          </TabButton>
        </div>

        <div className="border-b border-border mb-6"></div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField label="Subject">
            <SearchInput
              placeholder="Search syllabus..."
              value={formData.subject}
              onChange={updateSubject}
              className="w-full md:w-[260px]"
            />
          </FormField>

          <div className="flex justify-end">
            <FormField label="Target Audience" className="w-full md:w-auto">
              <Select value={formData.targetAudience} onValueChange={updateTargetAudience}>
                <SelectTrigger className="bg-muted border border-border text-card-foreground placeholder:text-muted-foreground rounded-full px-4 h-10 w-full md:w-[240px]">
                  <SelectValue placeholder="Select Audience" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border">
                  {targetAudienceOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-card-foreground hover:bg-accent"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>

        <div className="border-b border-border mb-6"></div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Uploaded Files Section */}
          <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
            <Text as="h3" className="text-card-foreground text-lg font-semibold mb-4">
              Uploaded Files
            </Text>

            {formData.uploadedFiles.length > 0 ? (
              <div className="space-y-4">
                {formData.uploadedFiles.map((file) => (
                  <div key={file.id} className="bg-card border-2 border-green-500 rounded-lg p-8 relative">
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-card-foreground"
                    >
                      <X className="size-5" />
                    </button>

                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <FileText className="size-16 text-muted-foreground" />
                        <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                          {file.name.split(".").pop()?.toUpperCase() || "FILE"}
                        </div>
                      </div>

                      <Text as="h4" className="text-card-foreground font-medium mb-1">
                        {file.name.replace(/\.[^/.]+$/, "")}
                      </Text>
                      <Text as="p" className="text-muted-foreground text-sm mb-4">
                        {file.size}
                      </Text>

                      <div className="flex items-center gap-2 text-green-500">
                        <Check className="size-4" />
                        <span className="text-sm font-medium">Successfully Uploaded</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Text as="p" className="text-muted-foreground">No files uploaded</Text>
              </div>
            )}

            {/* File Input */}
            <div className="mt-6">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0])
                    e.target.value = "" // ✅ Reset input so same file can be uploaded again
                  }
                }}
                accept=".pdf,.doc,.docx,.csv"
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
            <Text as="h3" className="text-card-foreground text-lg font-semibold mb-4">
              Preview
            </Text>
            <div className="rounded-lg p-4 space-y-3">
              {formData.sections.length > 0 ? (
                <SectionsPreview sections={formData.sections as any} />
              ) : (
                <div className="bg-card rounded-lg p-4 text-center">
                  <Text as="p" className="text-muted-foreground text-sm">
                    No sections added yet
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link href="/syllabus">
            <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <GradientButton onClick={handleAddSyllabus} className="w-full sm:w-auto">
            Add Syllabus
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
