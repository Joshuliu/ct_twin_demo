"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"

interface ERPMessage {
  id: string
  timestamp: string
  type: "order" | "inventory" | "production" | "maintenance" | "alert"
  message: string
  status: "success" | "warning" | "error" | "info"
}

export default function ERPWebsocketLog() {
  const [messages, setMessages] = useState<ERPMessage[]>([])
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const messageTemplates = [
      { type: "order", message: "New order #ORD-{id} received from customer", status: "success" },
      { type: "inventory", message: "Low stock alert: Component {id} below threshold", status: "warning" },
      { type: "production", message: "Production batch {id} completed successfully", status: "success" },
      { type: "maintenance", message: "Scheduled maintenance for Machine {id} started", status: "info" },
      { type: "alert", message: "Critical temperature alert on Line {id}", status: "error" },
    ]

    const generateMessage = (): ERPMessage => {
      const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)]
      const id = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")

      return {
        id: `msg-${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: template.type as any,
        message: template.message.replace("{id}", id),
        status: template.status as any,
      }
    }

    // Initial messages
    const initialMessages = Array.from({ length: 8 }, generateMessage)
    setMessages(initialMessages)

    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessage = generateMessage()
        return [newMessage, ...prev.slice(0, 19)] // Keep last 20 messages
      })
    }, 4000)

    // Simulate connection status changes
    const connectionInterval = setInterval(() => {
      setIsConnected((prev) => (Math.random() > 0.1 ? true : !prev))
    }, 30000)

    return () => {
      clearInterval(interval)
      clearInterval(connectionInterval)
    }
  }, [])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      case "info":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "text-blue-600"
      case "inventory":
        return "text-orange-600"
      case "production":
        return "text-green-600"
      case "maintenance":
        return "text-purple-600"
      case "alert":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>ERP WebSocket Log</span>
          <div className="flex items-center gap-2">
            {isConnected ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{message.timestamp}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium uppercase ${getTypeColor(message.type)}`}>
                      {message.type}
                    </span>
                    <Badge variant={getStatusVariant(message.status)} className="text-xs">
                      {message.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
