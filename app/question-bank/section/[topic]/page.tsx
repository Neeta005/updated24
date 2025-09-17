import { QuestionSection } from "@/components/question-bank/question-section"

interface QuestionSectionPageProps {
  params: {
    topic: string
  }
}

export default function QuestionSectionPage({ params }: QuestionSectionPageProps) {
  const topicName = params.topic

  return (
    <QuestionSection 
      topicName={topicName} 
      backHref="/question-bank" 
    />
  )
}
