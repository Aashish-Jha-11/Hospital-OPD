export default function AppointmentCard({ appointment }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800"
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-xl p-4 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-800">Dr. {appointment.doctor.name}</h3>
          <p className="text-sm text-gray-600">{appointment.doctor.specialization}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Date</p>
          <p className="font-semibold text-gray-800">{formatDate(appointment.slot.date)}</p>
        </div>
        <div>
          <p className="text-gray-600">Time</p>
          <p className="font-semibold text-gray-800">{appointment.slot.startTime}</p>
        </div>
      </div>

      {appointment.symptoms && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">Symptoms</p>
          <p className="text-sm text-gray-800">{appointment.symptoms}</p>
        </div>
      )}
    </div>
  )
}
