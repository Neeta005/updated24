"use client"

import type React from "react"
import { useState } from "react"
import { X, Copy } from "lucide-react"
import { Text } from "@/components/atoms/text"
import { ImportProgressModal } from "./ImportProgressModal"
import { MappedImportModal } from "./mapped-import-modal"

type TemplateType = "xls" | "csv" | "google-sheet"

interface ImportCSVModalProps {
  isOpen: boolean
  onClose: () => void
  onTemplateSelect?: (type: TemplateType) => void
  onFileSelect?: (file: File) => void
  templateData?: {
    headers: string[]
    sampleRows?: string[][]
  }
}

export const ImportCSVModal: React.FC<ImportCSVModalProps> = ({ 
  isOpen, 
  onClose, 
  onTemplateSelect, 
  onFileSelect,
  templateData = {
    headers: ['Name', 'Email', 'Phone', 'Company', 'Position', 'Department', 'Location'],
    sampleRows: [
      ['John Smith', 'john.smith@company.com', '+1-555-0123', 'Tech Corp', 'Software Engineer', 'Engineering', 'New York'],
      ['Sarah Johnson', 'sarah.j@business.com', '+1-555-0124', 'Business Inc', 'Marketing Manager', 'Marketing', 'California'],
      ['Michael Brown', 'mbrown@startup.io', '+1-555-0125', 'StartupXYZ', 'Product Manager', 'Product', 'Texas'],
      ['Emily Davis', 'emily.davis@enterprise.org', '+1-555-0126', 'Enterprise Ltd', 'HR Specialist', 'Human Resources', 'Florida']
    ]
  }
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false)
  const [showMappedModal, setShowMappedModal] = useState<boolean>(false)
  const [showGoogleSheetsPopup, setShowGoogleSheetsPopup] = useState<boolean>(false)

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer?.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect?.(file)
    }
  }

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect?.(file)
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      setShowProgressModal(true)
    }
  }

  const handleProgressComplete = () => {
    setShowProgressModal(false)
    setShowMappedModal(true)
  }

  const handleMappedModalClose = () => {
    setShowMappedModal(false)
    setSelectedFile(null)
    onClose()
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  // Function to download the selected file as CSV
  const downloadCSVTemplate = () => {
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }
    
    const url = URL.createObjectURL(selectedFile)
    const element = document.createElement('a')
    element.href = url
    element.download = selectedFile.name.replace(/\.[^/.]+$/, '') + '.csv'
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(url)
  }

  // Function to download the selected file as XLS
  const downloadXLSTemplate = () => {
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }
    
    const url = URL.createObjectURL(selectedFile)
    const element = document.createElement('a')
    element.href = url
    element.download = selectedFile.name.replace(/\.[^/.]+$/, '') + '.xls'
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(url)
  }

  // Function to show Google Sheets popup
  const downloadGoogleSheetTemplate = () => {
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }
    
    setShowGoogleSheetsPopup(true)
  }

  // Function to copy Google Sheets link
  const copyGoogleSheetsLink = () => {
    const googleSheetsUrl = 'https://docs.google.com/spreadsheets/create'
    navigator.clipboard.writeText(googleSheetsUrl).then(() => {
      alert('Google Sheets link copied to clipboard!')
      setShowGoogleSheetsPopup(false)
    }).catch(() => {
      const textArea = document.createElement('textarea')
      textArea.value = googleSheetsUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Google Sheets link copied to clipboard!')
      setShowGoogleSheetsPopup(false)
    })
  }

  const handleTemplateDownload = (type: TemplateType) => {
    switch (type) {
      case 'csv':
        downloadCSVTemplate()
        break
      case 'xls':
        downloadXLSTemplate()
        break
      case 'google-sheet':
        downloadGoogleSheetTemplate()
        break
      default:
        break
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Upload Modal */}
      {!showProgressModal && !showMappedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
          <div className="relative w-[560px] rounded-2xl bg-gray-800 p-6 shadow-2xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={24} />
            </button>

            <Text variant="heading" size="2xl" weight="bold" color="primary" as="h2" className="mb-6">
              Import CSV
            </Text>

            <div className="mb-6">
              <Text variant="heading" size="lg" weight="semibold" color="primary" as="h3" className="mb-4">
                Download Templates
              </Text>
              <Text variant="body" size="sm" color="muted" className="mb-3">
                {selectedFile 
                  ? `Download "${selectedFile.name}" as CSV/Excel or open in Google Sheets` 
                  : 'Select a file first to download it in different formats or open in Google Sheets'
                }
              </Text>
              <div className="flex gap-3">
                {[
                  { type: 'csv' as const, label: 'CSV File' },
                  { type: 'xls' as const, label: 'Excel File' },
                  { type: 'google-sheet' as const, label: 'Google Sheets' }
                ].map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => handleTemplateDownload(type)}
                    disabled={!selectedFile}
                    className={`flex-1 rounded-lg py-3 font-semibold text-white transition-colors ${
                      selectedFile 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Google Sheets Popup */}
            {showGoogleSheetsPopup && (
              <div className="absolute left-4 right-4 top-32 z-[60] rounded-lg bg-gray-900 border border-gray-600 p-3 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <Text variant="body" size="sm" color="primary" className="font-medium">
                    Google Sheets Link
                  </Text>
                  <button
                    onClick={() => setShowGoogleSheetsPopup(false)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 rounded bg-gray-800 px-2 py-1.5 border border-gray-600">
                  <span className="flex-1 truncate text-xs text-gray-300">https://docs.google.com/spreadsheets/create</span>
                  <button
                    onClick={copyGoogleSheetsLink}
                    className="rounded bg-blue-600 p-1.5 text-white hover:bg-blue-700 transition-colors"
                    title="Copy link"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
            )}

            <label
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative block cursor-pointer overflow-hidden rounded-xl p-8 text-center transition-colors border-2 border-dashed border-orange-500
                  ${dragActive ? "bg-orange-500/10" : "bg-transparent"}`}
            >
              <input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={handleChoose} />

              <div className="relative z-10 flex flex-col items-center">
                <Text variant="body" size="lg" weight="semibold" color="primary" className="mb-4">
                  Pick the CSV file you want to add
                </Text>

                <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-green-600/10">
                  <img src="/icons/uploadicon.png" alt="Upload file" className="size-12" />
                </div>

                {selectedFile ? (
                  <div className="mb-2">
                    <Text variant="body" size="sm" color="primary" className="font-semibold">
                      {selectedFile.name}
                    </Text>
                    <Text variant="body" size="sm" color="muted">
                      {formatFileSize(selectedFile.size)}
                    </Text>
                  </div>
                ) : (
                  <Text variant="body" size="sm" color="muted">
                    Drag your file or <span className="font-semibold text-orange-500 underline">click here</span> to upload
                    the file
                  </Text>
                )}
              </div>
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-600 px-6 py-2 text-gray-300 transition-colors hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                className={`rounded-lg px-6 py-2 font-semibold text-white transition-opacity ${
                  selectedFile
                    ? "bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90"
                    : "bg-gradient-to-r from-red-600 to-orange-500 opacity-50 cursor-not-allowed"
                }`}
                disabled={!selectedFile}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      <ImportProgressModal
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        onComplete={handleProgressComplete}
        fileName={selectedFile?.name}
        fileSize={selectedFile ? formatFileSize(selectedFile.size) : undefined}
      />

      {/* Mapped Modal */}
      <MappedImportModal
        isOpen={showMappedModal}
        onClose={handleMappedModalClose}
        templateData={templateData}
      />
    </>
  )
}
