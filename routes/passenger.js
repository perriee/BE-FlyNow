const express = require("express");

const router = express.Router();
const passengerController = require("../controller/passenger");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(), passengerController.getPassengers)
    .post(authMiddleware(), passengerController.createPassenger);

router
    .route("/:id")
    .get(authMiddleware(), passengerController.getPassenger)
    .put(authMiddleware(), passengerController.updatePassenger)
    .delete(authMiddleware(), passengerController.deletePassenger);

module.exports = router;
