export function ActiveExams() {
  const exams = [
    {
      title: "Mid - Term: Network Security",
      date: "05 Aug, 2025",
      time: "Ends In 00:56",
      status: "Active",
      badgeClass: "bg-green-100 text-green-600",
      info: "10 Violations",
    },
    {
      title: "Mid - Term: Network Security",
      date: "05 Aug, 2025",
      time: "Starts In 00:56",
      status: "Upcoming",
      badgeClass: "bg-blue-100 text-blue-600",
      info: "20 Enrolled",
    },
  ];

  return (
    <div className="bg-[#252b3d] rounded-xl p-4 lg:p-6 border border-[#3a4052] h-[280px] lg:h-[320px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-white text-lg lg:text-xl font-semibold">
          Active / Upcoming Exams
        </h2>
        <button className="text-red-400 hover:text-red-300 text-sm font-medium">
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-3 lg:space-y-4 flex-1 overflow-y-auto">
        {exams.map((exam, idx) => (
          <div
            key={idx}
            className="bg-[#1a1f2e] rounded-lg p-3 lg:p-4 border border-[#3a4052]"
          >
            <div className="flex items-center">
              {/* Left: title + date/time */}
              <div className="flex-1 min-w-0 pr-3 lg:pr-4">
                <h3 className="text-white font-medium mb-1 text-sm lg:text-base truncate">
                  {exam.title}
                </h3>
                <p className="text-gray-400 text-xs lg:text-sm">
                  {exam.date} • {exam.time}
                </p>
              </div>

              {/* Vertical divider */}
              <div className="w-px h-10 lg:h-12 bg-[#3a4052] mx-3 lg:mx-4" />

              {/* Right: badge + info (fixed width so rows align) */}
              <div className="min-w-[160px] flex flex-col items-end gap-1">
                <span
                  className={`px-2 lg:px-3 py-1 rounded-md text-xs font-medium ${exam.badgeClass}`}
                >
                  {exam.status}
                </span>
                <span className="text-gray-400 text-xs lg:text-sm">
                  {exam.info}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
