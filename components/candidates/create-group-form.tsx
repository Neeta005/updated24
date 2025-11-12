"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GradientButton } from "@/components/ui/gradient-button"
import { TabButton } from "@/components/ui/tab-button"
import { Edit3, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import ImportCsvCandidatesBulkModal from "@/components/modals/import-csv-candidates-bulk-modal"
import Image from "next/image"

export function CreateGroupForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("manual")
  const [groupName, setGroupName] = useState("")
  const [audience, setAudience] = useState("Students & Fresher")
  const [description, setDescription] = useState("")
  const [candidateName, setCandidateName] = useState("")
  const [candidateEmail, setCandidateEmail] = useState("")
  const [candidatePhone, setCandidatePhone] = useState("")
  const [candidates, setCandidates] = useState<Array<{ name: string; email: string; phone: string }>>([])
  const [bulkContactList, setBulkContactList] = useState("")
  const [bulkImportOpen, setBulkImportOpen] = useState(false)

  const [editOpen, setEditOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  })

  const addCandidate = () => {
    if (!candidateName || !candidateEmail || !candidatePhone) return
    setCandidates((prev) => [...prev, { name: candidateName, email: candidateEmail, phone: candidatePhone }])
    setCandidateName("")
    setCandidateEmail("")
    setCandidatePhone("")
  }

  const deleteCandidate = (index: number) => {
    setCandidates((prev) => prev.filter((_, i) => i !== index))
  }

  const countContacts = () => {
    if (!bulkContactList.trim()) return 0
    return bulkContactList.split("\n").filter((line) => line.trim()).length
  }

  const clearAllContacts = () => {
    setBulkContactList("")
  }

  const onEdit = (idx: number) => {
    const c = candidates[idx]
    if (!c) return
    setEditForm({ name: c.name, email: c.email, phone: c.phone })
    setEditIndex(idx)
    setEditOpen(true)
  }

  const onCloseEdit = (open: boolean) => {
    setEditOpen(open)
    if (!open) setEditIndex(null)
  }

  const saveEdit = () => {
    if (editIndex === null) return
    setCandidates((prev) => prev.map((c, i) => (i === editIndex ? { ...c, ...editForm } : c)))
    setEditOpen(false)
    setEditIndex(null)
  }

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Create New Group</h1>
        <GradientButton size="md" disabled>
          Create New Group
        </GradientButton>
      </div>

      {/* Tabs */}
      <div className="w-full bg-slate-800 p-2 mb-6 rounded-md">
        <div className="flex gap-2">
          <TabButton active={activeTab === "manual"} onClick={() => setActiveTab("manual")} position="left">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/manual outline 1.png" // 🧩 your icon path in public folder
                alt="Manual Icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <span>Manual Entry</span>
            </div>
          </TabButton>

          <TabButton active={activeTab === "bulk"} onClick={() => setActiveTab("bulk")} position="right">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/bulk outliine 1.png" // 🧩 your icon path in public folder
                alt="Bulk Import Icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <span>Bulk Import</span>
            </div>
          </TabButton>
        </div>
      </div>

      {/* Manual Entry */}
      {activeTab === "manual" && (
        <>
          <div className="bg-card border border-slate-700 rounded-xl p-5 space-y-5">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Image
                src="/icons/manual outline 1.png" // simple icon from public folder
                alt="Manual Icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <span>Manual Entry</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Group Name</label>
                <input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Python & Development"
                  className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Target Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none"
                >
                  <option>Students & Fresher</option>
                  <option>Experienced</option>
                  <option>Mixed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Candidate List */}
          <div className="bg-card border border-slate-700 rounded-xl p-5 mt-6">
            <div className="text-white font-semibold mb-4">Candidates List</div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Full Name</label>
                <input
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter Full Name"
                  className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Email Address</label>
                <input
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  type="email"
                  className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Phone Number</label>
                <input
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  type="tel"
                  className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Add Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={addCandidate}
                className="px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90"
              >
                + Add Candidate
              </button>
            </div>

            <hr className="my-6 border-slate-700" />

            {/* Empty State or Table */}
            {candidates.length === 0 ? (
              <div className="py-14 text-center space-y-4">
                <div className="mx-auto flex items-center justify-center">
                  <img src="/icons/canddidate 1.png" alt="No Candidates" className="h-20 w-20 opacity-80" />
                </div>
                <p className="text-white/90 text-base font-medium">No Candidates!</p>
                <p className="text-slate-400 text-sm">Add some candidates to view here</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-md border border-slate-800">
                <table className="w-full text-sm">
                  <thead className="bg-black">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {candidates.map((c, idx) => (
                      <tr key={idx} className="bg-[#0f1d30] hover:bg-[#152538] transition-colors">
                        <td className="px-6 py-4 text-white">{c.name}</td>
                        <td className="px-6 py-4 text-slate-300">{c.email}</td>
                        <td className="px-6 py-4 text-slate-300">{c.phone}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => deleteCandidate(idx)}
                              className="p-2 border border-pink-500 text-pink-500 hover:bg-pink-500/10 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onEdit(idx)}
                              className="p-2 border border-orange-500 text-orange-500 hover:bg-orange-500/10 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Edit Candidate Modal */}
          <Dialog open={editOpen} onOpenChange={onCloseEdit}>
            <DialogContent className="max-w-2xl bg-[#0b1626] text-white border border-slate-700 rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">Edit Candidate</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">Candidate Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="johndoe@gmail.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="05324343324"
                      className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex justify-end gap-3">
                <DialogClose asChild>
                  <button
                    onClick={() => onCloseEdit(false)}
                    className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90"
                >
                  Save
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}

      {/* Bulk Import */}
      {activeTab === "bulk" && (
        <>
          {/* Bulk Import Form */}
          <div className="bg-card border border-slate-700 rounded-xl p-5 space-y-5">
            <div className="text-white font-semibold">Bulk Import</div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Group Name</label>
                <input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Python & Development"
                  className="w-full px-3 py-2 rounded-md border border-slate-600  text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Target Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-600  text-white focus:outline-none"
                >
                  <option>Students & Fresher</option>
                  <option>Experienced</option>
                  <option>Mixed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-slate-600  text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Candidates Data */}
          <div className="bg-card border border-slate-700 rounded-xl p-5 mt-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-white font-semibold">Candidates Data</div>
              <button
                onClick={() => setBulkImportOpen(true)}
                className="px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 flex items-center gap-2"
              >
                <Image
                  src="/icons/uploadicon.png" // replace with your actual icon path in public folder
                  alt="Import CSV Icon"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span>Import CSV</span>
              </button>
            </div>

            {/* Format Instructions */}
            <div className="bg-slate-800 rounded-lg p-4 space-y-3">
              <div className="text-slate-300 font-medium">Format Instructions:</div>
              <div className="text-slate-400 text-sm">
                <span className="font-medium">Format:</span> Name, Email Phone (One Candidate per line)
              </div>
              <div className="text-slate-400 text-sm">Example:</div>
              <div className="bg-slate-900 rounded p-3 space-y-1 font-mono text-sm">
                <div className="text-green-400">John Doe, johndoe@gmail.com, 0243 342 345</div>
                <div className="text-green-400">John Doe, johndoe@gmail.com, 0243 342 345</div>
                <div className="text-green-400">John Doe, johndoe@gmail.com, 0243 342 345</div>
              </div>
            </div>

            {/* Contact List */}
            <div className="mt-5">
              <label className="block text-slate-300 text-sm mb-2">Contact List</label>
              <textarea
                value={bulkContactList}
                onChange={(e) => setBulkContactList(e.target.value)}
                placeholder="Enter contact in the format: Name, Email, Phone (one per line)"
                rows={6}
                className="w-full px-3 py-2 rounded-md border border-slate-600  text-white placeholder-slate-400 focus:outline-none font-mono text-sm"
              />
              <div className="text-slate-500 text-sm mt-2">{countContacts()} contact detected</div>
            </div>

            {/* Clear All Button */}
            <div className="mt-5">
              <button
                onClick={clearAllContacts}
                className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </>
      )}

      {/* Import CSV Modal */}
      <ImportCsvCandidatesBulkModal
        open={bulkImportOpen}
        onOpenChange={(o) => setBulkImportOpen(o)}
        onComplete={() => {
          // Keep user on the same page and ensure Bulk tab remains active per requirement
          setActiveTab("bulk")
          setBulkImportOpen(false)
        }}
      />

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-md border border-slate-600 text-slate-200 hover:bg-slate-800"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-md border border-slate-600  hover:bg-gray-100 flex items-center gap-2">
            <Image src="/icons/Save (1).png" width={16} height={16} className="object-contain" alt={""} />
            <span>Save as Draft</span>
          </button>

          <button className="px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90">
            + Create Group
          </button>
        </div>
      </div>
    </main>
  )
}
