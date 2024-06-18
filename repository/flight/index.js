const { where } = require("sequelize");
const { Op, Sequelize } = require("sequelize");
const { flight, airport, airline } = require("../../models");

exports.searchFlight = async (query) => {
    let order;

    switch (query.sort) {
        case "price-asc":
            order = [["price", "ASC"]];
            break;
        case "price-desc":
            order = [["price", "DESC"]];
            break;
        case "departure-asc":
            order = [["departureTime", "ASC"]];
            break;
        case "departure-desc":
            order = [["departureTime", "DESC"]];
            break;
        case "arrival-asc":
            order = [["arrivalTime", "ASC"]];
            break;
        case "arrival-desc":
            order = [["arrivalTime", "DESC"]];
            break;
        case "duration-asc":
            order = [
                [
                    Sequelize.literal(
                        `EXTRACT(EPOCH FROM ("arrivalTime" - "departureTime")) / 60`,
                    ),
                    "ASC",
                ],
            ];
            break;
        case "duration-desc":
            order = [
                [
                    Sequelize.literal(
                        `EXTRACT(EPOCH FROM ("arrivalTime" - "departureTime")) / 60`,
                    ),
                    "DESC",
                ],
            ];
            break;
        case "duration-asc":
            order = [
                [
                    Sequelize.literal(
                        `EXTRACT(EPOCH FROM ("arrivalTime" - "departureTime")) / 60`,
                    ),
                    "ASC",
                ],
            ];
            break;
        case "duration-desc":
            order = [
                [
                    Sequelize.literal(
                        `EXTRACT(EPOCH FROM ("arrivalTime" - "departureTime")) / 60`,
                    ),
                    "DESC",
                ],
            ];
            break;
        default:
            order = [["departureTime", "ASC"]];
            break;
    }

    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Query to count total items for departure flights
    const totalDepartureFlights = await flight.count({
        where: {
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn("DATE", Sequelize.col("departureTime")),
                    query.dd,
                ),
            ],
            flightClass: query.class,
        },
        include: [
            {
                model: airport,
                as: "departureAirport",
                where: {
                    airportCode: query.da,
                },
            },
            {
                model: airport,
                as: "arrivalAirport",
                where: {
                    airportCode: query.aa,
                },
            },
            {
                model: airline,
            },
        ],
    });

    const departureFlights = await flight.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn("DATE", Sequelize.col("departureTime")),
                    query.dd,
                ),
            ],
            flightClass: query.class,
        },
        include: [
            {
                model: airport,
                as: "departureAirport",
                where: {
                    airportCode: query.da,
                },
            },
            {
                model: airport,
                as: "arrivalAirport",
                where: {
                    airportCode: query.aa,
                },
            },
            {
                model: airline,
            },
        ],
        order: order,
        limit: limit,
        offset: offset,
    });

    const totalDeparturePages = Math.ceil(totalDepartureFlights / pageSize);

    if (query.rd) {
        // Query to count total items for return flights
        const totalReturnFlights = await flight.count({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("DATE", Sequelize.col("departureTime")),
                        query.rd,
                    ),
                ],
                flightClass: query.class,
            },
            include: [
                {
                    model: airport,
                    as: "departureAirport",
                    where: {
                        airportCode: query.aa,
                    },
                },
                {
                    model: airport,
                    as: "arrivalAirport",
                    where: {
                        airportCode: query.da,
                    },
                },
                {
                    model: airline,
                },
            ],
        });

        const returnFlights = await flight.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("DATE", Sequelize.col("departureTime")),
                        query.rd,
                    ),
                ],
                flightClass: query.class,
            },
            include: [
                {
                    model: airport,
                    as: "departureAirport",
                    where: {
                        airportCode: query.aa,
                    },
                },
                {
                    model: airport,
                    as: "arrivalAirport",
                    where: {
                        airportCode: query.da,
                    },
                },
                {
                    model: airline,
                },
            ],
            order: order,
            limit: limit,
            offset: offset,
        });

        const totalReturnPages = Math.ceil(totalReturnFlights / pageSize);

        return {
            totalDeparturePages,
            totalDepartureFlights,
            totalReturnPages,
            totalReturnFlights,
            departureFlights,
            returnFlights,
        };
    }

    return {
        totalDeparturePages,
        totalDepartureFlights,
        departureFlights,
    };
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
