const passengerUsecase = require("../usecase/passenger");

exports.getPassengers = async (req, res, next) => {
    try {
        const data = await passengerUsecase.getPassengers();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getPassenger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await passengerUsecase.getPassenger(id);

        if (!data) {
            return next({
                message: `Passenger is not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createPassenger = async (req, res, next) => {
    try {
        const {
            name,
            dateOfBirth,
            nationality,
            docType,
            docNumber,
            issuingCountry,
            expiryDate,
            passengerType,
        } = req.body;

        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 404,
            });
        }
        if (!dateOfBirth || dateOfBirth == "") {
            return next({
                message: "dateOfBirth must be provided!",
                statusCode: 404,
            });
        }
        if (!nationality || nationality == "") {
            return next({
                message: "nationality must be provided!",
                statusCode: 404,
            });
        }
        if (!docType || docType == "") {
            return next({
                message: "docType must be provided!",
                statusCode: 404,
            });
        }
        if (!docNumber || docNumber == "") {
            return next({
                message: "docNumber must be provided!",
                statusCode: 404,
            });
        }
        if (!issuingCountry || issuingCountry == "") {
            return next({
                message: "issuingCountry must be provided!",
                statusCode: 404,
            });
        }
        if (!expiryDate || expiryDate == "") {
            return next({
                message: "expiryDate must be provided!",
                statusCode: 404,
            });
        }
        if (!passengerType || passengerType == "") {
            return next({
                message: "passengerType must be provided!",
                statusCode: 404,
            });
        }

        const data = await passengerUsecase.createPassenger({
            name,
            dateOfBirth,
            nationality,
            docType,
            docNumber,
            issuingCountry,
            expiryDate,
            passengerType,
        });

        res.status(201).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePassenger = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            dateOfBirth,
            nationality,
            docType,
            docNumber,
            issuingCountry,
            expiryDate,
            passengerType,
        } = req.body;

        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 404,
            });
        }
        if (!dateOfBirth || dateOfBirth == "") {
            return next({
                message: "dateOfBirth must be provided!",
                statusCode: 404,
            });
        }
        if (!nationality || nationality == "") {
            return next({
                message: "nationality must be provided!",
                statusCode: 404,
            });
        }
        if (!docType || docType == "") {
            return next({
                message: "docType must be provided!",
                statusCode: 404,
            });
        }
        if (!docNumber || docNumber == "") {
            return next({
                message: "docNumber must be provided!",
                statusCode: 404,
            });
        }
        if (!issuingCountry || issuingCountry == "") {
            return next({
                message: "issuingCountry must be provided!",
                statusCode: 404,
            });
        }
        if (!expiryDate || expiryDate == "") {
            return next({
                message: "expiryDate must be provided!",
                statusCode: 404,
            });
        }
        if (!passengerType || passengerType == "") {
            return next({
                message: "passengerType must be provided!",
                statusCode: 404,
            });
        }

        const data = await passengerUsecase.updatePassenger(id, {
            name,
            dateOfBirth,
            nationality,
            docType,
            docNumber,
            issuingCountry,
            expiryDate,
            passengerType,
        });

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePassenger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await passengerUsecase.deletePassenger(id);

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
