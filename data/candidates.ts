export type CandidateGroup = {
  id: string
  name: string
  category: string
  description?: string
  count: number
  createdAt: string
}

export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  education: string
  experience: string
  status: "Active" | "Inactive"
}

export type GroupEditData = {
  groupName: string
  targetAudience: string
  description: string
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
    description:
      "Highly motivated candidates focusing on UI, UX and performance oriented coding practices.",
    count: 42,
    createdAt: "02 Sep, 2025",
  },
  {
    id: "g-3",
    name: "Data Analysts",
    category: "Analytics",
    description:
      "Candidates skilled in SQL, Python and dashboarding with strong statistical foundations.",
    count: 37,
    createdAt: "15 Jul, 2025",
  },
  {
    id: "g-4",
    name: "Python Developers",
    category: "Coding & Development",
    count: 40,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-5",
    name: "Python Developers",
    category: "Coding & Development",
    count: 38,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-6",
    name: "Python Developers",
    category: "Coding & Development",
    count: 35,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-7",
    name: "Python Developers",
    category: "Coding & Development",
    count: 32,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-8",
    name: "Python Developers",
    category: "Coding & Development",
    count: 42,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-9",
    name: "Python Developers",
    category: "Coding & Development",
    count: 45,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-10",
    name: "Python Developers",
    category: "Coding & Development",
    count: 26,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-11",
    name: "Python Developers",
    category: "Coding & Development",
    count: 48,
    createdAt: "09 Aug, 2024",
  },
  {
    id: "g-12",
    name: "Python Developers",
    category: "Coding & Development",
    count: 50,
    createdAt: "09 Aug, 2024",
  },
]

export const groupCandidates: Candidate[] = [
  { id: "1", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Active" },
  { id: "2", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Inactive" },
  { id: "3", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Active" },
  { id: "4", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Active" },
  { id: "5", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Inactive" },
  { id: "6", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Active" },
  { id: "7", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Inactive" },
  { id: "8", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Active" },
  { id: "9", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Inactive" },
  { id: "10", name: "John Doe", email: "johndoe@gmail.com", phone: "0201-1234567", education: "B.Sc. Computer Science", experience: "2 yrs", status: "Active" },
]

export const initialGroupEditData: GroupEditData = {
  groupName: "Python Developers",
  targetAudience: "Python Developers",
  description: "Lorem ipsum dolor sit amet consectetur. Eget ultrices varius potenti mauris aliquet. Mi adipiscing lectus justo ut adipiscing a nullam.",
}

export const targetAudienceOptions = [
  "Python Developers",
  "Java Developers",
  "Frontend Developers",
]

export const educationOptions = [
  "All",
  "B.Sc. Computer Science",
  "Other",
]

export const statusOptions = [
  "All",
  "Active",
  "Inactive",
]