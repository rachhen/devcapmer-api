const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Include other resource routers
const coursesRouter = require("./courses");
const reviewsRouter = require("./reviews");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", coursesRouter);
router.use("/:bootcampId/reviews", reviewsRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("admin", "publisher"), createBootcamp);
router
  .route("/:id/photo")
  .put(protect, authorize("admin", "publisher"), bootcampPhotoUpload);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("admin", "publisher"), updateBootcamp)
  .delete(protect, authorize("admin", "publisher"), deleteBootcamp);

module.exports = router;
