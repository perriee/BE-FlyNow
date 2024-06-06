const express = require("express");
const router = express.Router();
const historyController = require("../controller/history");
const { authMiddleware } = require("../middleware/auth");

router.route("/").get(authMiddleware(), historyController.getHistories);

module.exports = router;
