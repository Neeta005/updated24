export const defaultAddMcq = {
  question: "Which of the following best describes “Visual Hierarchy” in UI design",
  options: [
    "Using random colors to make UI attractive",
    "Organizing elements to guide the user’s attention",
    "Adding animations to every UI element",
    "Using only black and white colors",
  ],
  selectedIndex: 1 as number,
  subject: "Design",
  topic: "UI Design",
  type: "MCQS",
  difficulty: "Easy" as "Easy" | "Medium" | "Hard",
  status: "Draft" as "Draft" | "Published",
  marks: "05",
  subjectOptions: ["Design", "Development", "Security"],
  topicOptions: ["UI Design", "UX Patterns", "Accessibility"],
  typeOptions: ["MCQS", "True/False", "Short Answer"],
}
