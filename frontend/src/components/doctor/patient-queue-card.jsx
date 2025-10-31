"use client"

import { useState } from "react"
import { useAuth } from "../auth/use-auth"

export default function PatientQueueCard({ appointment, doctorId }) {
  const { getToken } = useAuth()
  const [status, setStatus] = useState(appointment.status)
  const [updating, setUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true)
    try {
      const token = getToken()
      const response = await fetch(`http://localhost:3001/api/appointments/${appointment.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setStatus(newStatus)
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{appointment.patient.name}</h3>
          <p className="text-sm text-gray-600">Patient ID: {appointment.patient.id}</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            status === "SCHEDULED"
              ? "bg-blue-100 text-blue-800"
              : status === "COMPLETED"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-600 font-medium">Appointment Time</p>
          <p className="text-gray-800">{appointment.slot.startTime}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Contact</p>
          <p className="text-gray-800">{appointment.patient.phone}</p>
        </div>
      </div>

      {appointment.symptoms && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">Patient Symptoms:</p>
          <p className="text-sm text-gray-700">{appointment.symptoms}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => handleStatusUpdate("COMPLETED")}
          disabled={updating || status === "COMPLETED"}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          Mark Complete
        </button>
        <button
          onClick={() => handleStatusUpdate("CANCELLED")}
          disabled={updating || status === "CANCELLED"}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
