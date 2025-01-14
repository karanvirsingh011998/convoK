import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout'
import { PrivateLayout } from './layouts/PrivateLayout'
import { LoginForm } from './pages/Login'
import { SignUpForm } from './pages/SignUp'
import LandingPage from './pages/LandingPage'
import { initializeAdminUser } from './utils/auth'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import { NotFound } from './pages/NotFound'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  useEffect(() => {
    initializeAdminUser();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <SignUpForm />
              </PublicRoute>
            } 
          />
        </Route>

        {/* Private Routes */}
        <Route 
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
