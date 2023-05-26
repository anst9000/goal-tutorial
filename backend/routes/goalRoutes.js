const express = require('express')
const router = express.Router()
const {
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
  createGoal
} = require('../controllers/goalController')

router.route('/').get(getGoals).post(createGoal)
router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal)

module.exports = router
