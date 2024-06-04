const detailsRepo = require("../../repository/bookingDetails");

exports.getBookingDetails = async () => {
    const data = await detailsRepo.getBookingDetails();
    return data;
};

exports.getBookingDetailById = async (id) => {
    const data = await detailsRepo.getBookingDetailById(id);
    return data;
};

exports.createBookingDetail = async (payload) => {
    const data = await detailsRepo.createBookingDetail(payload);
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
