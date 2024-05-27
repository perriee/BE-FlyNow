const express = require("express");

const router = express.Router();
const auth = require("./auth");
const passenger = require("./passenger");

router.use("/auth", auth);
router.use("/passengers", passenger);

module.exports = router;
