import { GraduationCap, FileText, AlertTriangle, Activity } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Students",
      value: "125",
      icon: GraduationCap,
      iconBg: "bg-purple-500",
      iconColor: "text-purple-100",
    },
    {
      title: "Exams Conducted",
      value: "12",
      icon: FileText,
      iconBg: "bg-orange-500",
      iconColor: "text-orange-100",
    },
    {
      title: "Violations Detected",
      value: "58",
      icon: AlertTriangle,
      iconBg: "bg-green-500",
      iconColor: "text-green-100",
    },
    {
      title: "Active Exams",
      value: "04",
      icon: Activity,
      iconBg: "bg-blue-500",
      iconColor: "text-blue-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#252b3d] rounded-xl p-4 lg:p-6 border border-[#3a4052] h-[90px] lg:h-[100px] flex items-center"
        >
          <div className="flex items-center space-x-3 lg:space-x-4 w-full">
            <div className={`p-2.5 lg:p-3 rounded-lg ${stat.iconBg} flex-shrink-0`}>
              <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs lg:text-sm font-medium mb-1 truncate">{stat.title}</p>
              <p className="text-white text-xl lg:text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
