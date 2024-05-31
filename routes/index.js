const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airline = require("./airline");
const airport = require("./airport");
const seat = require("./seat");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airlines", airline);
router.use("/airports", airport);
router.use("/seats", seat);

module.exports = router;
