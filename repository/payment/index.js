const { payment, booking } = require("../../models");

exports.getPayments = async () => {
    const data = await payment.findAll();
    return data;
};

exports.getPaymentById = async (id) => {
    const data = await payment.findOne({ where: { id } });
    return data;
};

exports.getPaymentByTransactionId = async (transactionId) => {
    const data = await payment.findOne({
        where: { transactionId: transactionId },
    });
    return data;
};

exports.getPaymentByBookingId = async (bookingId) => {
    const data = await payment.findOne({
        where: { bookingId },
        include: [
            {
                model: booking,
            },
        ],
    });
    return data;
};

exports.createPayment = async (payload) => {
    const data = await payment.create(payload);

    return data;
};

exports.deletePayment = async (id) => {
    const data = await payment.destroy({ where: { id } });
    return data;
};

exports.updatePayment = async (payload) => {
    const { paymentAmount, paymentMethod, paymentStatus, bookingId } = payload;
    const currentData = await this.getPaymentByBookingId(bookingId);

    if (currentData.length) {
        const newData = await payment.update(
            {
                paymentAmount,
                paymentMethod,
                paymentStatus,
            },
            {
                where: {
                    bookingId,
                },
            },
        );
        return newData;
    } else {
        throw new Error(`Booking with id ${bookingId} is not found`);
    }
};

exports.updatePaymentStatus = async (transactionId, payload) => {
    const data = await payment.update(payload, {
        where: {
            transactionId: transactionId,
        },
    });

    return data;
};
