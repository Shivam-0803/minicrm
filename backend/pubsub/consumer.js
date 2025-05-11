require('dotenv').config()
const mongoose = require('mongoose')
// const redis = require('redis')
const Customer = require('../models/Customer')
const Order = require('../models/Order')

mongoose.connect(process.env.MONGO_URI)
// const redisClient = redis.createClient({ url: process.env.REDIS_URL })
// redisClient.connect()

async function consume() {
  while (true) {
    // const customer = await redisClient.rPop('customer_ingest')
    if (customer) await Customer.create(JSON.parse(customer))
    // const order = await redisClient.rPop('order_ingest')
    if (order) await Order.create(JSON.parse(order))
    await new Promise(r => setTimeout(r, 500))
  }
}
consume() 