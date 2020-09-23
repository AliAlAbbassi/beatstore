const express = require('express')
const {
  getBeat,
  getBeats,
  createBeat,
  deleteBeat,
  updateBeat,
  beatCoverUpload,
} = require('../controllers/beats')

const Beat = require('../models/Beat')

const advancedResults = require('../middleware/advancedResults')

const router = express.Router()
const { protect, authorize } = require('../middleware/auth')

router.route('/:id/cover').put(protect, authorize('producer'), beatCoverUpload)

router
  .route('/')
  .get(advancedResults(Beat), getBeats)
  .post(protect, authorize('producer'), createBeat)

router
  .route('/:id')
  .get(getBeat)
  .put(protect, authorize('producer'), updateBeat)
  .delete(protect, authorize('producer'), deleteBeat)

module.exports = router
