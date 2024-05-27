const paymentRepo = require('../../repository/payment')

exports.getPayments = async () => {
    const data = await paymentRepo.getPayments()
    return data
}

// exports.getPaymentById = async (id) => {
//     const data = await paymentRepo.getPaymentById(id)
//     return data
// }

exports.getPaymentByBookingId = async (bookingId) => {
    const data = await paymentRepo.getPaymentByBookingId(bookingId)
    return data
}

exports.createPayment = async (payload) => {
    const data = await paymentRepo.createPayment(payload)
    return data
}

exports.deletePayment = async (id) => {
    const data = await paymentRepo.deletePayment(id)
    return data
}

exports.updatePayment = async (payload) => {
    const data = await paymentRepo.updatePayment(payload)
    return data
}
