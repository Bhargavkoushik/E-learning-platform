const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Enroll in a course
// @route   POST /api/enrollments/:courseId
// @access  Private
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: req.params.courseId,
    });

    // Update user's enrolled courses
    await User.findByIdAndUpdate(req.user._id, {
      $push: { enrolledCourses: req.params.courseId },
    });

    // Update course's enrolled students
    await Course.findByIdAndUpdate(req.params.courseId, {
      $push: { enrolledStudents: req.user._id },
    });

    // Populate the enrollment with course details before returning
    const populatedEnrollment = await Enrollment.findById(enrollment._id).populate('course');

    res.status(201).json({ success: true, data: populatedEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user enrollments
// @route   GET /api/enrollments
// @access  Private
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course')
      .sort('-enrolledAt');

    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:courseId
// @access  Private
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId,
    }).populate('course');

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    res.json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/enrollments/:courseId/progress
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId,
    }).populate('course');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Add lesson to completed lessons if not already there
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    // Calculate progress percentage
    const totalLessons = enrollment.course.lessons.length;
    const completedCount = enrollment.completedLessons.length;
    enrollment.progress = Math.round((completedCount / totalLessons) * 100);

    // Check if course is completed
    if (enrollment.progress === 100) {
      enrollment.completed = true;
      enrollment.completedAt = new Date();
    }

    enrollment.lastAccessedAt = new Date();
    await enrollment.save();

    res.json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all enrollments (Admin)
// @route   GET /api/enrollments/admin/all
// @access  Private/Admin
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('user', 'name email')
      .populate('course', 'title')
      .sort('-enrolledAt');

    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
