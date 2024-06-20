const crypto = require("crypto");
const paymentUsecase = require("../usecase/payment");
const bookingUsecase = require("../usecase/booking");
const { updateStatusBasedOnMidtransResponse } = require("../helper/midtrans");

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

// exports.getPaymentById = async (req, res, next) => {
//     try {
//         const { id } = req.params

//         if (id) {
//             const data = await paymentUsecase.getPaymentById(id)
//             res.status(200).json({
//                 message: 'success',
//                 data,
//             })
//         }
//     } catch (error) {
//         next(error)
//     }
// }

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

        const transaction_id = `TRX-${crypto.randomBytes(4).toString("hex")}-${crypto.randomBytes(4).toString("hex")}`;
        const gross_amount = paymentAmount;
        const authString = btoa(process.env.MIDTRANS_SERVER_KEY);

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
            callbacks: {
                finish: "https://google.com",
            },
            expiry: {
                unit: "minutes",
                duration: 60,
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

// exports.paymentNotification = async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log("🚀 ~ exports.paymentNotification= ~ data:", data);

//         paymentUsecase
//             .getPaymentById({
//                 transactionId: data.order_id,
//             })
//             .then((payment) => {
//                 if (payment) {
//                     updateStatusBasedOnMidtransResponse(payment.id, data).then(
//                         (result) => {
//                             console.log("RESULT:", result);
//                         },
//                     );
//                 }
//             });
//         console.log("🚀 ~ exports.paymentNotification= ~ payment:", payment);

//         res.status(200).json({
//             status: "Success",
//             message: "OK",
//         });
//     } catch (error) {
//         next(error);
//     }
// };

exports.paymentNotification = async (req, res, next) => {
    try {
        const data = req.body;
        console.log("🚀 ~ exports.paymentNotification= ~ data:", data);

        const payment = await paymentUsecase.getPaymentByTransactionId(
            data.order_id,
        );

        console.log("🚀 ~ exports.paymentNotification= ~ payment:", payment);

        // Jika pembayaran ditemukan, update statusnya berdasarkan response Midtrans
        if (payment) {
            const result = await updateStatusBasedOnMidtransResponse(
                payment.transactionId,
                data,
            );
            console.log("RESULT:", result);
        }

        res.status(200).json({
            status: "Success",
            message: "OK",
        });
    } catch (error) {
        next(error);
    }
};
