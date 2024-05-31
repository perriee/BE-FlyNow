const express = require("express");
const router = express.Router();
const bookingDetailController = require("../controller/bookingDetail");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(bookingDetailController.getBookingDetails)
    .post(bookingDetailController.createBookingDetail);

router
    .route("/:id")
    .get(bookingDetailController.getBookingDetailById)
    .put(bookingDetailController.updateBookingDetail)
    .delete(bookingDetailController.deleteBookingDetail);

module.exports = router;
