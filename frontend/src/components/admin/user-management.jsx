"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"

export default function UserManagement() {
  const { getToken } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock user data
        setUsers([
          {
            id: 1,
            email: "patient1@example.com",
            role: "PATIENT",
            name: "John Doe",
            createdAt: "2024-01-15",
            status: "active",
          },
          {
            id: 2,
            email: "doctor1@example.com",
            role: "DOCTOR",
            name: "Dr. Jane Smith",
            createdAt: "2024-01-10",
            status: "active",
          },
          {
            id: 3,
            email: "patient2@example.com",
            role: "PATIENT",
            name: "Alice Johnson",
            createdAt: "2024-01-20",
            status: "active",
          },
          {
            id: 4,
            email: "doctor2@example.com",
            role: "DOCTOR",
            name: "Dr. Bob Wilson",
            createdAt: "2024-01-12",
            status: "inactive",
          },
        ])
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [getToken])

  const getFilteredUsers = () => {
    if (filter === "all") return users
    if (filter === "patient") return users.filter((u) => u.role === "PATIENT")
    if (filter === "doctor") return users.filter((u) => u.role === "DOCTOR")
    return users
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const filteredUsers = getFilteredUsers()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <div className="flex gap-2">
          {["all", "patient", "doctor"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {f === "all" ? "All Users" : f + "s"}
            </button>
          ))}
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "PATIENT"
                          ? "bg-green-100 text-green-800"
                          : user.role === "DOCTOR"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 font-semibold">
          Total: {filteredUsers.length} users
        </div>
      </div>
    </div>
  )
}
