import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopPerformers() {
  const performers = [
    { name: "John Doe", subject: "Network Security", rate: "90%" },
    { name: "John Doe", subject: "Network Security", rate: "90%" },
    { name: "John Doe", subject: "Network Security", rate: "90%" },
  ]

  return (
    <div className="bg-[#252b3d] rounded-xl p-6 border border-[#3a4052] h-[350px] lg:h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">Top Performers</h2>
        <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-3 flex-1">
        {performers.map((performer, index) => (
          <div key={index} className="bg-[#1a1f2e] rounded-lg p-3 border border-[#3a4052] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-medium text-sm">{performer.name}</h3>
                <p className="text-gray-400 text-xs">{performer.subject}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-1">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="90, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-green-500 text-[10px] font-bold">{performer.rate}</span>
                </div>
              </div>
              <span className="text-gray-400 text-[10px]">Success Rate</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}