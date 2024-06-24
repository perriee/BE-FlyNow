/* eslint-disable no-plusplus */
const { Transaction } = require("sequelize");

const { sequelize } = require("../../models");
const bookingRepo = require("../../repository/booking");
const passengerRepo = require("../../repository/passenger");
const bookingDetailUseCase = require("../bookingDetail");
const flightRepo = require("../../repository/flight");

exports.getBookings = async () => {
    const data = await bookingRepo.getBookings();
    return data;
};

exports.getBookingId = async (id) => {
    const data = await bookingRepo.getBookingId(id);
    if (data) {
        const departureFlightId = data.departureFlightId;
        const returnFlightId = data.returnFlightId;

        const departureFlight = await flightRepo.getFlight(departureFlightId);

        let returnFlight = null;
        if (returnFlightId) {
            returnFlight = await flightRepo.getFlight(returnFlightId);
        }

        const result = data.toJSON();
        result.departureFlight = departureFlight;
        result.returnFlight = returnFlight;

        return result;
    }
    return null;
};

exports.createBooking = async (payload) => {
    const { bookingPayload, passengerPayloads, seatPayloads } = payload;

    const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
        const passengersResult = await passengerRepo.createBulkPassenger(
            passengerPayloads,
            t,
        );

        const bookingResult = await bookingRepo.createBooking(
            bookingPayload,
            t,
        );

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
                t,
            );

        await t.commit();

        return {
            passangers: passengersResult,
            booking: bookingResult,
            bookingDetails: bookingDetailsResult,
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

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
