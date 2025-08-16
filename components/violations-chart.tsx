export function ViolationsChart() {
  const data = [
    { label: "Mid - Term: Network Security", value: 30 },
    { label: "Final Exam: Data Structures", value: 22 },
    { label: "Quiz: Operating Systems", value: 45 },
    { label: "Final Exam: Data Structures", value: 18 },
    { label: "Final Exam: Data Analytics", value: 55 },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="bg-[#252b3d] rounded-xl p-4 lg:p-6 border border-[#3a4052] h-[350px] lg:h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-base lg:text-lg font-semibold">Violations Per Exam</h2>
        <div className="flex items-center space-x-1 lg:space-x-2">
          <button className="p-1 text-gray-400 hover:text-white">
            <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-400 text-xs lg:text-sm">Aug 2025</span>
          <button className="p-1 text-gray-400 hover:text-white">
            <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-xs py-2">
          <span>60%</span>
          <span>50%</span>
          <span>40%</span>
          <span>30%</span>
          <span>20%</span>
          <span>10%</span>
        </div>

        <div className="flex-1 flex items-end justify-between space-x-1 lg:space-x-2 ml-8 mb-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-[#1a1f2e] rounded-t-lg relative h-32 lg:h-40 mb-2 lg:mb-3">
                <div
                  className="bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-300"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-gray-400 text-[10px] lg:text-xs text-center leading-tight max-w-full">
                {item.label.split(":")[0]}
                <br />
                {item.label.split(":")[1]}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <span className="text-gray-400 text-xs lg:text-sm">Avg Point</span>
        </div>
      </div>
    </div>
  )
}
