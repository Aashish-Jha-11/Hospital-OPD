"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsCharts({ stats }) {
  const appointmentTrendData = [
    { month: "Jan", appointments: 280, completed: 240 },
    { month: "Feb", appointments: 320, completed: 300 },
    { month: "Mar", appointments: 410, completed: 380 },
    { month: "Apr", appointments: 390, completed: 350 },
    { month: "May", appointments: 470, completed: 430 },
    { month: "Jun", appointments: 520, completed: 480 },
  ]

  const departmentData = [
    { name: "Cardiology", value: 180, fill: "#2563eb" },
    { name: "Orthopedics", value: 150, fill: "#10b981" },
    { name: "Neurology", value: 120, fill: "#f59e0b" },
    { name: "General", value: 200, fill: "#8b5cf6" },
    { name: "Pediatrics", value: 100, fill: "#ec4899" },
  ]

  const revenueData = [
    { week: "Week 1", revenue: 15000, patients: 120 },
    { week: "Week 2", revenue: 18000, patients: 145 },
    { week: "Week 3", revenue: 22000, patients: 165 },
    { week: "Week 4", revenue: 25000, patients: 180 },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Reports</h2>

      {/* Appointment Trend */}
      <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Appointment Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="appointments" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Department Distribution */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Appointments by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#2563eb" />
              <Bar dataKey="patients" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Avg Appointments/Day</p>
          <p className="text-3xl font-bold text-blue-600">{(stats.totalAppointments / 30).toFixed(1)}</p>
          <p className="text-xs text-gray-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Patient Satisfaction</p>
          <p className="text-3xl font-bold text-green-600">4.7/5.0</p>
          <p className="text-xs text-gray-600 mt-2">Based on 120 reviews</p>
        </div>

        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">System Uptime</p>
          <p className="text-3xl font-bold text-purple-600">99.9%</p>
          <p className="text-xs text-gray-600 mt-2">Last 30 days</p>
        </div>
      </div>
    </div>
  )
}
