import React, { useState } from 'react'
import FormInput from '../components/FormInput'
import { submitRecord } from '../api/mockApi'
import { useNavigate } from 'react-router-dom'

export default function DataEntry(){
  const [species, setSpecies] = useState('')
  const [count, setCount] = useState(1)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const record = { species, count, location, officer: 'Officer A' }
    const res = await submitRecord(record)
    setLoading(false)
    if (res.success) {
      // navigate to confirmation page (simulate blockchain tx view)
      navigate('/dashboard', { state: { confirmation: res.data } })
    } else {
      alert('Submission failed')
    }
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">New Planting Record</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput label="Species" value={species} onChange={e=>setSpecies(e.target.value)} required />
        <FormInput label="Number of trees" type="number" value={count} onChange={e=>setCount(Number(e.target.value))} min={1} />
        <FormInput label="Location (lat,lon or description)" value={location} onChange={e=>setLocation(e.target.value)} />
        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
            {loading ? 'Submitting…' : 'Submit & Record on Chain'}
          </button>
          <button type="button" onClick={()=>{ setSpecies(''); setCount(1); setLocation('') }} className="px-3 py-2 border rounded text-sm">Reset</button>
        </div>
      </form>
    </div>
  )
}
