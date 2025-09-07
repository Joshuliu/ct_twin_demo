"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertTriangle, Wrench, TrendingUp, Zap, Thermometer, Activity } from "lucide-react"

interface MachineDetailsModalProps {
  machine: any
  isOpen: boolean
  onClose: () => void
}

export default function MachineDetailsModal({ machine, isOpen, onClose }: MachineDetailsModalProps) {
  if (!machine) return null

  // Mock data for charts and metrics
  const productionData = [
    { time: "00:00", output: 85, target: 100 },
    { time: "04:00", output: 92, target: 100 },
    { time: "08:00", output: 78, target: 100 },
    { time: "12:00", output: 95, target: 100 },
    { time: "16:00", output: 88, target: 100 },
    { time: "20:00", output: 91, target: 100 },
  ]

  const temperatureData = [
    { time: "00:00", temp: 68, vibration: 2.1 },
    { time: "04:00", temp: 72, vibration: 2.3 },
    { time: "08:00", temp: 75, vibration: 2.8 },
    { time: "12:00", temp: 73, vibration: 2.5 },
    { time: "16:00", temp: 71, vibration: 2.2 },
    { time: "20:00", temp: 69, vibration: 2.0 },
  ]

  const maintenanceHistory = [
    { date: "2024-01-15", type: "Preventive", duration: "2h", status: "Completed" },
    { date: "2024-01-08", type: "Repair", duration: "4h", status: "Completed" },
    { date: "2024-01-01", type: "Inspection", duration: "1h", status: "Completed" },
  ]

  const alertsData = [
    { type: "Warning", count: 3, color: "#f59e0b" },
    { type: "Critical", count: 1, color: "#ef4444" },
    { type: "Info", count: 8, color: "#3b82f6" },
  ]

  const oeeData = [
    { metric: "Availability", value: 95.2, target: 90 },
    { metric: "Performance", value: 87.8, target: 85 },
    { metric: "Quality", value: 98.5, target: 95 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-blue-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const overallOEE = oeeData.reduce((acc, item) => acc + item.value, 0) / oeeData.length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)} animate-pulse`}></div>
            {machine.name} - Detailed Metrics
            <Badge variant={machine.status === "running" ? "default" : "secondary"}>
              {machine.status.toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall OEE</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallOEE.toFixed(1)}%</div>
                  <Progress value={overallOEE} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Output</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">91 units/hr</div>
                  <p className="text-xs text-muted-foreground">Target: 100 units/hr</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Energy Usage</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{machine.amperage.toFixed(1)}A</div>
                  <p className="text-xs text-muted-foreground">
                    Power: {((machine.amperage * 240) / 1000).toFixed(1)}kW
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{machine.temperature.toFixed(1)}°F</div>
                  <p className="text-xs text-muted-foreground">Normal range: 65-75°F</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {oeeData.map((item) => (
                <Card key={item.metric}>
                  <CardHeader>
                    <CardTitle className="text-sm">{item.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{item.value}%</div>
                    <Progress value={item.value} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Target: {item.target}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Production Output vs Target</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="output" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Production Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Units Produced:</span>
                    <span className="font-bold">2,184</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target:</span>
                    <span>2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="font-bold text-yellow-600">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Defect Rate:</span>
                    <span className="font-bold text-green-600">1.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shift Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={[
                        { shift: "Day", efficiency: 94 },
                        { shift: "Evening", efficiency: 89 },
                        { shift: "Night", efficiency: 87 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="shift" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="efficiency" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Vibration Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="temp" orientation="left" />
                    <YAxis yAxisId="vibration" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} />
                    <Line yAxisId="vibration" type="monotone" dataKey="vibration" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Readings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-mono">{machine.temperature.toFixed(1)}°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vibration:</span>
                    <span className="font-mono">2.3 mm/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pressure:</span>
                    <span className="font-mono">45.2 PSI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RPM:</span>
                    <span className="font-mono">1,847</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sensor Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Temperature Sensor:</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Vibration Sensor:</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pressure Sensor:</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Speed Sensor:</span>
                    <Badge variant="secondary">Calibrating</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Thresholds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Temp Warning:</span>
                      <span>75°F</span>
                    </div>
                    <Progress value={(machine.temperature / 75) * 100} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Vibration Limit:</span>
                      <span>5.0 mm/s</span>
                    </div>
                    <Progress value={(2.3 / 5.0) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Maintenance Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Preventive Maintenance</p>
                        <p className="text-sm text-muted-foreground">Due: Jan 22, 2024</p>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Oil Change</p>
                        <p className="text-sm text-muted-foreground">Due: Feb 5, 2024</p>
                      </div>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Belt Inspection</p>
                        <p className="text-sm text-muted-foreground">Due: Feb 15, 2024</p>
                      </div>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maintenanceHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.date} • {item.duration}
                          </p>
                        </div>
                        <Badge variant="default">{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Costs (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      { month: "Aug", cost: 1200 },
                      { month: "Sep", cost: 800 },
                      { month: "Oct", cost: 1500 },
                      { month: "Nov", cost: 600 },
                      { month: "Dec", cost: 900 },
                      { month: "Jan", cost: 1100 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cost" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={alertsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ type, count }) => `${type}: ${count}`}
                      >
                        {alertsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium">High Temperature</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium">Vibration Spike</p>
                        <p className="text-sm text-muted-foreground">4 hours ago</p>
                      </div>
                      <Badge variant="secondary">Warning</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">Maintenance Due</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                      <Badge variant="outline">Info</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Alert Trends (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={[
                      { day: "Day 1", critical: 0, warning: 2, info: 5 },
                      { day: "Day 7", critical: 1, warning: 3, info: 4 },
                      { day: "Day 14", critical: 0, warning: 1, info: 6 },
                      { day: "Day 21", critical: 2, warning: 4, info: 3 },
                      { day: "Day 30", critical: 1, warning: 2, info: 7 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="warning" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="info" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
