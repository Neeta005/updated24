import type { ResultsData } from "@/data/results-data"

interface ResultsDetailsTableProps {
  data: ResultsData
}

export function ResultsDetailsTable({ data }: ResultsDetailsTableProps) {
  return (
    <div className="mt-8 space-y-6">
      {data.subjectPerformance.map((subject) => (
        <div key={subject.subject}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white font-semibold text-sm flex items-center gap-2">{subject.subject}</span>
          </div>

          <div className="overflow-x-auto border border-slate-700 rounded-lg">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Topic Name</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-medium">no. of Questions</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-medium">Correct Answers</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-medium">Incorrect</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-medium">Skipped</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subject.topics.map((topic, idx) => (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-gray-300">{topic.name}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{topic.totalQuestions}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{topic.correctAnswers}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{topic.incorrectAnswers}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{topic.skipped}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2.5 py-1 rounded text-white font-semibold ${
                          topic.gradeColor === "blue"
                            ? "bg-blue-900"
                            : topic.gradeColor === "orange"
                              ? "bg-orange-900"
                              : topic.gradeColor === "green"
                                ? "bg-green-900"
                                : topic.gradeColor === "yellow"
                                  ? "bg-yellow-900"
                                  : "bg-red-900"
                        }`}
                      >
                        {topic.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
