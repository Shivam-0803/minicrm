require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Passport config
require('./middleware/auth')(passport)

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/customers', require('./routes/customer'))
app.use('/api/orders', require('./routes/order'))
app.use('/api/campaigns', require('./routes/campaign'))
app.use('/api/delivery', require('./routes/delivery'))

// Swagger docs (dummy, to be replaced with actual docs)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup({}))

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server running on port', PORT)) 