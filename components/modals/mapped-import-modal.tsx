"use client"

import React, { useState, useMemo } from "react"
import { X, RotateCcw } from "lucide-react"
import Image from "next/image"

interface ParsedCSVData {
  headers: string[]
  rows: any[]
}

interface MappedImportModalProps {
  isOpen: boolean
  onClose: () => void
  parsedData: ParsedCSVData | null
  fileName: string
}

export const MappedImportModal = React.memo(({ 
  isOpen, 
  onClose, 
  parsedData,
  fileName 
}: MappedImportModalProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedTopic, setSelectedTopic] = useState<string>("All")

  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!parsedData) return []
    
    if (!searchTerm.trim()) return parsedData.rows

    const lowerSearch = searchTerm.toLowerCase()
    return parsedData.rows.filter((row) => {
      return Object.values(row).some((value) => {
        if (value == null) return false
        return String(value).toLowerCase().includes(lowerSearch)
      })
    })
  }, [parsedData, searchTerm])

  // Get unique topics from data (if applicable)
  const topics = useMemo(() => {
    if (!parsedData) return ["All"]
    
    // Try to find a "topic" or "category" column
    const topicColumn = parsedData.headers.find(h => 
      h.toLowerCase().includes("topic") || 
      h.toLowerCase().includes("category")
    )
    
    if (!topicColumn) return ["All"]
    
    const uniqueTopics = new Set<string>()
    parsedData.rows.forEach(row => {
      const topic = row[topicColumn]
      if (topic) uniqueTopics.add(String(topic))
    })
    
    return ["All", ...Array.from(uniqueTopics)]
  }, [parsedData])

  const handleReupload = () => {
    // Close modal and allow re-upload
    onClose()
  }

  if (!isOpen || !parsedData) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
<div className="bg-gray-800 rounded-2xl p-5 w-[1000px] max-h-[72vh] overflow-y-auto relative animate-in fade-in-0 zoom-in-95 duration-200">        {/* Close Button */}
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
              <button 
                onClick={handleReupload}
                className="flex items-center gap-2 text-orange-500 hover:text-red-600 transition-colors"
              >
                <RotateCcw size={16} />
                Reupload
              </button>

              <div className="bg-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 text-black">
                <div className="flex items-center justify-center w-4 h-4">
                  <Image src="/icons/uploadicon.png" alt="CSV icon" width={16} height={16} />
                </div>
                {fileName}
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
                placeholder="Search in data..."
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  {parsedData.headers.map((header, index) => (
                    <th 
                      key={index}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="max-h-[400px] overflow-y-auto">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                      {parsedData.headers.map((header, colIndex) => (
                        <td 
                          key={colIndex} 
                          className="px-4 py-3 text-sm text-gray-300"
                        >
                          {row[header] != null ? String(row[header]) : '-'}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td 
                      colSpan={parsedData.headers.length} 
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      No data found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-gray-400 text-sm mb-6">
          {filteredRows.length} of {parsedData.rows.length} Entries
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              // Handle preview/import logic here
              console.log("Preview/Import data:", filteredRows)
              onClose()
            }}
            className="flex justify-center items-center px-4 gap-2 w-[176px] h-[47px] bg-gradient-to-r from-rose-600 to-orange-500 rounded-md text-white hover:opacity-90 transition-opacity"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  )
})

MappedImportModal.displayName = "MappedImportModal"