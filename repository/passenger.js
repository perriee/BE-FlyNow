const { passenger } = require("../models");

exports.getPassengers = async () => {
    const data = await passenger.findAll();
    return data;
};
