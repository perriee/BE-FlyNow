/* eslint-disable no-plusplus */
const { sequelize } = require("../../models");
const bookingRepo = require("../../repository/booking");
const passengerRepo = require("../../repository/passenger");
const bookingDetailUseCase = require("../bookingDetail");



exports.getBookings = async () => {
    const data = await bookingRepo.getBookings();
    return data;
};

// TODO: Harus join table bookings, bookingDetails, passengers, seats, flights, users, airline, airport, dan payment
exports.getBookingId = async (id) => {
    const data = await bookingRepo.getBookingId(id);
    return data;
};

exports.createBooking = async (payload) => {
    const { bookingPayload, passengerPayloads, seatPayloads } = payload;

    const t = await sequelize.transaction();

    try {
        const passengersResult =
            await passengerRepo.createBulkPassenger(passengerPayloads);

        const bookingResult = await bookingRepo.createBooking(bookingPayload);

        await t.commit();

        // Call Booking Details Use Case
        const {
            id: bookingId,
            departureFlightId,
            returnFlightId,
        } = bookingResult;

        const bookingDetailPayload = [];

        /**
         * Dua variabel indeks, departureSeatIndex dan returnSeatIndex, untuk melacak kursi mana yang harus diberikan kepada penumpang berikutnya. Untuk setiap penumpang, kita memberikan kursi berikutnya yang tersedia untuk penerbangan keberangkatan dan pulang, dan kemudian meningkatkan indeks yang sesuai. Ini memastikan bahwa setiap penumpang mendapatkan kursi yang berbeda untuk setiap penerbangan.
         */
        let departureSeatIndex = 0;
        let returnSeatIndex = 0;

        passengersResult.forEach((passenger) => {
            if (
                seatPayloads.departureSeats.length > 0 &&
                departureSeatIndex < seatPayloads.departureSeats.length
            ) {
                const seatCode =
                    seatPayloads.departureSeats[departureSeatIndex];
                bookingDetailPayload.push({
                    bookingId,
                    flightId: departureFlightId,
                    passengerId: passenger.id,
                    seatCode,
                });
                departureSeatIndex++;
            }

            if (
                seatPayloads?.returnSeats?.length > 0 &&
                returnSeatIndex < seatPayloads.returnSeats.length
            ) {
                const seatCode = seatPayloads.returnSeats[returnSeatIndex];
                bookingDetailPayload.push({
                    bookingId,
                    flightId: returnFlightId,
                    passengerId: passenger.id,
                    seatCode,
                });

                returnSeatIndex++;
            }
        });

        const bookingDetailsResult =
            await bookingDetailUseCase.createBulkBookingDetail(
                bookingDetailPayload,
            );

        return {
            passengersResult,
            bookingResult,
            bookingDetailsResult,
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

/** V2 Create Booking
exports.createBooking = async (payload) => {
    const { bookingPayload, passengerPayloads } = payload;

    const t = await sequelize.transaction();

    try {
        const passengersResult =
            await passengerRepo.createBulkPassenger(passengerPayloads);

        const bookingResult = await bookingRepo.createBooking(bookingPayload);

        await t.commit();

        // Call Booking Details Use Case
        const {
            id: bookingId,
            departureFlightId,
            returnFlightId,
        } = bookingResult;

        const bookingDetailsResult = {
            departureDetail: [],
            returnDetail: [],
        };

        passengerPayloads.forEach(async (passenger) => {
            if (passenger?.departureSeatCode) {
                const result = await bookingDetailsUseCase.createBookingDetail({
                    bookingId,
                    flightId: departureFlightId,
                    passengerId: passenger.id,
                    // RECHECK: yang dikirim ke client itu seatId atau seatCode?
                    seatCode: passenger?.departureSeatCode,
                });
                bookingDetailsResult.departureDetail.push({
                    ...result,
                    seatCode: passenger?.departureSeatCode,
                });
            }

            if (passenger?.returnSeatCode) {
                const result = await bookingDetailsUseCase.createBookingDetail({
                    bookingId,
                    flightId: returnFlightId,
                    passengerId: passenger.id,
                    // RECHECK: yang dikirim ke client itu seatId atau seatCode?
                    seatCode: passenger?.returnSeatCode,
                });
                bookingDetailsResult.returnDetail.push({
                    ...result,
                    seatCode: passenger?.returnSeatCode,
                });
            }
        });

        return {
            passengersResult,
            bookingResult,
            bookingDetailsResult,
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

 */

// FIXME: Update Booking belum bisa digunakan
exports.updateBooking = async (id, payload) => {
    await bookingRepo.updateBooking(id, payload);
    const data = await bookingRepo.getBookingId(id);
    return data;
};


exports.deleteBooking = async (id) => {
    const data = await bookingRepo.deleteBooking(id);
    return data;
};
