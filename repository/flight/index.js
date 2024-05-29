const { flight, airport, airline, seat, booking } = require("../../models");

exports.getAllFlights = async () => {
    const data = await flight.findAll({
        include: [
            {
                model: airport,
            },
            {
                model: airline,
            },
        ],
    });
    return data;
};

exports.getFlight = async (id) => {
    const data = await flight.findAll({
        where: {
            id,
        },
        include: [
            {
                model: airport,
            },
            {
                model: airline,
            },
        ],
    });

    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`Flights is not found!`);
};

exports.createFlight = async (payload) => {
    const data = await flight.create(payload);
    return data;
};

exports.updateFlight = async (id, payload) => {
    await flight.update(payload, {
        where: {
            id,
        },
    });

    const data = await flight.findAll({
        where: {
            id,
        },
        include: [
            {
                model: airport,
            },
            {
                model: airline,
            },
        ],
    });

    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`Flights is not found!`);
};

exports.deleteFlight = async (id) => {
    await flight.destroy({ where: { id } });
    return null;
};
