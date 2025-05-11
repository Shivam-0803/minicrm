const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: true
}), (req, res) => {
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

module.exports = router 