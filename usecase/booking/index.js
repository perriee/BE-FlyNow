/* eslint-disable no-plusplus */
const { sequelize } = require("../../models");
const bookingRepo = require("../../repository/booking");
const passangerRepo = require("../../repository/passenger");
const bookingDetailUseCase = require("../bookingDetail");

exports.getBookings = async () => {
    const data = await bookingRepo.getBookings();
    return data;
};

exports.getBookingId = async (id) => {
    const data = await bookingRepo.getBookingId(id);
    return data;
};

exports.createBooking = async (payload) => {
    const { bookingPayload, passangerPayloads, seatPayloads } = payload;

    const t = await sequelize.transaction();

    try {
        const passangersResult =
            await passangerRepo.createBulkPassenger(passangerPayloads);

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

        passangersResult.forEach((passanger) => {
            if (
                seatPayloads.departureSeats.length > 0 &&
                departureSeatIndex < seatPayloads.departureSeats.length
            ) {
                const seatCode =
                    seatPayloads.departureSeats[departureSeatIndex];
                bookingDetailPayload.push({
                    bookingId,
                    flightId: departureFlightId,
                    passengerId: passanger.id,
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
                    passengerId: passanger.id,
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
            passangersResult,
            bookingResult,
            bookingDetailsResult,
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

// V2
// exports.createBooking = async (payload) => {
//     const { bookingPayload, passangerPayloads } = payload;

//     const t = await sequelize.transaction();

//     try {
//         const passangersResult =
//             await passangerRepo.createBulkPassenger(passangerPayloads);

//         const bookingResult = await bookingRepo.createBooking(bookingPayload);

//         await t.commit();

//         // Call Booking Details Use Case
//         const {
//             id: bookingId,
//             departureFlightId,
//             returnFlightId,
//         } = bookingResult;

//         const bookingDetailsResult = {
//             departureDetail: [],
//             returnDetail: [],
//         };

//         passangerPayloads.forEach(async (passanger) => {
//             if (passanger?.departureSeatCode) {
//                 const result = await bookingDetailsUseCase.createBookingDetail({
//                     bookingId,
//                     flightId: departureFlightId,
//                     passengerId: passanger.id,
//                     // RECHECK: yang dikirim ke client itu seatId atau seatCode?
//                     seatCode: passanger?.departureSeatCode,
//                 });
//                 bookingDetailsResult.departureDetail.push({
//                     ...result,
//                     seatCode: passanger?.departureSeatCode,
//                 });
//             }

//             if (passanger?.returnSeatCode) {
//                 const result = await bookingDetailsUseCase.createBookingDetail({
//                     bookingId,
//                     flightId: returnFlightId,
//                     passengerId: passanger.id,
//                     // RECHECK: yang dikirim ke client itu seatId atau seatCode?
//                     seatCode: passanger?.returnSeatCode,
//                 });
//                 bookingDetailsResult.returnDetail.push({
//                     ...result,
//                     seatCode: passanger?.returnSeatCode,
//                 });
//             }
//         });

//         return {
//             passangersResult,
//             bookingResult,
//             bookingDetailsResult,
//         };
//     } catch (error) {
//         await t.rollback();
//         throw error;
//     }
// };

exports.updateBooking = async (id, payload) => {
    await bookingRepo.updateBooking(id, payload);
    const data = await bookingRepo.getBookingId(id);
    return data;
};

exports.deleteBooking = async (id) => {
    const data = await bookingRepo.deleteBooking(id);
    return data;
};
