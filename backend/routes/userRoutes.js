const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUser,
  getMe,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getUsers)
router.post('/', registerUser)

router.post('/login', loginUser)
router.get('/me', protect, getMe)

router.get('/:id', protect, getUser)
router.put('/:id', protect, updateUser)
router.delete('/:id', protect, deleteUser)

module.exports = router
