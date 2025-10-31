"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"

export default function LabRequestHistory({ patientId }) {
  const { getToken } = useAuth()
  const [labRequests, setLabRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const fetchLabRequests = async () => {
      try {
        const token = getToken()
        const response = await fetch(`http://localhost:3001/api/lab-requests?patientId=${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        setLabRequests(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } catch (error) {
        console.error("Error fetching lab requests:", error)
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchLabRequests()
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lab Test Requests</h2>

      {labRequests.length > 0 ? (
        <div className="space-y-3">
          {labRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
              >
                <div className="text-left flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">
                      {Array.isArray(request.tests) ? `${request.tests.length} Test(s)` : "Lab Request"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        request.status === "PENDING"
                          ? "bg-amber-100 text-amber-800"
                          : request.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-600 transition ${expandedId === request.id ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === request.id && (
                <div className="p-4 bg-white border-t border-gray-200 space-y-3">
                  {Array.isArray(request.tests) && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Requested Tests:</h4>
                      <div className="space-y-1">
                        {request.tests.map((test, index) => (
                          <p key={index} className="text-sm text-gray-700">
                            • {test.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {request.results && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Results:</h4>
                      <p className="text-sm text-gray-700">{request.results}</p>
                    </div>
                  )}

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                    {request.results ? "Download Report" : "View Status"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <p>No lab tests requested</p>
        </div>
      )}
    </div>
  )
}
