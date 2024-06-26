const crypto = require("crypto");
const paymentUsecase = require("../usecase/payment");
const bookingUsecase = require("../usecase/booking");
const createNotificationUsecase = require("../usecase/notification");
const { bookingDetail, seat } = require("../models");

exports.updateStatusBasedOnMidtransResponse = async (
    transactionId,
    dataFromMidtrans,
) => {
    const hash = crypto
        .createHash("sha512")
        .update(
            `${transactionId}${dataFromMidtrans.status_code}${String(dataFromMidtrans.gross_amount)}${process.env.MIDTRANS_SERVER_KEY}`,
        )
        .digest("hex");

    if (dataFromMidtrans.signature_key !== hash) {
        return {
            status: "Error",
            message: "Invalid signature key",
        };
    }

    let responseData = null;
    let transactionStatus = dataFromMidtrans.transaction_status;
    let fraudStatus = dataFromMidtrans.fraud_status;

    // get bookingId
    const { bookingId } =
        await paymentUsecase.getBookingIdByTrxId(transactionId);

    const bookingData = await bookingUsecase.getBookingId(bookingId);

    if (transactionStatus == "capture") {
        if (fraudStatus == "accept") {
            const payload = {
                paymentStatus: "paid",
                paymentMethod: dataFromMidtrans.payment_type,
                expiryTime: dataFromMidtrans.expiry_time,
            };

            const transaction = await paymentUsecase.updatePaymentStatus(
                transactionId,
                payload,
            );

            // Send Notification
            const notifPayload = {
                userId: bookingData.userId,
                type: "payment",
                message: `Pembayaran Anda untuk pesanan dengan kode ${bookingData.bookingCode} telah berhasil! Terima kasih telah mempercayakan pemesanan Anda kepada kami. Selamat menikmati perjalanan Anda!`,
            };

            createNotificationUsecase.createNotification(notifPayload);

            responseData = transaction;
        }
    } else if (transactionStatus == "settlement") {
        const payload = {
            paymentStatus: "paid",
            paymentMethod: dataFromMidtrans.payment_type,
            expiryTime: dataFromMidtrans.expiry_time,
        };

        const transaction = await paymentUsecase.updatePaymentStatus(
            transactionId,
            payload,
        );

        // Send Notification
        const notifPayload = {
            userId: bookingData.userId,
            type: "payment",
            message: `Pembayaran Anda untuk pesanan dengan kode ${bookingData.bookingCode} telah berhasil! Terima kasih telah mempercayakan pemesanan Anda kepada kami. Selamat menikmati perjalanan Anda!`,
        };

        createNotificationUsecase.createNotification(notifPayload);

        responseData = transaction;
    } else if (transactionStatus == "expire") {
        const payload = {
            paymentStatus: "expired",
            expiryTime: dataFromMidtrans.expiry_time,
        };

        const transaction = await paymentUsecase.updatePaymentStatus(
            transactionId,
            payload,
        );

        const bookingDetailData = await bookingDetail.findAll({
            where: {
                bookingId,
            },
        });

        const promises = bookingDetailData.map(async (bookingDetail) => {
            await seat.update(
                {
                    seatAvailable: true,
                },
                {
                    where: {
                        id: bookingDetail.seatId,
                    },
                },
            );
        });

        await Promise.all(promises);

        // Send Notification
        const notifPayload = {
            userId: bookingData.userId,
            type: "payment",
            message: `Pembayaran Anda untuk pesanan dengan kode ${bookingData.bookingCode} telah kadaluarsa. Dengan berat hati, pesanan Anda kami batalkan. Silahkan lakukan pemesanan kembali. Terima kasih!`,
        };

        createNotificationUsecase.createNotification(notifPayload);

        responseData = transaction;
    } else if (transactionStatus == "pending") {
        const payload = {
            paymentStatus: "pending",
            expiryTime: dataFromMidtrans.expiry_time,
        };

        const transaction = await paymentUsecase.updatePaymentStatus(
            transactionId,
            payload,
        );

        responseData = transaction;
    }

    return {
        status: "Success",
        data: responseData,
    };
};
