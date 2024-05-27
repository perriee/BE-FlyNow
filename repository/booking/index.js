const { booking, user, flight } = require("../../models");

exports.getBookings = async () => {
    const data = await booking.findAll({
        include: [
            {
                model: user,
            },
            {
                model: flight,
            },
        ],
    });

    return data;
};

exports.getBookingId = async (id) => {
    const data = await booking.findOne({
        where: {
            id,
        },
        include: [
            {
                model: user,
            },
            {
                model: flight,
            },
        ],
    });

    return data;
};

exports.createBooking = async (payload) => {
    const data = await booking.create(payload);
    return data;
};

exports.updateBooking = async (id, payload) => {
    const data = await booking.update(payload, {
        where: {
            id,
        },
    });
    return data;
};

exports.deleteBooking = async (id) => {
    const data = await booking.destroy({ where: { id } });
    return data;
};
