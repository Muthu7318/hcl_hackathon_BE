const express = require("express");
const shiftController = require("../controllers/shiftController");

const Router = express.Router();

Router.route("/getShiftById").post(shiftController.getShiftById);
Router.route("/createShift").post(shiftController.createShift);
Router.route("/getShiftByDate").post(shiftController.getShiftByDate);

module.exports = Router;
