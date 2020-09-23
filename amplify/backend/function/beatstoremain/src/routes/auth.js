const Router = require('express')
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
  updateCart,
  updatePurchasedBeats
} = require('../controllers/auth')
const router = Router()
const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protect, getMe)
router.put('/updatedetails', protect, updateDetails)
router.put('/updateCart', protect, updateCart)
router.put('/updatePurchasedBeats', protect, updatePurchasedBeats)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router
