const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  updateLesson,
  deleteLesson,
  addReview,
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getCourses);
  // Course creation/updates now done via direct database access
  // .post(protect, createCourse);

router.route('/:id')
  .get(getCourse);
  // Course updates/deletion now done via direct database access
  // .put(protect, updateCourse)
  // .delete(protect, deleteCourse);

// Lesson management now done via direct database access
// router.post('/:id/lessons', protect, addLesson);
// router.route('/:id/lessons/:lessonId')
//   .put(protect, updateLesson)
//   .delete(protect, deleteLesson);

router.post('/:id/reviews', protect, addReview);

module.exports = router;
