const express = require('express')
const { body, validationResult } = require('express-validator')
const Campaign = require('../models/Campaign')
const Customer = require('../models/Customer')
const CommunicationLog = require('../models/CommunicationLog')
const { getMessageSuggestions } = require('../ai/openai')
const router = express.Router()

// Helper: filter customers by rules (very basic)
function filterCustomers(customers, rules) {
  return customers.filter(c => {
    let ok = true
    if (rules.spend) ok = ok && c.totalSpend > rules.spend
    if (rules.visits) ok = ok && c.visits < rules.visits
    if (rules.inactiveDays) ok = ok && ((Date.now() - new Date(c.lastActive)) / 86400000) > rules.inactiveDays
    return ok
  })
}

// Preview audience size
router.post('/preview', async (req, res) => {
  const customers = await Customer.find()
  const filtered = filterCustomers(customers, req.body.rules)
  res.json({ audienceSize: filtered.length })
})

// Create campaign
router.post('/', [
  body('name').notEmpty(),
  body('rules').isObject(),
  body('message').notEmpty(),
  body('createdBy').notEmpty()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const customers = await Customer.find()
  const audience = filterCustomers(customers, req.body.rules)
  const campaign = await Campaign.create({
    name: req.body.name,
    segmentRules: req.body.rules,
    message: req.body.message,
    createdBy: req.body.createdBy,
    audienceSize: audience.length
  })
  // Log communication
  for (let c of audience) {
    await CommunicationLog.create({
      campaignId: campaign._id,
      customerId: c._id,
      message: req.body.message,
      status: 'pending'
    })
  }
  res.json({ campaignId: campaign._id })
})

// List campaigns
router.get('/', async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 })
  res.json(campaigns)
})

// AI message suggestions
router.post('/suggest', async (req, res) => {
  const { objective } = req.body
  const suggestions = await getMessageSuggestions(objective)
  res.json({ suggestions })
})

module.exports = router 