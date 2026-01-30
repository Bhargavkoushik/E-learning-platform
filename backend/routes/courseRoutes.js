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
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getCourses)
  .post(protect, admin, createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse);

router.post('/:id/lessons', protect, admin, addLesson);
router.route('/:id/lessons/:lessonId')
  .put(protect, admin, updateLesson)
  .delete(protect, admin, deleteLesson);

router.post('/:id/reviews', protect, addReview);

module.exports = router;
