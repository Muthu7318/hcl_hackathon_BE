const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
