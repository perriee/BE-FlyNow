const historyUsecase = require("../usecase/history");

exports.getHistories = async (req, res, next) => {
    try {
        const userId = req.user?.dataValues?.id;
        const data = await historyUsecase.getHistories(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getHistoriesByCity = async (req, res, next) => {
    try {
        const userId = req.user?.dataValues?.id;
        const { city } = req.params;
        const data = await historyUsecase.getHistoriesByCity(userId, city);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getHistoriesByPaymentStatus = async (req, res, next) => {
    try {
        const userId = req.user?.dataValues?.id;
        const { paymentStatus } = req.params;
        const data = await historyUsecase.getHistoriesByPaymentStatus(
            userId,
            paymentStatus,
        );

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
