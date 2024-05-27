const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking");

router
    .route("/")
    .get(bookingController.getBookings)
    .post(bookingController.createBooking);

router
    .route("/:id")
    .get(bookingController.getBookingId)
    .put(bookingController.updateBooking)
    .delete(bookingController.deleteBooking);

module.exports = router;
