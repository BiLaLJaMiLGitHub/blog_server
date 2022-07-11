const Post = require('../models/Post')
const respond = require('../util/respond')

const allPosts = async (req, res) => {}
const create = async (req, res) => {
  try {
    console.log('Data requested!: ', req.body)
    const post = new Post({
      ...req.body,
    })
    const response = await post.save()
    if (response) {
      return respond.data(res, response)
    } else {
      return respond.errorWithMessage(res, 'Post Created successfully!')
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

const update = (req, res) => {}

const destroy = (req, res) => {}

module.exports = { allPosts, create, update, destroy }
