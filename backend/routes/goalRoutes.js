const express = require('express')
const router = express.Router()
const {
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
  createGoal
} = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)
router.route('/').get(getGoals).post(createGoal)
router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal)

module.exports = router
