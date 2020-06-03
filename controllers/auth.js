const ErrorResponse = require("../utils/error");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const User = require("../models/User");

/**
 * Register user
 *
 * @route POST /api/v1/auth/register
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;

  const user = await User.create({ name, email, role, password });
  sendCookieResponse(user, 200, res);
});

/**
 * Login user
 *
 * @route POST /api/v1/auth/login
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }

  sendCookieResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendCookieResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

/**
 * Get logged in user
 *
 * @route GET /api/v1/auth/me
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
