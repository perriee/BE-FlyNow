const express = require("express");
const router = express.Router();

const {
    createNotification,
    getAllNotifications,
    getNotificationByID,
    getAllNotificationsByUserID,
    getPaymentNotificationsByUserID,
    getFlightNotificationsByUserID,
    getPromoNotificationsByUserID,
    updateNotification,
    readNotification,
    deleteNotification,
    searchNotification,
} = require("../controller/notification");
const { authMiddleware } = require("../middleware/auth");

/* For "Admin" (won't be directly called in FE) */
router
    .route("/")
    .post(authMiddleware(), createNotification)
    .get(authMiddleware(), getAllNotifications);

router
    .route("/:id")
    .get(authMiddleware(), getNotificationByID)
    .patch(authMiddleware(), updateNotification)
    .delete(authMiddleware(), deleteNotification);

/* For Users (will be directly called in FE) */
router.get("/all", authMiddleware(), getAllNotificationsByUserID);
router.get("/payment", authMiddleware(), getPaymentNotificationsByUserID);
router.get("/flight", authMiddleware(), getFlightNotificationsByUserID);
router.get("/promo", authMiddleware(), getPromoNotificationsByUserID);
router.patch("/:id", authMiddleware(), readNotification);
router.get("/search", authMiddleware(), searchNotification);
