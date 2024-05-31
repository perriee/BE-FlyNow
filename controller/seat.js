const seatUsecase = require("../usecase/seat");

exports.getSeats = async (req, res, next) => {
    try {
        const data = await seatUsecase.getSeats();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSeatById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await seatUsecase.getSeatById(id);

        if (!data) {
            return next({
                message: `Seat with the id ${id} not found!`,
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createSeat = async (req, res, next) => {
    try {
        const { seatCode, seatAvailable, seatType, flightId, price } = req.body;

        if (!seatCode || seatCode === "") {
            return next({
                message: "seatCode is required!",
                statusCode: 400,
            });
        }
        if (!seatAvailable || seatAvailable === "") {
            return next({
                message: "seatAvailable is required!",
                statusCode: 400,
            });
        }
        if (!seatType || seatType === "") {
            return next({
                message: "seatType is required!",
                statusCode: 400,
            });
        }
        if (!flightId || flightId === "") {
            return next({
                message: "flightId is required!",
                statusCode: 400,
            });
        }
        if (!price || price === "") {
            return next({
                message: "price is required!",
                statusCode: 400,
            });
        }

        const data = await seatUsecase.createSeat({
            seatCode,
            seatAvailable,
            seatType,
            flightId,
            price,
        });

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSeat = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { seatCode, seatAvailable, seatType, flightId, price } = req.body;
        if (!seatCode || seatCode === "") {
            return next({
                message: "seatCode is required!",
                statusCode: 400,
            });
        }
        if (!seatAvailable || seatAvailable === "") {
            return next({
                message: "seatAvailable is required!",
                statusCode: 400,
            });
        }
        if (!seatType || seatType === "") {
            return next({
                message: "seatType is required!",
                statusCode: 400,
            });
        }
        if (!flightId || flightId === "") {
            return next({
                message: "flightId is required!",
                statusCode: 400,
            });
        }
        if (!price || price === "") {
            return next({
                message: "price is required!",
                statusCode: 400,
            });
        }
        const data = await seatUsecase.updateSeat(id, {
            seatCode,
            seatAvailable,
            seatType,
            flightId,
            price,
        });
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSeat = async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = await seatUsecase.deleteSeat(id);
		res.status(200).json({
			message: "success",
			data,
		});
	} catch (error) {
		next(error);
	}
};
