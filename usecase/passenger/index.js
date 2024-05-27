const passengerRepo = require("../../repository/passenger");

exports.getPassengers = async () => {
    const data = await passengerRepo.getPassengers();
    return data;
};

exports.getPassenger = async (id) => {
    const data = await passengerRepo.getPassenger(id);
    return data;
};

exports.createPassenger = async (payload) => {
    const data = await passengerRepo.createPassenger(payload);
    return data;
};

exports.updatePassenger = async (id, payload) => {
    await passengerRepo.updatePassenger(id, payload);
    const data = await passengerRepo.getPassenger(id);
    return data;
};

exports.deletePassenger = async (id) => {
    const data = await passengerRepo.deletePassenger(id);
    return data;
};
