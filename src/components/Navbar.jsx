import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../api/supabaseClient'

export default function Navbar(){
  const navigate = useNavigate()
  const user = auth.user()

  const handleLogout = async () => {
    await auth.signOut()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-green-700 font-bold">KFS • BFDI</div>
          <nav className="flex gap-3 text-sm">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/data-entry" className="hover:underline">Data Entry</Link>
            <Link to="/verify" className="hover:underline">Verify Permit</Link>
          </nav>
        </div>

        <div className="text-sm">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-600">{user.email}</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-50 border rounded text-red-600 text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="px-3 py-1 bg-blue-50 border rounded text-blue-600">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  )
}
