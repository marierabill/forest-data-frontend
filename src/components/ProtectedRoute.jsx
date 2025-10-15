import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../api/supabaseClient'

export default function ProtectedRoute({ children }){
  const user = auth.user()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
