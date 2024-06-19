const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(), paymentController.getPayments)
    .post(authMiddleware(), paymentController.createPayment)
    .put(authMiddleware(), paymentController.updatePayment);

router.post(
    "/notification",
    authMiddleware(),
    paymentController.paymentNotification,
);

router
    .route("/:bookingId")
    .get(authMiddleware(), paymentController.getPaymentByBookingId)
    .delete(authMiddleware(), paymentController.deletePayment);

module.exports = router;
