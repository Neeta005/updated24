import EditQuestionForm from "@/components/edit-question/edit-question-form"

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="p-6">
      <EditQuestionForm questionId={id} />
    </div>
  )
}
