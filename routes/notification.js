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

/* For Users (will be directly called in FE) */
router.get("/all", getAllNotificationsByUserID);
router.get("/payment", getPaymentNotificationsByUserID);
router.get("/flight", getFlightNotificationsByUserID);
router.get("/promo", getPromoNotificationsByUserID);
router.patch("/read/:id", readNotification);
router.get("/search", searchNotification);

/* For "Admin" (won't be directly called in FE) */
router.route("/").post(createNotification).get(getAllNotifications);
router
    .route("/:id")
    .get(getNotificationByID)
    .patch(updateNotification)
    .delete(deleteNotification);

module.exports = router;
