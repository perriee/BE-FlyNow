const { notifications } = require("../../models");

/* CRUD */
exports.createNotification = async (payload) => {
    // check if the notification is for a specific user or not
    if (payload.userId) {
        // check if the user exists
        const user = await user.findOne({
            where: { id: payload.userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const data = await notifications.create(payload);
    } else {
        const users = await user.findAll({
            attributes: ["id"],
        });

        // create notifications for all users
        const notificationsPayload = users.map((user) => ({
            ...payload,
            userId: user.id,
        }));

        // bulk create means put all data in a single query (more efficient)
        await notifications.bulkCreate(notificationsPayload);
    }
};

exports.getAllNotifications = async () => {
    return await notifications.findAll();
};

exports.getNotificationByID = async (id) => {
    const data = await notifications.findOne({
        where: {
            id,
        },
    });
    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`Notification is not found!`);
};

exports.getNotificationsByUserID = async (userId, filters = {}) => {
    // combine the filters
    const whereClause = {
        userId,
        ...filters,
    };

    const data = await notifications.findAll({
        where: {
            whereClause,
        },
    });

    return data;
};

exports.updateNotification = async (id, payload) => {
    await notifications.update(payload, {
        where: {
            id,
        },
    });

    const data = await notifications.findOne({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`Notification is not found!`);
};

exports.deleteNotification = async (id) => {
    const data = await notifications.findOne({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        await notifications.destroy({
            where: {
                id,
            },
        });

        return data[0];
    }

    throw new Error(`Notification is not found!`);
};

/* Additional but essential */
exports.searchNotification = async (payload) => {
    /* Will returns all notifications where its message (content) or type CONTAINS the payload*/
    /* Payload searhing is case-INSENSITIVE */
    const data = await notifications.findAll({
        where: {
            /* The or here make this filter not exclusive so it can mix between message and type */
            [Op.or]: [
                { message: { [Op.like]: `%${payload}%` } },
                { type: { [Op.like]: `%${payload}%` } },
            ],
        },
    });

    return data;
};
