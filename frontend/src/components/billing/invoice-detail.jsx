"use client"

import { useState } from "react"

export default function InvoiceDetail({ bill, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("card")

  const getTotalAmount = () => {
    if (Array.isArray(bill.items)) {
      return bill.items.reduce((sum, item) => sum + (item.amount || 0), 0)
    }
    return bill.totalAmount
  }

  const generatePDF = () => {
    const content = `
      INVOICE #${bill.id}
      ==================
      Date: ${new Date(bill.createdAt).toLocaleDateString()}
      Status: ${bill.status}
      
      Items:
      ${Array.isArray(bill.items) ? bill.items.map((item) => `${item.description}: ₹${item.amount}`).join("\n") : ""}
      
      Total: ₹${getTotalAmount().toFixed(2)}
    `

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", `invoice-${bill.id}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="backdrop-blur-xl bg-white/95 border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Invoice #{bill.id}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 font-bold text-xl">
            ✕
          </button>
        </div>

        {/* Invoice Details */}
        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Invoice Date</p>
              <p className="text-lg font-semibold text-gray-800">{new Date(bill.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Status</p>
              <p className="text-lg font-semibold text-blue-600">{bill.status}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              {Array.isArray(bill.items) && bill.items.length > 0 ? (
                bill.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-800">
                    <span>{item.description || `Item ${index + 1}`}</span>
                    <span className="font-semibold">₹{item.amount}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No items listed</p>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">₹{getTotalAmount().toFixed(2)}</span>
          </div>

          {/* Payment Info */}
          {bill.status === "PAID" && bill.paymentDate && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 font-medium mb-1">Payment Date</p>
              <p className="text-lg font-semibold text-green-700">{new Date(bill.paymentDate).toLocaleDateString()}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={generatePDF}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
