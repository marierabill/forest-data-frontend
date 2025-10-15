import express from 'express'
import { prisma } from '../prismaClient.js'
import { verifyOnChain } from '../services/blockchainService.js'  // optional blockchain verification

const router = express.Router()

// ✅ POST /api/records – Add new record
router.post('/', async (req, res) => {
  try {
    const { permitId, holderName, location, issuedDate, expiryDate, status } = req.body

    if (!permitId || !holderName) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' })
    }

    const record = await prisma.permit.create({
      data: { permitId, holderName, location, issuedDate, expiryDate, status },
    })

    res.json({ status: 'success', message: 'Record added successfully', data: record })
  } catch (err) {
    console.error('Error adding record:', err)
    res.status(500).json({ status: 'error', message: 'Server error', data: null })
  }
})

// ✅ GET /api/records – Fetch all records
router.get('/', async (req, res) => {
  try {
    const records = await prisma.permit.findMany({
      orderBy: { createdAt: 'desc' },
    })

    res.json({ status: 'success', message: 'Records fetched', data: records })
  } catch (err) {
    console.error('Error fetching records:', err)
    res.status(500).json({ status: 'error', message: 'Server error', data: [] })
  }
})

// ✅ GET /api/verification/:id – Fetch a specific record
router.get('/verification/:id', async (req, res) => {
  try {
    const { id } = req.params
    const record = await prisma.permit.findUnique({ where: { permitId: id } })

    if (!record)
      return res.status(404).json({ status: 'error', message: 'Record not found', data: null })

    res.json({ status: 'success', message: 'Record found', data: record })
  } catch (err) {
    console.error('Error fetching record:', err)
    res.status(500).json({ status: 'error', message: 'Server error', data: null })
  }
})

// ✅ POST /api/verify – Verify record authenticity
router.post('/verify', async (req, res) => {
  try {
    const { permitId } = req.body
    if (!permitId)
      return res.status(400).json({ status: 'error', message: 'Permit ID is required' })

    const record = await prisma.permit.findUnique({ where: { permitId } })
    if (!record)
      return res.status(404).json({ status: 'error', message: 'Permit not found', data: null })

    // Optionally verify via blockchain
    const isValid = await verifyOnChain(permitId)

    res.json({
      status: 'success',
      message: isValid ? 'Permit verified successfully' : 'Permit failed verification',
      data: { ...record, verified: isValid },
    })
  } catch (err) {
    console.error('Verification error:', err)
    res.status(500).json({ status: 'error', message: 'Server error', data: null })
  }
})

export default router
