import { Trash2 } from "lucide-react"

export interface MappedQuestion {
  id: string
  question: string
  type: string
  difficulty: "Easy" | "Medium" | "Hard"
  marks: number
  status: "Published" | "Draft"
}

interface MappedQuestionRowProps {
  question: MappedQuestion
}

export function MappedQuestionRow({ question }: MappedQuestionRowProps) {
  return (
    <>
      <div className="col-span-5 text-white text-sm">{question.question}</div>
      <div className="col-span-2 text-gray-300 text-sm">{question.type}</div>
      <div
        className={`col-span-2 text-xs px-2 py-1 rounded-lg font-medium text-center ${
          question.difficulty === "Easy"
            ? "bg-green-500/20 text-green-400"
            : question.difficulty === "Medium"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
        }`}
      >
        {question.difficulty}
      </div>
      <div className="col-span-1 text-white text-sm">{question.marks}</div>
      <div
        className={`w-fit text-xs px-3 py-1 rounded-full font-medium ${
          question.status === "Published" ? "bg-green-500/20 text-green-500" : "bg-purple-500/20 text-purple-500"
        }`}
      >
        {question.status}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <button className="p-1.5 rounded-md border border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </>
  )
}
