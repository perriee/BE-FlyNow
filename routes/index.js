const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airline = require("./airline");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airline", airline);

module.exports = router;
