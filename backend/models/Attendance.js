const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",        // links to User model
      required: true
    },

    date: {
      type: String,        // format: "2025-01-15"
      required: true
    },

    checkInTime: {
      type: String,        // format: "09:30 AM"
      default: null
    },

    checkOutTime: {
      type: String,        // format: "06:15 PM"
      default: null
    },

    status: {
      type: String,
      enum: ["present", "absent", "late", "half-day"],
      default: "present"
    },

    totalHours: {
      type: Number,        // example: 7.5
      default: 0
    }
  },
  { timestamps: true }     // auto adds createdAt, updatedAt
);

module.exports = mongoose.model("Attendance", attendanceSchema);