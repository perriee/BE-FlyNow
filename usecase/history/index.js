const bookingRepo = require("../../repository/booking");
const bookingDetailsRepo = require("../../repository/bookingDetails");
const paymentRepo = require("../../repository/payment");
const airlineRepo = require("../../repository/airline");
const airportRepo = require("../../repository/airport");

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

            const airline = await airlineRepo.getAirlineById(
                bookingPlain.flight.airlineId,
            );
            const departureAirport = await airportRepo.getAirportByID(
                bookingPlain.flight.departureAirportId,
            );
            const arrivalAirport = await airportRepo.getAirportByID(
                bookingPlain.flight.arrivalAirportId,
            );

            return {
                ...bookingPlain,
                airline,
                departureAirport,
                arrivalAirport,
                details: bookingDetail,
                payment: payment.get({ plain: true }),
            };
        }),
    );

    return data;
};
