const express = require('express')
const router = express.Router()

const {
  serverHealthCheck,
} = require('../controllers/main')

router.get('/status', serverHealthCheck)

module.exports = router
