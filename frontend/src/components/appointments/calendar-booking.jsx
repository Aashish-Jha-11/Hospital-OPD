"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"

export default function CalendarBooking({ patientId, onBookingComplete }) {
  const { getToken } = useAuth()
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [slots, setSlots] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [symptoms, setSymptoms] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/doctors")
        const data = await response.json()
        setDoctors(data)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()
  }, [])

  const handleDoctorChange = async (e) => {
    const doctorId = Number.parseInt(e.target.value)
    setSelectedDoctor(doctorId)
    setSelectedSlot(null)

    if (doctorId) {
      try {
        const response = await fetch(`http://localhost:3001/api/slots/doctor/${doctorId}`)
        const data = await response.json()
        setSlots(data)
      } catch (error) {
        console.error("Error fetching slots:", error)
      }
    }
  }

  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const getSlotsForDate = (date) => {
    if (!date) return []
    const dateString = date.toDateString()
    return slots.filter((slot) => new Date(slot.date).toDateString() === dateString)
  }

  const handleBooking = async () => {
    if (!selectedSlot) {
      setMessage("Please select a time slot")
      return
    }

    setLoading(true)
    try {
      const token = getToken()
      const response = await fetch("http://localhost:3001/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId,
          doctorId: selectedDoctor,
          slotId: selectedSlot,
          symptoms,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage("Booking failed: " + (data.error || "Unknown error"))
        return
      }

      setMessage("Appointment booked successfully!")
      setTimeout(() => {
        onBookingComplete && onBookingComplete()
      }, 2000)
    } catch (error) {
      setMessage("Error booking appointment")
    } finally {
      setLoading(false)
    }
  }

  const calendarDays = getCalendarDays()
  const selectedDateSlots = currentDate ? getSlotsForDate(currentDate) : []

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h2>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg text-sm ${
            message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Doctor</label>
          <select
            onChange={handleDoctorChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Choose a doctor...</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} - {doctor.specialization} (${doctor.consultationFee})
              </option>
            ))}
          </select>
        </div>

        {selectedDoctor && (
          <>
            {/* Calendar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
              <div className="backdrop-blur-xl bg-white/60 border border-white/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    ← Previous
                  </button>
                  <h3 className="font-semibold text-gray-800">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Next →
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-semibold text-gray-600">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setCurrentDate(day)}
                      disabled={!day || day < new Date()}
                      className={`aspect-square rounded-lg text-sm font-semibold transition ${
                        !day
                          ? "bg-transparent"
                          : day.toDateString() === currentDate?.toDateString()
                            ? "bg-blue-600 text-white shadow-lg"
                            : day < new Date()
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 text-gray-800 hover:bg-blue-200"
                      }`}
                    >
                      {day?.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDateSlots.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Available Time Slots - {currentDate?.toLocaleDateString()}
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {selectedDateSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      disabled={!slot.isAvailable}
                      className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
                        selectedSlot === slot.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : !slot.isAvailable
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                      }`}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Symptoms (Optional)</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Describe your symptoms..."
                rows="4"
              />
            </div>

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              disabled={loading || !selectedSlot}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
