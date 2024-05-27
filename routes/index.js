const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const booking = require("./booking");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/booking", booking);

module.exports = router;
