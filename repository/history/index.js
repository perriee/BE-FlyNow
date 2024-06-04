const { where } = require("sequelize");
const {
    booking,
    bookingDetail,
    flight,
    user,
    payment,
    passenger,
} = require("../../models");

exports.getHistories = async (userId) => {
    const bookings = await booking.findAll({
        include: [
            {
                model: user,
                attributes: ["id", "name", "email", "image", "phoneNumber"],
            },
            {
                model: flight,
            },
        ],
        where: { userId },
    });

    const bookingDetail = bookings.map(async (booking, index) => {
        const detail = await bookingDetail.findAll({
            where: {
                bookingId: booking.id,
            },
            include: [{ model: passenger }],
        });
    });

    return booking;
};
