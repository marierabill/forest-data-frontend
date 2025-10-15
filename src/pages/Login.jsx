import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/supabaseClient'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await auth.signIn({ email, password })
    setLoading(false)
    if (data && !error) {
      navigate('/dashboard')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} required className="mt-1 block w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="mt-1 block w-full border p-2 rounded" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <button type="button" onClick={()=>{ setEmail('officer@kfs.go.ke'); setPassword('password') }} className="text-sm text-slate-500">Use sample account</button>
        </div>
      </form>
    </div>
  )
}
