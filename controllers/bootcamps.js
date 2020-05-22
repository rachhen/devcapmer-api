/**
 * Get all bootcamps
 *
 * @route GET /api/v1/bootcamps
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Public
 */
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};

/**
 * Get single bootcamps
 *
 * @route GET /api/v1/bootcamps/:id
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Public
 */
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

/**
 * Create new bootcamp
 *
 * @route POST /api/v1/bootcamps
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private
 */
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create a bootcamp" });
};

/**
 * Update bootcamp
 *
 * @route PUT /api/v1/bootcamps/:id
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private
 */
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

/**
 * Delete bootcamp
 *
 * @route DELETE /api/v1/bootcamps
 * @param Request req
 * @param Response res
 * @param Next next
 * @access Private
 */
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Deteete bootcamp ${req.params.id}` });
};
