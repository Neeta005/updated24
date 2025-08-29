import { EditSyllabus } from "@/components/syllabus/edit-syllabus"

export default async function EditSyllabusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="flex-1">
      <EditSyllabus syllabusId={id} />
    </main>
  )
}
