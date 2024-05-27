const {
    createAirport,
    getAllAirports,
    getAirportByID,
    editAirport,
    deleteAirport,
    filterAirport,
} = require("../../repository/airport");

exports.createAirport = async (payload) => {
    return await createAirport(payload);
};

exports.getAllAirports = async () => {
    return await getAllAirports();
};

exports.getAirportByID = async (id) => {
    return await getAirportByID(id);
};

exports.editAirport = async (id, payload) => {
    return await editAirport(id, payload);
};

exports.deleteAirport = async (id) => {
    return await deleteAirport(id);
};

exports.filterAirport = async (payload) => {
    return await filterAirport(payload);
};
