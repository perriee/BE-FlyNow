const bookingRepo = require("../../repository/booking");
const bookingDetailsRepo = require("../../repository/bookingDetails");
const paymentRepo = require("../../repository/payment");
const flightRepo = require("../../repository/flight");

exports.getHistories = async (userId) => {
    const bookings = await bookingRepo.getBookingByUserId(userId);

    const data = await Promise.all(
        bookings.map(async (bookingInstance, index) => {
            const bookingPlain = bookingInstance.get({ plain: true });

            const bookingDetails =
                await bookingDetailsRepo.getBookingDetailByBookingId(
                    bookingPlain.id,
                );

            const payment = await paymentRepo.getPaymentByBookingId(
                bookingPlain.id,
            );

            const departureFlight = await flightRepo.getFlight(
                bookingPlain.departureFlightId,
            );

            let returnFlight = null;
            if (bookingPlain.returnFlightId !== null) {
                returnFlight = await flightRepo.getFlight(
                    bookingPlain.returnFlightId,
                );
            }

            const departureDetails = bookingDetails.filter(
                (detail) =>
                    detail.seat.flightId == bookingPlain.departureFlightId,
            );

            let returnDetails = null;
            if (bookingPlain.returnFlightId !== null) {
                returnDetails = bookingDetails.filter(
                    (detail) =>
                        detail.seat.flightId == bookingPlain.returnFlightId,
                );
            }

            return {
                ...bookingPlain,
                flight: {
                    departure: departureFlight,
                    return: returnFlight,
                },
                details: {
                    departure: departureDetails,
                    return: returnDetails,
                },
                payment,
            };
        }),
    );

    return data;
};

exports.getHistoriesByCity = async (userId, city) => {
    const allData = await this.getHistories(userId);
    const filteredData = allData.filter((data) => {
        return (
            data.flight.departure.departureAirport.city.toLowerCase() ==
                city.toLowerCase() ||
            data.flight.departure.arrivalAirport.city.toLowerCase() ==
                city.toLowerCase() ||
            data.flight.return?.departureAirport?.city.toLowerCase() ==
                city.toLowerCase() ||
            data.flight.return?.departureAirport?.city.toLowerCase() ==
                city.toLowerCase()
        );
    });
    return filteredData;
};

exports.getHistoriesByPaymentStatus = async (userId, paymentStatus) => {
    const allData = await this.getHistories(userId);
    const filteredData = allData.filter((data) => {
        if (data.payment !== null) {
            return (
                data.payment.paymentStatus.toLowerCase() ===
                paymentStatus.toLowerCase()
            );
        }
    });
    return filteredData;
};
