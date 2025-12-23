"use client"

import type React from "react"
import { useState } from "react"
import { X, Copy } from "lucide-react"
import { Text } from "@/components/atoms/text"
import { ImportProgressModal } from "./ImportProgressModal"
import { MappedImportModal } from "./mapped-import-modal"
import { ImportErrorModal } from "./import-error-modal"
import Papa from "papaparse"
import * as XLSX from "xlsx"

type TemplateType = "xls" | "csv" | "google-sheet"

interface ParsedCSVData {
  headers: string[]
  rows: any[]
}

interface ImportCSVModalProps {
  isOpen: boolean
  onClose: () => void
  onTemplateSelect?: (type: TemplateType) => void
  onFileSelect?: (file: File) => void
  templateData?: {
    headers: string[]
    sampleRows?: string[][]
  }
  variant?: "full" | "simple"
  onComplete?: () => void
  showMappedOnComplete?: boolean
}

export const ImportCSVModal: React.FC<ImportCSVModalProps> = ({
  isOpen,
  onClose,
  onTemplateSelect,
  onFileSelect,
  templateData = {
    headers: ["Name", "Email", "Phone", "Company", "Position", "Department", "Location"],
    sampleRows: [
      ["John Smith", "john.smith@company.com", "+1-555-0123", "Tech Corp", "Software Engineer", "Engineering", "New York"],
      ["Sarah Johnson", "sarah.j@business.com", "+1-555-0124", "Business Inc", "Marketing Manager", "Marketing", "California"],
      ["Michael Brown", "mbrown@startup.io", "+1-555-0125", "StartupXYZ", "Product Manager", "Product", "Texas"],
      ["Emily Davis", "emily.davis@enterprise.org", "+1-555-0126", "Enterprise Ltd", "HR Specialist", "Human Resources", "Florida"],
    ],
  },
  variant = "full",
  onComplete,
  showMappedOnComplete = true,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false)
  const [showMappedModal, setShowMappedModal] = useState<boolean>(false)
  const [showGoogleSheetsPopup, setShowGoogleSheetsPopup] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("Invalid File Type!")
  const [parsedData, setParsedData] = useState<ParsedCSVData | null>(null)

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
    if (file) handleFileAfterPick(file)
  }

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileAfterPick(file)
  }

  const handleImport = () => {
    if (selectedFile && isAllowedFile(selectedFile)) {
      setShowProgressModal(true)
    } else if (selectedFile) {
      setErrorMessage("Invalid File Type!")
      setShowErrorModal(true)
    }
  }

  const handleProgressComplete = () => {
    setShowProgressModal(false)
    if (onComplete) {
      onComplete()
      return
    }
    if (showMappedOnComplete) {
      setShowMappedModal(true)
    } else {
      setSelectedFile(null)
      setParsedData(null)
      onClose()
    }
  }

  const handleMappedModalClose = () => {
    setShowMappedModal(false)
    setSelectedFile(null)
    setParsedData(null)
    onClose()
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  // CSV download
  const downloadCSVTemplate = () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }

    const url = URL.createObjectURL(selectedFile)
    const element = document.createElement("a")
    element.href = url
    element.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".csv"
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(url)
  }

  // XLS download
  const downloadXLSTemplate = () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }

    const url = URL.createObjectURL(selectedFile)
    const element = document.createElement("a")
    element.href = url
    element.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".xls"
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(url)
  }

  // Google Sheets → Show popup here
  const downloadGoogleSheetTemplate = () => {
    setShowGoogleSheetsPopup(true)
  }

  const copyGoogleSheetsLink = () => {
    const googleSheetsUrl = "https://docs.google.com/spreadsheets/create"
    navigator.clipboard.writeText(googleSheetsUrl)
      .then(() => {
        alert("Google Sheets link copied to clipboard!")
        setShowGoogleSheetsPopup(false)
      })
      .catch(() => {
        const textArea = document.createElement("textarea")
        textArea.value = googleSheetsUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        alert("Google Sheets link copied to clipboard!")
        setShowGoogleSheetsPopup(false)
      })
  }

  const handleTemplateDownload = (type: TemplateType) => {
    switch (type) {
      case "csv":
        downloadCSVTemplate()
        break
      case "xls":
        downloadXLSTemplate()
        break
      case "google-sheet":
        setShowGoogleSheetsPopup(true)
        break
      default:
        break
    }
  }

  const isAllowedFile = (file: File) => {
    const allowedExt = ["csv", "xls", "xlsx"]
    const ext = file.name.split(".").pop()?.toLowerCase()
    const allowedMimes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]
    return (ext && allowedExt.includes(ext)) || allowedMimes.includes(file.type)
  }

  const isExcelFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase()
    return ext === "xls" || ext === "xlsx"
  }

  const parseExcelFile = (file: File): Promise<ParsedCSVData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: "binary" })
          
          // Get first sheet
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          
          if (!jsonData || jsonData.length === 0) {
            reject(new Error("Excel file is empty"))
            return
          }
          
          // First row is headers
          const headers = (jsonData[0] as any[]).map(h => String(h || "").trim())
          
          // Rest are data rows
          const dataRows = jsonData.slice(1) as any[][]
          
          // Convert rows to objects
          const rows = dataRows
            .filter(row => row.some(cell => cell != null && cell !== ""))
            .map(row => {
              const rowObj: any = {}
              headers.forEach((header, index) => {
                rowObj[header] = row[index] != null ? row[index] : ""
              })
              return rowObj
            })
          
          if (headers.length === 0) {
            reject(new Error("No headers found in Excel file"))
            return
          }

          if (rows.length === 0) {
            reject(new Error("No data rows found in Excel file"))
            return
          }
          
          resolve({ headers, rows })
        } catch (error) {
          reject(error)
        }
      }
      
      reader.onerror = () => {
        reject(new Error("Failed to read Excel file"))
      }
      
      reader.readAsBinaryString(file)
    })
  }

  const parseCSVFile = (file: File): Promise<ParsedCSVData> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            // Get headers and trim whitespace
            const headers = results.meta.fields?.map(h => h.trim()) || []
            
            // Get rows data
            const rows = results.data || []
            
            if (headers.length === 0) {
              reject(new Error("No headers found in CSV file"))
              return
            }

            if (rows.length === 0) {
              reject(new Error("No data rows found in CSV file"))
              return
            }

            resolve({ headers, rows })
          } catch (error) {
            reject(error)
          }
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  }

  const validateCSVTemplate = (data: ParsedCSVData): boolean => {
    // Basic validation - check if we have headers and rows
    if (!data.headers || data.headers.length === 0) {
      setErrorMessage("File has no headers!")
      return false
    }

    if (!data.rows || data.rows.length === 0) {
      setErrorMessage("File has no data rows!")
      return false
    }

    // Optional: Add specific template validation here
    // For example, check if required columns exist
    // const requiredColumns = ["Name", "Email"]
    // const hasRequiredColumns = requiredColumns.every(col => 
    //   data.headers.some(h => h.toLowerCase() === col.toLowerCase())
    // )
    // if (!hasRequiredColumns) {
    //   setErrorMessage("File missing required columns!")
    //   return false
    // }

    return true
  }

  const handleFileAfterPick = async (file: File) => {
    if (!isAllowedFile(file)) {
      setErrorMessage("Invalid File Type! Please upload a CSV, XLS, or XLSX file.")
      setShowErrorModal(true)
      return
    }

    setSelectedFile(file)
    onFileSelect?.(file)

    // Parse file based on type
    try {
      setShowProgressModal(true)
      
      let parsed: ParsedCSVData
      
      if (isExcelFile(file)) {
        parsed = await parseExcelFile(file)
      } else {
        parsed = await parseCSVFile(file)
      }
      
      // Validate the parsed data
      if (!validateCSVTemplate(parsed)) {
        setShowProgressModal(false)
        setShowErrorModal(true)
        setSelectedFile(null)
        return
      }

      // Store parsed data
      setParsedData(parsed)
      
    } catch (error) {
      setShowProgressModal(false)
      setErrorMessage(error instanceof Error ? error.message : "Failed to parse file!")
      setShowErrorModal(true)
      setSelectedFile(null)
      setParsedData(null)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {!showProgressModal && !showMappedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
          <div className={`relative ${variant === "simple" ? "w-[680px]" : "w-[560px]"} rounded-2xl bg-gray-800 p-6 shadow-2xl`}>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <X size={24} />
            </button>

            <Text variant="heading" size="2xl" weight="bold" color="primary" as="h2" className="mb-6">
              Import CSV
            </Text>

            {variant === "full" && (
              <div className="mb-6">
                <Text variant="heading" size="lg" weight="semibold" color="primary" as="h3" className="mb-4">
                  Download Templates
                </Text>

                <Text variant="body" size="sm" color="muted" className="mb-3">
                  {selectedFile
                    ? `Download "${selectedFile.name}" as CSV/Excel or open in Google Sheets`
                    : "Select a file first to download it in different formats or open in Google Sheets"}
                </Text>

                <div className="flex gap-3">
                  {[ 
                    { type: "csv" as const, label: "CSV File" },
                    { type: "xls" as const, label: "Excel File" },
                    { type: "google-sheet" as const, label: "Google Sheets" },
                  ].map(({ type, label }) => (
                    <button
                      key={type}
                      onClick={() => handleTemplateDownload(type)}
                      className="flex-1 rounded-lg py-3 font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  <span className="flex-1 truncate text-xs text-gray-300">
                    https://docs.google.com/spreadsheets/create
                  </span>
                  <button
                    onClick={copyGoogleSheetsLink}
                    className="rounded bg-blue-600 p-1.5 text-white hover:bg-blue-700 transition-colors"
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
              className={`relative block cursor-pointer overflow-hidden rounded-xl p-8 text-center transition-colors border-2 border-dashed ${
                dragActive ? "border-rose-500 bg-rose-500/10" : "border-rose-500/70"
              } ${variant === "simple" ? "mt-2" : ""}`}
            >
              <input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={handleChoose} />

              <div className="relative z-10 flex flex-col items-center">
                <Text variant="body" size="lg" weight="semibold" color="primary" className="mb-4">
                  Pick the CSV/Excel file you want to add
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
                    {parsedData && (
                      <Text variant="body" size="sm" color="muted" className="mt-1">
                        {parsedData.rows.length} rows • {parsedData.headers.length} columns
                      </Text>
                    )}
                  </div>
                ) : (
                  <Text variant="body" size="sm" color="muted">
                    Drag your file or <span className="font-semibold text-orange-500 underline">click here</span> to upload the file
                  </Text>
                )}
              </div>
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-white/60 px-6 py-2 text-white transition-colors hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleImport}
                className={`rounded-lg px-6 py-2 font-semibold text-white transition-opacity ${
                  selectedFile && parsedData
                    ? "bg-gradient-to-r from-rose-600 to-orange-500 hover:opacity-90"
                    : "bg-gradient-to-r from-rose-600 to-orange-500 opacity-50 cursor-not-allowed"
                }`}
                disabled={!selectedFile || !parsedData}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      <ImportProgressModal
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        onComplete={handleProgressComplete}
        fileName={selectedFile?.name}
        fileSize={selectedFile ? formatFileSize(selectedFile.size) : undefined}
      />

      <MappedImportModal
        isOpen={showMappedModal}
        onClose={handleMappedModalClose}
        parsedData={parsedData}
        fileName={selectedFile?.name || "Unknown"}
      />

      <ImportErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Import CSV"
        message={errorMessage}
        subtext="An error occured!"
      />
    </>
  )
}