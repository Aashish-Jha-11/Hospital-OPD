"use client"

import { useState, useEffect } from "react"
import { initializeSocket } from "../../lib/socket-io"
import { useAuth } from "../auth/use-auth"

export default function NotificationCenter() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const socket = initializeSocket()

    if (user?.id) {
      socket.emit("join-room", { userId: user.id })
    }

    socket.on("appointment-changed", (data) => {
      addNotification({
        type: "appointment",
        title: "Appointment Updated",
        message: `Your appointment status changed to ${data.status}`,
        timestamp: new Date(),
      })
    })

    socket.on("prescription-issued", (data) => {
      addNotification({
        type: "prescription",
        title: "New Prescription",
        message: "You have received a new prescription",
        timestamp: new Date(),
      })
    })

    socket.on("lab-result-ready", (data) => {
      addNotification({
        type: "lab",
        title: "Lab Results Ready",
        message: "Your lab test results are ready for review",
        timestamp: new Date(),
      })
    })

    return () => {
      socket.off("appointment-changed")
      socket.off("prescription-issued")
      socket.off("lab-result-ready")
    }
  }, [user])

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== notification))
    }, 5000)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return "📅"
      case "prescription":
        return "💊"
      case "lab":
        return "🧪"
      default:
        return "🔔"
    }
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 hover:text-blue-600 transition"
        >
          🔔
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 backdrop-blur-xl bg-white/90 border border-white/20 rounded-lg shadow-lg p-4 z-50">
            <h3 className="font-bold text-gray-800 mb-3">Notifications</h3>

            {notifications.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((notif, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{getNotificationIcon(notif.type)}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{notif.title}</p>
                        <p className="text-gray-600 text-xs">{notif.message}</p>
                        <p className="text-gray-500 text-xs mt-1">{notif.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm text-center py-4">No notifications</p>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-3 pointer-events-none">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/90 border border-white/20 rounded-lg shadow-lg p-4 animate-slide-in pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getNotificationIcon(notif.type)}</span>
              <div>
                <p className="font-semibold text-gray-800">{notif.title}</p>
                <p className="text-sm text-gray-600">{notif.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
