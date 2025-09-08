"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
} from "recharts";
import {
  AlertTriangle,
  Wrench,
  TrendingUp,
  Zap,
  Activity,
  Gauge,
} from "lucide-react";

interface MachineDetailsModalProps {
  machine: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function MachineDetailsModal({
  machine,
  isOpen,
  onClose,
}: MachineDetailsModalProps) {
  if (!machine) return null;

  // Derivations from amperage (assumes single-phase or treating as a simple approximation)
  const voltage: number = machine.voltage ?? 230; // default if not provided
  const ratedAmps: number = machine.threshold ?? 50; // fallback for Load% calc
  const powerKW = (machine.amperage * voltage) / 1000;
  const loadPct = Math.min(100, (machine.amperage / ratedAmps) * 100);

  // Mock data — convert previous "temperature" timeline into Power/Load trends
  const powerData = [
    {
      time: "00:00",
      amps: Math.max(0, machine.amperage - 6),
      power: Math.max(0, ((machine.amperage - 6) * voltage) / 1000),
      load: Math.max(0, ((machine.amperage - 6) / ratedAmps) * 100),
    },
    {
      time: "04:00",
      amps: Math.max(0, machine.amperage - 2),
      power: Math.max(0, ((machine.amperage - 2) * voltage) / 1000),
      load: Math.max(0, ((machine.amperage - 2) / ratedAmps) * 100),
    },
    {
      time: "08:00",
      amps: Math.max(0, machine.amperage + 4),
      power: Math.max(0, ((machine.amperage + 4) * voltage) / 1000),
      load: Math.max(0, ((machine.amperage + 4) / ratedAmps) * 100),
    },
    {
      time: "12:00",
      amps: Math.max(0, machine.amperage + 1),
      power: Math.max(0, ((machine.amperage + 1) * voltage) / 1000),
      load: Math.max(0, ((machine.amperage + 1) / ratedAmps) * 100),
    },
    {
      time: "16:00",
      amps: Math.max(0, machine.amperage - 3),
      power: Math.max(0, ((machine.amperage - 3) * voltage) / 1000),
      load: Math.max(0, ((machine.amperage - 3) / ratedAmps) * 100),
    },
    {
      time: "20:00",
      amps: Math.max(0, machine.amperage + 2),
      power: Math.max(0, ((machine.amperage + 2) * voltage) / 1000),
      load: Math.max(0, ((machine.amperage + 2) / ratedAmps) * 100),
    },
  ];

  // Keep other mock sections
  const productionData = [
    { time: "00:00", output: 85, target: 100 },
    { time: "04:00", output: 92, target: 100 },
    { time: "08:00", output: 78, target: 100 },
    { time: "12:00", output: 95, target: 100 },
    { time: "16:00", output: 88, target: 100 },
    { time: "20:00", output: 91, target: 100 },
  ];

  const maintenanceHistory = [
    {
      date: "2024-01-15",
      type: "Preventive",
      duration: "2h",
      status: "Completed",
    },
    { date: "2024-01-08", type: "Repair", duration: "4h", status: "Completed" },
    {
      date: "2024-01-01",
      type: "Inspection",
      duration: "1h",
      status: "Completed",
    },
  ];

  const alertsData = [
    { type: "Warning", count: 3, color: "#f59e0b" },
    { type: "Critical", count: 1, color: "#ef4444" },
    { type: "Info", count: 8, color: "#3b82f6" },
  ];

  const oeeData = [
    { metric: "Availability", value: 95.2, target: 90 },
    { metric: "Performance", value: 87.8, target: 85 },
    { metric: "Quality", value: 98.5, target: 95 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const overallOEE =
    oeeData.reduce((acc, item) => acc + item.value, 0) / oeeData.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(
                machine.status
              )} animate-pulse`}
            />
            {machine.name} - Detailed Metrics
            <Badge
              variant={machine.status === "running" ? "default" : "secondary"}
            >
              {machine.status.toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="power">Power</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* -------- Overview -------- */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overall OEE
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {overallOEE.toFixed(1)}%
                  </div>
                  <Progress value={overallOEE} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Electrical
                  </CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {machine.amperage.toFixed(1)}A
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Power: {powerKW.toFixed(2)} kW • Load: {loadPct.toFixed(0)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(machine.uptime ?? 95).toFixed(1)}%
                  </div>
                  <Progress value={machine.uptime ?? 95} className="mt-2" />
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
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: {item.target}%
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* -------- Production -------- */}
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
                    <Line
                      type="monotone"
                      dataKey="output"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                    />
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

          {/* -------- Power (replaces Sensors tab) -------- */}
          <TabsContent value="power" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Power & Load Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={powerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      label={{
                        value: "kW / %",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Amps",
                        angle: 90,
                        position: "insideRight",
                      }}
                    />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="power"
                      name="Power (kW)"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="load"
                      name="Load (%)"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="amps"
                      name="Amps (A)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Electrical</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amperage:</span>
                    <span className="font-mono">
                      {machine.amperage.toFixed(1)} A
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voltage (assumed):</span>
                    <span className="font-mono">{voltage} V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Power:</span>
                    <span className="font-mono">{powerKW.toFixed(2)} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load (vs {ratedAmps}A):</span>
                    <span className="font-mono">{loadPct.toFixed(0)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sensor Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Amp Sensor:</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Derived Power:</span>
                    <Badge variant="secondary">OK</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Voltage Source:</span>
                    <Badge variant="outline">
                      {machine.voltage ? "Measured" : "Assumed"}
                    </Badge>
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
                      <span>Amp Warning ({ratedAmps}A):</span>
                      <span>{machine.amperage.toFixed(1)}A</span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (machine.amperage / ratedAmps) * 100
                      )}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Power Ceiling (kW):</span>
                      <span>
                        {((ratedAmps * voltage) / 1000).toFixed(1)} kW
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (powerKW / ((ratedAmps * voltage) / 1000)) * 100
                      )}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* -------- Maintenance -------- */}
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
                        <p className="text-sm text-muted-foreground">
                          Due: Jan 22, 2024
                        </p>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Oil Change</p>
                        <p className="text-sm text-muted-foreground">
                          Due: Feb 5, 2024
                        </p>
                      </div>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Belt Inspection</p>
                        <p className="text-sm text-muted-foreground">
                          Due: Feb 15, 2024
                        </p>
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
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded"
                      >
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

          {/* -------- Alerts -------- */}
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
                        <p className="font-medium">Overcurrent / High Load</p>
                        <p className="text-sm text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium">Power Spike Detected</p>
                        <p className="text-sm text-muted-foreground">
                          4 hours ago
                        </p>
                      </div>
                      <Badge variant="secondary">Warning</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">Maintenance Due</p>
                        <p className="text-sm text-muted-foreground">
                          1 day ago
                        </p>
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
                    <Line
                      type="monotone"
                      dataKey="critical"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="warning"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="info"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
