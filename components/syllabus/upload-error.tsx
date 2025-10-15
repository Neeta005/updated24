// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import Link from "next/link"
// import { FormField } from "@/components/ui/form-field"
// import { SearchInput } from "@/components/ui/search-input"
// import { TabButton } from "@/components/ui/tab-button"
// import { GradientButton } from "@/components/ui/gradient-button"
// import { targetAudienceOptions } from "@/data/syllabus"
// import { X, AlertCircle, FileText } from "lucide-react"

// export function UploadError() {
//   const [subject, setSubject] = useState("Design")
//   const [targetAudience, setTargetAudience] = useState("Designers")

//   return (
//     <div className="min-h-screen">
//       <div className="bg-card rounded-lg p-6 max-w-none">
//         <div className="mb-6">
//           <h1 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">Add Syllabus</h1>

//           <div className="flex gap-0 mb-6">
//             <TabButton active={false} onClick={() => {}} position="left">
//               Manual
//             </TabButton>
//             <TabButton active={true} onClick={() => {}} position="right">
//               File Upload
//             </TabButton>
//           </div>

//           <div className="border-b border-border mb-6"></div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <FormField label="Subject">
//               <SearchInput
//                 placeholder="Search syllabus..."
//                 value={subject}
//                 onChange={setSubject}
//                 className="w-full md:w-[260px]"
//               />
//             </FormField>

//             <div className="flex justify-end">
//               <FormField label="Target Audience" className="w-full md:w-auto">
//                 <Select value={targetAudience} onValueChange={setTargetAudience}>
//                   <SelectTrigger className="bg-muted border border-border text-card-foreground placeholder:text-muted-foreground rounded-full px-4 h-10 w-full md:w-[240px]">
//                     <SelectValue placeholder="Select Audience" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-card border border-border">
//                     {targetAudienceOptions.map((option) => (
//                       <SelectItem
//                         key={option.value}
//                         value={option.value}
//                         className="text-card-foreground hover:bg-accent"
//                       >
//                         {option.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormField>
//             </div>
//           </div>

//           <div className="border-b border-border mb-6"></div>
//         </div>

//         <div className="flex flex-col lg:flex-row">
//           <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
//             <h3 className="text-card-foreground text-lg font-semibold mb-4">Uploaded Files</h3>

//             <div className="border-2 border-red-500 rounded-lg p-6 bg-card relative">
//               <button className="absolute top-4 right-4 text-muted-foreground hover:text-card-foreground">
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="flex flex-col items-center text-center">
//                 <div className="relative mb-4">
//                   <FileText className="w-16 h-16 text-muted-foreground" />
//                   <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
//                     PDF
//                   </div>
//                 </div>

//                 <h4 className="text-card-foreground font-medium mb-1">UX Design</h4>
//                 <p className="text-muted-foreground text-sm mb-3">The file size should be lesser than 25 MB</p>

//                 <div className="flex items-center gap-2 text-red-500">
//                   <AlertCircle className="w-4 h-4" />
//                   <span className="text-sm font-medium">An error Occurred</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
//             <h3 className="text-card-foreground text-lg font-semibold mb-4">Preview</h3>

//             <div className="bg-muted rounded-lg p-8 text-center">
//               <div className="mb-4">
//                 <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//               </div>
//               <h4 className="text-card-foreground text-lg font-semibold mb-2">An Error Occurred!</h4>
//               <p className="text-muted-foreground">An Unwanted Error Occurred in your uploaded File</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
//           <Link href="/syllabus">
//             <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
//               Cancel
//             </Button>
//           </Link>
//           <GradientButton className="w-full sm:w-auto">Reupload</GradientButton>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { FormField } from "@/components/ui/form-field"
import { SearchInput } from "@/components/ui/search-input"
import { TabButton } from "@/components/ui/tab-button"
import { GradientButton } from "@/components/ui/gradient-button"
import { targetAudienceOptions } from "@/data/syllabus"
import { X, AlertCircle, FileText } from "lucide-react"
import type { Section, UploadedFile } from "@/types/syllabus"

interface FormData {
  subject: string
  targetAudience: string
  sections: Section[]
  uploadedFiles: UploadedFile[]
}

export function UploadError() {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    targetAudience: "",
    sections: [],
    uploadedFiles: []
  })

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const savedData = sessionStorage.getItem("syllabusFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
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

  const handleReupload = () => {
    // Update the stored data and go back to add syllabus page
    sessionStorage.setItem("syllabusFormData", JSON.stringify(formData))
    window.location.href = "/syllabus/add"
  }

  // ✅ Convert size string (e.g. "2 MB", "500 KB") into MB
  const parseSizeToMB = (size: string) => {
    if (size.toLowerCase().includes("mb")) {
      return parseFloat(size) // already MB
    }
    if (size.toLowerCase().includes("kb")) {
      return parseFloat(size) / 1024 // convert KB → MB
    }
    if (size.toLowerCase().includes("gb")) {
      return parseFloat(size) * 1024 // convert GB → MB
    }
    return 0
  }

  // ✅ Get the first file with error (file size > 5 MB)
  const errorFile = formData.uploadedFiles.find((file) => {
    const sizeInMB = parseSizeToMB(file.size)
    return sizeInMB > 5
  })

  return (
    <div className="min-h-screen">
      <div className="bg-card rounded-lg p-6 max-w-none">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">Add Syllabus</h1>

          <div className="flex gap-0 mb-6">
            <TabButton active={false} onClick={() => {}} position="left">
              Manual
            </TabButton>
            <TabButton active={true} onClick={() => {}} position="right">
              File Upload
            </TabButton>
          </div>

          <div className="border-b border-border mb-6"></div>

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
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
            <h3 className="text-card-foreground text-lg font-semibold mb-4">Uploaded Files</h3>

            {errorFile ? (
              <div className="border-2 border-red-500 rounded-lg p-6 bg-card relative">
                <button
                  onClick={() => removeFile(errorFile.id)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-card-foreground"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <FileText className="w-16 h-16 text-muted-foreground" />
                    <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                      {errorFile.name.split(".").pop()?.toUpperCase() || "FILE"}
                    </div>
                  </div>

                  <h4 className="text-card-foreground font-medium mb-1">
                    {errorFile.name.replace(/\.[^/.]+$/, "")}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    {errorFile.size} | File size should be less than 5 MB
                  </p>

                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">File size exceeds limit</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No files uploaded</p>
              </div>
            )}
          </div>

          <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
            <h3 className="text-card-foreground text-lg font-semibold mb-4">Preview</h3>

            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="mb-4">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              </div>
              <h4 className="text-card-foreground text-lg font-semibold mb-2">An Error Occurred!</h4>
              <p className="text-muted-foreground">File size exceeds the maximum limit of 5 MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link href="/syllabus">
            <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <GradientButton onClick={handleReupload} className="w-full sm:w-auto">
            Reupload
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
