"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/use-auth"
import InvoiceCard from "./invoice-card"
import InvoiceDetail from "./invoice-detail"

export default function BillingHistory({ patientId }) {
  const { getToken } = useAuth()
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBill, setSelectedBill] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = getToken()
        const response = await fetch(`http://localhost:3001/api/bills?patientId=${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        setBills(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } catch (error) {
        console.error("Error fetching bills:", error)
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchBills()
    }
  }, [patientId, getToken])

  const getFilteredBills = () => {
    switch (filter) {
      case "paid":
        return bills.filter((b) => b.status === "PAID")
      case "pending":
        return bills.filter((b) => b.status === "PENDING")
      case "overdue":
        return bills.filter((b) => b.status === "OVERDUE")
      default:
        return bills
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const filteredBills = getFilteredBills()
  const totalDue = filteredBills
    .filter((b) => b.status === "PENDING" || b.status === "OVERDUE")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0)

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing History</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Total Invoices</p>
          <p className="text-2xl font-bold text-blue-600">{bills.length}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Pending Payment</p>
          <p className="text-2xl font-bold text-amber-600">₹{totalDue.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Paid Invoices</p>
          <p className="text-2xl font-bold text-green-600">{bills.filter((b) => b.status === "PAID").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "paid", "overdue"].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
              filter === filterOption
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => (
            <div key={bill.id} onClick={() => setSelectedBill(bill)} className="cursor-pointer">
              <InvoiceCard bill={bill} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-600">
            <p>No invoices found</p>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedBill && <InvoiceDetail bill={selectedBill} onClose={() => setSelectedBill(null)} />}
    </div>
  )
}
