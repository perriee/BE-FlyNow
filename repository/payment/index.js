const { payment } = require("../../models");

exports.getPayments = async () => {
    const data = await payment.findAll();
    return data;
};

// exports.getPaymentById = async (id) => {
//     const data = await payment.findAll({ where: { id } })
//     return data
// }

exports.getPaymentByBookingId = async (bookingId) => {
    const data = await payment.findOne({ where: { bookingId } });
    return data;
};

exports.createPayment = async (payload) => {
    const data = await payment.create({
        bookingId: payload.bookingId,
        paymentAmount: payload.paymentAmount,
        paymenMethod: payload.paymentMethod,
        paymentStatus: payload.paymentStatus,
    });
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
