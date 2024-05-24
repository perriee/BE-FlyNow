const passengerRepo = require("../repository/passenger");

exports.getPassengers = async () => {
    const data = await passengerRepo.getPassengers();
    return data;
};
