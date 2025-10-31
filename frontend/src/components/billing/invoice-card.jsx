export default function InvoiceCard({ bill }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800"
      case "PAID":
        return "bg-green-100 text-green-800"
      case "OVERDUE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalAmount = () => {
    if (Array.isArray(bill.items)) {
      return bill.items.reduce((sum, item) => sum + (item.amount || 0), 0)
    }
    return bill.totalAmount
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-xl p-4 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-800">Invoice #{bill.id}</h3>
          <p className="text-sm text-gray-600">{new Date(bill.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bill.status)}`}>
          {bill.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {Array.isArray(bill.items) && bill.items.length > 0 ? (
          bill.items.slice(0, 2).map((item, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-700">
              <span>{item.description || `Item ${index + 1}`}</span>
              <span className="font-semibold">₹{item.amount}</span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-600">No items</div>
        )}
        {Array.isArray(bill.items) && bill.items.length > 2 && (
          <div className="text-sm text-gray-600">+{bill.items.length - 2} more items</div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
        <span className="font-semibold text-gray-800">Total:</span>
        <span className="text-lg font-bold text-blue-600">₹{getTotalAmount().toFixed(2)}</span>
      </div>
    </div>
  )
}
