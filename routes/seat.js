const express = require("express");
const router = express.Router();
const seatController = require("../controller/seat");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(), seatController.getSeats)
    .post(authMiddleware(), seatController.createSeat);

router
    .route("/:id")
    .get(authMiddleware(), seatController.getSeatById)
    .put(authMiddleware(), seatController.updateSeat)
    .delete(authMiddleware(), seatController.deleteSeat);

module.exports = router;
