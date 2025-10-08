"use client"

import { useState } from "react"
import { ArrowLeft, Upload, Download, Plus, Search, Edit3, Trash2 } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { GradientButton } from "@/components/ui/gradient-button"
import Image from "next/image"


interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  education: string
  experience: string
  status: "Active" | "Inactive"
}

const allCandidates: Candidate[] = [
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
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    phone: "0201-1234568",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mikej@gmail.com",
    phone: "0201-1234569",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarahw@gmail.com",
    phone: "0201-1234570",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tomb@gmail.com",
    phone: "0201-1234571",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emilyd@gmail.com",
    phone: "0201-1234572",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "7",
    name: "David Wilson",
    email: "davidw@gmail.com",
    phone: "0201-1234573",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisaa@gmail.com",
    phone: "0201-1234574",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
  {
    id: "9",
    name: "Robert Taylor",
    email: "robertt@gmail.com",
    phone: "0201-1234575",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Inactive",
  },
  {
    id: "10",
    name: "Jennifer Moore",
    email: "jennifermoore@gmail.com",
    phone: "0201-1234576",
    education: "B.Sc. Computer Science",
    experience: "2 yrs",
    status: "Active",
  },
]

export function GroupView() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(allCandidates.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCandidates = allCandidates.slice(startIndex, endIndex)

  return (
    <main className="flex-1 p-8 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-white">View Group</h1>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-transparent border border-white/50 text-slate-300 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            Back
          </button>
         <label className="px-5 py-2.5 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm cursor-pointer border border-slate-300">
        <Image
          src="/icons/import.png" // replace with your public folder image
          alt="Upload Icon"
          width={16}
          height={16}
        />
        Bulk Import
       
      </label>
        <GradientButton className="flex items-center gap-2 text-sm">
  <Image
    src="/icons/export (1).png" // put your icon in public/icons/
    alt="Download"
    width={16}
    height={16}
  />
  Export Candidates
</GradientButton>

        </div>
      </div>

      {/* Group Info Card */}
      <div className="bg-card rounded-lg p-6 mb-8 relative border border-slate-800">
     <button className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-md transition-colors">
  <Image
    src="/icons/edit-2.png" // put your icon in public/icons/
    alt="Edit"
    width={30} // adjust size as needed
    height={30}
  />
</button>

        <div>
          <h2 className="text-xl font-medium text-white mb-2">Python Developers</h2>
          <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-xs rounded font-medium mb-4">
            Coding & Development
          </span>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-3xl">
            Lorem ipsum dolor sit amet consectetur. Eget ultrices varius potenti mauris
            aliquet. Mi adipiscing lectus justo ut adipiscing a nullam.
          </p>

          {/* Stats section */}
          <div className="flex gap-3">
            <div className="flex-1 border border-white/30 rounded-md p-3 text-center">
              <div className="text-xs text-slate-500 mb-1">Exams Taken</div>
              <div className="text-xl font-semibold text-white">02</div>
            </div>
            <div className="flex-1 border border-white/30 rounded-md p-3 text-center">
              <div className="text-xs text-slate-500 mb-1">Avg Score (Last Exam)</div>
              <div className="text-xl font-semibold text-white">78.3</div>
            </div>
            <div className="flex-1 border border-white/30 rounded-md p-3 text-center">
              <div className="text-xs text-slate-500 mb-1">Pass Rate (Last Exam)</div>
              <div className="text-xl font-semibold text-white">100</div>
            </div>
          </div>

          <div className="text-right text-slate-500 text-xs mt-3">
            Date Created: 08 Aug, 2025
          </div>
        </div>
      </div>

      {/* Candidates Section */}
      <div className="bg-card rounded-lg p-8 border border-slate-800">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-white">Candidates</h3>
          <button className="px-5 py-2.5 bg-transparent border border-slate-600 text-white rounded-md hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium">
            <Plus className="size-4" />
            Add Candidate
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-[#0a1525] border border-slate-500 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 text-sm"
            />
          </div>
          <select className="bg-[#0a1525] border border-slate-500 rounded-md px-4 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-slate-600">
            <option>Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="bg-[#0a1525] border border-slate-500 rounded-md px-4 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-slate-600">
            <option>Education: All</option>
            <option>B.Sc. Computer Science</option>
            <option>Other</option>
          </select>
        </div>

        {/* Candidates Table */}
        <div className="overflow-hidden rounded-md border border-slate-800">
          <table className="w-full">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Candidate Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Education</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {currentCandidates.map((candidate) => (
                <tr key={candidate.id} className="bg-[#0f1d30] hover:bg-[#152538] transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{candidate.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{candidate.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{candidate.phone}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{candidate.education}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{candidate.experience}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        candidate.status === "Active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 border border-pink-500 text-pink-500 hover:bg-pink-500/10 rounded-md transition-colors">
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          maxVisiblePages={5}
        />
      </div>
    </main>
  )
}
