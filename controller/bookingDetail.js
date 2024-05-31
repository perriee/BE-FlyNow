const detailsUsecase = require("../usecase/bookingDetail");

exports.getBookingDetails = async (req, res, next) => {
    try {
        const data = await detailsUsecase.getBookingDetails();

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookingDetailById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await detailsUsecase.getBookingDetailById(id);

        if (!data) {
            return next({
                message: `Booking Details With Id ${id} not found`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createBookingDetail = async (req, res, next) => {
    try {
        const { bookingId, passengerId, seatId } = req.body;

        if (!bookingId || bookingId == "") {
            return next({
                message: "Booking Id must be filled",
                statusCode: 400,
            });
        }
        if (!passengerId || passengerId == "") {
            return next({
                message: "passanger Id must be filled",
                statusCode: 400,
            });
        }
        if (!seatId || seatId == "") {
            return next({
                message: "Seat Id must be filled",
                statusCode: 400,
            });
        }

        const data = await detailsUsecase.createBookingDetail({
            bookingId,
            passengerId,
            seatId,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateBookingDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { bookingId, passengerId, seatId } = req.body;

        if (!bookingId || bookingId == "") {
            return next({
                message: "Booking Id must be filled",
                statusCode: 400,
            });
        }
        if (!passengerId || passengerId == "") {
            return next({
                message: "passanger Id must be filled",
                statusCode: 400,
            });
        }
        if (!seatId || seatId == "") {
            return next({
                message: "Seat Id must be filled",
                statusCode: 400,
            });
        }

        const data = await detailsUsecase.updateBookingDetail(id, {
            bookingId,
            passengerId,
            seatId,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteBookingDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await detailsUsecase.deleteBookingDetail(id);

        res.status(200).json({
            message: `Succes Delete Booking Details With id:${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
