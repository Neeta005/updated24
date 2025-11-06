"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import type { PerformanceDataPoint } from "@/data/candidate-dashboard"

interface PerformanceGraphProps {
  data: PerformanceDataPoint[]
}

export function PerformanceGraph({ data }: PerformanceGraphProps) {
  return (
    <div className="bg-card backdrop-blur-sm rounded-xl border border-slate-700 p-6 w-full">
      <h2 className="text-white text-xl font-bold mb-6">Performance Graph</h2>
      <div className="relative h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
            <XAxis 
              dataKey="day" 
              stroke="#9CA3AF" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              style={{ fontSize: '11px' }}
              tick={{ fill: '#9CA3AF' }}
              domain={[0, 12]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            />
            {/* Red Line */}
            <Line 
              type="monotone" 
              dataKey="line1" 
              stroke="#EF4444" 
              strokeWidth={2.5}
              dot={false}
              strokeLinecap="round"
            />
            {/* Blue Area with Line */}
            <Area 
              type="monotone" 
              dataKey="line2" 
              stroke="#3B82F6" 
              strokeWidth={2.5}
              fill="url(#colorBlue)"
              dot={(props) => {
                const { cx, cy, index } = props;
                if (index === 2) { // Tuesday
                  return (
                    <g key={`dot-${index}`}>
                      <circle cx={cx} cy={cy} r={10} fill="#8B5CF6" stroke="#1E293B" strokeWidth={4} />
                    </g>
                  );
                }
                return null;
              }}
              strokeLinecap="round"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
