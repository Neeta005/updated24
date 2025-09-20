"use client"
import { useState } from "react"
import { Upload, Plus, Search, ChevronUp } from "lucide-react"

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  education: string
  experience: string
  status: "Active" | "Inactive"
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "2",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "3",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "4",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "5",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "6",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "7",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "8",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "9",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "10",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0201-1234567",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
]

interface GroupEditProps {
  onBack: () => void
  onSave: () => void
}

export function GroupEdit({ onBack, onSave }: GroupEditProps) {
  const [groupInfoExpanded, setGroupInfoExpanded] = useState(true)

  return (
    // ✅ Changed from fixed overlay to regular main content that works with layout
    <main className="flex-1 p-6 bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Edit Group</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Save
          </button>
        </div>
      </div>

      {/* Group Info Section */}
      <div className="bg-slate-800 rounded-lg mb-6">
        <button
          onClick={() => setGroupInfoExpanded(!groupInfoExpanded)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <h2 className="text-lg font-semibold text-white">Group Info</h2>
          <ChevronUp
            className={`size-5 text-slate-400 transition-transform ${groupInfoExpanded ? "" : "rotate-180"}`}
          />
        </button>

        {groupInfoExpanded && (
          <div className="px-6 pb-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Group Name</label>
                <input
                  type="text"
                  defaultValue="Python Developers"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
                <select className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-slate-500">
                  <option>Python Developers</option>
                  <option>Java Developers</option>
                  <option>Frontend Developers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Group Description</label>
              <textarea
                rows={4}
                defaultValue="Lorem ipsum dolor sit amet consectetur. Eget ultrices varius potenti mauris aliquet. Mi adipiscing lectus justo ut adipiscing a nullam."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Candidates Section */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Candidates</h3>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2">
              <Upload className="size-4" />
              Bulk Import
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
              <Plus className="size-4" />
              Add Candidate
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 text-sm"
            />
          </div>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-slate-500">
            <option>Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-slate-500">
            <option>Education: All</option>
            <option>B.Sc. Computer Science</option>
            <option>Other</option>
          </select>
        </div>

        {/* Candidates Table */}
        <div className="overflow-hidden rounded-lg">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Candidate Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Education</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Experience</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-white">{candidate.name}</td>
                  <td className="px-6 py-4 text-slate-300">{candidate.email}</td>
                  <td className="px-6 py-4 text-slate-300">{candidate.phone}</td>
                  <td className="px-6 py-4 text-slate-300">{candidate.education}</td>
                  <td className="px-6 py-4 text-slate-300">{candidate.experience}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        candidate.status === "Active"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition-colors">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
            ← Prev
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">1</button>
            <button className="w-8 h-8 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
              2
            </button>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity">
            Next →
          </button>
        </div>
      </div>
    </main>
  )
}