import type { MenuItem } from "@/types"

export const candidateMenuItems: MenuItem[] = [
  {
    id: "home",
    name: "Home",
    icon: "/icons/menu1.png",
    href: "/icons/menu1.png",
    activeMatch: ["/candidate", "/candidate/dashboard"],
  },
  {
    id: "exams",
    name: "Exams",
    icon: "/icons/menu2.png",
    href: "/icons/menu2.png",
    activeMatch: ["/candidate/exams"],
  },
  {
    id: "exam-logs",
    name: "Exam Logs",
    icon: "/icons/menu3.png",
    href: "/icons/menu3.png",
    activeMatch: ["/candidate/exam-logs"],
  },
  {
    id: "results",
    name: "Results",
    icon: "/icons/menu4.png",
    href: "/icons/menu4.png",
    activeMatch: ["/candidate/results"],
  },
  {
    id: "assessment",
    name: "Assessment",
    icon: "/exam-icon.jpg",
    href: "/candidate/assessment",
    activeMatch: ["/candidate/assessment"],
  },
]
