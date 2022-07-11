const express = require('express')
const router = express.Router()

const { allPosts, create, update, destroy } = require('../controllers/post')

router.get('/', allPosts)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router
