const express = require("express");
const router = express.Router();
const passengerController = require("../controller/passenger");

router.route("/").get(passengerController.getPassengers);

module.exports = router;
