const express = require("express");
const router = express.Router();
const passenger = require("./passenger");

router.use("/passengers", passenger);

module.exports = router;
