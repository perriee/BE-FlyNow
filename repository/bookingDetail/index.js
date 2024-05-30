const { bookingDetail } = require('../../models')

exports.createBookingDetail = async (payload) => {
    console.log(payload)

    const data = await bookingDetail.create({
        bookingId: payload.bookingId,
        passengerId: payload.passengerId,
        seatId: payload.seatId,
    })
    return data
}