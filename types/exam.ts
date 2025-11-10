export interface StudentData {
  id: string
  name: string
  status: "completed" | "in-progress"
  duration: string
  violations: number
  focusScore: number
  seatedTime: number
}

export interface Question {
  id: string
  sr: number
  question: string
  type: string
  difficulty: "Easy" | "Medium" | "Hard"
  marks: number
  status: "Draft" | "Published"
}

export interface Option {
  id: string
  text: string
  isCorrect: boolean
}

export interface Exam {
  id: string
  title: string
  course: string
  subject: string
  date: string
  time: string
  marks: number
  passingPercentage: number
}
