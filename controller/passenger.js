const passengerUsecase = require("../usecase/passenger");

exports.getPassengers = async (req, res, next) => {
    try {
        const data = await passengerUsecase.getPassengers();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
