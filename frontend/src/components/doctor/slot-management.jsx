"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"
import CreateSlotForm from "./create-slot-form"

export default function SlotManagement({ doctorId }) {
  const { getToken } = useAuth()
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchSlots = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/doctors/${doctorId}/schedule`)
      const data = await response.json()
      setSlots(data)
    } catch (error) {
      console.error("Error fetching slots:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (doctorId) {
      fetchSlots()
    }
  }, [doctorId])

  const handleDeleteSlot = async (slotId) => {
    try {
      const token = getToken()
      const response = await fetch(`http://localhost:3001/api/slots/${slotId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        setSlots((prev) => prev.filter((s) => s.id !== slotId))
      }
    } catch (error) {
      console.error("Error deleting slot:", error)
    }
  }

  const handleSlotCreated = () => {
    setShowForm(false)
    fetchSlots()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Available Slots</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          {showForm ? "Cancel" : "Add New Slot"}
        </button>
      </div>

      {showForm && <CreateSlotForm doctorId={doctorId} onSlotCreated={handleSlotCreated} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map((slot) => (
          <div key={slot.id} className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Date</p>
                <p className="text-lg font-bold text-gray-800">
                  {new Date(slot.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  slot.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {slot.isAvailable ? "Available" : "Booked"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600 font-medium">Start Time</p>
                <p className="text-gray-800">{slot.startTime}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">End Time</p>
                <p className="text-gray-800">{slot.endTime}</p>
              </div>
            </div>

            <button
              onClick={() => handleDeleteSlot(slot.id)}
              disabled={!slot.isAvailable}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Slot
            </button>
          </div>
        ))}
      </div>

      {slots.length === 0 && (
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-12 text-center">
          <p className="text-gray-600 mb-4">No slots created yet</p>
          <button onClick={() => setShowForm(true)} className="text-blue-600 font-semibold hover:underline">
            Create your first slot
          </button>
        </div>
      )}
    </div>
  )
}
