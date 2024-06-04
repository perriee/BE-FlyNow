const historyRepo = require("../../repository/history");
// const historyRepo = require("../../repository/history");

exports.getHistories = async (userId) => {
    const data = await historyRepo.getHistories(userId);
    return data;
};
