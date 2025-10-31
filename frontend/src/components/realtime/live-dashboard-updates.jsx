"use client"

import { useState, useEffect } from "react"
import { initializeSocket } from "../../lib/socket-io"
import { useAuth } from "../auth/use-auth"

export default function LiveDashboardUpdates({ onUpdate }) {
  const { user } = useAuth()
  const [liveStats, setLiveStats] = useState({
    appointmentsToday: 0,
    patientsWaiting: 0,
    completedToday: 0,
  })

  useEffect(() => {
    const socket = initializeSocket()

    if (user?.id) {
      socket.emit("join-room", { userId: user.id })
    }

    socket.on("dashboard-update", (data) => {
      setLiveStats(data)
      onUpdate && onUpdate(data)
    })

    socket.on("appointment-update", (data) => {
      setLiveStats((prev) => ({
        ...prev,
        appointmentsToday: prev.appointmentsToday + (data.isNew ? 1 : 0),
        completedToday: prev.completedToday + (data.isCompleted ? 1 : 0),
      }))
    })

    return () => {
      socket.off("dashboard-update")
      socket.off("appointment-update")
    }
  }, [user, onUpdate])

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Live Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 font-medium">Appointments Today</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{liveStats.appointmentsToday}</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 font-medium">Patients Waiting</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{liveStats.patientsWaiting}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 font-medium">Completed Today</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{liveStats.completedToday}</p>
        </div>
      </div>
    </div>
  )
}
