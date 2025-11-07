export interface SubjectScoreItem {
  name: string
  grade: string
  gradeColor: string
}

export interface TopicDetailsItem {
  name: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  skipped: number
  grade: string
  gradeColor: string
}

export interface SubjectPerformanceItem {
  subject: string
  topics: TopicDetailsItem[]
}

export interface GradeRangeItem {
  grade: string
  range: string
  percentage: string
  color: string
}

export interface ResultsData {
  student: {
    name: string
    studentId: string
    field: string
    photoUrl: string
  }
  exam: {
    title: string
    course: string
    totalMarks: number
    totalScore: number
  }
  result: {
    time: string
    date: string
    status: string
    statusColor: string
  }
  studentGrade: string
  subjectScores: SubjectScoreItem[]
  subjectPerformance: SubjectPerformanceItem[]
  gradeRanges: GradeRangeItem[]
}

export const resultsData: ResultsData = {
  student: {
    name: "Raj Anadkat",
    studentId: "TIPS G5682",
    field: "Computer Science",
    photoUrl: "/student-profile.png",
  },
  exam: {
    title: "Fundamentals of Programming",
    course: "Course B.Tech Spcl. in Health Informatics",
    totalMarks: 50,
    totalScore: 32,
  },
  result: {
    time: "12:40 P.M",
    date: "03 Jan 2023",
    status: "Pass",
    statusColor: "green",
  },
  studentGrade: "A1",
  subjectScores: [
    { name: "Graphic Design", grade: "A1", gradeColor: "blue" },
    { name: "Web Development", grade: "A2", gradeColor: "orange" },
    { name: "Basic Computers", grade: "B1", gradeColor: "green" },
    { name: "Basic Science", grade: "B2", gradeColor: "yellow" },
  ],
  subjectPerformance: [
    {
      subject: "Graphic Design",
      topics: [
        {
          name: "Graphic Design Fundamentals",
          totalQuestions: 50,
          correctAnswers: 30,
          incorrectAnswers: 5,
          skipped: 5,
          grade: "A1",
          gradeColor: "blue",
        },
        {
          name: "UI/UX Design",
          totalQuestions: 50,
          correctAnswers: 30,
          incorrectAnswers: 5,
          skipped: 5,
          grade: "A1",
          gradeColor: "blue",
        },
        {
          name: "UI/UI Design System",
          totalQuestions: 50,
          correctAnswers: 30,
          incorrectAnswers: 5,
          skipped: 5,
          grade: "C1",
          gradeColor: "red",
        },
      ],
    },
    {
      subject: "Web Development",
      topics: [
        {
          name: "Graphic Design Fundamentals",
          totalQuestions: 50,
          correctAnswers: 30,
          incorrectAnswers: 5,
          skipped: 5,
          grade: "A2",
          gradeColor: "orange",
        },
        {
          name: "UI/UX Design",
          totalQuestions: 50,
          correctAnswers: 30,
          incorrectAnswers: 5,
          skipped: 5,
          grade: "A2",
          gradeColor: "orange",
        },
        {
          name: "UI/UI Design System",
          totalQuestions: 50,
          correctAnswers: 30,
          incorrectAnswers: 5,
          skipped: 5,
          grade: "C1",
          gradeColor: "red",
        },
      ],
    },
  ],
  gradeRanges: [
    { grade: "A1", range: "90% - 100%", percentage: "Excellent", color: "blue" },
    { grade: "A2", range: "70% - 80%", percentage: "Good", color: "orange" },
    { grade: "B1", range: "50% - 60%", percentage: "Average", color: "green" },
    { grade: "B2", range: "30% - 40%", percentage: "Below Average", color: "yellow" },
    { grade: "C1", range: "10% - 20%", percentage: "Fail", color: "red" },
  ],
}
