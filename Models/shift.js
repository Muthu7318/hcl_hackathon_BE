const mongoose = require("mongoose");
const validator = require("validator");

const shiftSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: [true, "Please provide your id"],
  },

  shift: {
    type: String,
    required: [true, "Please provide shift"],
  },
  date: {
    type: String,
    required: [true, "Please provide date"],
  },
});

const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;
