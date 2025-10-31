"use client"

import { useState } from "react"
import { useAuth } from "../auth/use-auth"

export default function CreateSlotForm({ doctorId, onSlotCreated }) {
  const { getToken } = useAuth()
  const [formData, setFormData] = useState({
    date: "",
    startTime: "09:00",
    endTime: "10:00",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = getToken()
      const response = await fetch("http://localhost:3001/api/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create slot")
        return
      }

      setFormData({
        date: "",
        startTime: "09:00",
        endTime: "10:00",
      })

      onSlotCreated()
    } catch (error) {
      setError("Error creating slot")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Slot</h3>

      {error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Creating Slot..." : "Create Slot"}
        </button>
      </form>
    </div>
  )
}
