"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wifi, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Sensor {
  id: string;
  name: string;
  type: string;
  signalStrength: number;
  status: "available" | "connected" | "error";
}

interface AddAssemblyLineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateMachine: (machineData: any) => void;
}

export default function AddAssemblyLineModal({
  open,
  onOpenChange,
  onCreateMachine,
}: AddAssemblyLineModalProps) {
  const [step, setStep] = useState<"scanning" | "discovered" | "configure">(
    "scanning"
  );
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [machineConfig, setMachineConfig] = useState({
    name: "",
    type: "",
    location: "",
    ampThreshold: "",
    description: "",
  });

  // Mock sensor discovery
  useEffect(() => {
    if (open && step === "scanning") {
      const timer = setTimeout(() => {
        setSensors([
          {
            id: "sensor-001",
            name: "Industrial Sensor A1",
            type: "Amp Monitor",
            signalStrength: 85,
            status: "available",
          },
          {
            id: "sensor-002",
            name: "Industrial Sensor A2",
            type: "Amp Monitor",
            signalStrength: 72,
            status: "available",
          },
          {
            id: "sensor-003",
            name: "Industrial Sensor A3",
            type: "Amp Monitor",
            signalStrength: 91,
            status: "available",
          },
          {
            id: "sensor-004",
            name: "Industrial Sensor A4",
            type: "Amp Monitor",
            signalStrength: 68,
            status: "connected",
          },
        ]);
        setStep("discovered");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, step]);

  const handleSensorSelect = (sensor: Sensor) => {
    if (sensor.status === "available") {
      setSelectedSensor(sensor);
      setStep("configure");
    }
  };

  const handleSubmit = () => {
    if (selectedSensor && machineConfig.name && machineConfig.type) {
      const newMachine = {
        id: `machine-${Date.now()}`,
        name: machineConfig.name,
        type: machineConfig.type,
        location: machineConfig.location,
        status: "running",
        ampReading: Math.floor(Math.random() * 50) + 10,
        threshold: Number.parseInt(machineConfig.ampThreshold) || 45,
        sensor: selectedSensor,
        description: machineConfig.description,
        createdAt: new Date().toISOString(),
      };

      onCreateMachine(newMachine);

      // Reset form
      setStep("scanning");
      setSensors([]);
      setSelectedSensor(null);
      setMachineConfig({
        name: "",
        type: "",
        location: "",
        ampThreshold: "",
        description: "",
      });
      onOpenChange(false);
    }
  };

  const getSignalIcon = (strength: number) => {
    if (strength > 80)
      return <div className="w-3 h-3 bg-green-500 rounded-full" />;
    if (strength > 60)
      return <div className="w-3 h-3 bg-yellow-500 rounded-full" />;
    return <div className="w-3 h-3 bg-red-500 rounded-full" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Assembly Line</DialogTitle>
        </DialogHeader>

        {step === "scanning" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="text-lg font-semibold mb-2">
              Scanning WiFi Network
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Searching for available sensors on the network...
            </p>
          </div>
        )}

        {step === "discovered" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Discovered Sensors</h3>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    sensor.status === "available"
                      ? "hover:bg-accent border-border"
                      : "opacity-50 cursor-not-allowed border-muted"
                  }`}
                  onClick={() => handleSensorSelect(sensor)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getSignalIcon(sensor.signalStrength)}
                      <div>
                        <p className="font-medium">{sensor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {sensor.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {sensor.signalStrength}%
                      </span>
                      {sensor.status === "available" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {sensor.status === "connected" && (
                        <Badge variant="secondary">In Use</Badge>
                      )}
                      {sensor.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "configure" && selectedSensor && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold">Configure Machine</h3>
            </div>

            <div className="p-3 bg-accent rounded-lg mb-4">
              <p className="text-sm font-medium">
                Selected Sensor: {selectedSensor.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedSensor.type} • Signal: {selectedSensor.signalStrength}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="machine-name">Machine Name *</Label>
                <Input
                  id="machine-name"
                  placeholder="e.g., Assembly Line 3"
                  value={machineConfig.name}
                  onChange={(e) =>
                    setMachineConfig((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="machine-type">Machine Type *</Label>
                <Select
                  value={machineConfig.type}
                  onValueChange={(value) =>
                    setMachineConfig((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conveyor">Conveyor Belt</SelectItem>
                    <SelectItem value="press">Hydraulic Press</SelectItem>
                    <SelectItem value="welder">Welding Station</SelectItem>
                    <SelectItem value="cutter">Cutting Machine</SelectItem>
                    <SelectItem value="assembler">Assembly Robot</SelectItem>
                    <SelectItem value="packaging">Packaging Unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Floor 2, Section A"
                  value={machineConfig.location}
                  onChange={(e) =>
                    setMachineConfig((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amp-threshold">Machine Voltage</Label>
                <Input
                  id="amp-threshold"
                  type="number"
                  placeholder="45"
                  value={machineConfig.ampThreshold}
                  onChange={(e) =>
                    setMachineConfig((prev) => ({
                      ...prev,
                      ampThreshold: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of the machine's purpose"
                value={machineConfig.description}
                onChange={(e) =>
                  setMachineConfig((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep("discovered")}
                className="flex-1"
              >
                Back to Sensors
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!machineConfig.name || !machineConfig.type}
                className="flex-1"
              >
                Create Assembly Line
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
