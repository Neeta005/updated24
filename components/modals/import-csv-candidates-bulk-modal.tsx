"use client"

import type React from "react"
import Image from "next/image"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  // Called after a successful import; parent can refresh or parse the file content if desired
  onComplete?: (file?: File) => void
}

type Step = "pick" | "error" | "progress"

export default function ImportCsvCandidatesBulkModal({ open, onOpenChange, onComplete }: Props) {
  const [step, setStep] = useState<Step>("pick")
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open) {
      // reset when closed
      setTimeout(() => {
        setStep("pick")
        setFile(null)
        setProgress(0)
      }, 150)
    }
  }, [open])

  // Simulate progress for the visual per spec image
  useEffect(() => {
    if (step !== "progress") return
    let p = 0
    const id = setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 12))
      setProgress(p)
      if (p >= 100) {
        clearInterval(id)
        // small delay to let UI reach 100%
        setTimeout(() => {
          onOpenChange(false)
          onComplete?.(file ?? undefined)
        }, 500)
      }
    }, 350)
    return () => clearInterval(id)
  }, [step, onComplete, onOpenChange, file])

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    handlePicked(f)
  }

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    handlePicked(f)
  }

  const handlePicked = (f: File) => {
    // Accept .csv only
    const isCsv =
      f.name.toLowerCase().endsWith(".csv") || f.type === "text/csv" || f.type === "application/vnd.ms-excel" // some browsers report this
    if (!isCsv) {
      setFile(null)
      setStep("error")
      return
    }
    setFile(f)
    setStep("pick")
  }

  const startImport = () => {
    if (!file) return
    setStep("progress")
  }

  const openFilePicker = () => inputRef.current?.click()

  const pickPanel = (
    <div
      className="mt-4 rounded-xl border-2 border-dashed border-[#a14d55]/60 bg-[#0f1626] p-10 text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      role="region"
      aria-label="CSV dropzone"
    >
     <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-700/30 grid place-items-center">
  <Image
    src="/icons/uploadicon.png" // replace with your actual icon path in public folder
    alt="Folder Icon"
    width={28}
    height={28}
    className="object-contain text-emerald-400"
  />
</div>

      <div className="text-slate-200">Pick the CSV file you want to add</div>
      <div className="text-slate-400 text-sm mt-2">
        Drag your file or{" "}
        <button className="text-orange-400 underline underline-offset-4" onClick={openFilePicker}>
          click here
        </button>{" "}
        to upload the file
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={onPick}
        className="hidden"
        aria-hidden="true"
      />

      {file && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-slate-200">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6H3l9-9 9 9h-2Z" />
          </svg>
          <span className="truncate max-w-[200px]">{file.name}</span>
        </div>
      )}
    </div>
  )

  const errorPanel = (
    <div className="mt-6 rounded-xl border border-red-600/50 bg-red-900/30 p-10 text-center">
      <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-red-700/40 grid place-items-center">
        <svg className="w-7 h-7 text-red-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
        </svg>
      </div>
      <div className="text-white font-semibold">Invalid File Type!</div>
      <div className="text-slate-300 text-sm mt-1">An error occured!</div>
    </div>
  )

  const progressPanel = (
    <div className="mt-4 rounded-xl border border-slate-600 bg-[#0f1626] p-8 text-center">
      <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-700/30 grid place-items-center">
        <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" />
        </svg>
      </div>
      <div className="text-slate-200">{file?.name ?? "Import.csv"}</div>
      <div className="text-slate-400 text-xs mt-1">40 MB | 2 sec left</div>

      <div className="mt-6 h-2 w-full rounded-full bg-slate-600/40 overflow-hidden">
        <div
          className="h-2 bg-orange-500 transition-all"
          style={{ width: `${progress}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          role="progressbar"
        />
      </div>
      <div className="text-orange-300 text-xs mt-2">
        {Math.max(1, Math.round((progress / 100) * 100))} of 100 entries validated
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0b1626] text-white border border-slate-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Import CSV</DialogTitle>
        </DialogHeader>

        {step === "pick" && pickPanel}
        {step === "error" && errorPanel}
        {step === "progress" && progressPanel}

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <DialogClose asChild>
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={step === "pick" ? startImport : step === "error" ? () => setStep("pick") : undefined}
            disabled={(step === "pick" && !file) || step === "progress"}
            className={`px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {step === "error" ? "Try Again" : step === "progress" ? "Importing..." : "Import"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
