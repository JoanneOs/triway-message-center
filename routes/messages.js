// routes/messages.js
const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getMessages,
  sendMessage,
  markAsRead
} = require('../controllers/messages');

const router = express.Router();

// All routes protected
router.use(protect);

router.route('/')
  .get(getMessages)
  .post(authorize(User.ROLES.DISPATCHER), sendMessage);

router.route('/:id/read')
  .put(markAsRead);

module.exports = router;