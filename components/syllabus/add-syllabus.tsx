"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { SectionForm } from "./section-form"
import { FileUploadSection } from "./file-upload-section"
import { SyllabusPreview } from "./syllabus-preview"
import { FormField } from "@/components/ui/form-field"
import { SearchInput } from "@/components/ui/search-input"
import { TabButton } from "@/components/ui/tab-button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Text } from "@/components/atoms/text"
import type { UploadedFile, Section } from "@/types/syllabus"
import { targetAudienceOptions } from "@/data/syllabus-form"
import { Book, Users } from "lucide-react"

// File size limit constants
const MAX_FILE_SIZE_MB = 5

const parseSizeToMB = (sizeString: string): number => {
  const size = parseFloat(sizeString)
  if (sizeString.toLowerCase().includes('mb')) return size
  if (sizeString.toLowerCase().includes('kb')) return size / 1024
  if (sizeString.toLowerCase().includes('gb')) return size * 1024
  return size
}

export function AddSyllabus() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual")
  const [subject, setSubject] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "",
      lessons: [
        { id: "1-1", value: "" },
        { id: "1-2", value: "" }
      ]
    }
  ])

  const handleAddSyllabus = () => {
    if (activeTab === "manual") {
      router.push("/syllabus")
      return
    }

    if (uploadedFiles.length > 0) {
      const filesWithErrors = uploadedFiles.filter(file => parseSizeToMB(file.size) > MAX_FILE_SIZE_MB)

      const formData = {
        subject,
        targetAudience,
        sections,
        uploadedFiles: uploadedFiles.map(file => {
          const sizeInMB = parseSizeToMB(file.size)
          return {
            ...file,
            status: sizeInMB > MAX_FILE_SIZE_MB ? 'error' : 'success',
            error: sizeInMB > MAX_FILE_SIZE_MB ? `File exceeds ${MAX_FILE_SIZE_MB}MB` : undefined
          }
        })
      }

      sessionStorage.setItem('syllabusFormData', JSON.stringify(formData))

      if (filesWithErrors.length > 0) {
        router.push("/syllabus/upload-error")
      } else {
        router.push("/syllabus/upload")
      }
    } else {
      router.push("/syllabus")
    }
  }

  const handleFilesChange = (files: UploadedFile[]) => setUploadedFiles(files)

  return (
    <div className="min-h-screen">
      <div className="bg-card rounded-lg p-6 max-w-none">
        {/* Header */}
        <Text as="h1" className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
          Add Syllabus
        </Text>

        {/* Tabs */}
        <div className="w-full bg-slate-800 p-1.5 mb-6 flex gap-0">
          <TabButton active={activeTab === "manual"} onClick={() => setActiveTab("manual")} position="left">
            Manual
          </TabButton>
          <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")} position="right">
            File Upload
          </TabButton>
        </div>

        <div className="border-b border-border mb-6"></div>

        {/* Subject + Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField label="Subject">
            <SearchInput
              placeholder="Search syllabus..."
              value={subject}
              onChange={setSubject}
              className="w-full md:w-[260px]"
            >
              <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </SearchInput>
          </FormField>

          <div className="flex justify-end">
            <FormField label="Target Audience" className="w-full md:w-auto">
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Audience" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border">
                  {targetAudienceOptions.map(option => (
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

        {/* Form + Preview */}
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
            {activeTab === "manual" ? (
              <SectionForm sections={sections} onSectionsChange={setSections} />
            ) : (
              <FileUploadSection uploadedFiles={uploadedFiles} onFilesChange={handleFilesChange} />
            )}
          </div>

          <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
            <h3 className="text-card-foreground text-lg font-semibold mb-4">Preview</h3>
            <SyllabusPreview
              subject={subject}
              targetAudience={targetAudience}
              sections={sections}
              uploadedFiles={uploadedFiles}
              activeTab={activeTab}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
         <Link href="/syllabus" passHref>
  <Button asChild className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
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
