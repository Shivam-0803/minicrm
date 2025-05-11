const mongoose = require('mongoose')

const CommunicationLogSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'pending' },
  message: String,
  sentAt: Date,
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CommunicationLog', CommunicationLogSchema) 