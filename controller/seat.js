const seatUsecase = require("../usecase/seat")

exports.createSeat = async (req, res, next) => {
    try {
        const data = await seatUsecase.createSeat(req.body)

        res.status(201).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};