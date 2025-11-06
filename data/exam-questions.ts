export interface ExamQuestion {
  id: number
  number: number
  type: "mcq" | "essay"
  text: string
  imageUrl?: string
  codeSnippet?: string
  codeLanguage?: string
  options?: {
    id: string
    text: string
  }[]
  selectedAnswer?: string | null
  answerText?: string
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
      type: "mcq",
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
      type: "mcq",
      text: "Consider the following JavaScript code snippet:",
      codeSnippet: `let x = 5;
let y = 5;
console.log(x == y);
console.log(x === y);`,
      codeLanguage: "javascript",
      options: [
        { id: "a", text: "Introduction" },
        { id: "b", text: "Slang language" },
        { id: "c", text: "Body paragraphs" },
        { id: "d", text: "Conclusion" },
      ],
      selectedAnswer: null,
      isBookmarked: false,
    },
    {
      id: 3,
      number: 3,
      type: "mcq",
      text: "You are building a web application and want to store data on the user's browser that persists even after the browser is closed.\nThe data should be small (under 5MB) and readable only from the same origin.\nYou also need to retrieve the data quickly without server calls.\nWhich browser storage option should you use?",
      options: [
        {
          id: "a",
          text: "Cookies – Small pieces of data sent to the server with each request.\nNot ideal for storing larger data or for fast client-side retrieval",
        },
        {
          id: "b",
          text: "Session Storage – Stores data for one session only.\nData is lost when the browser tab is closed.",
        },
        {
          id: "c",
          text: "Local Storage – Stores key-value pairs on the client side.\nPersists even after the browser is closed and supports up to 5MB",
        },
        {
          id: "d",
          text: "IndexedDB – A low-level API for storing large structured data.\nMore complex and suitable for larger applications",
        },
      ],
      selectedAnswer: null,
      isBookmarked: false,
    },
    {
      id: 4,
      number: 4,
      type: "essay",
      text: "In software development, writing clean, readable, and maintainable code is essential, especially when working in teams.\nDiscuss the concept of Clean Code in programming. Why is it important? What are some common principles or practices followed to ensure clean code in a project?\nInclude specific examples and best practices such as naming conventions, comments, and functions.\nYour answer should also touch on the consequences of writing poor-quality code in collaborative environments.",
      codeSnippet: `let x = 5;
let y = 5;
console.log(x == y);
console.log(x === y);`,
      codeLanguage: "javascript",
      answerText: "",
      isBookmarked: false,
    },
  ],
}
