const express = require('express')
const router = express.Router()

const { checkAuth } = require('../middleware/check-auth')
const { getUser, signup, signin, update } = require('../controllers/users')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/', checkAuth, getUser)
router.put('/', checkAuth, update)

module.exports = router
