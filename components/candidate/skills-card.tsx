"use client"

import type { SkillItem } from "@/data/candidate-dashboard"

interface SkillsCardProps {
  skill: SkillItem
}

export function SkillsCard({ skill }: SkillsCardProps) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
      {/* Skill Name */}
      <span className="text-white text-sm font-medium min-w-[180px]">{skill.name}</span>
      
      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-base ${i < skill.rating ? "text-yellow-400" : "text-gray-600"}`}
          >
            ★
          </span>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="flex-1 relative">
        <div className="w-full bg-gray-600/30 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 relative ${
              skill.progress >= 80 ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${skill.progress}%` }}
          >
            {skill.progress > 15 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                {skill.progress}%
              </span>
            )}
          </div>
        </div>
        {skill.progress <= 15 && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xs font-bold bg-red-600 px-2 py-0.5 rounded-full">
            {skill.progress}%
          </span>
        )}
      </div>
    </div>
  )
}
