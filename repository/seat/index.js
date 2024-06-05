const { seat, flight } = require("../../models");

exports.checkSeat = async (flightId, seatCode) => {
    const data = await seat.findOne({
        where: {
            flightId,
            seatCode,
        },
    });

    if (!data.seatAvailable) {
        throw new Error(`Seat is not available!`);
    }
    return data.id;
};

exports.getSeats = async () => {
    const data = await seat.findAll({
        include: [
            {
                model: flight,
            },
        ],
    });
    return data;
};

exports.getSeatById = async (id) => {
    const data = await seat.findAll({
        where: {
            id,
        },
        include: [
            {
                model: flight,
            },
        ],
    });
    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`Seat is not found!`);
};

exports.createSeat = async (payload) => {
    const data = await seat.create(payload);
    return data;
};

exports.updateSeat = async (id, payload) => {
    await seat.update(payload, {
        where: {
            id,
        },
    });

    const data = await seat.findAll({
        where: {
            id,
        },
        include: [
            {
                model: flight,
            },
        ],
    });

    if (data.length > 0) {
        return data[0];
    }
    throw new Error(`Seat is not found!`);
};

exports.deleteSeat = async (id) => {
    const data = await seat.destroy({
        where: {
            id,
        },
    });

    // Return the number of deleted rows
    if (data === 0) {
        throw new Error(`Seat not found!`);
    }

    return null;
};
