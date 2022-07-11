const respond = {
  data: (res, data) => {
    return res.status(200).json(data)
  },

  error: (res, e) => {
    console.log('500 RESPONSE ERROR:', e)
    return res
      .status(500)
      .json(process.env.NODE_ENV !== 'production' ? e.message : null)
  },
  errorWithMessage: (res, e) => {
    return res.status(500).json({
      error: {
        message: process.env.NODE_ENV !== 'production' ? e.message : null,
      },
    })
  },
  failedWithMessage: (res, e) => {
    return res.status(200).json({
      error: {
        message: e,
      },
    })
  },
  unauthorized: (res, e) => {
    return res.status(401).json({
      error: {
        message: e,
      },
    })
  },
  notFoundWithMessage: (res, e) => {
    return res.status(404).json({
      error: {
        message: e,
      },
    })
  },
  missingFields: (res, e) => {
    return res.status(422).json({
      error: {
        message: e,
      },
    })
  },
  notFound: (res, message) => {
    return res.status(404).json(message)
  },
  fail: (res, message) => {
    return res.status(500).json(message)
  },
  notChangedWithMessage: (res, e) => {
    return res.status(204).json({
      error: {
        message: e,
      },
    })
  },
  notChanged: (res) => {
    return res.status(204).json()
  },
  badRequestWithMessage: (res, e) => {
    return res.status(204).json({
      error: {
        message: e,
      },
    })
  },
  badRequest: (res, message) => {
    return res.status(400).json(message)
  },
  conflict: (res, message) => {
    return res.status(409).json({
      error: {
        message,
      },
    })
  },
  destroyed: (res, message) => {
    return res.status(400).json(message)
  },
}

module.exports = respond
