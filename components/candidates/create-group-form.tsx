"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { gradientButtonStyle } from "@/data/syllabus"
import { TabButton } from "@/components/ui/tab-button"
import { Edit3, Trash2 } from "lucide-react"

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
    return bulkContactList.split('\n').filter(line => line.trim()).length
  }

  const clearAllContacts = () => {
    setBulkContactList("")
  }

  return (
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Create New Group</h1>
        <button
          type="button"
          aria-disabled="true"
          className={`${gradientButtonStyle} px-4 py-2 text-white rounded-lg text-sm font-medium opacity-90`}
        >
          Create New Group
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full bg-slate-800 p-2 mb-6 rounded-md">
        <div className="flex gap-2">
          <TabButton active={activeTab === "manual"} onClick={() => setActiveTab("manual")} position="left">
            Manual Entry
          </TabButton>
          <TabButton active={activeTab === "bulk"} onClick={() => setActiveTab("bulk")} position="right">
            Bulk Import
          </TabButton>
        </div>
      </div>

      {/* Manual Entry */}
      {activeTab === "manual" && (
        <>
          <div className="bg-card border border-slate-700 rounded-xl p-5 space-y-5">
            <div className="text-white font-semibold">Manual Entry</div>

            <div className="grid md:grid-cols-2 gap-4">
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
                  <img
                    src="/icons/canddidate 1.png"
                    alt="No Candidates"
                    className="h-20 w-20 opacity-80"
                  />
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
                            <button className="p-2 border border-orange-500 text-orange-500 hover:bg-orange-500/10 rounded-md transition-colors">
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

          {/* Candidates Data */}
          <div className="bg-card border border-slate-700 rounded-xl p-5 mt-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-white font-semibold">Candidates Data</div>
              <button className="px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import CSV
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
                className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none font-mono text-sm"
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

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-md border border-slate-600 text-slate-200 hover:bg-slate-800"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-md border border-slate-600 bg-white text-black hover:bg-gray-100">
            Save as Draft
          </button>
          <button className="px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90">
            + Create Group
          </button>
        </div>
      </div>
    </main>
  )
}