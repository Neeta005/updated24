"use client"

import { useState } from "react"
import Image from "next/image"
import { StatusBadge } from "../ui/status-badge"
import { Tag } from "../ui/tag"
import { useRouter } from "next/navigation"

interface QuestionPaperCardProps {
  id: string
  title: string
  tags: Array<{ name: string; variant: "design" | "security" | "default" }>
  questionCount: number
  marks: number
  targetAudience: string
  isPublished: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onTogglePublish?: (id: string, published: boolean) => void
  onViewQuestions?: (id: string) => void
}

export function QuestionPaperCard({
  id,
  title,
  tags,
  questionCount,
  marks,
  targetAudience,
  isPublished,
  onEdit,
  onDelete,
  onTogglePublish,
  onViewQuestions,
}: QuestionPaperCardProps) {
  const router = useRouter()
  const [published, setPublished] = useState(isPublished)

  const handleTogglePublish = () => {
    const newPublished = !published
    setPublished(newPublished)
    onTogglePublish?.(id, newPublished)
  }

  return (
    <div className="bg-card rounded-lg border border-slate-600 p-3 hover:border-slate-500 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
  <label className="relative inline-flex items-center cursor-pointer select-none">
    <input
      type="checkbox"
      checked={published}
      onChange={handleTogglePublish}
      className="sr-only peer"
    />
    {/* Toggle background */}
    <div className="w-40 h-9 flex items-center justify-center bg-slate-700 rounded-full peer-checked:bg-green-600 transition-all duration-300 relative">
      {/* Text labels */}
      <span
        className={`absolute text-sm font-semibold text-white transition-all duration-300 ${
          published ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        Published
      </span>
      <span
        className={`absolute text-sm font-semibold text-white transition-all duration-300 ${
          published ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
      >
        Unpublished
      </span>

      {/* Thumb (circle) */}
      <div
        className={`absolute left-1 top-1 bg-white w-7 h-7 rounded-full shadow-md transition-transform duration-300 ${
          published ? "translate-x-[120px]" : "translate-x-0"
        }`}
      />
    </div>
  </label>
</div>


        <div className="flex items-center">
          {/* 🔹 Edit Button with Custom Image */}
          <button
            onClick={() => onEdit?.(id)}
            className=" hover:bg-slate-700 rounded-md transition-colors"
          >
            <Image
              src="\icons\Frame 1618874043 (1).png" // 👈 your image in public folder
              alt="Edit"
              width={28}
              height={28}
              className="opacity-70 hover:opacity-100"
            />
          </button>

          {/* 🔹 Delete Button with Custom Image */}
          <button
            onClick={() => (onDelete ? onDelete(id) : router.push(`/question-papers/delete?id=${id}`))}
            className="p-2 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <Image
              src="\icons\Frame 1618874044.png" // 👈 your image in public folder
              alt="Delete"
              width={40}
              height={40}
              className="opacity-70 hover:opacity-100"
            />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white text-lg font-semibold mb-4 truncate">{title}</h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag, index) => (
          <Tag key={index} variant={tag.variant} className="text-sm px-2 py-1">
            {tag.name}
          </Tag>
        ))}
      </div>

      {/* Stats */}
      <div className="space-y-1.5 mb-4">
        <div className="text-white text-center">
          <span className="text-md">{questionCount}</span>
          <span className="text-white ml-1 text-sm">Question</span>
        </div>
        <div className="text-white text-center">
          <span className="text-md">{marks}</span>
          <span className=" ml-1 text-sm">Marks</span>
        </div>
      </div>

      {/* Target Audience */}
      <p className="text-white text-center mb-4 text-sm truncate">{targetAudience}</p>

      {/* Action Button */}
      <button
        onClick={() => onViewQuestions?.(id)}
        className="w-full text-white py-2.5 px-5 rounded font-semibold transition-colors text-base bg-gradient-to-r from-orange-600 to-rose-600 hover:from-rose-600 hover:to-orange-600"
      >
        View Questions
      </button>
    </div>
  )
}
