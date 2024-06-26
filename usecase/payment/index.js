const paymentRepo = require("../../repository/payment");
const flightRepo = require("../../repository/flight");

exports.getPayments = async () => {
    const data = await paymentRepo.getPayments();
    return data;
};

exports.getPaymentById = async (id) => {
    const data = await paymentRepo.getPaymentById(id);
    return data;
};

exports.getPaymentByTransactionId = async (transactionId) => {
    const data = await paymentRepo.getPaymentByTransactionId(transactionId);
    return data;
};

exports.getPaymentByBookingId = async (bookingId) => {
    const data = await paymentRepo.getPaymentByBookingId(bookingId);
    console.log("🚀 ~ USECASE.getPaymentByBookingId= ~ data:", data);

    if (data) {
        const departureFlightId = data.booking.departureFlightId;
        const returnFlightId = data.booking.returnFlightId;

        const departureFlight = await flightRepo.getFlight(departureFlightId);

        let returnFlight = null;
        if (returnFlightId) {
            returnFlight = await flightRepo.getFlight(returnFlightId);
        }

        const result = data.toJSON();
        result.booking.departureFlight = departureFlight;
        result.booking.returnFlight = returnFlight;

        return result;
    }

    return null;
};

exports.createPayment = async (payload) => {
    const data = await paymentRepo.createPayment(payload);
    return data;
};

exports.deletePayment = async (id) => {
    const data = await paymentRepo.deletePayment(id);
    return data;
};

exports.updatePayment = async (payload) => {
    const data = await paymentRepo.updatePayment(payload);
    return data;
};

exports.updatePaymentStatus = async (transactionId, payload) => {
    const data = await paymentRepo.updatePaymentStatus(transactionId, payload);
    return data;
};

exports.getBookingIdByTrxId = async (transactionId) => {
    const data = await paymentRepo.getBookingIdByTrxId(transactionId);
    return data;
};
