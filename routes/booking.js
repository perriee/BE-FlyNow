const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(), bookingController.getBookings)
    .post(bookingController.createBooking);

router
    .route("/:id")
    .get(authMiddleware(), bookingController.getBookingId)
    .put(authMiddleware(), bookingController.updateBooking)
    .delete(authMiddleware(), bookingController.deleteBooking);

module.exports = router;
