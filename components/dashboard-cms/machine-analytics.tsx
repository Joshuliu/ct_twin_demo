"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function MachineAnalytics() {
  const downtimeData = [
    { machine: "Line A", lastQuarter: 2.1, thisQuarter: 1.8, change: -14.3 },
    { machine: "Unit B", lastQuarter: 3.2, thisQuarter: 4.1, change: 28.1 },
    { machine: "Control C", lastQuarter: 1.5, thisQuarter: 1.2, change: -20.0 },
    { machine: "Line D", lastQuarter: 4.8, thisQuarter: 3.9, change: -18.8 },
  ]

  const ampTrendData = [
    { time: "00:00", raw: 42.1, threshold: 50, starter: 38.5 },
    { time: "04:00", raw: 45.3, threshold: 50, starter: 41.2 },
    { time: "08:00", raw: 48.7, threshold: 50, starter: 44.8 },
    { time: "12:00", raw: 46.2, threshold: 50, starter: 42.1 },
    { time: "16:00", raw: 43.8, threshold: 50, starter: 40.3 },
    { time: "20:00", raw: 41.5, threshold: 50, starter: 38.9 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Machine Downtime Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downtimeData.map((item) => (
              <div key={item.machine} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{item.machine}</h4>
                  <p className="text-sm text-muted-foreground">{item.thisQuarter}% downtime this quarter</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <span className={`font-medium ${item.change > 0 ? "text-red-500" : "text-green-500"}`}>
                    {item.change > 0 ? "+" : ""}
                    {item.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raw Amp & Threshold Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ampTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="raw" stroke="#3b82f6" name="Raw Amp" strokeWidth={2} />
              <Line type="monotone" dataKey="threshold" stroke="#ef4444" name="Threshold" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="starter" stroke="#10b981" name="Starter Data" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
