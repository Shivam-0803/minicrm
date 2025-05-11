const mongoose = require('mongoose')

const CampaignSchema = new mongoose.Schema({
  name: String,
  segmentRules: Object,
  message: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  audienceSize: Number,
  stats: {
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 }
  }
})

module.exports = mongoose.model('Campaign', CampaignSchema) 