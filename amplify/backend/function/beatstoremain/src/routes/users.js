const express = require('express')
const {
  getUser,
  getUsers,
  CreateUser,
  updateUser,
  deleteUser,
  sendEmail,
} = require('../controllers/users')

const User = require('../models/User')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')

// Include other resource routers
const beatRouter = require('./beats')

// Re-route into other resource routers
router.use('/:userId/beats', beatRouter)

// any route below this is gonna use this middleware protect
router.use(protect)
router.use(authorize('producer'))

router.route('/').get(advancedResults(User), getUsers).post(CreateUser)

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/sendEmail').get(sendEmail)

module.exports = router
