const { seat } = require('../../models')

exports.createSeat = async (payload) => {
    const data = await seat.create({
        seatCode: payload.seatCode,
        seatAvailable: payload.seatAvailable,
        seatType: payload.seatType,
        flightId: payload.flightId,
        price: payload.price,
    })
    return data
}