const { bookingDetail, booking, passenger, seat } = require("../../models");

exports.getBookingDetails = async () => {
    const data = await bookingDetail.findAll({
        include: [
            {
                model: booking,
                as: "booking",
            },
            {
                model: passenger,
                as: "passenger",
            },
            {
                model: seat,
                as: "seat",
            },
        ],
    });
    return data;
};

exports.getBookingDetailById = async (id) => {
    const data = await bookingDetail.findOne({
        where: {
            id,
        },
        include: [
            {
                model: booking,
                as: "booking",
            },
            {
                model: passenger,
                as: "passenger",
            },
            {
                model: seat,
                as: "seat",
            },
        ],
    });
    return data;
};

exports.getBookingDetailByBookingId = async (bookingId) => {
    const data = await bookingDetail.findAll({
        where: {
            bookingId,
        },
        include: [
            {
                model: booking,
                as: "booking",
            },
            {
                model: passenger,
                as: "passenger",
            },
            {
                model: seat,
                as: "seat",
            },
        ],
    });

    return data;
};

exports.createBookingDetail = async (payload, t) => {
    const data = await bookingDetail.create(payload, {
        transaction: t,
    });
    return data;
};

exports.createBulkBookingDetail = async (payload) => {
    const data = await bookingDetail.bulkCreate(payload);
    return data;
};

exports.updateBookingDetail = async (id, payload) => {
    await bookingDetail.update(payload, {
        where: {
            id,
        },
    });

    const data = await bookingDetail.findAll({
        where: {
            id,
        },
        include: [
            {
                model: booking,
                as: "booking",
            },
            {
                model: passenger,
                as: "passenger",
            },
            {
                model: seat,
                as: "seat",
            },
        ],
    });
    return data;
};

exports.deleteBookingDetail = async (id) => {
    const data = await bookingDetail.findOne({
        where: {
            id,
        },
    });

    if (!data) {
        throw new Error(`Booking Details With id:${id} is not found`);
    }

    await bookingDetail.destroy({
        where: {
            id,
        },
    });

    return data;
};
