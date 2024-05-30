const bookingDetailUsecase = require("../usecase/bookingDetail");

exports.createBookingDetail = async (req, res, next) => {
    try {
        const {
            bookingId, passengerId, seatId
        } = req.body;

        const data = await bookingDetailUsecase.createBookingDetail({
            bookingId, passengerId, seatId
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
