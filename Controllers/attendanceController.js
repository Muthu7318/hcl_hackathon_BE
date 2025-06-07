const Attendance = require("../Models/attendance");
const Staff = require("../Models/staff");

exports.markAttendance = async (req, res) => {
  try {
    const { staffId, status, date } = req.body;

    if (!["Present", "Absent"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Must be Present or Absent." });
    }

    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({ error: "Invalid or missing date." });
    }

    const staffExists = await Staff.findById(staffId);
    if (!staffExists) {
      return res.status(404).json({ error: "Staff not found." });
    }

    const attendance = new Attendance({
      staffId,
      status,
      date: new Date(date),
    });

    await attendance.save();
    res
      .status(201)
      .json({ message: "Attendance marked successfully.", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};

exports.getAttendanceByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;

    const staffExists = await Staff.findById(staffId);
    if (!staffExists) {
      return res.status(404).json({ error: "Staff not found." });
    }

    const records = await Attendance.find({ staffId }).sort({ date: -1 });

    res.status(200).json({ staffId, attendance: records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};
