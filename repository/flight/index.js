const { where } = require("sequelize");
const { Op, Sequelize } = require("sequelize");
const { flight, airport, airline } = require("../../models");

exports.searchFlight = async (query) => {
    let order;
    if (query.sort) {
        const sortOrder = query.sort.toLowerCase() === "desc" ? "DESC" : "ASC";
        order = [["price", sortOrder]];
    } else {
        order = [["departureTime", "ASC"]];
    }

    const departureFlights = await flight.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn("DATE", Sequelize.col("departureTime")),
                    query.departureTime,
                ),
            ],
            flightClass: query.class,
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

    if (query.returnDate) {
        const returnFlights = await flight.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("DATE", Sequelize.col("departureTime")),
                        query.returnDate,
                    ),
                ],
                flightClass: query.class,
            },
            include: [
                {
                    model: airport,
                    as: "departureAirport",
                    where: {
                        airportCode: query.arrivalAirport,
                    },
                },
                {
                    model: airport,
                    as: "arrivalAirport",
                    where: {
                        airportCode: query.departureAirport,
                    },
                },
                {
                    model: airline,
                },
            ],
            order: order,
        });
        return { departureFlights, returnFlights };
    }
    return departureFlights;
};

exports.getAllFlights = async () => {
    const data = await flight.findAll({
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
