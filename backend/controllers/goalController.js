const asyncHandler = require('express-async-handler')

/**
 * @desc      Get goals
 * @type      GET
 * @route     /api/goals
 * @access    Private
 */
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'getGoals' })
})

/**
 * @desc      Get goal
 * @type      GET
 * @route     /api/goals/:id
 * @access    Private
 */
const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `getGoal ${req.params.id}` })
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

  res.status(200).json({ message: `createGoal` })
})

/**
 * @desc      Update goal
 * @type      PUT
 * @route     /api/goals/:id
 * @access    Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `updateGoal ${req.params.id}` })
})

/**
 * @desc      Delete goal
 * @type      DELETE
 * @route     /api/goals/:id
 * @access    Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `deleteGoal ${req.params.id}` })
})

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal
}
