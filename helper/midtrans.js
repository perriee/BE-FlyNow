const crypto = require("crypto");
const paymentUsecase = require("../usecase/payment");

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

    console.log("TRX ID:", transactionId);
    console.log("DATA FROM MIDTRANS:", dataFromMidtrans);
    console.log("HASH ->", hash);
    console.log(
        "dataFromMidtrans.signature_key ->",
        dataFromMidtrans.signature_key,
    );

    if (dataFromMidtrans.signature_key !== hash) {
        return {
            status: "Error",
            message: "Invalid signature key",
        };
    }

    let responseData = null;
    let transactionStatus = dataFromMidtrans.transaction_status;
    let fraudStatus = dataFromMidtrans.fraud_status;

    if (transactionStatus == "capture") {
        if (fraudStatus == "accept") {
            const payload = {
                paymentStatus: "paid",
                paymentMethod: dataFromMidtrans.payment_type,
            };

            const transaction = await paymentUsecase.updatePaymentStatus(
                transactionId,
                payload,
            );

            responseData = transaction;
        }
    } else if (transactionStatus == "settlement") {
        const payload = {
            paymentStatus: "paid",
            paymentMethod: dataFromMidtrans.payment_type,
        };

        const transaction = await paymentUsecase.updatePaymentStatus(
            transactionId,
            payload,
        );

        responseData = transaction;
    } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
    ) {
        const payload = {
            paymentStatus: "canceled",
        };

        const transaction = await paymentUsecase.updatePaymentStatus(
            transactionId,
            payload,
        );

        responseData = transaction;
    } else if (transactionStatus == "pending") {
        const payload = {
            paymentStatus: "pending",
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
