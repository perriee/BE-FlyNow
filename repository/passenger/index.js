const { passenger } = require("../../models");

exports.getPassengers = async () => {
    const data = await passenger.findAll();
    return data;
};

exports.getPassenger = async (id) => {
    const data = await passenger.findByPk(id);
    return data;
};

exports.createPassenger = async (payload) => {
    const data = await passenger.create(payload);
    return data;
};

exports.createBulkPassenger = async (payload, t) => {
    const data = await passenger.bulkCreate(payload, { transaction: t });
    return data;
};

exports.updatePassenger = async (id, payload) => {
    const [affectedRows] = await passenger.update(payload, {
        where: {
            id,
        },
    });

    if (affectedRows === 0) {
        throw new Error(`Passenger is not found`);
    }

    const data = await passenger.findByPk(id);
    return data;
};

exports.deletePassenger = async (id) => {
    const result = await passenger.destroy({ where: { id } });

    if (result === 0) {
        throw new Error(`Passenger is not found!`);
    }

    return null;
};
