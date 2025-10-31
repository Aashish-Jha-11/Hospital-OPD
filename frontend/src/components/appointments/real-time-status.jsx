"use client"

import { useState, useEffect } from "react"

export default function RealTimeStatus({ appointmentId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus)

  useEffect(() => {
    // In a real app, this would connect to Socket.io
    // For now, we simulate real-time updates
    const interval = setInterval(() => {
      // Mock real-time update
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (stat) => {
    switch (stat) {
      case "SCHEDULED":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
        )
      case "COMPLETED":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            />
          </svg>
        )
    }
  }

  const getStatusColor = (stat) => {
    switch (stat) {
      case "SCHEDULED":
        return "text-blue-600"
      case "COMPLETED":
        return "text-green-600"
      case "CANCELLED":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className={`${getStatusColor(status)}`}>{getStatusIcon(status)}</div>
      <div>
        <p className="text-xs font-medium text-gray-600">Status</p>
        <p className="text-sm font-semibold text-gray-800">{status}</p>
      </div>
    </div>
  )
}
