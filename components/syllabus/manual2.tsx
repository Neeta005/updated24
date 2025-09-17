"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Minus, ChevronDown, ChevronRight, X, FileText } from "lucide-react"
import Link from "next/link"
import { FormField } from "@/components/ui/form-field"
import { SearchInput } from "@/components/ui/search-input"
import { TabButton } from "@/components/ui/tab-button"
import { GradientButton } from "@/components/ui/gradient-button"
import {
  type Manual2Data,
  type Manual2Section,
  type Manual2Lesson,
  targetAudienceOptions,
  initialManual2Data,
} from "@/data/manual2"

export function Manual2() {
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual")
  const [data, setData] = useState<Manual2Data>(initialManual2Data)
  const [uploadProgress, setUploadProgress] = useState(60)

  const updateSubject = (subject: string) => {
    setData((prev) => ({ ...prev, subject }))
  }

  const updateTargetAudience = (targetAudience: string) => {
    setData((prev) => ({ ...prev, targetAudience }))
  }

  const toggleSection = (sectionId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section,
      ),
    }))
  }

  const addSection = () => {
    const newSection: Manual2Section = {
      id: `section-${Date.now()}`,
      title: "",
      isExpanded: true,
      lessons: [{ id: `lesson-${Date.now()}`, title: "" }],
    }
    setData((prev) => ({ ...prev, sections: [...prev.sections, newSection] }))
  }

  const removeSection = (sectionId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }))
  }

  const updateSectionTitle = (sectionId: string, title: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === sectionId ? { ...section, title } : section)),
    }))
  }

  const addLesson = (sectionId: string) => {
    const newLesson: Manual2Lesson = {
      id: `lesson-${Date.now()}`,
      title: "",
    }
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, lessons: [...section.lessons, newLesson] } : section,
      ),
    }))
  }

  const removeLesson = (sectionId: string, lessonId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, lessons: section.lessons.filter((lesson) => lesson.id !== lessonId) }
          : section,
      ),
    }))
  }

  const updateLessonTitle = (sectionId: string, lessonId: string, title: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, title } : lesson)),
            }
          : section,
      ),
    }))
  }

  const FileUploadContent = () => (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
        <h3 className="text-card-foreground text-lg font-semibold mb-4">Uploaded Files</h3>

        <div className="bg-card border-2 border-border rounded-lg p-8 relative">
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

            <h4 className="text-card-foreground font-medium mb-1">UX Design</h4>
            <p className="text-muted-foreground text-sm mb-2">40 MB | 2 sec left</p>
            <p className="text-muted-foreground text-xs mb-4">Note: Only .docs, .csv, .pdf are allowed.</p>

            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-muted-foreground text-sm">{uploadProgress}%</p>
          </div>
        </div>
      </div>

      <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
        <h3 className="text-card-foreground text-lg font-semibold mb-4">Preview</h3>
        <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="flex space-x-1 mb-4">
            <div className="size-3 bg-muted-foreground rounded-full animate-bounce"></div>
            <div
              className="size-3 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="size-3 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <h4 className="text-card-foreground text-xl font-semibold mb-2">Loading Preview</h4>
          <p className="text-muted-foreground">This may take a while!</p>
        </div>
      </div>
    </div>
  )

  const ManualContent = () => (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
        <h3 className="text-card-foreground text-lg font-semibold mb-4">Course content</h3>

        <div className="space-y-4">
          {data.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="text-muted-foreground hover:text-card-foreground"
                >
                  {section.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <div className="flex-1 flex items-center gap-2">
                  <label className="text-card-foreground text-sm font-medium">Section/Module</label>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-6">
                <Input
                  value={section.title}
                  onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                  placeholder="Enter section title..."
                  className="flex-1 bg-muted border border-border text-card-foreground placeholder:text-muted-foreground rounded-full h-10"
                />
                <button
                  onClick={addSection}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center"
                >
                  <Plus className="size-4" />
                </button>
                <button
                  onClick={() => removeSection(section.id)}
                  className="bg-muted hover:bg-accent text-card-foreground rounded-full p-2 w-8 h-8 flex items-center justify-center"
                >
                  <Minus className="size-4" />
                </button>
              </div>

              {section.isExpanded && (
                <div className="ml-6 space-y-2">
                  {section.lessons.map((lesson) => (
                    <div key={lesson.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-card-foreground text-sm font-medium">Lesson/Unit</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          value={lesson.title}
                          onChange={(e) => updateLessonTitle(section.id, lesson.id, e.target.value)}
                          placeholder="Enter lesson title..."
                          className="flex-1 bg-muted border border-border text-card-foreground placeholder:text-muted-foreground rounded-full h-10"
                        />
                        <button
                          onClick={() => addLesson(section.id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center"
                        >
                          <Plus className="size-4" />
                        </button>
                        <button
                          onClick={() => removeLesson(section.id, lesson.id)}
                          className="bg-muted hover:bg-accent text-card-foreground rounded-full p-2 w-8 h-8 flex items-center justify-center"
                        >
                          <Minus className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
        <h3 className="text-card-foreground text-lg font-semibold mb-4">Preview</h3>
        <div className="bg-muted rounded-lg p-4 space-y-3">
          {data.sections.map((section) => (
            <div key={section.id} className="bg-card rounded-lg">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  {section.isExpanded ? (
                    <ChevronDown className="size-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-4 text-muted-foreground" />
                  )}
                  <span className="text-card-foreground font-medium">{section.title || "Untitled Section"}</span>
                </div>
              </div>
              {section.isExpanded && (
                <div className="px-3 pb-3 space-y-1">
                  {section.lessons.map((lesson) => (
                    <div key={lesson.id} className="text-muted-foreground text-sm pl-6">
                      {lesson.title || "Untitled Lesson"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="bg-card rounded-lg p-6 max-w-none">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">Add Syllabus</h1>

          <div className="flex gap-0 mb-6">
            <TabButton active={activeTab === "manual"} onClick={() => setActiveTab("manual")} position="left">
              Manual
            </TabButton>
            <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")} position="right">
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

        {activeTab === "manual" ? <ManualContent /> : <FileUploadContent />}

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link href="/syllabus">
            <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Link href="/syllabus/upload">
            <GradientButton className="w-full sm:w-auto">Add Syllabus</GradientButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
