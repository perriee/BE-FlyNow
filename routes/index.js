const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const flight = require("./flight");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/flight", flight);

module.exports = router;
