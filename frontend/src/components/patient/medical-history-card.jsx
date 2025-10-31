"use client"

import { useState } from "react"

export default function MedicalHistoryCard({ patient }) {
  const [expanded, setExpanded] = useState(false)

  const medicalHistory = patient?.medicalHistory || {}

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Medical History</h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 font-medium">Date of Birth</p>
          <p className="text-gray-800 font-semibold">
            {patient?.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium">Emergency Contact</p>
          <p className="text-gray-800 font-semibold">{patient?.emergencyContact || "N/A"}</p>
        </div>

        {Object.keys(medicalHistory).length > 0 && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              {expanded ? "Hide" : "View"} Medical Conditions
            </button>
            {expanded && (
              <div className="mt-2 bg-blue-50 p-3 rounded-lg">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                  {JSON.stringify(medicalHistory, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
