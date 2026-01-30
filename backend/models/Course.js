const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a lesson title'],
    trim: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: [true, 'Please add a video URL'],
  },
  duration: {
    type: Number, // in minutes
  },
  order: {
    type: Number,
    required: true,
  },
  content: {
    type: String, // Additional text content
  },
  resources: [{
    title: String,
    url: String,
  }],
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please add difficulty level'],
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  thumbnailUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x250',
  },
  totalVideos: {
    type: Number,
    default: 0,
  },
  embeddedVideos: {
    type: Number,
    default: 0,
  },
  tutorialLink: {
    type: String,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lessons: [lessonSchema],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
