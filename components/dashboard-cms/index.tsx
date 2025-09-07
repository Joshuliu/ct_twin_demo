"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import OverviewStats from "./overview-stats"
import ContentChart from "./content-chart"
import RecentPosts from "./recent-posts"
import PopularArticles from "./popular-articles"
import ContentCategories from "./content-categories"
import RecentComments from "./recent-comments"
import PublishingSchedule from "./publishing-schedule"
import UserActivity from "./user-activity"
import SystemHistory from "./system-history"
import MachineStatus from "./machine-status"
import AmpDataLog from "./amp-data-log"
import MachineAnalytics from "./machine-analytics"
import ERPWebsocketLog from "./erp-websocket-log"
import AddAssemblyLineModal from "./add-assembly-line-modal"

export default function CMSDashboardContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMachines, setNewMachines] = useState<any[]>([])

  const handleCreateMachine = (machineData: any) => {
    setNewMachines((prev) => [...prev, machineData])
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Machine Monitoring Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Real-time machine data, analytics, and ERP integration
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Assembly Line
          </Button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Export Data
          </button>
          <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium">
            Settings
          </button>
        </div>
      </div>

      {/* Machine Status Overview */}
      <MachineStatus newMachines={newMachines} />

      {/* Machine Analytics */}
      <MachineAnalytics />

      {/* Real-time Data Logs */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <AmpDataLog />
        <ERPWebsocketLog />
      </div>

      {/* Original CMS Content - keeping for reference */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">CMS Content Management</h2>

        {/* Overview Stats */}
        <OverviewStats />

        {/* Content Chart */}
        <ContentChart />

        {/* User Activity & System History Row */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <SystemHistory />
          <UserActivity />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Left Column - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full min-w-0">
            <RecentPosts />
            <PopularArticles />
            <PublishingSchedule />
          </div>

          {/* Right Column - 1/3 width on desktop */}
          <div className="space-y-4 sm:space-y-6 w-full min-w-0">
            <ContentCategories />
            <RecentComments />
          </div>
        </div>
      </div>

      <AddAssemblyLineModal open={isModalOpen} onOpenChange={setIsModalOpen} onCreateMachine={handleCreateMachine} />
    </div>
  )
}
