const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getMyEnrollments,
  getEnrollment,
  updateProgress,
  getAllEnrollments,
} = require('../controllers/enrollmentController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, getMyEnrollments);
router.post('/:courseId', protect, enrollCourse);
router.get('/:courseId', protect, getEnrollment);
router.put('/:courseId/progress', protect, updateProgress);
router.get('/admin/all', protect, admin, getAllEnrollments);

module.exports = router;
