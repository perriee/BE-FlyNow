const { notification, user, booking } = require("../../models");
const { Op } = require("sequelize");

/* CRUD */
exports.createNotification = async (payload) => {
    if (payload.userId) {
        // check if the notification is for a specific user or not
        const targetUser = await user.findOne({
            where: { id: payload.userId },
        });

        if (!targetUser) {
            throw new Error("User not found");
        }

        const data = await notification.create(payload);
        return data;
    } else if (payload.flightId) {
        // check if the notification is for a specific flight or not
        const targetUser = await booking.findAll({
            attributes: ["userId"],
            where: {
                [Op.or]: [
                    { departureFlightId: payload.flightId },
                    { returnFlightId: payload.flightId },
                ],
            },
            distinct: true,
            raw: true,
        });

        const notificationsPayload = targetUser.map((user) => ({
            ...payload,
            userId: user.userId,
        }));

        const data = await notification.bulkCreate(notificationsPayload);
        return data;
    } else {
        const targetUsers = await user.findAll({
            attributes: ["id"],
        });

        // create notifications for all users
        const notificationsPayload = targetUsers.map((user) => ({
            ...payload,
            userId: user.id,
        }));

        // bulk create means put all data in a single query (more efficient)
        const data = await notification.bulkCreate(notificationsPayload);
        return data;
    }
};

exports.getAllNotifications = async () => {
    return await notification.findAll();
};

exports.getNotificationByID = async (id) => {
    const data = await notification.findOne({
        where: {
            id,
        },
    });
    if (data) {
        return data.dataValues;
    }

    throw new Error(`Notification is not found!`);
};

exports.getNotificationsByUserID = async (userId, filters) => {
    // combine the filters
    const whereClause = {
        userId,
        ...filters,
    };

    const data = await notification.findAll({
        where: whereClause,
    });

    return data;
};

exports.updateNotification = async (id, payload) => {
    await notification.update(payload, {
        where: {
            id,
        },
    });

    const data = await notification.findOne({
        where: {
            id,
        },
    });
    if (data) {
        return data.dataValues;
    }

    throw new Error(`Notification is not found!`);
};

exports.deleteNotification = async (id) => {
    const data = await notification.findOne({
        where: {
            id,
        },
    });

    if (data) {
        await notification.destroy({
            where: {
                id,
            },
        });

        return data.dataValues;
    }

    throw new Error(`Notification is not found!`);
};

/* Additional but essential */
exports.searchNotification = async (payload) => {
    /* Will returns all notifications where its message (content) or type CONTAINS the payload*/
    /* Payload searhing is case-INSENSITIVE */
    const data = await notification.findAll({
        where: {
            /* The or here make this filter not exclusive so it can mix between message and type */
            [Op.or]: [
                { message: { [Op.iLike]: `%${payload}%` } },
                { type: { [Op.iLike]: `%${payload}%` } },
            ],
        },
    });

    return data;
};
