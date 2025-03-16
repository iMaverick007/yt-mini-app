const mongoose = require("mongoose");

const eventLogSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true }, // e.g., "COMMENT_ADDED", "ERROR"
    details: { type: Object, required: true },  // JSON object for dynamic data
    createdAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventLog", eventLogSchema);