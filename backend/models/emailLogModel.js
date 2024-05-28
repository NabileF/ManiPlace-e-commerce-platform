const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  to: {
    type: String,
    required: [true, 'Email recipient is required'],
  },
  subject: {
    type: String,
    required: [true, 'Email subject is required'],
  },
  body: {
    type: String,
    required: [true, 'Email body is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

module.exports = EmailLog;
