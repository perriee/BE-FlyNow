const { payment } = require("../models");

exports.getPayments = async () => {
    const data = await payment.findAll();
    return data;
};

exports.createPayment = async (payload) => {
    const data = await payment.create({"bookingId" : payload.bookingId, "paymentAmount": payload.paymentAmount, "paymenMethod" : payload.paymentMethod, "paymentStatus": payload.paymentStatus});
    return data;
};
