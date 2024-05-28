const {
    createAirport,
    getAllAirports,
    getAirportByID,
    editAirport,
    deleteAirport,
    searchAirport,
} = require("../usecase/airport");

exports.createAirport = async (req, res, next) => {
    try {
        const { airportCode, airportName, city, country } = req.body;

        console.log(req.body);

        if (!airportCode || airportCode === "") {
            return next({
                message: "Airport code is required!",
                statusCode: 400,
            });
        }
        if (!airportName || airportName === "") {
            return next({
                message: "Airport name is required!",
                statusCode: 400,
            });
        }
        if (!city || city === "") {
            return next({
                message: "City is required!",
                statusCode: 400,
            });
        }
        if (!country || country === "") {
            return next({
                message: "Country is required!",
                statusCode: 400,
            });
        }

        const data = await createAirport({
            airportCode,
            airportName,
            city,
            country,
        });

        res.status(201).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllAirports = async (req, res, next) => {
    try {
        const data = await getAllAirports();

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAirportByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getAirportByID(id);

        if (!data) {
            return next({
                message: `Airport with the id ${id} not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.editAirport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { code, name, city, country } = req.body;
        let payload = {};

        if (code && code !== "") {
            payload.code = code;
        }
        if (name && name !== "") {
            payload.name = name;
        }
        if (city && city !== "") {
            payload.city = city;
        }
        if (country && country !== "") {
            payload.country = country;
        }

        if (Object.keys(payload).length === 0) {
            return next({
                message: "Nothing to update!",
                statusCode: 400,
            });
        }

        const data = await editAirport(id, payload);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAirport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await deleteAirport(id);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.searchAirport = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const data = await searchAirport(keyword);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
