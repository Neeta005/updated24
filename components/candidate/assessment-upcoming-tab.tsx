interface AssessmentCardProps {
  title: string
  tags: string[]
  date: string
  time: string
  duration: string
}

function UpcomingAssessmentCard({ title, tags, date, time, duration }: AssessmentCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border-l-4 border-l-orange-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-slate-600 rounded-full text-xs text-slate-300 hover:border-orange-500 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button className="px-6 py-2 border border-green-500 text-green-400 rounded-full text-sm font-medium hover:bg-green-500/10 transition-colors">
          Take Assessment
        </button>
      </div>

      <div className="flex items-center gap-8 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>Schedule</span>
          <span className="text-white font-medium">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🕐</span>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⏱️</span>
          <span>Duration</span>
          <span className="text-white font-medium">{duration}</span>
        </div>
      </div>

      <div className="text-right mt-4">
        <a href="#" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
          View Syllabus →
        </a>
      </div>
    </div>
  )
}

export function UpcomingTab() {
  return (
    <div className="space-y-4">
      <UpcomingAssessmentCard
        title="Fundamentals of Programming"
        tags={["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"]}
        date="12-01-2023"
        time="9:40 pm"
        duration="9:40 pm"
      />
      <UpcomingAssessmentCard
        title="Fundamentals of Programming"
        tags={["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"]}
        date="12-01-2023"
        time="9:40 pm"
        duration="9:40 pm"
      />
    </div>
  )
}
