const { config } = require('dotenv')
const { parsed } = config()
let env
if (parsed) {
  env = parsed
} else {
  env = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    PORT: process.env.PORT,
  }
}

module.exports = env
