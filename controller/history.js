const historyUsecase = require("../usecase/history");

exports.getHistories = async (req, res, next) => {
    try {
        const userId = req.user.dataValues.id;
        const data = await historyUsecase.getHistories(userId);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
