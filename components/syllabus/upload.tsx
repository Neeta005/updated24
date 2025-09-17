"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { FormField } from "@/components/ui/form-field"
import { SearchInput } from "@/components/ui/search-input"
import { TabButton } from "@/components/ui/tab-button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ChevronRight, X, FileText, Check } from "lucide-react"
import { type Manual2Data, targetAudienceOptions, initialManual2Data } from "@/data/manual2"
import { Text } from "@/components/atoms/text"
import { SectionsPreview } from "./sections-preview"

export function Upload() {
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("upload")
  const [data, setData] = useState<Manual2Data>(initialManual2Data)

  const updateSubject = (subject: string) => {
    setData((prev) => ({ ...prev, subject }))
  }

  const updateTargetAudience = (targetAudience: string) => {
    setData((prev) => ({ ...prev, targetAudience }))
  }

  return (
    <div className="min-h-screen">
      <div className="bg-card rounded-lg p-6 max-w-none">
        <div className="mb-6">
          <Text as="h1" className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
            Add Syllabus
          </Text>

          <div className="flex gap-0 mb-6">
            <TabButton active={false} onClick={() => setActiveTab("manual")} position="left">
              Manual
            </TabButton>
            <TabButton active={true} onClick={() => setActiveTab("upload")} position="right">
              File Upload
            </TabButton>
          </div>

          <div className="border-b border-border mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField label="Subject">
              <SearchInput
                placeholder="Search syllabus..."
                value={data.subject}
                onChange={updateSubject}
                className="w-full md:w-[260px]"
              />
            </FormField>

            <div className="flex justify-end">
              <FormField label="Target Audience" className="w-full md:w-auto">
                <Select value={data.targetAudience} onValueChange={updateTargetAudience}>
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
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
            <Text as="h3" className="text-card-foreground text-lg font-semibold mb-4">
              Uploaded Files
            </Text>

            <div className="bg-card border-2 border-green-500 rounded-lg p-8 relative">
              <button className="absolute top-4 right-4 text-muted-foreground hover:text-card-foreground">
                <X className="size-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <FileText className="size-16 text-muted-foreground" />
                  <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    PDF
                  </div>
                </div>

                <Text as="h4" className="text-card-foreground font-medium mb-1">
                  UX Design
                </Text>
                <Text as="p" className="text-muted-foreground text-sm mb-4">
                  40 MB | 2 sec left
                </Text>

                <div className="flex items-center gap-2 text-green-500">
                  <Check className="size-4" />
                  <span className="text-sm font-medium">Successfully Uploaded</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
            <Text as="h3" className="text-card-foreground text-lg font-semibold mb-4">
              Preview
            </Text>
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <SectionsPreview sections={data.sections as any} />
              <div className="bg-card rounded-lg">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="size-4 text-muted-foreground" />
                    <span className="text-card-foreground font-medium">UI Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link href="/syllabus">
            <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Link href="/syllabus/upload-error">
            <GradientButton className="w-full sm:w-auto">Add Syllabus</GradientButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
