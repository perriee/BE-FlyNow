const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airline = require("./airline");
const { authMiddleware } = require("../middleware/auth");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airlines", authMiddleware(), airline);

module.exports = router;
