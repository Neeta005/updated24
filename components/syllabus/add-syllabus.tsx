// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import Link from "next/link"
// import { SectionForm } from "./section-form"
// import { FileUploadSection } from "./file-upload-section"
// import { SyllabusPreview } from "./syllabus-preview"
// import { FormField } from "@/components/ui/form-field"
// import { SearchInput } from "@/components/ui/search-input"
// import { TabButton } from "@/components/ui/tab-button"
// import { GradientButton } from "@/components/ui/gradient-button"
// import { Text } from "@/components/atoms/text"
// import type { UploadedFile, Section } from "@/types/syllabus"
// import { targetAudienceOptions } from "@/data/syllabus-form"

// export function AddSyllabus() {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual")
//   const [subject, setSubject] = useState("")
//   const [targetAudience, setTargetAudience] = useState("")
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
//   const [sections, setSections] = useState<Section[]>([
//     {
//       id: "1",
//       title: "",
//       lessons: [
//         { id: "1-1", value: "" },
//         { id: "1-2", value: "" }
//       ]
//     }
//   ])

//   // ✅ Handle Add Syllabus click
//   const handleAddSyllabus = () => {
//     if (activeTab === "manual") {
//       router.push("/syllabus")
//     } else {
//       if (uploadedFiles.length > 0) {
//         router.push("/syllabus/upload")
//       } else {
//         router.push("/syllabus")
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="bg-card rounded-lg p-6 max-w-none">
//         <div className="mb-6">
//           <Text as="h1" className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
//             Add Syllabus
//           </Text>

//           {/* Tabs */}
//           <div className="w-full bg-slate-800 p-1.5 mb-6 flex gap-0">
//             <TabButton active={activeTab === "manual"} onClick={() => setActiveTab("manual")} position="left">
//               Manual
//             </TabButton>
//             <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")} position="right">
//               File Upload
//             </TabButton>
//           </div>

//           <div className="border-b border-border mb-6"></div>

//           {/* Subject + Target Audience */}
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
//                   <SelectTrigger className="bg-muted border border-border text-card-foreground placeholder:text-muted-foreground rounded-md px-4 h-10 w-full md:w-[240px]">
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

//         {/* Form + Preview */}
//         <div className="flex flex-col lg:flex-row">
//           <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
//             {activeTab === "manual" ? (
//               <SectionForm sections={sections} onSectionsChange={setSections} />
//             ) : (
//               <FileUploadSection uploadedFiles={uploadedFiles} onFilesChange={setUploadedFiles} />
//             )}
//           </div>

//           <div className="flex-1 pl-0 lg:pl-8 mt-8 lg:mt-0">
//             <h3 className="text-card-foreground text-lg font-semibold mb-4">Preview</h3>
//             <SyllabusPreview
//               subject={subject}
//               targetAudience={targetAudience}
//               sections={sections}
//               uploadedFiles={uploadedFiles}
//               activeTab={activeTab}
//             />
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-border">
//           <Link href="/syllabus">
//             <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
//               Cancel
//             </Button>
//           </Link>

//           <GradientButton onClick={handleAddSyllabus} className="w-full sm:w-auto">
//             Add Syllabus
//           </GradientButton>
//         </div>
//       </div>
//     </div>
//   )
// }
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

// ✅ File size constants - Updated to 5MB
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_KB = MAX_FILE_SIZE_MB * 1024 // 5120 KB

// ✅ Utility function to parse file sizes
const parseSizeToMB = (sizeString: string): number => {
  const size = parseFloat(sizeString)
  if (sizeString.toLowerCase().includes('mb')) {
    return size
  }
  if (sizeString.toLowerCase().includes('kb')) {
    return size / 1024 // Convert KB to MB
  }
  if (sizeString.toLowerCase().includes('gb')) {
    return size * 1024 // Convert GB to MB
  }
  return size // Assume MB if no unit
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

  // ✅ FIXED: Handle Add Syllabus click with proper file size validation (5MB)
  const handleAddSyllabus = () => {
    console.log("Add Syllabus clicked, activeTab:", activeTab)
    console.log("Uploaded files:", uploadedFiles)

    if (activeTab === "manual") {
      // For manual entry, go directly to syllabus page
      console.log("Manual mode - redirecting to /syllabus")
      router.push("/syllabus")
      return
    }

    // ✅ FILE UPLOAD MODE - Check file sizes when button is clicked
    if (uploadedFiles.length > 0) {
      console.log("Checking file sizes...")
      
      // ✅ Check each file size against the 5MB limit
      const filesWithErrors = uploadedFiles.filter(file => {
        const sizeInMB = parseSizeToMB(file.size)
        console.log(`File: ${file.name}, Size: ${file.size}, MB: ${sizeInMB}, Exceeds limit: ${sizeInMB > MAX_FILE_SIZE_MB}`)
        return sizeInMB > MAX_FILE_SIZE_MB
      })

      // Prepare form data to save
      const formData = {
        subject,
        targetAudience,
        sections,
        uploadedFiles: uploadedFiles.map(file => {
          const sizeInMB = parseSizeToMB(file.size)
          return {
            ...file,
            status: sizeInMB > MAX_FILE_SIZE_MB ? 'error' : 'success',
            error: sizeInMB > MAX_FILE_SIZE_MB ? `File size exceeds ${MAX_FILE_SIZE_MB}MB limit` : undefined
          }
        })
      }

      // Save to sessionStorage
      sessionStorage.setItem('syllabusFormData', JSON.stringify(formData))

      if (filesWithErrors.length > 0) {
        // ✅ Has files that exceed size limit - redirect to error page
        console.log("Files exceed size limit - redirecting to error page")
        router.push("/syllabus/upload-error")
      } else {
        // ✅ All files are within size limit - redirect to success page
        console.log("All files within size limit - redirecting to upload page")
        router.push("/syllabus/upload")
      }
    } else {
      // No files uploaded, go to regular syllabus page
      console.log("No files uploaded - redirecting to /syllabus")
      router.push("/syllabus")
    }
  }

  // Handle file changes
  const handleFilesChange = (files: UploadedFile[]) => {
    console.log("Files changed:", files)
    setUploadedFiles(files)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-card rounded-lg p-6 max-w-none">
        <div className="mb-6">
          <Text as="h1" className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
            Add Syllabus
          </Text>

          {/* Tabs */}
          <div className="w-full bg-slate-800 p-1.5 mb-6 flex gap-0">
            <TabButton 
              active={activeTab === "manual"} 
              onClick={() => {
                console.log("Manual tab clicked")
                setActiveTab("manual")
              }} 
              position="left"
            >
              Manual
            </TabButton>
            <TabButton 
              active={activeTab === "upload"} 
              onClick={() => {
                console.log("Upload tab clicked")
                setActiveTab("upload")
              }} 
              position="right"
            >
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
              />
            </FormField>

            <div className="flex justify-end">
              <FormField label="Target Audience" className="w-full md:w-auto">
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="bg-muted border border-border text-card-foreground placeholder:text-muted-foreground rounded-md px-4 h-10 w-full md:w-[240px]">
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

        {/* Form + Preview */}
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-8 border-r-0 lg:border-r border-border">
            {activeTab === "manual" ? (
              <SectionForm sections={sections} onSectionsChange={setSections} />
            ) : (
              <FileUploadSection 
                uploadedFiles={uploadedFiles} 
                onFilesChange={handleFilesChange} 
              />
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
          <Link href="/syllabus">
            <Button className="bg-muted hover:bg-accent text-card-foreground px-8 py-2 h-10 w-full sm:w-auto">
              Cancel
            </Button>
          </Link>

          {/* ✅ FIXED: Add Syllabus button with proper onClick handler */}
          <GradientButton 
            onClick={handleAddSyllabus} 
            className="w-full sm:w-auto"
          >
            Add Syllabus
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
