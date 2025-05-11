const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  items: [String],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', OrderSchema) 