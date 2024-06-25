const { payment, booking, notification } = require("../../models");
const { createNotification } = require("../../usecase/notification/index");
const { getBookingId } = require("../../usecase/booking/index");

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
        const bookingCode = bookingData.data.bookingCode;
        const userId = bookingData.data.userId;
        const departureCity1 =
            bookingData.data.departureFlight.departureAirport.city;
        const arrivalCity1 =
            bookingData.data.departureFlight.arrivalAirport.city;

        if (bookingData.data.returnFlight) {
            const departureCity2 =
                bookingData.data.returnFlight.departureAirport.city;
            const arrivalCity2 =
                bookingData.data.returnFlight.arrivalAirport.city;

            const notifPayload = {
                userId,
                type: "payment",
                message: `Siap untuk terbang dari ${departureCity1} ke ${arrivalCity1} dan dari ${departureCity2} ke ${arrivalCity2}? Segera lakukan pembayaran untuk pesanan dengan kode ${bookingCode}!`,
            };
            await createNotification(notifPayload);
        } else {
            const notifPayload = {
                userId,
                type: "payment",
                message: `Siap untuk terbang dari ${departureCity1} ke ${arrivalCity1}? Segera lakukan pembayaran untuk pesanan dengan kode ${bookingCode}!`,
            };
            await createNotification(notifPayload);
        }
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
