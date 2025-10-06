// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { X } from "lucide-react"
// import { Text } from "@/components/atoms/text"
// import Image from "next/image"

// interface ImportProgressModalProps {
//   isOpen: boolean
//   onClose: () => void
//   fileName?: string
//   fileSize?: string
// }

// export const ImportProgressModal: React.FC<ImportProgressModalProps> = ({
//   isOpen,
//   onClose,
//   fileName = "Import.csv",
//   fileSize = "40 MB",
// }) => {
//   const [progress, setProgress] = useState<number>(0)
//   const [timeLeft, setTimeLeft] = useState<number>(120) // 2 minutes in seconds
//   const [validatedEntries, setValidatedEntries] = useState<number>(0)
//   const [isComplete, setIsComplete] = useState<boolean>(false)

//   useEffect(() => {
//     if (!isOpen) {
//       // Reset state when modal closes
//       setProgress(0)
//       setTimeLeft(120)
//       setValidatedEntries(0)
//       setIsComplete(false)
//       return
//     }

//     // Simulate import progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const newProgress = Math.min(prev + Math.random() * 15, 100)
//         if (newProgress >= 100) {
//           setIsComplete(true)
//           clearInterval(interval)
//         }
//         return newProgress
//       })

//       setTimeLeft((prev) => Math.max(prev - 1, 0))
//       setValidatedEntries((prev) => Math.min(prev + Math.floor(Math.random() * 3) + 1, 100))
//     }, 200)

//     return () => clearInterval(interval)
//   }, [isOpen])

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
//       <div className="relative w-[560px] rounded-2xl bg-gray-800 p-6 shadow-2xl">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
//         >
//           <X size={24} />
//         </button>

//         <Text variant="heading" size="2xl" weight="bold" color="primary" as="h2" className="mb-8">
//           Import CSV
//         </Text>

//         <div className="flex flex-col items-center">
//           {/* File Icon and Status */}
//           <div className="mb-6 flex flex-col items-center">
//             <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-green-600/10 overflow-hidden">
//               <Image
//                 src="/icons/check 1.png" // fixed path
//                 alt="Import Icon"
//                 width={48}
//                 height={48}
//                 className="object-contain"
//               />
//             </div>

//             <Text variant="body" size="lg" weight="semibold" color="primary" className="mb-1">
//               {fileName}
//             </Text>

//             <Text variant="body" size="sm" color="muted">
//               {fileSize} | {formatTime(timeLeft)} left
//             </Text>
//           </div>

//           {/* Progress Bar */}
//           <div className="mb-6 w-full">
//             <div className="mb-2 h-2 w-full rounded-full bg-gray-700">
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300 ease-out"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <Text variant="body" size="sm" color="primary">
//                 {Math.round(progress)}%
//               </Text>
//               <Text variant="body" size="sm" color="primary">
//                 {validatedEntries} of 100 entries validated
//               </Text>
//             </div>
//           </div>

//           {/* Status Message */}
//           {!isComplete ? (
//             <Text variant="body" size="sm" color="muted" className="mb-8 text-center">
//               Validating and importing your data...
//             </Text>
//           ) : (
//             <Text variant="body" size="sm" color="primary" className="mb-8 text-center font-semibold">
//               Import completed successfully!
//             </Text>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="rounded-lg border border-gray-600 px-6 py-2 text-gray-300 transition-colors hover:bg-gray-700"
//           >
//             Cancel
//           </button>
//           <button
//             className={`rounded-lg px-6 py-2 font-semibold text-white transition-opacity ${
//               isComplete
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 opacity-50 cursor-not-allowed"
//             }`}
//             disabled={!isComplete}
//           >
//             {isComplete ? "Done" : "Processing..."}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Text } from "@/components/atoms/text"
import Image from "next/image"

interface ImportProgressModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  fileName?: string
  fileSize?: string
}

export const ImportProgressModal: React.FC<ImportProgressModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  fileName = "Import.csv",
  fileSize = "40 MB",
}) => {
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [validatedEntries, setValidatedEntries] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setProgress(0)
    setTimeLeft(120)
    setValidatedEntries(0)
    setIsComplete(false)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100)
        if (newProgress >= 100) {
          setIsComplete(true)
          clearInterval(interval)

          // Fire onComplete after short delay
          setTimeout(() => onComplete?.(), 800)
        }
        return newProgress
      })

      setTimeLeft((prev) => Math.max(prev - 1, 0))
      setValidatedEntries((prev) => Math.min(prev + Math.floor(Math.random() * 3) + 1, 100))
    }, 200)

    return () => clearInterval(interval)
  }, [isOpen, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
      <div className="relative w-[560px] rounded-2xl bg-gray-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X size={24} />
        </button>

        <Text variant="heading" size="2xl" weight="bold" color="primary" as="h2" className="mb-8">
          Import CSV
        </Text>

        <div className="flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-green-600/10 overflow-hidden">
              <Image
                src="/icons/check 1.png"
                alt="Import Icon"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <Text variant="body" size="lg" weight="semibold" color="primary" className="mb-1">
              {fileName}
            </Text>

            <Text variant="body" size="sm" color="muted">
              {fileSize} | {formatTime(timeLeft)} left
            </Text>
          </div>

          <div className="mb-6 w-full">
            <div className="mb-2 h-2 w-full rounded-full bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Text variant="body" size="sm" color="primary">
                {Math.round(progress)}%
              </Text>
              <Text variant="body" size="sm" color="primary">
                {validatedEntries} of 100 entries validated
              </Text>
            </div>
          </div>

          {!isComplete ? (
            <Text variant="body" size="sm" color="muted" className="mb-8 text-center">
              Validating and importing your data...
            </Text>
          ) : (
            <Text variant="body" size="sm" color="primary" className="mb-8 text-center font-semibold">
              Import completed successfully!
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}
