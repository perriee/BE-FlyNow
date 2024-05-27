const paymentRepo = require("../repository/payment");

exports.getPayments = async () => {
    const data = await paymentRepo.getPayments();
    return data;
};

exports.createPayment = async (payload) => {
    const data = await paymentRepo.createPayment(payload);
    return data;
};
