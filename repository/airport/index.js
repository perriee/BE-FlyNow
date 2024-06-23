const { airport } = require("../../models");
const { Op } = require("sequelize");

exports.createAirport = async (payload) => {
    const data = await airport.create(payload);
    return data;
};

exports.getAllAirports = async () => {
    return await airport.findAll();
};

exports.getAirportByID = async (id) => {
    let data = await airport.findAll({
        where: {
            id,
        },
    });
    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`Airport is not found!`);
};

exports.editAirport = async (id, payload) => {
    await airport.update(payload, {
        where: {
            id,
        },
    });

    const data = await airport.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        return data[0];
    }
    throw new Error(`Airport is not found!`);
};

exports.deleteAirport = async (id) => {
    const foundAirport = await airport.findOne({
        where: {
            id,
        },
    });

    if (!foundAirport) {
        throw new Error(`Airport is not found!`);
    }

    // Delete the airport
    await airport.destroy({
        where: {
            id,
        },
    });

    // Return the data of the deleted airport
    return foundAirport;
};

/* To be used in the airport search bar */
exports.searchAirport = async (payload) => {
    /* Will returns all airports where its code, name, city, or country CONTAINS the payload*/
    /* Payload searhing is case-INSENSITIVE */
    const data = await airport.findAll({
        where: {
            /* The or here make this filter not exclusive so it can mix between code, name, city, ... */
            [Op.or]: [
                { airportCode: { [Op.iLike]: `%${payload}%` } },
                { airportName: { [Op.iLike]: `%${payload}%` } },
                { city: { [Op.iLike]: `%${payload}%` } },
                { country: { [Op.iLike]: `%${payload}%` } },
            ],
        },
    });

    return data;
};
