// src/api/mockApi.js
const STORAGE_KEY = 'bfdi_records_v1'

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

/** Submit a new planting / permit record */
export async function submitRecord(record) {
  // simulate network delay
  await new Promise(r => setTimeout(r, 700))

  const id = 'rec_' + Date.now()
  const txHash = '0x' + Math.random().toString(16).slice(2, 10) + Date.now().toString(16).slice(3)
  const stored = { ...record, id, txHash, createdAt: new Date().toISOString(), status: 'submitted' }
  const list = readAll()
  list.unshift(stored)
  saveAll(list)
  return { success: true, data: stored }
}

/** Verify by txHash or permit id */
export async function verifyByTxHash(txHash) {
  await new Promise(r => setTimeout(r, 500))
  const list = readAll()
  const found = list.find(r => r.txHash === txHash)
  if (found) return { success: true, data: found }
  return { success: false, error: 'Not found' }
}

/** Return mock metrics for dashboard */
export async function fetchMetrics() {
  await new Promise(r => setTimeout(r, 300))
  const list = readAll()
  return {
    totalRecords: list.length,
    lastSubmission: list[0] || null
  }
}
