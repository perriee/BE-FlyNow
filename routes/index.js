const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const payment = require("./payment");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/payment", payment);

module.exports = router;
