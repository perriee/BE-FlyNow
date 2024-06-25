const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airline = require("./airline");
const airport = require("./airport");
const seat = require("./seat");
const payment = require("./payment");
const flight = require("./flight");
const favoriteFlight = require("./favoriteFlight");
const { authMiddleware } = require("../middleware/auth");
const booking = require("./booking");
const history = require("./history");
const bookingDetail = require("./bookingDetail");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airlines", authMiddleware(), airline);
router.use("/passengers", passenger);
router.use("/airports", airport);
router.use("/seats", seat);
router.use("/payment", payment);
router.use("/flight", flight);
router.use("/favorite-flights", authMiddleware(), favoriteFlight);
router.use("/booking", booking);
router.use("/history", history);
router.use("/booking-detail", authMiddleware(), bookingDetail);

module.exports = router;
