const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    post_title: {
      type: String,
      required: true,
    },
    post_data: [
      {
        content_title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Post', PostSchema)
