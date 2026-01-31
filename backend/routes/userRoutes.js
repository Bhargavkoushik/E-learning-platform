const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// These routes are now admin-only via direct database access
// Keeping them but removing from API access
// router.get('/', protect, getUsers);
// router.route('/:id')
//   .get(protect, getUserById)
//   .delete(protect, deleteUser)
//   .put(protect, updateUser);

module.exports = router;
