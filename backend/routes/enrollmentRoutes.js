const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getMyEnrollments,
  getEnrollment,
  updateProgress,
  getAllEnrollments,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyEnrollments);
router.post('/:courseId', protect, enrollCourse);
router.get('/:courseId', protect, getEnrollment);
router.put('/:courseId/progress', protect, updateProgress);
// Admin enrollment view now done via direct database access
// router.get('/admin/all', protect, getAllEnrollments);

module.exports = router;
