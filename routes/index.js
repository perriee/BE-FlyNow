const express = require("express");
const router = express.Router();
const passenger = require("./passenger");
const booking = require("./booking");

router.use("/passengers", passenger);
router.use("/booking", booking);

module.exports = router;
