import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/auth/use-auth';

import HomePage from './pages/HomePage';
import LoginForm from './components/auth/login-form';
import SignupForm from './components/auth/signup-form';
import PatientDashboard from './components/patient/patient-dashboard';
import DoctorDashboard from './components/doctor/doctor-dashboard';
import AdminDashboard from './components/admin/admin-dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={!user ? <HomePage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <SignupForm /> : <Navigate to="/dashboard" />} />

      {/* Dashboard - role ke hisaab se */}
      <Route 
        path="/dashboard" 
        element={
          user ? (
            user.role === 'PATIENT' ? <PatientDashboard /> :
            user.role === 'DOCTOR' ? <DoctorDashboard /> :
            user.role === 'ADMIN' ? <AdminDashboard /> :
            <Navigate to="/login" />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />

      {/* Baaki sab routes home pe redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
