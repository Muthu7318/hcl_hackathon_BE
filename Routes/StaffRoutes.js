const express = require("express");
const staffController = require("../Controllers/StaffController");
const attendanceController = require("../Controllers/attendanceController");

const Router = express.Router();

Router.route("/createStaff").post(staffController.addStaff);
Router.route("/filterStaff").get(staffController.filterAndSortStaff);
Router.route("/readStaff").get(staffController.listAllStaff);

Router.route("/addAttendance").post(attendanceController.markAttendance);
Router.route("/viewAttendance/:staffId").get(
  attendanceController.getAttendanceByStaffId
);

module.exports = Router;
