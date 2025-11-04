export interface ExamItem {
  id: string
  title: string
  tags: string[]
  schedule: string
  duration: string
  status: "today" | "upcoming" | "completed"
}

export interface SkillItem {
  id: string
  name: string
  rating: number
  progress: number
}

export interface ViolationItem {
  id: string
  type: string
  count: number
}

export interface PerformanceDataPoint {
  day: string
  line1: number
  line2: number
}

// Performance graph data
export const performanceGraphData: PerformanceDataPoint[] = [
  { day: "Sun", line1: 3, line2: 2 },
  { day: "Mon", line1: 4, line2: 3 },
  { day: "Tue", line1: 5, line2: 4 },
  { day: "Wed", line1: 7, line2: 6 },
  { day: "Thu", line1: 9, line2: 8 },
  { day: "Fri", line1: 11, line2: 10 },
]

// Today's exams
export const todayExams: ExamItem[] = [
  {
    id: "1",
    title: "Fundamentals of Programming",
    tags: ["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"],
    schedule: "12-01-2023",
    duration: "9:40 pm",
    status: "today",
  },
  {
    id: "2",
    title: "Advanced Web Development",
    tags: ["Frontend", "React", "JavaScript"],
    schedule: "12-02-2023",
    duration: "2:00 pm",
    status: "today",
  },
]

// Skills learned
export const skillsData: SkillItem[] = [
  { id: "1", name: "Mobile app UI/UX design", rating: 4, progress: 80 },
  { id: "2", name: "Interaction Design", rating: 4, progress: 80 },
  { id: "3", name: "Responsive web design", rating: 4, progress: 80 },
  { id: "4", name: "User research", rating: 4, progress: 80 },
  { id: "5", name: "Information Architecture", rating: 1, progress: 20 },
  { id: "6", name: "Information Architecture", rating: 1, progress: 20 },
]

// Exam violations
export const violationsData: ViolationItem[] = [
  { id: "1", type: "Tab Switch", count: 9 },
  { id: "2", type: "Opened Other Applications", count: 3 },
  { id: "3", type: "Unavailable On Seat", count: 4 },
  { id: "4", type: "Multiple Faces Found", count: 6 },
  { id: "5", type: "Noise Detected", count: 5 },
]
