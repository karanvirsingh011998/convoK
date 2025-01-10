import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout'
import { PrivateLayout } from './layouts/PrivateLayout'
import { LoginForm } from './components/login-form'
import { SignUpForm } from './components/sign-up-form'
import LandingPage from './pages/LandingPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(storedAuthStatus === 'true')
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true')
    } else {
      localStorage.removeItem('isAuthenticated')
    }
  }, [isAuthenticated])

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpForm setIsAuthenticated={setIsAuthenticated} />} />
      </Route>

      {/* Private Routes */}
      <Route element={isAuthenticated ? <PrivateLayout  setIsAuthenticated={setIsAuthenticated}  /> : <Navigate to="/login" />}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  )
}

export default App
