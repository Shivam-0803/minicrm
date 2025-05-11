const express = require('express')
const { body, validationResult } = require('express-validator')
const Order = require('../models/Order')
const router = express.Router()

// Ingest order (POST)
router.post('/', [
  body('customerId').notEmpty(),
  body('amount').isNumeric(),
  body('items').isArray()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  await Order.create(req.body)
  res.json({ status: 'saved' })
})

// List orders (GET)
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })
  res.json(orders)
})

module.exports = router 