const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

const checkValidId = id => {
  return !mongoose.Types.ObjectId.isValid(id)
}

/**
 * @desc      Get users
 * @type      GET
 * @route     /api/users
 * @access    Private
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
})

/**
 * @desc      Get user
 * @type      GET
 * @route     /api/users/:id
 * @access    Private
 */
const getUser = asyncHandler(async (req, res) => {
  if (checkValidId(req.params.id)) {
    res.status(400)
    throw new Error('User not found')
  }

  const user = await User.findById(req.params.id)
  res.status(200).json(user)
})

/**
 * @desc      Get user data
 * @type      GET
 * @route     /api/users/me
 * @access    Private
 */
const getMe = asyncHandler(async (req, res) => {
  // We have got the user from authMiddleware.js
  res.status(200).json(req.user)
})

/**
 * @desc      Register user
 * @type      POST
 * @route     /api/users
 * @access    Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ name })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

/**
 * @desc      Authenticate a user
 * @type      POST
 * @route     /api/users/login
 * @access    Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check for user email
  const user = await User.findOne({ email })
  const passwordsMatch = await bcrypt.compare(password, user.password)

  // Check password
  if (user && passwordsMatch) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

/**
 * @desc      Update user
 * @type      PUT
 * @route     /api/users/:id
 * @access    Private
 */
const updateUser = asyncHandler(async (req, res) => {
  if (checkValidId(req.params.id)) {
    res.status(400)
    throw new Error('User not found')
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  )

  res.status(200).json(updatedUser)
})

/**
 * @desc      Delete user
 * @type      DELETE
 * @route     /api/users/:id
 * @access    Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  if (checkValidId(req.params.id)) {
    res.status(400)
    throw new Error('User not found')
  }

  await User.findOneAndDelete({ _id: req.params.id })
  res.status(200).json({ id: req.params.id })
})

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  getUsers,
  getUser,
  getMe,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}
