// controllers/messages.js
const Message = require('../models/Message');
const User = require('../models/User');
const { ROLES } = User;

// @desc    Get all messages for logged in user
// @route   GET /api/v1/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ receiver: req.user.id })
      .populate('sender', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: 'Server Error' 
    });
  }
};

// @desc    Send new message
// @route   POST /api/v1/messages
// @access  Private (Dispatcher only)
exports.sendMessage = async (req, res, next) => {
  try {
    // Verify receiver exists and is a driver
    const receiver = await User.findOne({ 
      _id: req.body.receiver, 
      role: ROLES.DRIVER 
    });

    if (!receiver) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid receiver ID or receiver is not a driver' 
      });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: req.body.receiver,
      subject: req.body.subject,
      content: req.body.content
    });

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/v1/messages/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findOneAndUpdate(
      { 
        _id: req.params.id, 
        receiver: req.user.id 
      },
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        error: 'Message not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: 'Server Error' 
    });
  }
};