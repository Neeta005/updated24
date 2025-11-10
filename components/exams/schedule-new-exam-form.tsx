"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDown, ChevronRight, Search, X } from "lucide-react"
import { ExamPreviewStep } from "./exam-preview-step"
import { SuccessModal } from "./success-modal"

interface ScheduleNewExamFormProps {
  onClose: () => void
}

export function ScheduleNewExamForm({ onClose }: ScheduleNewExamFormProps) {
  const [step, setStep] = useState(1)
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(["Subject 1"])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 6, 16))
  const [selectedTime, setSelectedTime] = useState("9:15 AM - 9:30 AM")
  const [scheduledSlots, setScheduledSlots] = useState<Array<{ date: string; time: string }>>([
    { date: "16.12.2020", time: "9:15 AM - 9:30 AM" },
  ])
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [formData, setFormData] = useState({
    category: "",
    examName: "",
    subject: "",
    questionPaper: "",
  })

  const toggleSubject = (subject: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject],
    )
  }

const timeSlots = [
  "9:00 AM - 9:15 AM",
  "9:15 AM - 9:30 AM",
  "9:30 AM - 9:45 AM",
  "9:45 AM - 10:00 AM",
  "10:00 AM - 10:15 AM",
  "10:15 AM - 10:30 AM",
  "10:30 AM - 10:45 AM",
  "10:45 AM - 11:00 AM",
  "11:00 AM - 11:15 AM",
  "11:15 AM - 11:30 AM",
  "11:30 AM - 11:45 AM",
  "11:45 AM - 12:00 PM",
  "12:00 PM - 12:15 PM",
  "12:15 PM - 12:30 PM",
  "12:30 PM - 12:45 PM",
  "12:45 PM - 1:00 PM",
  "1:00 PM - 1:15 PM",
  "1:15 PM - 1:30 PM",
  "1:30 PM - 1:45 PM",
  "1:45 PM - 2:00 PM",
  "2:00 PM - 2:15 PM",
  "2:15 PM - 2:30 PM",
  "2:30 PM - 2:45 PM",
  "2:45 PM - 3:00 PM",
  "3:00 PM - 3:15 PM",
  "3:15 PM - 3:30 PM",
  "3:30 PM - 3:45 PM",
  "3:45 PM - 4:00 PM",
  "4:00 PM - 4:15 PM",
  "4:15 PM - 4:30 PM",
  "4:30 PM - 4:45 PM",
  "4:45 PM - 5:00 PM",
  "5:00 PM - 5:15 PM",
  "5:15 PM - 5:30 PM",
  "5:30 PM - 5:45 PM",
  "5:45 PM - 6:00 PM",
];


  const syllabusSections = [
    {
      id: "Subject 1",
      title: "Subject 1: Networking",
      topics: ["Introduction to Network", "Routing & Switching", "HTML & CSS", "Client vs Server", "TCP/IP"],
    },
    {
      id: "Subject 2",
      title: "Subject 2: Networking",
      topics: ["Introduction to Network", "Routing & Switching", "HTML & CSS", "Client vs Server"],
    },
    {
      id: "Subject 3",
      title: "Subject 3: Networking",
      topics: ["Introduction to Network"],
    },
  ]

  const handleAddSchedule = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toLocaleDateString("de-DE")
      const newSlot = { date: dateStr, time: selectedTime }
      setScheduledSlots([...scheduledSlots, newSlot])
    }
  }

  const handleRemoveSchedule = (index: number) => {
    setScheduledSlots(scheduledSlots.filter((_, i) => i !== index))
  }

  const handleSaveAndNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleDoneFromPreview = () => setShowSuccessModal(true)
  const handleEditFromModal = () => {
    setShowSuccessModal(false)
    setStep(1)
  }
  const handleViewSchedule = () => {
    setShowSuccessModal(false)
    onClose()
  }
  const handleDoneFromModal = () => {
    setShowSuccessModal(false)
    onClose()
  }

  return (
    <>
      <div className="bg-slate-900 rounded-lg p-2">
        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-400"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div className={`h-1 w-24 ${step > s ? "bg-orange-500" : "bg-slate-700"}`} />}
            </div>
          ))}
        </div>

        {/* Form Title */}
        <h2 className="text-3xl font-bold text-white mb-8">
          {step === 1 && "Schedule New Exam"}
          {step === 2 && "Schedule Exam"}
          {step === 3 && "Preview"}
        </h2>

        {/* Step 1: Basic Info */}
      {/* Step 1: Basic Info */}
{step === 1 && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Left Column - Form Fields */}
    <div className="lg:col-span-2 space-y-6">
      {/* Category */}
      <div>
        <label className="block text-white font-medium mb-3">Category</label>
        <Select
          value={formData.category}
          onValueChange={(val) => setFormData({ ...formData, category: val })}
        >
          <SelectTrigger className="border border-slate-700 text-white bg-transparent">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border border-slate-700 text-white">
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Exam Name */}
      <div>
        <label className="block text-white font-medium mb-3">Exam Name</label>
        <Input
          placeholder="Exam Name"
          value={formData.examName}
          onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
          className="border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-white font-medium mb-3">Subject</label>
        <div className="relative">
          <Input
            placeholder="Search"
            className="border-slate-700 text-white placeholder:text-slate-500 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
        </div>
      </div>

      {/* Question Paper */}
      <div>
        <label className="block text-white font-medium mb-3">Question paper</label>
        <div className="relative">
          <Input
            placeholder="Search"
            className="border-slate-700 text-white placeholder:text-slate-500 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
        </div>
      </div>
    </div>

    {/* Right Column - Syllabus */}
    <div>
      <h3 className="text-white font-semibold mb-4">Syllabus</h3>
      <div className="rounded-lg border border-slate-700 p-6">
        <div className="space-y-2">
          {syllabusSections.map((section) => (
            <Collapsible key={section.id} open={expandedSubjects.includes(section.id)}>
              <CollapsibleTrigger
                onClick={() => toggleSubject(section.id)}
                className="flex items-center gap-2 w-full text-left text-white hover:text-orange-500 transition-colors"
              >
                {expandedSubjects.includes(section.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-medium">{section.title}</span>
              </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 pt-2">
  <div className="grid grid-cols-3 gap-x-6 gap-y-3">
    {section.topics.map((topic) => (
      <div key={topic} className="text-slate-400 text-sm flex items-center gap-2">
        <span className="text-orange-500">•</span>
        <span>{topic}</span>
      </div>
    ))}
  </div>
</CollapsibleContent>

            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

        {/* Step 2: Schedule Date and Time */}
     {/* Step 2: Schedule Date and Time */}
{step === 2 && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
    {/* Left Column - Calendar + Scheduling */}
    <div className="flex flex-col justify-between space-y-6">
      {/* Calendar */}
      <div className="rounded-lg border border-slate-700 p-2">
        <h3 className="text-white font-semibold mb-2">Calendar</h3>
        <div className="flex justify-center">
          <div className="w-[500px]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="text-white w-full
                 [&_table]:!leading-none [&_table]:!border-collapse
                 [&_th]:!py-0 [&_td]:!py-0 
                 [&_td]:!text-[11px] [&_th]:!text-[11px]
                 [&_button]:!h-4 [&_button]:!w-4 
                 [&_button]:!p-0 [&_button]:!m-0 
                 [&_caption]:!py-0 [&_caption_span]:!text-xs
                 [&_[role=grid]]:!gap-0 [&_*]:!min-h-0 [&_*]:!min-w-0"
            />
          </div>
        </div>
      </div>

      {/* Scheduling List */}
      <div className="rounded-lg border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Scheduling</h3>
        <div className="space-y-3">
          {scheduledSlots.map((slot, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-700 rounded-lg px-4 py-3"
            >
              <span className="text-slate-300 text-sm">
                {slot.date} {slot.time}
              </span>
              <button
                onClick={() => handleRemoveSchedule(index)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Column - Time Selection (match height) */}
  {/* Right Column - Time Selection (match height) */}
<div className="flex flex-col h-full">
  <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 flex flex-col h-full">
    <h3 className="text-white font-semibold mb-4">Pick a time</h3>

    {/* Scrollable container */}
    <div className="flex-1 overflow-y-auto max-h-[650px] space-y-3">
      {timeSlots.map((slot) => (
        <button
          key={slot}
          onClick={() => setSelectedTime(slot)}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
            selectedTime === slot
              ? "border-orange-500 bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedTime === slot ? "border-white bg-white" : "border-slate-500"
              }`}
            >
              {selectedTime === slot && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
            </div>
            <span className="font-medium">{slot}</span>
          </div>
        </button>
      ))}
    </div>

    <Button
      onClick={handleAddSchedule}
      className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium"
    >
      Add Schedule
    </Button>
  </div>
</div>

  </div>
)}

        {/* Step 3: Preview */}
        {step === 3 && (
          <ExamPreviewStep formData={formData} scheduledSlots={scheduledSlots} onSuccess={handleDoneFromPreview} />
        )}

        {/* Action Buttons */}
{step < 3 && (
  <div className="flex gap-4 mt-4 mb-6">
    <Button
      onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
      variant="outline"
      className="px-8 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
    >
      Back
    </Button>
    <Button
      onClick={handleSaveAndNext}
      className="px-8 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
    >
      Save and Next
    </Button>
  </div>
)}


      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onEdit={handleEditFromModal}
        onViewSchedule={handleViewSchedule}
        onDone={handleDoneFromModal}
      />
    </>
  )
}
