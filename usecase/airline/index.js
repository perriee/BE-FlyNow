const airlineRepo = require("../../repository/airline");

exports.createAirline = async (payload) => {
    const data = await airlineRepo.createAirline(payload);
    return data;
};

exports.getAirlines = async () => {
    const data = await airlineRepo.getAirlines();
    return data;
};

exports.getAirlineById = async (id) => {
    const data = await airlineRepo.getAirlineById(id);
    return data;
};

exports.updateAirlineById = async (id, payload) => {
    const data = await airlineRepo.updateAirlineById(id, payload);
    return data;
};

exports.deleteAirlineById = async (id) => {
    const data = await airlineRepo.deleteAirlineById(id);
    return data;
};
