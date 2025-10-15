import React, { useEffect, useState } from 'react'
import { fetchMetrics } from '../api/mockApi'

export default function Dashboard(){
  const [metrics, setMetrics] = useState({ totalRecords: 0, lastSubmission: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchMetrics().then(res => {
      if (mounted) {
        setMetrics(res)
        setLoading(false)
      }
    })
    return () => mounted = false
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
        {loading ? <div>Loading metrics…</div> : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Total Records</div>
                <div className="text-2xl font-bold">{metrics.totalRecords}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Last submission</div>
                <div className="text-sm">{metrics.lastSubmission ? new Date(metrics.lastSubmission.createdAt).toLocaleString() : '—'}</div>
              </div>
            </div>
            <div className="mt-4">
              <strong>Latest:</strong>
              <pre className="mt-2 bg-slate-50 p-3 rounded text-sm">{metrics.lastSubmission ? JSON.stringify(metrics.lastSubmission, null, 2) : 'No submissions yet'}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Quick Actions</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/data-entry" className="text-green-600">+ New planting record</a></li>
          <li><a href="/verify" className="text-blue-600">Verify a permit</a></li>
        </ul>
      </div>
    </div>
  )
}
