const {
    createAirline,
    getAirlineById,
    getAirlines,
    updateAirlineById,
    deleteAirlineById,
} = require("../usecase/airline");

exports.createAirline = async (req, res, next) => {
    try {
        let image = null;
        const { airlineCode, airlineName } = req.body;

        if (req.files && "image" in req.files) {
            image = req.files.image;
        } else {
            return next({
                message: "image is required",
                statusCode: 400,
            });
        }

        if (!airlineCode || airlineCode == "") {
            return next({
                message: "airlineCode is required",
                statusCode: 400,
            });
        }
        if (!airlineName || airlineName == "") {
            return next({
                message: "airlineName is required",
                statusCode: 400,
            });
        }

        const data = await createAirline({ airlineCode, airlineName, image });
        res.status(201).json({
            message: "Airline created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAirlines = async (req, res, next) => {
    try {
        const data = await getAirlines();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAirlineById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await getAirlineById(id);
        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateAirlineById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const data = await updateAirlineById(id, payload);
        res.status(200).json({
            message: "Airline updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAirlineById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await deleteAirlineById(id);
        res.status(200).json({
            message: "Airline deleted successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};
