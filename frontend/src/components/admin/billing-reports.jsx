"use client"

export default function BillingReports() {
  const billingSummary = [
    { month: "January", invoiced: 125000, paid: 115000, outstanding: 10000, percentage: 92 },
    { month: "February", invoiced: 145000, paid: 138000, outstanding: 7000, percentage: 95 },
    { month: "March", invoiced: 160000, paid: 152000, outstanding: 8000, percentage: 95 },
    { month: "April", invoiced: 175000, paid: 165000, outstanding: 10000, percentage: 94 },
    { month: "May", invoiced: 195000, paid: 185000, outstanding: 10000, percentage: 95 },
    { month: "June", invoiced: 210000, paid: 198000, outstanding: 12000, percentage: 94 },
  ]

  const paymentMethods = [
    { method: "Credit/Debit Card", count: 450, amount: 225000, percentage: 45 },
    { method: "UPI", count: 380, amount: 190000, percentage: 38 },
    { method: "Net Banking", count: 170, amount: 85000, percentage: 17 },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing & Payment Reports</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Invoiced</p>
          <p className="text-3xl font-bold text-blue-600">₹10,10,000</p>
          <p className="text-xs text-gray-600 mt-2">Last 6 months</p>
        </div>

        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Collected</p>
          <p className="text-3xl font-bold text-green-600">₹9,53,000</p>
          <p className="text-xs text-gray-600 mt-2">94% collection rate</p>
        </div>

        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Outstanding</p>
          <p className="text-3xl font-bold text-amber-600">₹57,000</p>
          <p className="text-xs text-gray-600 mt-2">6% pending</p>
        </div>

        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Monthly Avg</p>
          <p className="text-3xl font-bold text-purple-600">₹1,68,333</p>
          <p className="text-xs text-gray-600 mt-2">Invoiced per month</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Billing Summary</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Month</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Invoiced</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Collected</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Outstanding</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Collection %</th>
              </tr>
            </thead>
            <tbody>
              {billingSummary.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">{row.month}</td>
                  <td className="px-4 py-3 text-right text-gray-700">₹{row.invoiced.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">₹{row.paid.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-amber-700">₹{row.outstanding.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${row.percentage}%` }}></div>
                      </div>
                      <span className="font-semibold text-gray-800">{row.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Methods Distribution</h3>

        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800">{method.method}</p>
                  <p className="text-sm text-gray-600">{method.count} transactions</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₹{method.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{method.percentage}% of total</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${method.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
