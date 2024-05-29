const { booking, user, flight } = require("../../models");

exports.getBookings = async () => {
    const data = await booking.findAll({
        include: [
            {
                model: user,
                attributes: ["id", "name", "email", "image", "phoneNumber"],
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
                attributes: ["id", "name", "email", "image", "phoneNumber"],
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
    const foundBooking = await booking.findOne({
        where: {
            id,
        },
    });

    if (!foundBooking) {
        throw new Error(`Booking With id:${id} is not found`);
    }

    // Delete the airport
    await booking.destroy({
        where: {
            id,
        },
    });

    // Return the data of the deleted airport
    return foundBooking;
};