interface AssessmentCardProps {
  title: string
  tags: string[]
  date: string
  time: string
  duration: string
  status: string
}

function AssessmentCard({ title, tags, date, time, duration, status }: AssessmentCardProps) {
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
        <span
          className={`px-4 py-2 rounded-full text-xs font-medium border ${
            status === "Not Assessed"
              ? "border-red-500/30 bg-red-500/10 text-red-400"
              : "border-green-500/30 bg-green-500/10 text-green-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center gap-8 text-sm text-slate-400 mb-4">
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

      <div className="text-right">
        <a href="#" className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
          View Syllabus →
        </a>
      </div>
    </div>
  )
}

export function TodayTab() {
  return (
    <div className="space-y-4">
      <AssessmentCard
        title="Fundamentals of Programming"
        tags={["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"]}
        date="12-01-2023"
        time="9:40 pm"
        duration="9:40 pm"
        status="Not Assessed"
      />
      <AssessmentCard
        title="Advanced Web Development"
        tags={["React", "Node.js", "Full Stack"]}
        date="15-01-2023"
        time="10:00 am"
        duration="2:00 pm"
        status="Not Assessed"
      />
    </div>
  )
}
