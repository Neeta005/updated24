export interface MappedImportModalProps {
  isOpen: boolean
  onClose: () => void
  fileType: "xls" | "csv" | "google-sheet" | null
}
