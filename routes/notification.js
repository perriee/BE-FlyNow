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
    getBookingNotificationsByUserID,
    updateNotification,
    readNotification,
    deleteNotification,
    searchNotification,
    checkUnreadNotifications,
} = require("../controller/notification");

/* For Users (will be directly called in FE) */
router.get("/all", getAllNotificationsByUserID);
router.get("/payment", getPaymentNotificationsByUserID);
router.get("/flight", getFlightNotificationsByUserID);
router.get("/promo", getPromoNotificationsByUserID);
router.get("/booking", getBookingNotificationsByUserID);
router.patch("/read/:id", readNotification);
router.get("/search", searchNotification);
router.get("/checkUnread", checkUnreadNotifications);

/* For "Admin" (won't be directly called in FE) */
router.route("/").post(createNotification).get(getAllNotifications);
router
    .route("/:id")
    .get(getNotificationByID)
    .patch(updateNotification)
    .delete(deleteNotification);

module.exports = router;
