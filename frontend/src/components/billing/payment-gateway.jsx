"use client"

import { useState } from "react"

export default function PaymentGateway({ billId, amount, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleCardChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/(\d{2})/g, "$1/").slice(0, 5)
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }))
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setMessage("Payment successful! Invoice will be updated shortly.")
      setTimeout(() => {
        onPaymentSuccess && onPaymentSuccess()
      }, 2000)
    } catch (error) {
      setMessage("Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Gateway</h2>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg text-sm ${
            message.includes("successful") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Amount Display */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 font-medium">Total Amount Due</p>
        <p className="text-3xl font-bold text-blue-600">₹{amount.toFixed(2)}</p>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
        <div className="space-y-2">
          {["card", "upi", "netbanking"].map((method) => (
            <label
              key={method}
              className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 font-semibold text-gray-800 capitalize">
                {method === "upi" ? "UPI" : method === "netbanking" ? "Net Banking" : "Credit/Debit Card"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={cardData.cardholderName}
              onChange={handleCardChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleCardChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value.slice(0, 4) }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
          </button>
        </form>
      )}

      {/* UPI Payment */}
      {paymentMethod === "upi" && (
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
            <input
              type="text"
              placeholder="yourname@upi"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
          </button>
        </form>
      )}

      {/* Net Banking */}
      {paymentMethod === "netbanking" && (
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Bank</label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="">Choose your bank...</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
          </button>
        </form>
      )}
    </div>
  )
}
