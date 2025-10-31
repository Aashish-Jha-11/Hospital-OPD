"use client"

export default function SystemOverview({ stats }) {
  const overviewCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "blue",
      trend: "+12%",
    },
    {
      label: "Total Patients",
      value: stats.totalPatients,
      icon: "🏥",
      color: "green",
      trend: "+8%",
    },
    {
      label: "Total Doctors",
      value: stats.totalDoctors,
      icon: "👨‍⚕️",
      color: "purple",
      trend: "+5%",
    },
    {
      label: "Total Appointments",
      value: stats.totalAppointments,
      icon: "📅",
      color: "amber",
      trend: "+23%",
    },
    {
      label: "Completed",
      value: stats.completedAppointments,
      icon: "✓",
      color: "green",
      percentage: ((stats.completedAppointments / stats.totalAppointments) * 100).toFixed(1) + "%",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: "💰",
      color: "green",
      trend: "+18%",
    },
    {
      label: "Pending Payments",
      value: `₹${stats.pendingPayments.toLocaleString()}`,
      icon: "⏳",
      color: "red",
      amount: stats.pendingPayments,
    },
    {
      label: "System Status",
      value: "Operational",
      icon: "✓",
      color: "green",
      status: "All systems operational",
    },
  ]

  const getBgColor = (color) => {
    const colors = {
      blue: "bg-blue-100",
      green: "bg-green-100",
      purple: "bg-purple-100",
      amber: "bg-amber-100",
      red: "bg-red-100",
    }
    return colors[color]
  }

  const getTextColor = (color) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      amber: "text-amber-600",
      red: "text-red-600",
    }
    return colors[color]
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((card, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition"
          >
            <div
              className={`${getBgColor(card.color)} ${getTextColor(card.color)} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-3`}
            >
              {card.icon}
            </div>

            <p className="text-gray-600 text-sm font-medium mb-2">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800 mb-2">{card.value}</p>

            {card.trend && <p className="text-xs text-green-600 font-semibold">{card.trend} this month</p>}
            {card.percentage && (
              <p className="text-xs text-gray-600 font-semibold">{card.percentage} completion rate</p>
            )}
            {card.status && <p className="text-xs text-gray-600 font-semibold">{card.status}</p>}
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>

        <div className="space-y-3">
          {[
            { action: "New appointment booked", time: "5 minutes ago", icon: "📅" },
            { action: "Prescription issued", time: "12 minutes ago", icon: "💊" },
            { action: "Payment received", time: "1 hour ago", icon: "💳" },
            { action: "Lab test completed", time: "2 hours ago", icon: "🧪" },
            { action: "Doctor profile updated", time: "3 hours ago", icon: "👨‍⚕️" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
