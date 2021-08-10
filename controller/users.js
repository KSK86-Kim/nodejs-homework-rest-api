const { User } = require('../model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET

const register = async (req, res, next) => {
  const { password, email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.json({
      message: 'conflict',
      status: 409,
      data: {
        result: 'email in use'
      }
    })
  }
  try {
    const newUser = new User({ email })
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
      message: 'success',
      status: 201,
      data: {
        result: 'user registration successful',
        user: newUser
      }
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const id = req.user._id
  const token = null
  await User.findByIdAndUpdate(id, { token }, { new: true })

  return res.json({
    status: 204,
    message: 'logout complete'
  })
}

const login = async(req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //   const pas = user.validPassword(password)
  //   console.log(user, pas)
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 400,
      message: 'Incorrect login or password',
      data: 'Bad request'
    })
  }
  const id = user._id
  //   console.log(id)
  const payload = { id }
  const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  //   console.log(token)
  await User.findByIdAndUpdate(id, { token }, { new: true })

  res.json({
    status: 'success',
    code: 200,
    data: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
        token: token
      }
    }
  })
}

const currentUser = async (req, res, next) => {
  return res.json({
    status: 204,
    message: 'success',
    data: {
      email: req.user.email,
      subscription: req.user.subscription
    }
  })
}

module.exports = {
  register,
  login,
  logout,
  currentUser
}
