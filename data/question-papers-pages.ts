export type QuestionPapersPageKey = "table" | "create" | "delete" | "details" | "preview"

export const QUESTION_PAPER_ROUTES = {
  table: "/question-papers/table",
  create: "/question-papers/create",
  delete: "/question-papers/delete",
  details: "/question-papers/details",
  preview: "/question-papers/preview",
} as const satisfies Record<QuestionPapersPageKey, string>

export interface ShowcaseImage {
  key: QuestionPapersPageKey
  title: string
  src: string
  alt: string
  description?: string
}

export const showcaseImages: Record<QuestionPapersPageKey, ShowcaseImage> = {
  table: {
    key: "table",
    title: "Question Papers",
    // IMPORTANT: using the provided Source URL directly
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Question%20Paper%20Table-m6eqPiacU7X4emgLHjYgnEmZHmq4an.png",
    alt: "Question Papers table with filters and actions",
    description: "Browse and manage all question papers.",
  },
  create: {
    key: "create",
    title: "Create Question Paper",
    // IMPORTANT: using the provided Source URL directly
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Question%20Paper%20Basic%20Info-Y8KddvRXbXFCp9GUo7MZqAIyvZwv5z.png",
    alt: "Create Question Paper form with fields and subject/topic table",
    description: "Enter basic information to create a question paper.",
  },
  delete: {
    key: "delete",
    title: "Delete Question Paper",
    // IMPORTANT: using the provided Source URL directly
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Delete%20Question%20paper-EzU3B9fZxke56lk5Ekcy2AiBvG646K.png",
    alt: "Delete Question Paper confirmation modal",
    description: "Confirm deletion of a question paper.",
  },
  details: {
    key: "details",
    title: "Question Paper Details",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Question%20Paper%20Details-DQoOVtDgv3K5B1t4Gt3M7XGn2IZNto.png",
    alt: "Manual Question Selection - Details",
    description: "Manual selection and configuration of questions.",
  },
  preview: {
    key: "preview",
    title: "Question Paper Preview",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Question%20paper%20preview-Z2o0R1MlzA76pNY2x9Oer0XWj04nhb.png",
    alt: "Preview of the selected question paper",
    description: "Final preview before publish/export.",
  },
}
