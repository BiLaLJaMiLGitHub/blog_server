const User = require('../models/User')
const respond = require('../util/respond')
const bcrypt = require('bcrypt')
const { signToken } = require('../middleware/check-auth')

const signup = async (req, res) => {
  try {
    const saltRounds = 10
    const isHash = await bcrypt.hash(req.body.password, saltRounds)
    const user = new User({ ...req.body, password: isHash })
    const resUser = await user.save()
    if (resUser) {
      return respond.data(res, resUser)
    } else {
      return respond.errorWithMessage(res, 'Account activation no successful!')
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

const signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return respond.notFoundWithMessage(
        res,
        'email, password and role_type are required!',
      )
    }
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const userData = {
          _id: user._id,
          email: user.email,
        }
        const token = await signToken(userData)
        return respond.data(res, {
          token: token,
          user: userData,
        })
      } else {
        return respond.notFoundWithMessage(res, 'Wrong Credentials!')
      }
    } else {
      return respond.notFoundWithMessage(res, 'User is not registered!')
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

//UPDATE
const update = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(401).json('You can update only your account!')
  }
}

//GET USER
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { signup, signin, update, getUser }
