const User = require("../Models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_secret, {
    expiresIn: "1h",
  });

exports.login = catchAsync(async (req, res, next) => {
  console.log("---login controller");
  console.log("body req", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  res.status(200).json({
    status: "success",
    token: jwt.sign(user.email, "mysecrettoken"),
    user: user.email,
  });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};
