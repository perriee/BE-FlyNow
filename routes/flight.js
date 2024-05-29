const express = require("express");
const router = express.Router();

const flightController = require("../controller/flight");

router.route("/").get(flightController.getAllFlights).post(flightController.createFlight);
router.route("/:id").get(flightController.getFlight).put(flightController.updateFlight).delete(flightController.deleteFlight);

module.exports = router;