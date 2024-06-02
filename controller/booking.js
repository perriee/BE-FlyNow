const bookingUsecase = require("../usecase/booking");

exports.getBookings = async (req, res, next) => {
    try {
        const data = await bookingUsecase.getBookings();

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookingId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await bookingUsecase.getBookingId(id);

        if (!data) {
            return next({
                message: `Booking With Id ${id} is not found`,
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

exports.createBooking = async (req, res, next) => {
    try {
        const {
            bookingCode,
            departureFlightId,
            returnFlightId = null,
            userId,
            numAdults,
            numChildren,
            numBabies,
        } = req.body;

        if (!bookingCode || bookingCode === "") {
            return next({
                message: "Booking Code must be filled",
                statusCode: 400,
            });
        }
        if (!departureFlightId || departureFlightId === "") {
            return next({
                message: "Departure Flight Id must be filled",
                statusCode: 400,
            });
        }
        if (!userId || userId === "") {
            return next({
                message: "User Id must be filled",
                statusCode: 400,
            });
        }
        if (!numAdults || numAdults === "") {
            return next({
                message: "Number Adults must be filled",
                statusCode: 400,
            });
        }

        if (numChildren && typeof numChildren !== "number") {
            return next({
                message: "Number Children must be number",
                statusCode: 400,
            });
        }

        if (numBabies && typeof numBabies !== "number") {
            return next({
                message: "Number Babies must be filled",
                statusCode: 400,
            });
        }

        const data = await bookingUsecase.createBooking({
            bookingCode,
            departureFlightId,
            returnFlightId,
            userId,
            numAdults,
            numChildren,
            numBabies,
        });

        return res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            bookingCode,
            flightId,
            userId,
            numAdults,
            numChildren,
            numBabies,
        } = req.body;

        if (!bookingCode || bookingCode == "") {
            return next({
                message: "Booking Code must be filled",
                statusCode: 400,
            });
        }
        if (!flightId || flightId == "") {
            return next({
                message: "Flight Id must be filled",
                statusCode: 400,
            });
        }
        if (!userId || userId == "") {
            return next({
                message: "User Id must be filled",
                statusCode: 400,
            });
        }
        if (!numAdults || numAdults == "") {
            return next({
                message: "Number Adults must be filled",
                statusCode: 400,
            });
        }
        // if (!numChildren || numChildren == "") {
        //     return next({
        //         message: "Number Children must be filled",
        //         statusCode: 400,
        //     });
        // }
        // if (!numBabies || numBabies == "") {
        //     return next({
        //         message: "Number Babies must be filled",
        //         statusCode: 400,
        //     });
        // }

        const data = await bookingUsecase.updateBooking(id, {
            bookingCode,
            flightId,
            userId,
            numAdults,
            numChildren,
            numBabies,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await bookingUsecase.deleteBooking(id);

        res.status(200).json({
            message: `Success, Booking with id:${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
