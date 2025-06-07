const Shift = require("../Models/shift");
const User = require("../Models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.getShiftById = catchAsync(async (req, res, next) => {
  console.log("---shift controller");
  console.log("body req", req.body);
  const { userid } = req.body;

  if (!userid) {
    return next(new AppError("Please provide userid", 400));
  }

  const shift = await Shift.find({ staffId: userid });

  res.status(200).json({
    status: "success",
    data: shift,
  });
});

exports.createShift = catchAsync(async (req, res, next) => {
  console.log("---create shift controller");
  console.log("body req", req.body);
  const { staffId, shift, date } = req.body;

  if (!staffId || !shift || !date) {
    res.status(400).json({
      status: "failure",
      data: "Please provide staffId, shift and date",
    });
  }
  const shiftExists = await Shift.findOne({ staffId, date });
  if (shiftExists) {
    res.status(400).json({
      status: "failure",
      data: "Shift already exists for this staff on this date",
    });
  }
  const newShift = await Shift.create({
    staffId,
    shift,
    date,
  });

  res.status(201).json({
    status: "success",
    data: newShift,
  });
});

exports.getShiftByDate = catchAsync(async (req, res, next) => {
  console.log("---get shift by date controller");
  console.log("body req", req.body);
  const { date } = req.body;

  if (!date) {
    return next(new AppError("Please provide date", 400));
  }

  const shifts = await Shift.find({ date });

  res.status(200).json({
    status: "success",
    data: shifts,
  });
});
