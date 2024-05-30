const bookingDetailRepo = require('../../repository/bookingDetail')

exports.createBookingDetail = async (payload) => {
    const data = await bookingDetailRepo.createBookingDetail(payload)
    return data
}