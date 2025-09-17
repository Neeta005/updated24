import type { TableColumn } from "@/types/table"

export const questionModalColumns: TableColumn[] = [
  { span: 1, label: "Sr." },
  { span: 5, label: "Question" },
  { span: 2, label: "Type" },
  { span: 1, label: "Difficulty" },
  { span: 1, label: "Marks" },
  { span: 1, label: "Status" },
  { span: 1, label: "Actions" },
]

export const mappedImportColumns: TableColumn[] = [
  { span: 5, label: "Question" },
  { span: 2, label: "Type" },
  { span: 2, label: "Difficulty" },
  { span: 1, label: "Marks" },
  { span: 1, label: "Status" },
  { span: 1, label: "Actions", className: "text-center" },
]
