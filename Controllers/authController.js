const User = require("../Models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Failure",
      message: "email or password is not present",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  res.status(200).json({
    status: "success",
    token: jwt.sign(user.email, "mysecrettoken"),
    user: user.email,
  });
};

exports.logout = (req, res) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};
