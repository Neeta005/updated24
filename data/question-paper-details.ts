export type SelectionMethod = "manual" | "random"
export type Level = "Easy" | "Medium" | "Hard"

export interface QuestionItem {
  id: string
  text: string
  type: "MCQs" | "True / False" | "Short"
  marks: number
  checked: boolean
}

export interface SubjectSection {
  id: string
  name: string
  percentage: number
  level: Level
  selection: SelectionMethod
  questions: QuestionItem[]
}

export const questionPaperDetails: SubjectSection[] = [
  {
    id: "fundamentals",
    name: "Fundamentals of Programming",
    percentage: 25,
    level: "Easy",
    selection: "manual",
    questions: [
      {
        id: "f-q1",
        text: "Which of the following best describes 'Visual Hierarchy' in UI design?",
        type: "MCQs",
        marks: 5,
        checked: true,
      },
      {
        id: "f-q2",
        text: "Consistency in UI design improves user learning and reduces cognitive load.",
        type: "True / False",
        marks: 5,
        checked: true,
      },
      { id: "f-q3", text: "Short answer on variables and data types.", type: "Short", marks: 5, checked: false },
      { id: "f-q4", text: "What is the output of x=5; y=2; print(x // y)?", type: "MCQs", marks: 5, checked: true },
      {
        id: "f-q5",
        text: "Name three data types commonly used in programming.",
        type: "Short",
        marks: 5,
        checked: false,
      },
    ],
  },
  {
    id: "networking",
    name: "Networking",
    percentage: 25,
    level: "Easy",
    selection: "random",
    questions: [
      {
        id: "n-q1",
        text: "Which layer is responsible for end-to-end communication and error handling?",
        type: "MCQs",
        marks: 5,
        checked: true,
      },
      { id: "n-q2", text: "Explain the difference between TCP and UDP.", type: "Short", marks: 5, checked: false },
      {
        id: "n-q3",
        text: "Two-Factor Authentication adds an extra layer of security beyond just a password.",
        type: "True / False",
        marks: 5,
        checked: true,
      },
      {
        id: "n-q4",
        text: "Role of IDS (Intrusion Detection Systems) in network security.",
        type: "Short",
        marks: 5,
        checked: false,
      },
    ],
  },
]
