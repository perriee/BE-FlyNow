const flightRepo = require("../../repository/flight");

exports.getAllFlights = async () => {
    const data = await flightRepo.getAllFlights();
    return data;
};

exports.getFlight = async (id) => {
    const data = await flightRepo.getFlight(id);
    return data;
};

exports.createFlight = async (payload) => {
    const data = await flightRepo.createFlight(payload);
    return data;
};

exports.updateFlight = async (id, payload) => {
    await flightRepo.updateFlight(id, payload);
    const data = await flightRepo.getFlight(id);
    return data;
};

exports.deleteFlight = async (id) => {
    const data = await flightRepo.deleteFlight(id);
    return data;
};