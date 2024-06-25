const {
    createNotification,
    getAllNotifications,
    getNotificationByID,
    getNotificationsByUserID,
    updateNotification,
    deleteNotification,
    searchNotification,
} = require("../../repository/notification");

exports.createNotification = async (payload) => {
    return await createNotification(payload);
};

exports.getAllNotifications = async () => {
    return await getAllNotifications();
};

exports.getNotificationByID = async (id) => {
    return await getNotificationByID(id);
};

exports.getAllNotificationsByUserID = async (userId) => {
    return await getNotificationsByUserID(userId, {});
};

exports.getPaymentNotificationsByUserID = async (userId) => {
    return await getNotificationsByUserID(userId, { type: "payment" });
};

exports.getFlightNotificationsByUserID = async (userId) => {
    return await getNotificationsByUserID(userId, { type: "flight" });
};

exports.getPromoNotificationsByUserID = async (userId) => {
    return await getNotificationsByUserID(userId, { type: "promo" });
};

exports.getBookingNotificationsByUserID = async (userId) => {
    return await getNotificationsByUserID(userId, { type: "booking" });
};

exports.updateNotification = async (id, payload) => {
    return await updateNotification(id, payload);
};

exports.readNotification = async (id) => {
    return await updateNotification(id, { isRead: true });
};

exports.deleteNotification = async (id) => {
    return await deleteNotification(id);
};

exports.searchNotification = async (payload) => {
    return await searchNotification(payload);
};
