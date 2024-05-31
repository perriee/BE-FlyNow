const { bookingDetail, booking, passenger, seat } = require("../../models");

exports.getBookingDetails = async () => {
    const data = await bookingDetail.findAll({
        include: [
            {
                model: booking,
            },
            {
                model: passenger,
            },
            {
                model: seat,
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
            },
            {
                model: passenger,
            },
            {
                model: seat,
            },
        ],
    });
    if (data.length > 0) {
        return data[0];
    }
    throw new Error(`Booking Details Not Found`);
};

exports.createBookingDetail = async (payload) => {
    const data = await bookingDetail.create(payload);
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
            },
            {
                model: passenger,
            },
            {
                model: seat,
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
