"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Plus } from "lucide-react"
import { QUESTION_PAPER_ROUTES } from "@/data/question-papers-pages"

export default function CreateForm() {
  const router = useRouter()
  const [title, setTitle] = useState("Programming Fundamentals")
  const [totalQuestions, setTotalQuestions] = useState<number | "">(50)
  const [totalMarks, setTotalMarks] = useState<number | "">(50)
  const [audience, setAudience] = useState("Students & Fresher")
  const [description, setDescription] = useState("Design")
  
  // State to manage builder rows - START WITH 2 ROWS
  const [builderRows, setBuilderRows] = useState([
    { id: 1, method: "Manual" }, 
    { id: 2, method: "Manual" }
  ])

  // Function to add new row
  const addRow = () => {
    const newId = builderRows.length > 0 ? Math.max(...builderRows.map(r => r.id)) + 1 : 1
    setBuilderRows([...builderRows, { id: newId, method: "Manual" }])
  }

  // Function to toggle method between Manual and Random
  const toggleMethod = (id: number) => {
    setBuilderRows(builderRows.map(row => 
      row.id === id 
        ? { ...row, method: row.method === "Manual" ? "Random" : "Manual" }
        : row
    ))
  }

  return (
    <main className="flex-1 p-6">
      <div className="rounded-2xl bg-card border border-slate-700 p-4 md:p-6 space-y-6">
        <h1 className="text-white text-2xl font-semibold">Create Question Paper</h1>

        {/* Form */}
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-slate-300 text-sm">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-transparent border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm">Total Questions</span>
              <input
                type="number"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-transparent border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm">Target Audience</span>
              <div className="relative">
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="appearance-none w-full px-4 py-2.5 pr-10 bg-transparent border border-slate-500 rounded-lg text-white focus:outline-none focus:border-white"
                >
                  <option className="bg-slate-900 text-white">Students & Fresher</option>
                  <option className="bg-slate-900 text-white">DevOps</option>
                  <option className="bg-slate-900 text-white">Graphic Designers</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-slate-300 text-sm">Total Marks</span>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-transparent border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-slate-300 text-sm">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-transparent border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white"
            />
          </label>
        </div>

        {/* Subject/Topic Section */}
        <div className="rounded-xl border border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-black px-4 py-3 grid grid-cols-12 gap-2 text-white text-sm">
            <div className="col-span-3">Subject</div>
            <div className="col-span-3">Topic</div>
            <div className="col-span-2">Level</div>
            <div className="col-span-1 text-center">Questions</div>
            <div className="col-span-1 text-center">Marks</div>
            <div className="col-span-2">Method</div>
          </div>

          {/* Example Row */}
          <div className="px-4 py-4 grid grid-cols-12 gap-2 items-center text-slate-300 border-t border-slate-700 bg-slate-800/90">
            <div className="col-span-3 font-semibold text-white">Fundamentals of Programming</div>
            <div className="col-span-3">
              <ul className="list-disc marker:text-slate-400 pl-4 space-y-1 text-sm">
                <li>Basic Syntax</li>
                <li>Loops & Control</li>
              </ul>
            </div>
            <div className="col-span-2">
              <span className="inline-flex items-center rounded-md bg-green-700/30 text-green-400 px-2 py-1 text-xs font-medium">
                Easy
              </span>
            </div>
            <div className="col-span-1 text-center text-white">25%</div>
            <div className="col-span-1 text-center text-white">25%</div>
            <div className="col-span-2 flex items-center gap-2">
              {/* Manual pill */}
              <span className="inline-flex items-center gap-1.5 bg-slate-700/50 px-2 py-1.5 rounded-full text-slate-200 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <img src="/icons/Knob.png" alt="Manual Icon" className="h-3 w-3 object-contain" />
                </span>
                Manual
              </span>

              {/* Edit button */}
              <button className="flex items-center justify-center w-[34px] h-[34px] rounded-md p-[1px] bg-gradient-to-r from-[#F05921] to-[#CE2D52]">
                <div className="flex items-center justify-center w-full h-full rounded-md bg-black">
                  <img src="/icons/edit-2.png" alt="Edit" className="w-4 h-4 object-contain" />
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Builder Rows */}
          {builderRows.map((row) => (
            <div key={row.id} className="px-4 py-4 grid grid-cols-12 gap-2 items-center border-t border-slate-700 bg-slate-800/90">
              {/* Search */}
              <div className="col-span-3">
                <input
                  placeholder="Search Subject"
                  className="w-full px-3 py-2 bg-transparent border border-slate-500 rounded-3xl text-white placeholder-slate-400 focus:outline-none focus:border-white text-sm"
                />
              </div>

              {/* Select Topic */}
              <div className="col-span-3">
                <div className="relative">
                  <select className="appearance-none w-full px-3 py-2 pr-8 bg-transparent border border-slate-500 rounded-lg text-white focus:outline-none focus:border-white text-sm">
                    <option className="bg-slate-900 text-white">Select Topic(s)</option>
                    <option className="bg-slate-900 text-white">Basic Syntax</option>
                    <option className="bg-slate-900 text-white">Loops & Control</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </div>

              {/* Level */}
              <div className="col-span-2">
                <div className="relative">
                  <select className="appearance-none w-full px-3 py-2 pr-8 bg-transparent border border-slate-500 rounded-lg text-white focus:outline-none focus:border-white text-sm">
                    <option className="bg-slate-900 text-white">Level</option>
                    <option className="bg-slate-900 text-white">Easy</option>
                    <option className="bg-slate-900 text-white">Medium</option>
                    <option className="bg-slate-900 text-white">Hard</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </div>

              {/* % */}
              <div className="col-span-1">
                <input
                  placeholder="%"
                  className="w-full px-2 py-2 bg-transparent border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white text-center text-sm"
                />
              </div>

              {/* Marks % */}
              <div className="col-span-1">
                <input
                  placeholder="Marks %"
                  className="w-full px-1 py-2 bg-transparent border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-white text-center text-xs"
                />
              </div>

              {/* Method column with Manual/Random toggle and Save button */}
              <div className="col-span-2 flex items-center gap-2">
                <button
                  onClick={() => toggleMethod(row.id)}
                  className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full text-slate-200 text-sm transition-all cursor-pointer ${
                    row.method === "Manual" ? "bg-slate-700/50 hover:bg-slate-600/50" : "bg-green-700/50 hover:bg-green-600/50"
                  }`}
                >
                  {row.method === "Manual" ? (
                    <>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        <img src="/icons/Knob.png" alt="Method Icon" className="h-3 w-3 object-contain" />
                      </span>
                      {row.method}
                    </>
                  ) : (
                    <>
                      {row.method}
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        <img src="/icons/Knob.png" alt="Method Icon" className="h-3 w-3 object-contain" />
                      </span>
                    </>
                  )}
                </button>
                <button className="flex items-center justify-center w-[34px] h-[34px] rounded-md border border-pink-500">
                  <div className="flex items-center justify-center w-full h-full rounded-md bg-black">
                    <img src="/icons/Save.png" alt="Save" className="w-4 h-4 object-contain" />
                  </div>
                </button>
              </div>
            </div>
          ))}

          {/* Add Row (aligned bottom right) */}
          <div className="px-4 pb-4 border-t border-slate-700 pt-4 bg-slate-800/90">
            <div className="flex justify-end">
              <button 
                onClick={addRow}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-primary to-red-primary px-3 py-2 text-white min-w-[40px] min-h-[40px]"
              >
                <Plus size={20} className="stroke-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => router.push("/question-papers")}
            className="px-4 py-2 rounded-lg bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={() => router.push(QUESTION_PAPER_ROUTES.details)}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-primary to-red-primary text-white"
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  )
}