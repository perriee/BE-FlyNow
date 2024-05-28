const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airline = require("./airline");
const airport = require("./airport");
const payment = require("./payment");
const flight = require("./flight");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airlines", airline);
router.use("/airports", airport);
router.use("/payment", payment);
router.use("/flight", flight);

module.exports = router;
