const seatRepo = require("../../repository/seat")

exports.createSeat = async (payload) => {
    const data = await seatRepo.createSeat(payload)
    return data
}