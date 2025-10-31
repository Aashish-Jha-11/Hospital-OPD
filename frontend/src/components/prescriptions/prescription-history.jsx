"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"

export default function PrescriptionHistory({ patientId }) {
  const { getToken } = useAuth()
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = getToken()
        const response = await fetch(`http://localhost:3001/api/prescriptions?patientId=${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        setPrescriptions(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } catch (error) {
        console.error("Error fetching prescriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchPrescriptions()
    }
  }, [patientId, getToken])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Prescription History</h2>

      {prescriptions.length > 0 ? (
        <div className="space-y-3">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Dr. {prescription.doctor.name}</h3>
                  <p className="text-sm text-gray-600">{new Date(prescription.createdAt).toLocaleDateString()}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-600 transition ${expandedId === prescription.id ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === prescription.id && (
                <div className="p-4 bg-white border-t border-gray-200 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Medications:</h4>
                    {Array.isArray(prescription.medications) ? (
                      <div className="space-y-2">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg text-sm">
                            <p className="font-semibold text-gray-800">
                              {med.name} - {med.dosage}
                            </p>
                            <p className="text-gray-600">
                              {med.frequency} for {med.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No medications listed</p>
                    )}
                  </div>

                  {prescription.instructions && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
                      <p className="text-gray-700 text-sm">{prescription.instructions}</p>
                    </div>
                  )}

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <p>No prescriptions available</p>
        </div>
      )}
    </div>
  )
}
