"use client"

import React, { useState } from "react"
import { X, RotateCcw } from "lucide-react"
import Image from "next/image"
import { mockQuestions } from "@/data/mock-questions"
import { TableHeader } from "@/components/ui/table-header"
import { TableRow } from "@/components/ui/table-row"
import { mappedImportColumns } from "@/data/table-columns"
import { MappedQuestionRow, type MappedQuestion } from "./mapped-question-row"

interface MappedImportModalProps {
  isOpen: boolean
  onClose: () => void
  fileType: "xls" | "csv" | "google-sheet" | null
}

export const MappedImportModal = React.memo(({ isOpen, onClose }: MappedImportModalProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("Design")
  const [selectedTopic, setSelectedTopic] = useState<string>("UI Design")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl p-6 w-[1000px] max-h-[90vh] overflow-y-auto relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-bold mb-6">Import CSV</h2>

        {/* Selected File Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 border border-gray-700 rounded-lg p-3">
            <h3 className="text-white text-lg font-semibold">Selected File</h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-orange-500 hover:text-red-600 transition-colors">
                <RotateCcw size={16} />
                Reupload
              </button>

              <div className="bg-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 text-black">
                <div className="flex items-center justify-center w-4 h-4">
                  <Image src="/icons/uploadicon.png" alt="CSV icon" width={16} height={16} />
                </div>
                Questions.CSV
              </div>
            </div>
          </div>

          {/* Search and Topic Select */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Design"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="UI Design">UI Design</option>
                <option value="UX Design">UX Design</option>
                <option value="Interactive Design">Interactive Design</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 mb-6">
          {/* Mapped Table Header */}
          <TableHeader
            columns={mappedImportColumns}
            variant="modal"
            size="sm"
            className="bg-gray-800 border-gray-700 text-gray-300"
          />

          {/* Mapped Table Rows */}
          {mockQuestions.map((question) => (
            <TableRow key={question.id} variant="modal" size="sm" className="border-gray-700 hover:bg-gray-800">
              <MappedQuestionRow question={question as MappedQuestion} />
            </TableRow>
          ))}
        </div>

        <div className="text-gray-400 text-sm mb-6">100 Entries</div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button className="flex justify-center items-center px-4 gap-2 w-[176px] h-[47px] bg-gradient-to-r from-rose-600 to-orange-500 rounded-md text-white">
            Preview
          </button>
        </div>
      </div>
    </div>
  )
})

MappedImportModal.displayName = "MappedImportModal"
