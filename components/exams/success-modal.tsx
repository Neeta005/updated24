"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { GradientButton } from "@/components/ui/gradient-button" // import your gradient button

interface SuccessModalProps {
  isOpen: boolean
  onEdit: () => void
  onViewSchedule: () => void
  onDone: () => void
}

export function SuccessModal({ isOpen, onEdit, onViewSchedule, onDone }: SuccessModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false} className="max-w-md bg-card">
        {/* Accessible Dialog Title */}
        <DialogTitle>
          <VisuallyHidden>Schedule Success</VisuallyHidden>
        </DialogTitle>

        <div className="flex flex-col items-center justify-center py-8">
          {/* Large Tick Icon from public folder */}
          <div className="flex items-center justify-center rounded-full mb-6">
            <Image src="/icons/checkcircle.png" alt="Success Tick" width={84} height={84} />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">Schedule Successfully</h2>
          <p className="text-slate-400 text-center mb-8">Exam is Successfully Scheduled</p>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            {/* Edit Button stays the same */}
            <Button
              onClick={onEdit}
              variant="outline"
              className="w-full  border-orange-500 text-orange-500 hover:bg-orange-500/10  font-medium"
            >
              Edit
            </Button>

            {/* View Schedule using your GradientButton component */}
            <GradientButton onClick={onViewSchedule} className="w-full">
              View Schedule
            </GradientButton>
          </div>

          {/* Done Button stays the same */}
         
        </div>
      </DialogContent>
    </Dialog>
  )
}
