const mongoose = require('mongoose');

const EventLogSchema = new mongoose.Schema({
  eventType: String, // e.g., "COMMENT_ADDED", "TITLE_UPDATED"
  eventTime: { type: Date, default: Date.now },
  details: Object, // Store additional event details like comment content or video title
});

module.exports = mongoose.model('EventLog', EventLogSchema);