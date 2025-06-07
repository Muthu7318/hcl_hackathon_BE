const User = require("../Models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_secret, {
    expiresIn: process.env.JWT_expiresIn,
  });

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOption.secure = true;
  }
  res.cookie("jwt", token, cookieOption);

  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  console.log("---login controller");
  console.log("body req", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.json({
      message: "Incorrect email or passowrd",
      status: "failure",
    });
  }

  createAndSendToken(user, 200, res);
});

// exports.protect = catchAsync(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies?.jwt) {
//     console.log(req.cookies);
//     console.log(req.cookies.jwt);
//     token = req.cookies.jwt;
//   }

//   // console.log(token);
//   if (!token) {
//     return next(
//       new AppError("you are not logged in. please log in to get access", 401)
//     );
//   }
//   //2) validate the token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_secret);
//   // console.log(decoded);

//   //3) need to check whether the user exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token does not exist", 401)
//     );
//   }

//   //grant access to protected route
//   res.locals.user = currentUser;
//   req.user = currentUser;

//   next();
// });

exports.logout = (req, res) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};
