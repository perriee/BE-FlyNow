const express = require("express");
const router = express.Router();
const bookingDetailController = require("../controller/bookingDetail");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .post(bookingDetailController.createBookingDetail);

    module.exports = router;