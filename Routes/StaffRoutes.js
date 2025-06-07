const express = require("express");
const staffController = require("../Controllers/StaffController");

const Router = express.Router();

Router.route("/createStaff").post(staffController.addStaff);
Router.route("/filterStaff").get(staffController.filterAndSortStaff);
Router.route("/readStaff").get(staffController.listAllStaff);

module.exports = Router;
