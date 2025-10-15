import React, { useState } from 'react'
import { verifyByTxHash } from '../api/mockApi'

export default function Verification(){
  const [tx, setTx] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e) => {
    e && e.preventDefault()
    setLoading(true)
    const res = await verifyByTxHash(tx.trim())
    setLoading(false)
    setResult(res)
  }

  // quick sample QR-simulate button that fills tx with latest stored tx
  const loadLatest = () => {
    const records = JSON.parse(localStorage.getItem('bfdi_records_v1') || '[]')
    if (records.length) setTx(records[0].txHash)
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Permit / Transaction Verification</h2>

      <div className="space-y-2">
        <button onClick={loadLatest} className="px-3 py-1 bg-slate-100 border rounded text-sm">Load latest tx (simulate QR)</button>
      </div>

      <form onSubmit={handleVerify} className="flex gap-2">
        <input value={tx} onChange={e=>setTx(e.target.value)} placeholder="Enter transaction hash or scan QR" className="flex-1 border p-2 rounded" />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>
          {loading ? 'Checking…' : 'Verify'}
        </button>
      </form>

      <div>
        {result == null ? <div className="text-sm text-slate-500">Enter tx hash to verify.</div> : (
          result.success ? (
            <div className="p-3 bg-slate-50 rounded">
              <div className="text-sm text-slate-600">Found:</div>
              <pre className="text-xs mt-2">{JSON.stringify(result.data, null, 2)}</pre>
            </div>
          ) : (
            <div className="text-red-600">Not found</div>
          )
        )}
      </div>
    </div>
  )
}
