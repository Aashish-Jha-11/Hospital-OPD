"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"

export default function AppointmentHistory({ patientId }) {
  const { getToken } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getToken()
        const response = await fetch(`http://localhost:3001/api/appointments?patientId=${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        setAppointments(data.sort((a, b) => new Date(b.slot.date) - new Date(a.slot.date)))
      } catch (error) {
        console.error("Error fetching appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchAppointments()
    }
  }, [patientId, getToken])

  const getFilteredAppointments = () => {
    switch (filter) {
      case "scheduled":
        return appointments.filter((a) => a.status === "SCHEDULED")
      case "completed":
        return appointments.filter((a) => a.status === "COMPLETED")
      case "cancelled":
        return appointments.filter((a) => a.status === "CANCELLED")
      default:
        return appointments
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const filteredAppointments = getFilteredAppointments()

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment History</h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "scheduled", "completed", "cancelled"].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
              filter === filterOption
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filterOption === "all" ? "All" : filterOption}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div>
                <h3 className="font-semibold text-gray-800">Dr. {appointment.doctor.name}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(appointment.slot.date).toLocaleDateString()} at {appointment.slot.startTime}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === "SCHEDULED"
                    ? "bg-blue-100 text-blue-800"
                    : appointment.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {appointment.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-600">No appointments found</div>
        )}
      </div>
    </div>
  )
}
