import { useState, useEffect, Profiler } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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

function App() {
  useEffect(() => {
    initializeAdminUser();
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUpForm />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
