const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  totalSpend: Number,
  visits: Number,
  lastActive: Date,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Customer', CustomerSchema) 