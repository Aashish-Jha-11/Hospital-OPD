import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="backdrop-blur-xl bg-white/80 border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MediHub
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 text-gray-700 font-semibold hover:text-blue-600 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 text-balance">
              Hospital OPD Management System
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Complete outpatient department solution with appointment booking, digital prescriptions, lab management,
              billing, and real-time patient-doctor communication.
            </p>

            <div className="flex gap-4">
              <Link
                to="/signup?role=PATIENT"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Join as Patient
              </Link>
              <Link
                to="/signup?role=DOCTOR"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Join as Doctor
              </Link>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Smart Appointments</h3>
                  <p className="text-sm text-gray-600">Interactive calendar booking with real-time slot availability</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💊</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Digital Prescriptions</h3>
                  <p className="text-sm text-gray-600">Manage medications, dosages, and prescription history</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧪</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Lab Management</h3>
                  <p className="text-sm text-gray-600">Request tests, track results, and manage lab requests</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Billing & Payments</h3>
                  <p className="text-sm text-gray-600">Invoice generation with multiple payment options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/40 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">Complete Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👥",
                title: "Multi-Role Authentication",
                description: "Secure JWT-based login for Patients, Doctors, and Admins",
              },
              {
                icon: "📊",
                title: "Real-Time Updates",
                description: "Live notifications and dashboard updates via Socket.io",
              },
              {
                icon: "📱",
                title: "Progressive Web App",
                description: "Offline access and installable app with push notifications",
              },
              {
                icon: "💬",
                title: "Patient-Doctor Chat",
                description: "Real-time messaging between patients and healthcare providers",
              },
              {
                icon: "📈",
                title: "Analytics & Reports",
                description: "Comprehensive admin dashboards with billing and system analytics",
              },
              {
                icon: "🔒",
                title: "Secure & HIPAA Ready",
                description: "Enterprise-grade security with encrypted data handling",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare providers using MediHub for efficient patient management
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-white/80 border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 MediHub - Hospital OPD Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
