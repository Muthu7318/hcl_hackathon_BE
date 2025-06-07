const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,

      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["doctor", "nurse", "technician"],
    },
    shiftPreference: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "night"],
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
