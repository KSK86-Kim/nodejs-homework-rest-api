const { User } = require('../model')
const jwt = require('jsonwebtoken')
const Jimp = require('jimp')
const path = require('path')
const fs = require('fs')
// const { users: resvice } = require("./")
const { avatarDir } = require('../helpers/path')

require('dotenv').config()

const secret = process.env.SECRET

const register = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
        data: 'Conflict',
      })
    }

    const newUser = new User({ email })
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
      message: 'success',
      status: 201,
      data: {
        result: 'user registration successful',
        user: newUser,
        avatarURL: newUser.avatarURL,
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

const updateAvatar = async(req, res, next) => {
  const id = req.user.id
  try {
    if (req.file) {
      const { path: tempName, originalname } = req.file
      const img = await Jimp.read(tempName)
      img
        .autocrop()
        .cover(
          250,
          250,
          Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(tempName)
      const newFileName = path.join(avatarDir, `${id}_${originalname}`)

      const oldAvatar = (await fs.readdir(avatarDir)).find((fileName) =>
        fileName.includes(id)
      )
      const avatarForDeleted = path.join(avatarDir, oldAvatar)
      fs.unlink(avatarForDeleted)
      fs.rename(tempName, newFileName)
      const updateA = (id, newFileName) => {
        
      }
      const { avatarURL: newAvatarUrl } = await updateA(
        id,
        newFileName
      )
      return res.json({
        status: 'success',
        code: 200,
        data: {
          // avatarURL: newAvatarUrl,

        },
      })
    }
  } catch (error) {

  }
}

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAvatar
}
