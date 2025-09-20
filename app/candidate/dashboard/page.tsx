"use client"

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CandidateDashboard() {
  const examData = [
    {
      title: "Fundamentals of Programming",
      tags: ["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"],
      schedule: "12-01-2023",
      duration: "9:40 pm",
    },
    {
      title: "Fundamentals of Programming",
      tags: ["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"],
      schedule: "12-01-2023",
      duration: "9:40 pm",
    },
  ]

  const skillsData = [
    { name: "Mobile app UI/UX design", rating: 4, progress: 80 },
    { name: "Interaction Design", rating: 4, progress: 80 },
    { name: "Responsive web design", rating: 4, progress: 80 },
    { name: "User research", rating: 4, progress: 80 },
    { name: "Information Architecture", rating: 1, progress: 20 },
  ]

  const violationsData = [
    { type: "Tab Switch", count: "09" },
    { type: "Opened Other Applications", count: "03" },
    { type: "Unavailable On Seat", count: "04" },
    { type: "Multiple Faces Found", count: "06" },
    { type: "Noise Detected", count: "05" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Today's Exams Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Tabs */}
          <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg w-fit">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium">Today</button>
            <button className="px-4 py-2 text-gray-400 hover:text-white rounded-md text-sm font-medium">
              Upcoming
            </button>
            <button className="px-4 py-2 text-gray-400 hover:text-white rounded-md text-sm font-medium">
              Completed
            </button>
          </div>

          {/* Today's Exams */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-lg">Today's Exams</CardTitle>
              <button className="text-orange-400 text-sm hover:text-orange-300">See All</button>
            </CardHeader>
            <CardContent className="space-y-4">
              {examData.map((exam, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-medium">{exam.title}</h3>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Take Assessment
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {exam.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-slate-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule: {exam.schedule}</span>
                      </span>
                      <span>Duration: {exam.duration}</span>
                    </div>
                    <button className="text-orange-400 hover:text-orange-300">View Syllabus</button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Graph */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">Performance chart will be rendered here</div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Earned */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Skills Earned</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 ${i < skill.rating ? "text-yellow-400" : "text-gray-600"}`}>
                          ★
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${skill.progress >= 80 ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">July 2025</CardTitle>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-gray-400 font-medium p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2
                  const isCurrentMonth = day > 0 && day <= 31
                  const isToday = day === 14
                  return (
                    <div
                      key={i}
                      className={`p-2 text-sm ${
                        isCurrentMonth
                          ? isToday
                            ? "bg-orange-500 text-white rounded-full"
                            : "text-white hover:bg-slate-700 rounded"
                          : "text-gray-600"
                      }`}
                    >
                      {isCurrentMonth ? day : day <= 0 ? 30 + day : day - 31}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Exam Violations */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Exam Violations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-gray-400">Total Violations</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-white font-bold">9</span>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-medium">Medium</div>
                    <div className="text-xs text-gray-400">Severity</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {violationsData.map((violation, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{violation.type}</span>
                    <span className="text-white font-medium">{violation.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
