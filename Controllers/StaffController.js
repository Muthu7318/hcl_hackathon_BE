const Staff = require("../Models/staff");

exports.addStaff = async (req, res) => {
  try {
    const { name, staffId, role, shiftPreference, contactNumber } = req.body;

    if (!name || !staffId || !role || !shiftPreference || !contactNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingStaff = await Staff.findOne({ staffId });
    if (existingStaff) {
      return res.status(409).json({ message: "Staff ID already exists." });
    }

    const staff = new Staff({
      name,
      staffId,
      role,
      shiftPreference,
      contactNumber,
    });

    await staff.save();

    res.status(201).json({
      message: "Staff added successfully.",
      staff,
    });
  } catch (error) {
    console.error("Error adding staff:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// GET /api/staff?role=nurse&name=alice&sort=name
exports.filterAndSortStaff = async (req, res) => {
  try {
    const { role, name, sort } = req.query;

    const filter = {};

    if (role) {
      filter.role = role.toLowerCase();
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    let sortOption = {};
    if (sort === "name") {
      sortOption.name = 1;
    } else if (sort === "-name") {
      sortOption.name = -1;
    }

    const staffList = await Staff.find(filter).sort(sortOption);

    res.status(200).json({ data: staffList });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.listAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();

    res.status(200).json({
      message: "Staff fetched successfully.",
      data: staffList,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({
      message: "Server error. Could not fetch staff.",
    });
  }
};
