const respond = require('../util/respond')

const serverHealthCheck = (req, res) => {
  try {
    res.status(200).json({
      message: 'all good here!',
    })
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

module.exports = {
  serverHealthCheck,
}
