const bookingRepo = require("../../repository/booking");
const bookingDetailsRepo = require("../../repository/bookingDetails");
const paymentRepo = require("../../repository/payment");

exports.getHistories = async (userId) => {
    const bookings = await bookingRepo.getBookingByUserId(userId);

    const data = await Promise.all(
        bookings.map(async (bookingInstance, index) => {
            const bookingPlain = bookingInstance.get({ plain: true });

            const bookingDetail =
                await bookingDetailsRepo.getBookingDetailByBookingId(
                    bookingPlain.id,
                );

            const payment = await paymentRepo.getPaymentByBookingId(
                bookingPlain.id,
            );

            return {
                ...bookingPlain,
                details: bookingDetail,
                payment: payment.get({ plain: true }),
            };
        }),
    );

    return data;
};
