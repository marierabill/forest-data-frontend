import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DataEntry from './pages/DataEntry'
import Verification from './pages/Verification'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          }/>
          <Route path="/data-entry" element={
            <ProtectedRoute><DataEntry /></ProtectedRoute>
          }/>
          <Route path="/verify" element={
            <ProtectedRoute><Verification /></ProtectedRoute>
          }/>
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
    </div>
  )
}
