const favoriteFlightUseCase = require("../usecase/favoriteFlight");

exports.createFavoriteFlight = async (req, res, next) => {
    try {
        let image = null;
        const { flightId, discount, description } = req.body;

        if (req.files && "image" in req.files) {
            image = req.files.image;
        } else {
            return next({
                message: "image is required",
                statusCode: 400,
            });
        }

        if (!flightId) {
            return next({
                message: "Flight Id must be filled",
                statusCode: 400,
            });
        }

        if (!discount) {
            return next({
                message: "Discount must be filled",
                statusCode: 400,
            });
        }

        if (!description) {
            return next({
                message: "Description must be filled",
                statusCode: 400,
            });
        }

        const data = await favoriteFlightUseCase.createFavoriteFlight({
            flightId,
            discount,
            description,
            image,
        });

        return res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getFavoriteFlightByFlightId = async (req, res, next) => {
    try {
        const { flightId } = req.params;

        const data =
            await favoriteFlightUseCase.getFavoriteFlightByFlightId(flightId);

        return res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getAllFavoriteFlights = async (req, res, next) => {
    try {
        const data = await favoriteFlightUseCase.getAllFavoriteFlights();

        return res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.editFavoriteFlightbyFlightId = async (req, res, next) => {
    try {
        const { flightId } = req.params;
        const { discount, description } = req.body;
        const payload = {};

        if (req.files && "image" in req.files) {
            payload.image = req.files.image;
        }

        if (discount) {
            payload.discount = discount;
        }

        if (description) {
            payload.description = description;
        }

        if (Object.keys(payload).length === 0) {
            return next({
                message: "Nothing to update!",
                statusCode: 400,
            });
        }

        const data = await favoriteFlightUseCase.editFavoriteFlightbyFlightId(
            flightId,
            payload,
        );

        return res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.deleteFavoriteFlight = async (req, res, next) => {
    try {
        const { flightId } = req.params;

        await favoriteFlightUseCase.deleteFavoriteFlight(flightId);

        return res.status(200).json({
            message: "Success",
        });
    } catch (error) {
        return next(error);
    }
};
