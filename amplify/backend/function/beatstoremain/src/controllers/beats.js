const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Beat = require('../models/Beat')

// @desc  Get all beats
// @route GET /beats
// @access Public
exports.getBeats = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc  Get single beat
// @route GET /beats
// @access Public
exports.getBeat = asyncHandler(async (req, res, next) => {
  const beat = await Beat.findById(req.params.id)

  if (!beat) {
    return next(
      new ErrorResponse(`Beat not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: beat })
})

// @desc  Create new beats
// @route POST /beats
// @access Private
exports.createBeat = asyncHandler(async (req, res, next) => {
  // If the user is not an admin, they can only add one beat
  if (req.user.role !== 'producer') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a beat`,
        400
      )
    )
  }
  const beat = await Beat.create(req.body)
  res.status(201).json({
    success: true,
    data: beat,
  })
})

// @desc  Update beat
// @route PUT /beats/:id
// @access Private
exports.updateBeat = asyncHandler(async (req, res, next) => {
  let beat = await Beat.findById(req.params.id)
  if (!beat) {
    return res.status(400).json({ success: false })
  }

  // Make sure user is the producer
  if (req.user.role !== 'producer') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this beat`,
        401
      )
    )
  }
  beat = await Beat.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: beat })
})

// @desc  Delete beat
// @route DELETE /beats
// @access Private
exports.deleteBeat = asyncHandler(async (req, res, next) => {
  const beat = await Beat.findById(req.params.id)
  if (!beat) {
    return res.status(400).json({ success: false })
  }

  // Make sure user is beat owner
  if (req.user.role !== 'producer') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this beat`,
        401
      )
    )
  }
  beat.remove()
  res.status(200).json({ success: true, data: {} })
})

// @desc  Upload cover art for beat
// @route PUT /api/v1/beats/:id/cover
// @access Private
exports.beatCoverUpload = asyncHandler(async (req, res, next) => {
  const beat = await Beat.findById(req.params.id)
  if (!beat) {
    return res.status(400).json({ success: false })
  }

  // Make sure user is beat owner
  if (req.user.role !== 'producer') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this beat`,
        401
      )
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.file

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400))
  }

  // Create custom filename
  file.name = `photo_${beat._id}${path.parse(file.name).ext}`
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Beat.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })

  console.log(file.name)
})
