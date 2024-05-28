const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airline = require("./airline");
const airport = require("./airport");
const booking = require("./booking");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airlines", airline);
router.use("/airports", airport);
router.use("/booking", booking);

module.exports = router;
