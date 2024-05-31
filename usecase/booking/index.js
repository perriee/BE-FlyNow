const { sequelize } = require("../../models");
const bookingRepo = require("../../repository/booking");
const passangerRepo = require("../../repository/passenger");

exports.getBookings = async () => {
    const data = await bookingRepo.getBookings();
    return data;
};

exports.getBookingId = async (id) => {
    const data = await bookingRepo.getBookingId(id);
    return data;
};

exports.createBooking = async (payload) => {
    const { bookingData: bookingPayload, passangersData: passangersPayload } =
        payload;

    const t = await sequelize.transaction();

    try {
        const passangersResult = await passangerRepo.createBulkPassenger(
            passangersPayload
        );

        const bookingResult = await bookingRepo.createBooking(bookingPayload);

        await t.commit();

        return {
            passangersResult,
            bookingResult,
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

exports.updateBooking = async (id, payload) => {
    await bookingRepo.updateBooking(id, payload);
    const data = await bookingRepo.getBookingId(id);
    return data;
};

exports.deleteBooking = async (id) => {
    const data = await bookingRepo.deleteBooking(id);
    return data;
};
