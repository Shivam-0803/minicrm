const express = require('express')
const CommunicationLog = require('../models/CommunicationLog')
const router = express.Router()

// Simulate vendor delivery
router.post('/send', async (req, res) => {
  const { logId } = req.body
  const status = Math.random() < 0.9 ? 'sent' : 'failed'
  await CommunicationLog.findByIdAndUpdate(logId, { status, sentAt: new Date(), updatedAt: new Date() })
  res.json({ status })
})

// Delivery receipt API
router.post('/receipt', async (req, res) => {
  const { logId, status } = req.body
  await CommunicationLog.findByIdAndUpdate(logId, { status, updatedAt: new Date() })
  res.json({ status: 'updated' })
})

module.exports = router 