const { payment, booking, notification } = require("../../models");
const { createNotification } = require("../../usecase/notification/index");
const { getBookingId } = require("../../usecase/booking/index");

const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
};

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

    // Kirim notifikasi jika pembuatan status payment berhasil
    if (data) {
        const bookingData = await getBookingId(payload.bookingId);
        const paymentFormatted = formatIDR(payload.paymentAmount);

        const notifPayload = {
            userId: bookingData.userId,
            type: "payment",
            message: `Selangkah lagi dan dapatkan tiket penerbangan Anda! Segera selesaikan pembayaran pemesanan dengan kode ${bookingData.bookingCode} sebesar ${paymentFormatted}`,
        };

        await createNotification(notifPayload);
    }

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

exports.getBookingIdByTrxId = async (transactionId) => {
    const data = await payment.findOne({
        where: { transactionId: transactionId },
    });
    console.log("🚀 ~ REPOSITORY getBookingIdByTrxId= ~ data:", data);

    return data;
};
