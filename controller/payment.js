const paymentUsecase = require("../usecase/payment");

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

exports.createPayment = async (req, res, next) => {
    try {
        const {bookingId, paymentAmount, paymentMethod, paymentStatus } = req.body

        const data = await paymentUsecase.createPayment({bookingId, paymentAmount, paymentMethod, paymentStatus});
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
