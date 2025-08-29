export interface Question {
  id: string | number
  question: string
  type: string
  difficulty: "Easy" | "Medium" | "Hard"
  marks: number
  status: "Published" | "Draft"
}

export interface QuestionSectionModalProps {
  isOpen: boolean
  onClose: () => void
  topicName?: string
}
