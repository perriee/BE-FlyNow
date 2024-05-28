const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");
const airport = require("./airport");

router.use("/auth", auth);
router.use("/passengers", passenger);
router.use("/airports", airport);

module.exports = router;
