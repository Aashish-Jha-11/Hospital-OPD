"use client"

import { useState } from "react"
import { useAuth } from "../auth/use-auth"

export default function PrescriptionForm({ patientId, appointmentId, onSuccess }) {
  const { getToken, user } = useAuth()
  const [medications, setMedications] = useState([{ name: "", dosage: "", frequency: "", duration: "" }])
  const [instructions, setInstructions] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const commonMedications = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin", "Omeprazole", "Metformin"]
  const commonDosages = ["250mg", "500mg", "1000mg", "250ml", "500ml"]
  const commonFrequencies = ["Once daily", "Twice daily", "Three times daily", "Every 8 hours", "Every 4 hours"]
  const commonDurations = ["5 days", "7 days", "10 days", "14 days", "1 month"]

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications]
    newMedications[index][field] = value
    setMedications(newMedications)
  }

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "" }])
  }

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = getToken()
      const response = await fetch("http://localhost:3001/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId,
          doctorId: user.id, // This should be the doctor's database ID
          appointmentId,
          medications,
          instructions,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create prescription")
        return
      }

      setMedications([{ name: "", dosage: "", frequency: "", duration: "" }])
      setInstructions("")
      onSuccess && onSuccess(data)
    } catch (error) {
      setError("Error creating prescription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Prescription</h2>

      {error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Medications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medications</h3>
          <div className="space-y-4">
            {medications.map((med, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">Medication {index + 1}</h4>
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Medication Name</label>
                    <select
                      value={med.name}
                      onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select medication...</option>
                      {commonMedications.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                    {med.name === "other" && (
                      <input
                        type="text"
                        placeholder="Enter medication name"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 mt-2"
                        onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dosage</label>
                    <select
                      value={med.dosage}
                      onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select dosage...</option>
                      {commonDosages.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                    <select
                      value={med.frequency}
                      onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select frequency...</option>
                      {commonFrequencies.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                    <select
                      value={med.duration}
                      onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select duration...</option>
                      {commonDurations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addMedication}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition"
          >
            + Add Medication
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Special Instructions (Optional)</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="e.g., Take with food, avoid dairy products..."
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Creating Prescription..." : "Create Prescription"}
        </button>
      </form>
    </div>
  )
}
