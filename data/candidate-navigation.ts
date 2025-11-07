import type { MenuItem } from "@/types"

export const candidateMenuItems: MenuItem[] = [
  {
    id: "home",
    name: "Home",
    icon: "/home-icon.jpg",
    href: "/candidate/dashboard",
    activeMatch: ["/candidate", "/candidate/dashboard"],
  },
  {
    id: "exams",
    name: "Exams",
    icon: "/exam-icon.jpg",
    href: "/candidate/exams",
    activeMatch: ["/candidate/exams"],
  },
  {
    id: "exam-logs",
    name: "Exam Logs",
    icon: "/logs-icon.jpg",
    href: "/candidate/exam-logs",
    activeMatch: ["/candidate/exam-logs"],
  },
]
