import type { ColumnDef } from "@tanstack/react-table"
import type { ResultRow } from "./results"

export function createResultColumns(): ColumnDef<ResultRow>[] {
  return [
    {
      accessorKey: "name",
      header: "Student Name",
      cell: ({ row }) => <span className="text-card-foreground">{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => <span className="text-card-foreground">{row.original.score}</span>,
    },
    {
      accessorKey: "violations",
      header: "Violations",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center justify-center min-w-8 px-2 py-0.5 rounded-full text-xs ${
            row.original.violations > 8 ? "bg-red-600/20 text-red-400" : "bg-emerald-600/20 text-emerald-400"
          }`}
        >
          {row.original.violations.toString().padStart(2, "0")}
        </span>
      ),
    },
    {
      accessorKey: "grade",
      header: "Grade",
      cell: ({ row }) => {
        const g = row.original.grade
        const styles = g === "F" ? "bg-red-600/20 text-red-400" : "bg-emerald-600/20 text-emerald-400"
        return <span className={`px-2 py-1 rounded-md text-xs ${styles}`}>{g}</span>
      },
    },
  ]
}
