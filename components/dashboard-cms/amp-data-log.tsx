"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"

interface AmpReading {
  timestamp: string
  machineId: string
  machineName: string
  amperage: number
  threshold: number
  status: "normal" | "warning" | "critical"
}

export default function AmpDataLog() {
  const [readings, setReadings] = useState<AmpReading[]>([])

  useEffect(() => {
    const machines = [
      { id: "M001", name: "Production Line A", baseAmp: 45 },
      { id: "M002", name: "Assembly Unit B", baseAmp: 35 },
      { id: "M003", name: "Quality Control C", baseAmp: 40 },
      { id: "M004", name: "Packaging Line D", baseAmp: 30 },
    ]

    const generateReading = () => {
      const machine = machines[Math.floor(Math.random() * machines.length)]
      const amperage = machine.baseAmp + (Math.random() - 0.5) * 10
      const threshold = machine.baseAmp + 15

      let status: "normal" | "warning" | "critical" = "normal"
      if (amperage > threshold * 0.9) status = "warning"
      if (amperage > threshold) status = "critical"

      return {
        timestamp: new Date().toLocaleTimeString(),
        machineId: machine.id,
        machineName: machine.name,
        amperage: Math.max(0, amperage),
        threshold,
        status,
      }
    }

    // Initial readings
    const initialReadings = Array.from({ length: 10 }, generateReading)
    setReadings(initialReadings)

    const interval = setInterval(() => {
      setReadings((prev) => {
        const newReading = generateReading()
        return [newReading, ...prev.slice(0, 19)] // Keep last 20 readings
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Live Amp Data Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-2">
            {readings.map((reading, index) => (
              <div key={index} className="flex items-center justify-between p-2 text-sm border-b">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{reading.timestamp}</span>
                  <span className="font-medium">{reading.machineName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">{reading.amperage.toFixed(1)}A</span>
                  <span className={`font-medium ${getStatusColor(reading.status)}`}>
                    {reading.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
