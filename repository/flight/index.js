const { where } = require("sequelize");
const { Op, Sequelize } = require("sequelize");
const { flight, airport, airline } = require("../../models");

exports.getAllFlights = async (query) => {
    let order;
    if (query.sort) {
        const sortOrder = query.sort.toLowerCase() === "desc" ? "DESC" : "ASC";
        order = [["price", sortOrder]];
    } else {
        order = [["departureTime", "ASC"]];
    }

    const data = await flight.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn("DATE", Sequelize.col("departureTime")),
                    query.departureTime,
                ),
            ],
        },
        include: [
            {
                model: airport,
                as: "departureAirport",
                where: {
                    airportCode: query.departureAirport,
                },
            },
            {
                model: airport,
                as: "arrivalAirport",
                where: {
                    airportCode: query.arrivalAirport,
                },
            },
            {
                model: airline,
            },
        ],
        order: order,
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
                as: "departureAirport",
            },
            {
                model: airport,
                as: "arrivalAirport",
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
                as: "departureAirport",
            },
            {
                model: airport,
                as: "arrivalAirport",
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
