const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

const checkValidId = id => {
  return !mongoose.Types.ObjectId.isValid(id)
}

/**
 * @desc      Get goals
 * @type      GET
 * @route     /api/goals
 * @access    Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()

  res.status(200).json(goals)
})

/**
 * @desc      Get goal
 * @type      GET
 * @route     /api/goals/:id
 * @access    Private
 */
const getGoal = asyncHandler(async (req, res) => {
  if (checkValidId(req.params.id)) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const goal = await Goal.findById(req.params.id)
  res.status(200).json(goal)
})

/**
 * @desc      Create goal
 * @type      POST
 * @route     /api/goals
 * @access    Private
 */
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text
  })

  res.status(200).json(goal)
})

/**
 * @desc      Update goal
 * @type      PUT
 * @route     /api/goals/:id
 * @access    Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  if (checkValidId(req.params.id)) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const updatedGoal = await Goal.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  )

  res.status(200).json(updatedGoal)
})

/**
 * @desc      Delete goal
 * @type      DELETE
 * @route     /api/goals/:id
 * @access    Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  if (checkValidId(req.params.id)) {
    res.status(400)
    throw new Error('Goal not found')
  }

  await Goal.findOneAndDelete({ _id: req.params.id })
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal
}
