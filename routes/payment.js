const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");

router.route("/").get(paymentController.getPayments).post(paymentController.createPayment);

module.exports = router;