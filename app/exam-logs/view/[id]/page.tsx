import { StudentExamLogsView } from "@/components/exam-logs/student-exam-logs-view"
import { mockStudentData } from "@/data/exam-logs"

export default function ExamLogsViewPage({ params }: { params: { id: string } }) {
  const student = mockStudentData.find((s) => s.id === params.id)
  return (
    <div className="p-4">
      <StudentExamLogsView student={student} />
    </div>
  )
}
