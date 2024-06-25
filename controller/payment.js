const crypto = require("crypto");
const paymentUsecase = require("../usecase/payment");
const bookingUsecase = require("../usecase/booking");
const createNotificationUsecase = require("../usecase/notification");
const { updateStatusBasedOnMidtransResponse } = require("../helper/midtrans");
const { CLIENT_URL, MIDTRANS_SERVER_KEY } = process.env;

exports.getPayments = async (req, res, next) => {
    try {
        const data = await paymentUsecase.getPayments();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getPaymentByBookingId = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        if (bookingId) {
            const data = await paymentUsecase.getPaymentByBookingId(bookingId);
            res.status(200).json({
                message: "success",
                data,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.createPayment = async (req, res, next) => {
    try {
        const { bookingId, paymentAmount } = req.body;

        // GET USER DATA
        const user = req.user;

        // CEK APAKAH BOOKING ID SUDAH ADA PAYMENT ID
        const isBookingHasPayment =
            await paymentUsecase.getPaymentByBookingId(bookingId);

        if (isBookingHasPayment !== null) {
            return res.status(400).json({
                status: "Error",
                message: "Booking already has payment",
            });
        }

        const detailBooking = await bookingUsecase.getBookingId(bookingId);
        const { departureFlight, returnFlight } = detailBooking;

        const transaction_id = `TRX-${crypto.randomBytes(4).toString("hex")}-${crypto.randomBytes(4).toString("hex")}`;
        const gross_amount = paymentAmount;
        const authString = btoa(MIDTRANS_SERVER_KEY);

        let item_details_data = [];

        // PUSH DATA DEPARTURE FLIGHT FOR ADULTS
        if (detailBooking.numAdults > 0) {
            item_details_data.push({
                id: departureFlight.id,
                price: departureFlight.price,
                name: "Adult - " + departureFlight.flightCode,
                quantity: detailBooking.numAdults,
            });
        }

        // PUSH DATA DEPARTURE FLIGHT FOR CHILDREN
        if (detailBooking.numChildren > 0) {
            item_details_data.push({
                id: departureFlight.id,
                price: departureFlight.price,
                name: "Child - " + departureFlight.flightCode,
                quantity: detailBooking.numChildren,
            });
        }

        // PUSH DATA DEPARTURE FLIGHT FOR BABIES
        if (detailBooking.numBabies > 0) {
            item_details_data.push({
                id: departureFlight.id,
                price: 0,
                name: "Baby - " + departureFlight.flightCode,
                quantity: detailBooking.numBabies,
            });
        }

        // CHECK IF RETURN FLIGHT EXISTS
        if (returnFlight) {
            // PUSH DATA RETURN FLIGHT FOR ADULTS
            if (detailBooking.numAdults > 0) {
                item_details_data.push({
                    id: returnFlight.id,
                    price: returnFlight.price,
                    name: "Adult - " + returnFlight.flightCode,
                    quantity: detailBooking.numAdults,
                });
            }

            // PUSH DATA RETURN FLIGHT FOR CHILDREN
            if (detailBooking.numChildren > 0) {
                item_details_data.push({
                    id: returnFlight.id,
                    price: returnFlight.price,
                    name: "Child - " + returnFlight.flightCode,
                    quantity: detailBooking.numChildren,
                });
            }

            // PUSH DATA RETURN FLIGHT FOR BABIES
            if (detailBooking.numBabies > 0) {
                item_details_data.push({
                    id: returnFlight.id,
                    price: 0,
                    name: "Baby - " + returnFlight.flightCode,
                    quantity: detailBooking.numBabies,
                });
            }
        }

        const payload = {
            transaction_details: {
                order_id: transaction_id,
                gross_amount,
            },
            customer_details: {
                first_name: user.name,
                email: user.email,
                phone: user.phoneNumber,
            },
            item_details: item_details_data,
            callbacks: {
                finish: `${CLIENT_URL}/flight/payment/success`,
                error: CLIENT_URL,
            },
            expiry: {
                unit: "hour",
                duration: 2,
            },
        };

        const response = await fetch(
            `${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Basic ${authString}`,
                },
                body: JSON.stringify(payload),
            },
        );

        const data = await response.json();

        if (response.status !== 201) {
            return res.status(500).json({
                status: "error",
                message: "Payment failed",
            });
        }

        await paymentUsecase.createPayment({
            bookingId,
            paymentAmount,
            transactionId: transaction_id,
            snapToken: data.token,
            snapRedirectUrl: data.redirect_url,
        });

        res.status(200).json({
            message: "success create payment",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id) {
            const data = await paymentUsecase.deletePayment(id);

            res.status(200).json({
                message: "success",
                data,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.updatePayment = async (req, res, next) => {
    try {
        const data = await paymentUsecase.updatePayment({ ...req.body });

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {}
};

exports.paymentNotification = async (req, res, next) => {
    try {
        const data = req.body;

        const payment = await paymentUsecase.getPaymentByTransactionId(
            data.order_id,
        );

        // JIKA PEMBAYARAN DITEMUKAN, UPDATE STATUS DAN PAYMENT METHOD BERDASARKAN RESPONSE MIDTRANS
        if (payment) {
            await updateStatusBasedOnMidtransResponse(
                payment.transactionId,
                data,
            );

            const paymentStatus = payment.dataValues.paymentStatus;
            const bookingData = await bookingUsecase.getBookingId(bookingId);

            if (payment.dataValues.paymentStatus === "paid") {
                const notifPayload = {
                    userId: bookingData.userId,
                    type: "payment",
                    message: `Pembayaran Anda untuk pesanan dengan kode ${bookingData.bookingCode} telah berhasil! Terima kasih telah mempercayakan pemesanan Anda kepada kami. Selamat menikmati perjalanan Anda!`,
                };

                createNotificationUsecase.createNotification(notifPayload);
            } else if (paymentStatus.dataValues.paymentStatus === "expired") {
                const notifPayload = {
                    userId: bookingData.userId,
                    type: "payment",
                    message: `Pembayaran Anda untuk pesanan dengan kode ${bookingData.bookingCode} telah kadaluarsa. Dengan berat hati, pesanan Anda kami batalkan. Silahkan lakukan pemesanan kembali. Terima kasih!`,
                };

                createNotificationUsecase.createNotification(notifPayload);
            }
        }

        res.status(200).json({
            status: "Success",
            message: "OK",
        });
    } catch (error) {
        next(error);
    }
};
