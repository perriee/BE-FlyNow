const express = require("express");
const router = express.Router();
const historyController = require("../controller/history");
const { authMiddleware } = require("../middleware/auth");

router.route("/").get(authMiddleware(), historyController.getHistories);

router
    .route("/city/:city")
    .get(authMiddleware(), historyController.getHistoriesByCity);

router
    .route("/payment/:paymentStatus")
    .get(authMiddleware(), historyController.getHistoriesByPaymentStatus);

module.exports = router;
