"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Minus, ChevronDown, ChevronRight, Search } from "lucide-react"
import { type EditableSection, type EditableLesson, targetAudienceOptions, syllabusDetailData } from "@/data/syllabus"
import { GradientButton } from "@/components/ui/gradient-button"

interface EditSyllabusProps {
  syllabusId: string
}

export function EditSyllabus({ syllabusId = "1" }: EditSyllabusProps) {
  const router = useRouter()
  const syllabusDetail = syllabusDetailData[syllabusId]

  const [subject, setSubject] = useState(syllabusDetail?.subject || "")
  const [targetAudience, setTargetAudience] = useState(syllabusDetail?.targetAudience || "")
  const [sections, setSections] = useState<EditableSection[]>(
    syllabusDetail?.sections.map((sec) => ({
      id: sec.id,
      title: sec.title,
      isExpanded: true,
      lessons: sec.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title })),
    })) || [],
  )

  const [previewSections, setPreviewSections] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(sections.map((s) => [s.id, true])),
  )

  const togglePreviewSection = (sectionId: string) => {
    setPreviewSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const addSection = () => {
    const newSection: EditableSection = {
      id: Date.now().toString(),
      title: "",
      isExpanded: true,
      lessons: [{ id: `${Date.now()}-1`, title: "" }],
    }
    setSections([...sections, newSection])
  }

  const addLesson = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newLesson: EditableLesson = {
            id: `${sectionId}-${Date.now()}`,
            title: "",
          }
          return { ...section, lessons: [...section.lessons, newLesson] }
        }
        return section
      }),
    )
  }

  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId && section.lessons.length > 1) {
          return {
            ...section,
            lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
          }
        }
        return section
      }),
    )
  }

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, title } : section)))
  }

  const updateLessonTitle = (sectionId: string, lessonId: string, title: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, title } : lesson)),
          }
        }
        return section
      }),
    )
  }

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((section) => section.id !== sectionId))
    }
  }

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="bg-card text-white p-8 rounded-lg">
        <h1 className="text-2xl font-semibold">Edit Syllabus</h1>

        {/* Subject and Target Audience */}
        <div className="flex justify-between items-end gap-8 mb-8 mt-2">
          <div className="w-80">
            <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
            <div className="relative">
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white rounded-full pl-4 pr-10 h-12"
                placeholder="Design"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            </div>
          </div>

          <div className="w-80">
            <label className="block text-sm font-medium mb-3 text-gray-300">Target Audience</label>
            <Select value={targetAudience} onValueChange={setTargetAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Search target audience..." />
              </SelectTrigger>
              <SelectContent>
                {targetAudienceOptions.map((aud) => (
                  <SelectItem key={aud.value} value={aud.label}>
                    {aud.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mb-8"></div>

        {/* Main Content */}
        <div className="relative flex gap-8">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 transform -translate-x-1/2"></div>

          {/* Course Content Editor */}
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-semibold mb-6">Course content</h3>

            {/* Scrollable container */}
            <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 hover:scrollbar-thumb-pink-500">
              {sections.map((section, index) => (
                <div key={section.id} className="space-y-2">
                  {/* Section */}
                  <div className="text-sm text-gray-400 mb-1">Section/Module</div>
                  <div className="flex items-center gap-3 mb-3">
                    <button onClick={() => toggleSection(section.id)} className="text-gray-400 hover:text-white">
                      {section.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    <Input
                      value={section.title}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      className="flex-1 bg-slate-700 border-slate-600 text-white rounded-full h-11"
                      placeholder="Section Title"
                    />

                    {/* ➕ Add Section */}
                    <GradientButton
                      onClick={addSection}
                      size="sm"
                      className="rounded-full p-0 w-10 h-10 flex items-center justify-center"
                    >
                      <Plus className="size-4 text-white" />
                    </GradientButton>

                    {/* ➖ Remove Section (allowed until 1 left) */}
                    <Button
                      onClick={() => removeSection(section.id)}
                      disabled={sections.length <= 1}
                      className={`rounded-full w-10 h-10 p-0 flex items-center justify-center ${
                        sections.length <= 1
                          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                          : "bg-white hover:bg-gray-500 text-black"
                      }`}
                    >
                      <Minus className="size-4" />
                    </Button>
                  </div>

                  {/* Lessons */}
                  {section.isExpanded &&
                    section.lessons.map((lesson) => (
                      <div key={lesson.id} className="pl-8">
                        <div className="text-sm text-gray-400">Lesson/Unit</div>
                        <div className="flex items-center gap-3 mb-3">
                          <Input
                            value={lesson.title}
                            onChange={(e) => updateLessonTitle(section.id, lesson.id, e.target.value)}
                            className="flex-[0.85] bg-slate-700 border-slate-600 text-white rounded-full h-11"
                            placeholder="Lesson Title"
                          />
                          <div className="flex gap-2">
                            <GradientButton
                              onClick={() => addLesson(section.id)}
                              size="sm"
                              className="rounded-full p-0 w-10 h-10 flex items-center justify-center"
                            >
                              <Plus className="size-4 text-white" />
                            </GradientButton>

                            {section.lessons.length > 1 && (
                              <Button
                                onClick={() => removeLesson(section.id, lesson.id)}
                                className="bg-white hover:bg-gray-500 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center"
                              >
                                <Minus className="size-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 pl-8">
            <h3 className="text-lg font-semibold mb-6">Preview</h3>

            <div className="space-y-3">
          {sections.map((section, sectionIndex) => {
  if (!section.title) return null
  const isPreviewExpanded = previewSections[section.id] !== false
  return (
    <div key={section.id} className="rounded-lg overflow-hidden border border-slate-600">
      <button
        onClick={() => togglePreviewSection(section.id)}
        className="flex items-center justify-between w-full px-4 py-3 text-left text-white font-medium bg-slate-700 hover:bg-slate-600"
      >
        <div className="flex items-center gap-2">
          {isPreviewExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {section.title}
        </div>
      </button>

      {isPreviewExpanded && (
        <div className="px-4 pt-2 pb-3 space-y-2 bg-slate-800">
          {section.lessons.map((lesson, lessonIndex) =>
            lesson.title && (
              <div
                key={lesson.id}
                className="text-gray-300 text-sm hover:text-white cursor-pointer transition flex items-start gap-2"
              >
                {/* Numbering: sectionIndex+1 . lessonIndex+1 */}
                <span className="font-semibold text-white">
                  {sectionIndex + 1}.{lessonIndex + 1}
                </span>
                <span>{lesson.title}</span>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
})}

            </div>
          </div>
        </div>

        {/* ✅ Bottom Buttons */}
        <div className="flex justify-between items-center mt-12 pt-6">
          {/* Back button on far left */}
          <Button
            onClick={() => router.push("/syllabus")}
            className="bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-2 rounded-lg"
          >
            Back to Syllabus
          </Button>

          {/* Cancel + Update on right */}
          <div className="flex gap-4">
            <Button
              onClick={() => router.push("/syllabus")}
              className="bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-2 rounded-lg"
            >
              Cancel
            </Button>

            <GradientButton onClick={() => router.push("/syllabus")} size="md">
              Update Syllabus
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  )
}
