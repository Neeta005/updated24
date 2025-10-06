import type { MenuItem } from "@/types"

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "/icons/dasboard2.png",
    href: "/dashboard",
    activeMatch: ["/", "/dashboard"],
  },
  {
    id: "syllabus",
    name: "Syllabus",
    icon: "/icons/Frame.png",
    href: "/syllabus",
    activeMatch: ["/syllabus"],
  },
  {
    id: "question-bank",
    name: "Question Bank",
    icon: "/icons/Frame (1).png",
    href: "/question-bank",
    activeMatch: ["/question-bank", "/edit-question"],
  },
  {
    id: "question-papers",
    name: "Question Papers",
    icon: "/icons/Frame (3).png",
    href: "/question-papers",
    activeMatch: ["/question-papers"],
  },
  {
    id: "candidates",
    name: "Candidates",
    icon: "/icons/Frame (4).png",
    href: "/candidates",
    activeMatch: ["/candidates"],
  },
  {
    id: "exams",
    name: "Exams",
    icon: "/icons/Frame (5).png",
    href: "/exams",
    activeMatch: ["/exams"],
  },
  {
    id: "results",
    name: "Results",
    icon: "/icons/Frame (6).png",
    href: "/results",
    activeMatch: ["/results"],
  },
  {
    id: "exam-logs",
    name: "Exam Logs",
    icon: "/icons/Frame (7).png",
    href: "/exam-logs",
    activeMatch: ["/exam-logs"],
  },
]
