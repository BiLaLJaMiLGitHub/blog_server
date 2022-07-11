const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config')

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, JWT_SECRET_KEY)
    req.user = user
    console.log('Active user = ', user)
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid user!',
    })
  }
}

const signToken = (data) => {
  try {
    return jwt.sign(data, JWT_SECRET_KEY)
  } catch (error) {
    return error
  }
}

module.exports = { checkAuth, signToken }
