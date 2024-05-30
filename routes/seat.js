const express = require("express");

const router = express.Router();
const seatController = require("../controller/seat");

router
    .route("/").post(seatController.createSeat)

    module.exports = router;