const mongoose = require('mongoose')
const slugify = require('slugify')

const BeatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    slug: String,
    bpm: Number,
    key: String,
    mp3WTags: {
      type: String,
      maxlength: [250, 'ye 250']
    },
    mp3WoutTags: {
      type: String,
      maxlength: [250, 'ye 250']
    },
    wavWtags: {
      type: String,
      maxlength: [250, 'ye 250']
    },
    wavWouttags: {
      type: String,
      maxlength: [250, 'ye 250']
    },
    stems: {
      type: String,
      maxlength: [250, 'ye 250']
    },
    beatTagsSEO: {
      type: String,
      default: 'freestyle rap beat type beat'
    },
    artist: {
      type: String,
      default: 'Cuthlehoop'
    },
    theme: {
      type: String,
      default: '#505d6b'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    cover150: {
      type: String,
      default: 'no-photo.jpg'
    },
    cover320: {
      type: String,
      default: 'no-photo.jpg'
    },
    cover60: {
      type: String,
      default: 'no-photo.jpg'
    },
    genre: {
      type: Array,
      default: ['HIPHOP', 'RAP']
    },
    tags: {
      type: Array,
      default: ['TRAP', 'FREESTYLE']
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

BeatSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Beat', BeatSchema)
