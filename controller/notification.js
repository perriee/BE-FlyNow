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
} = require("../usecase/notification");

exports.createNotification = async (req, res, next) => {
    try {
        const { userId, flightId, type, message } = req.body;

        if (!type || type === "") {
            return next({
                message: "Type is required!",
                statusCode: 400,
            });
        }
        if (!message || message === "") {
            return next({
                message: "Message is required!",
                statusCode: 400,
            });
        }
        let payload = {
            type,
            message,
            isRead: false,
        };

        // Advanced validation
        if (userId && userId !== "") {
            payload.userId = userId;
        }

        if (type === "flight" && (!flightId || flightId === "")) {
            return next({
                message: "Flight ID is required!",
                statusCode: 400,
            });
        } else {
            payload.flightId = flightId;
        }

        if (type === "payment" && (!userId || userId === "")) {
            return next({
                message: "User ID is required!",
                statusCode: 400,
            });
        }

        if (type === "booking" && (!userId || userId === "")) {
            return next({
                message: "User ID is required!",
                statusCode: 400,
            });
        }

        const data = await createNotification(payload);

        res.status(201).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllNotifications = async (req, res, next) => {
    try {
        const data = await getAllNotifications();

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getNotificationByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getNotificationByID(id);

        if (!data) {
            return next({
                message: `Notification with the id ${id} is not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllNotificationsByUserID = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = await getAllNotificationsByUserID(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getPaymentNotificationsByUserID = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = await getPaymentNotificationsByUserID(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getFlightNotificationsByUserID = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = await getFlightNotificationsByUserID(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getPromoNotificationsByUserID = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = await getPromoNotificationsByUserID(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookingNotificationsByUserID = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = await getBookingNotificationsByUserID(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateNotification = async (req, res, next) => {
    // As the notification is heavily validated when created, we assume that anything but the message is already correct
    try {
        const { id } = req.params;
        const { message } = req.body;

        if (!message || message === "") {
            return next({
                message: "Message is required!",
                statusCode: 400,
            });
        }

        const data = await updateNotification(id, { message });

        res.status(201).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.readNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await readNotification(id);

        res.status(201).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await deleteNotification(id);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.searchNotification = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const data = await searchNotification(keyword);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
