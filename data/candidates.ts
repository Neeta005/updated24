export type CandidateGroup = {
  id: string
  name: string
  category: string
  description: string
  count: number
  createdAt: string
}

export const candidateGroups: CandidateGroup[] = [
  {
    id: "g-1",
    name: "Python Developers",
    category: "Coding & Development",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget ultrices varius potenti mauris aliquet. Mi adipiscing lectus justo ut adipiscing a nullam.",
    count: 50,
    createdAt: "09 Aug, 2025",
  },
  {
    id: "g-2",
    name: "Frontend Engineers",
    category: "Coding & Development",
    description: "Highly motivated candidates focusing on UI, UX and performance oriented coding practices.",
    count: 42,
    createdAt: "02 Sep, 2025",
  },
  {
    id: "g-3",
    name: "Data Analysts",
    category: "Analytics",
    description: "Candidates skilled in SQL, Python and dashboarding with strong statistical foundations.",
    count: 37,
    createdAt: "15 Jul, 2025",
  },
]
