"use client"

import { useState } from "react"
import { useAuth } from "../auth/use-auth"

export default function LabRequestForm({ patientId, onSuccess }) {
  const { getToken, user } = useAuth()
  const [selectedTests, setSelectedTests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const availableTests = [
    { id: "blood_test", name: "Blood Test (Complete)", category: "Hematology", price: 250 },
    { id: "glucose", name: "Fasting Glucose", category: "Biochemistry", price: 150 },
    { id: "thyroid", name: "Thyroid Profile (TSH, T3, T4)", category: "Endocrinology", price: 450 },
    { id: "lipid", name: "Lipid Profile", category: "Biochemistry", price: 350 },
    { id: "liver", name: "Liver Function Tests", category: "Biochemistry", price: 400 },
    { id: "kidney", name: "Kidney Function Tests", category: "Biochemistry", price: 400 },
    { id: "ecg", name: "Electrocardiogram (ECG)", category: "Cardiology", price: 500 },
    { id: "ultrasound", name: "Abdominal Ultrasound", category: "Radiology", price: 800 },
    { id: "xray", name: "Chest X-Ray", category: "Radiology", price: 600 },
    { id: "covid", name: "COVID-19 RT-PCR Test", category: "Virology", price: 400 },
  ]

  const toggleTest = (test) => {
    setSelectedTests((prev) => {
      const exists = prev.find((t) => t.id === test.id)
      if (exists) {
        return prev.filter((t) => t.id !== test.id)
      } else {
        return [...prev, test]
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedTests.length === 0) {
      setError("Please select at least one test")
      return
    }

    setLoading(true)
    setError("")

    try {
      const token = getToken()
      const response = await fetch("http://localhost:3001/api/lab-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId,
          doctorId: user.id,
          tests: selectedTests,
          status: "PENDING",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit lab request")
      }

      setSelectedTests([])
      onSuccess && onSuccess()
    } catch (error) {
      setError("Error submitting lab request")
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = selectedTests.reduce((sum, test) => sum + test.price, 0)
  const categories = [...new Set(availableTests.map((t) => t.category))]

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Lab Tests</h2>

      {error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tests by Category */}
        {categories.map((category) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-800 mb-3">{category}</h3>
            <div className="space-y-2">
              {availableTests
                .filter((t) => t.category === category)
                .map((test) => (
                  <label
                    key={test.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTests.some((t) => t.id === test.id)}
                      onChange={() => toggleTest(test)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-gray-800">{test.name}</p>
                    </div>
                    <p className="font-semibold text-blue-600">₹{test.price}</p>
                  </label>
                ))}
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Selected Tests:</p>
            <p className="font-semibold text-gray-800">{selectedTests.length}</p>
          </div>
          <div className="border-t border-blue-200 pt-2 flex items-center justify-between">
            <p className="font-semibold text-gray-800">Total Cost:</p>
            <p className="text-lg font-bold text-blue-600">₹{totalPrice}</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || selectedTests.length === 0}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Lab Request"}
        </button>
      </form>
    </div>
  )
}
