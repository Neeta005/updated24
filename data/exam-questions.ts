export interface ExamQuestion {
  id: number
  number: number
  text: string
  options: {
    id: string
    text: string
  }[]
  selectedAnswer?: string | null
  isBookmarked?: boolean
}

export interface ExamSession {
  id: string
  title: string
  subject: string
  topic: string
  totalQuestions: number
  duration: number
  startTime: string
  questions: ExamQuestion[]
}

export const examSession: ExamSession = {
  id: "exam-001",
  title: "Mathematics",
  subject: "Designing",
  topic: "Technology",
  totalQuestions: 30,
  duration: 60,
  startTime: "8th July 2022, 8:30pm",
  questions: [
    {
      id: 1,
      number: 1,
      text: "What is the purpose of HDR technology?",
      options: [
        { id: "a", text: "To reduce the file size of images and videos." },
        { id: "b", text: "To speed up 3D rendering performance." },
        { id: "c", text: "To support higher video resolutions." },
        { id: "d", text: "To display more colors in images and videos" },
      ],
      selectedAnswer: null,
      isBookmarked: false,
    },
    {
      id: 2,
      number: 2,
      text: "Which programming language is known for its use in web development?",
      options: [
        { id: "a", text: "Python" },
        { id: "b", text: "JavaScript" },
        { id: "c", text: "Java" },
        { id: "d", text: "C++" },
      ],
      selectedAnswer: null,
      isBookmarked: false,
    },
    {
      id: 3,
      number: 3,
      text: "What is the capital of France?",
      options: [
        { id: "a", text: "London" },
        { id: "b", text: "Berlin" },
        { id: "c", text: "Paris" },
        { id: "d", text: "Madrid" },
      ],
      selectedAnswer: null,
      isBookmarked: false,
    },
  ],
}
