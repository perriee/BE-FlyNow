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

    const data = await Promise.all(
        bookings.map(async (bookingInstance, index) => {
            const bookingPlain = bookingInstance.get({ plain: true });

            const bookingDetail = await bookingDetail.findAll({
                where: {
                    bookingId: bookingPlain.id,
                },
            });

            const payments = await payment.fin;

            return {
                ...bookingPlain,
                details: bookingDetail.map((detail) =>
                    detail.get({ plain: true }),
                ),
            };
        }),
    );

    return data;
};
