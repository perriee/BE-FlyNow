const bookingRepo = require("../repository/booking");

exports.getBookings = async () => {
    const data = await bookingRepo.getBookings();
    return data;
};

exports.getBookingId = async (id) => {
    const data = await bookingRepo.getBookingId(id);
    return data;
};

exports.createBooking = async (payload) => {
    const data = await bookingRepo.createBooking(payload);
    return data;
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
