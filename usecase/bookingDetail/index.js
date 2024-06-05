const detailsRepo = require("../../repository/bookingDetails");
const seatsRepo = require("../../repository/seat");

exports.getBookingDetails = async () => {
    const data = await detailsRepo.getBookingDetails();
    return data;
};

exports.getBookingDetailById = async (id) => {
    const data = await detailsRepo.getBookingDetailById(id);
    return data;
};

exports.createBookingDetail = async (payload) => {
    const { bookingId, flightId, passengerId, seatCode } = payload;
    const seatId = await seatsRepo.checkSeat(flightId, seatCode);

    const data = await detailsRepo.createBookingDetail({
        bookingId,
        passengerId,
        seatId,
    });

    return data;
};

exports.createBulkBookingDetail = async (payload) => {
    const promises = payload.map(async (bookingDetail) => {
        const { bookingId, flightId, passengerId, seatCode } = bookingDetail;
        // RECHECK: seatAvailable belum diubah menjadi false, harusnya diubah di sini atau di tempat lain?
        const seatId = await seatsRepo.checkSeat(flightId, seatCode);
        return detailsRepo.createBookingDetail({
            bookingId,
            passengerId,
            seatId,
        });
    });

    const data = await Promise.all(promises);
    return data;
};

exports.updateBookingDetail = async (id, payload) => {
    await detailsRepo.updateBookingDetail(id, payload);
    const data = await detailsRepo.getBookingDetailById(id);
    return data;
};

exports.deleteBookingDetail = async (id) => {
    const data = await detailsRepo.deleteBookingDetail(id);
    return data;
};
