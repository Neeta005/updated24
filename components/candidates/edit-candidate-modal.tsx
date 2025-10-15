"use client"

import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { GradientButton } from "@/components/ui/gradient-button"
import { candidateGroups, type CandidateWithGroup } from "@/data/candidates"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidate: CandidateWithGroup | null
  onSave?: (updated: CandidateWithGroup) => void
}

export default function EditCandidateModal({ open, onOpenChange, candidate, onSave }: Props) {
  const groupOptions = useMemo(() => candidateGroups.map((g) => g.name), [])
  const [form, setForm] = useState<CandidateWithGroup | null>(candidate)

  useEffect(() => {
    setForm(candidate)
  }, [candidate])

  const handleSave = () => {
    if (!form) return onOpenChange(false)
    onSave?.(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-[#0E1625] text-white border-0 
          rounded-2xl shadow-xl 
          sm:max-w-2xl w-full 
          p-0
        "
      >
        {/* Header */}
        <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <DialogTitle className="text-white text-[22px] leading-7 font-semibold">Edit Candidate</DialogTitle>
          <DialogClose className="absolute top-5 right-5 rounded-full bg-transparent text-slate-300 hover:text-white focus:outline-none">
            <span className="sr-only">Close</span>
            {/* Using the default X from DialogClose */}
          </DialogClose>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="space-y-5">
            {/* Candidate Name */}
            <div>
              <label className="block text-[13px] leading-5 font-medium text-slate-200 mb-2">Candidate Name</label>
              <input
                value={form?.name ?? ""}
                onChange={(e) => form && setForm({ ...form, name: e.target.value })}
                className="
                  w-full h-11 px-4 rounded-lg 
                  bg-transparent text-white 
                  border border-slate-600 
                  placeholder:text-slate-400 
                  focus:outline-none focus:border-slate-500
                "
                placeholder="John Doe"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] leading-5 font-medium text-slate-200 mb-2">Email</label>
                <input
                  value={form?.email ?? ""}
                  onChange={(e) => form && setForm({ ...form, email: e.target.value })}
                  className="
                    w-full h-11 px-4 rounded-lg 
                    bg-transparent text-white 
                    border border-slate-600 
                    placeholder:text-slate-400 
                    focus:outline-none focus:border-slate-500
                  "
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-[13px] leading-5 font-medium text-slate-200 mb-2">Phone</label>
                <input
                  value={form?.phone ?? ""}
                  onChange={(e) => form && setForm({ ...form, phone: e.target.value })}
                  className="
                    w-full h-11 px-4 rounded-lg 
                    bg-transparent text-white 
                    border border-slate-600 
                    placeholder:text-slate-400 
                    focus:outline-none focus:border-slate-500
                  "
                  placeholder="05324343324"
                  inputMode="tel"
                />
              </div>
            </div>

            {/* Group + Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] leading-5 font-medium text-slate-200 mb-2">Group</label>
                <div className="relative">
                  <select
                    value={form?.group ?? ""}
                    onChange={(e) => form && setForm({ ...form, group: e.target.value })}
                    className="
                      w-full h-11 pl-4 pr-10 rounded-lg 
                      bg-transparent text-white 
                      border border-slate-600 
                      focus:outline-none focus:border-slate-500
                      appearance-none
                    "
                  >
                    {groupOptions.map((g) => (
                      <option key={g} value={g} className="bg-slate-900 text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                    ▾
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] leading-5 font-medium text-slate-200 mb-2">Status</label>
                <div className="relative">
                  <select
                    value={form?.status ?? "Active"}
                    onChange={(e) => form && setForm({ ...form, status: e.target.value as "Active" | "Inactive" })}
                    className="
                      w-full h-11 pl-4 pr-10 rounded-lg 
                      bg-transparent text-white 
                      border border-slate-600 
                      focus:outline-none focus:border-slate-500
                      appearance-none
                    "
                  >
                    <option value="Active" className="bg-slate-900 text-white">
                      Active
                    </option>
                    <option value="Inactive" className="bg-slate-900 text-white">
                      Inactive
                    </option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                    ▾
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 mt-7">
            <button
              onClick={() => onOpenChange(false)}
              className="
                h-11 px-5 rounded-md 
                border border-slate-500 text-slate-200 
                hover:bg-white/5 transition
                text-sm font-medium
              "
            >
              Cancel
            </button>
            <GradientButton onClick={handleSave} className="h-11 px-6 text-sm font-semibold">
              Save
            </GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
