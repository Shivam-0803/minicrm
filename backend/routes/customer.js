const express = require('express')
const { body, validationResult } = require('express-validator')
const Customer = require('../models/Customer')
const router = express.Router()

// Ingest customer (POST)
router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('phone').notEmpty()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  await Customer.create(req.body)
  res.json({ status: 'saved' })
})

// List customers (GET)
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 })
  res.json(customers)
})

module.exports = router 