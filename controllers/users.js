const ErrorResponse = require("../utils/error");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

/**
 * Get all users
 *
 * @route GET /api/v1/users
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * Get single user
 *
 * @route GET /api/v1/users/:id
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private/Admin
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Create user
 *
 * @route POST /api/v1/users
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private/Admin
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

/**
 * Update user
 *
 * @route PUT /api/v1/users/:id
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Delete user
 *
 * @route DELETE /api/v1/users/:id
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
