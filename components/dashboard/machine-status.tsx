"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import MachineDetailsModal from "./machine-details-modal"

interface MachineStatus {
  id: string
  name: string
  status: "running" | "idle" | "maintenance" | "error"
  amperage: number
  uptime: number
  voltage: number
  type?: string
  location?: string
}

interface MachineStatusProps {
  newMachines?: any[]
}

export default function MachineStatus({ newMachines = [] }: MachineStatusProps) {
  const [machines, setMachines] = useState<MachineStatus[]>([
    { id: "M001", name: "Production Line A", status: "running", amperage: 45.2, uptime: 98.5, voltage: 230 },
    { id: "M002", name: "Assembly Unit B", status: "idle", amperage: 12.1, uptime: 95.2, voltage: 230 },
    { id: "M003", name: "Quality Control C", status: "running", amperage: 38.7, uptime: 99.1, voltage: 230 },
    { id: "M004", name: "Packaging Line D", status: "maintenance", amperage: 0, uptime: 87.3, voltage: 230 },
  ])

  const [selectedMachine, setSelectedMachine] = useState<MachineStatus | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (newMachines.length > 0) {
      const formattedNewMachines = newMachines.map((machine) => ({
        id: machine.id,
        name: machine.name,
        status: machine.status as "running" | "idle" | "maintenance" | "error",
        amperage: machine.ampReading || Math.floor(Math.random() * 50) + 10,
        uptime: Math.floor(Math.random() * 10) + 90,
        voltage: machine.voltage || 230, // default to 230V if not provided
        type: machine.type,
        location: machine.location,
      }))

      setMachines((prev) => {
        const existingIds = prev.map((m) => m.id)
        const uniqueNewMachines = formattedNewMachines.filter((m) => !existingIds.includes(m.id))
        return [...prev, ...uniqueNewMachines]
      })
    }
  }, [newMachines])

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prev) =>
        prev.map((machine) => ({
          ...machine,
          amperage:
            machine.status === "running" ? Math.max(0, machine.amperage + (Math.random() - 0.5) * 5) : machine.amperage,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleMachineClick = (machine: MachineStatus) => {
    setSelectedMachine(machine)
    setIsModalOpen(true)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "running":
        return "default"
      case "idle":
        return "secondary"
      case "maintenance":
        return "outline"
      case "error":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Machine Status
            <span className="text-sm font-normal text-muted-foreground">({machines.length} machines)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {machines.map((machine) => (
              <div
                key={machine.id}
                className="p-4 border rounded-lg space-y-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleMachineClick(machine)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{machine.name}</h4>
                    {(machine.type || machine.location) && (
                      <p className="text-xs text-muted-foreground">
                        {machine.type} {machine.location && `• ${machine.location}`}
                      </p>
                    )}
                  </div>
                  <Badge variant={getStatusVariant(machine.status)}>{machine.status.toUpperCase()}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amp</p>
                    <p className="font-mono font-medium">{machine.amperage.toFixed(1)}A</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Power</p>
                    <p className="font-mono font-medium">
                      {(machine.amperage * machine.voltage / 1000).toFixed(0)}kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="font-mono font-medium">{machine.uptime.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MachineDetailsModal machine={selectedMachine} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}