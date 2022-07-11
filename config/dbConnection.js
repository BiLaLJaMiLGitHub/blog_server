// Import Package
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./')


const connect = async (count = 0) => {
  console.log('🔁 Connecting MongoDB Atlas... try', count)
  try {
    if (count < 3) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('🌱 MongoDB Atlas Connected')
      return true
    } else {
      console.log('❌ Mongo Connection Error (Restart Server)')
    }
  } catch (e) {
    console.log('❌ Mongo Error:', e)
    await connect(count + 1)
    return false
  }
}

// Exports
module.exports = connect
