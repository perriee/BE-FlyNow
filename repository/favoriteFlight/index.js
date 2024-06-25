const path = require("path");
const crypto = require("crypto");

const { BaseError } = require("sequelize");
const { uploadToCloudinary } = require("../../helper/cloudinary");

const { favoriteFlight } = require("../../models");

exports.createFavoriteFlight = async (payload) => {
    try {
        const exist = await favoriteFlight.findOne({
            where: {
                flightId: payload.flightId,
            },
        });

        if (exist) {
            throw new Error("Favorite Flight already exists!");
        }

        if (payload.image) {
            // upload image to cloudinary
            const { image } = payload;

            // make unique filename -> 213123128uasod9as8djas
            image.publicId = crypto.randomBytes(16).toString("hex");

            // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
            image.name = `${image.publicId}${path.parse(image.name).ext}`;

            // Process to upload image
            const imageUpload = await uploadToCloudinary(image);
            console.log(imageUpload.secure_url);
            payload.image = imageUpload.secure_url;
        }

        const data = await favoriteFlight.create(payload);
        return data;
    } catch (error) {
        if (error instanceof BaseError) {
            throw new Error("Failed to create favorite flight!", {
                cause: error,
            });
        }

        throw new Error(error.message);
    }
};

exports.getFavoriteFlightById = async (id) => {
    const data = await favoriteFlight.findOne({
        where: {
            id,
        },
    });

    if (!data) {
        throw new Error(`Favorite Flight is not found!`);
    }

    return data;
};

exports.getAllFavoriteFlights = async () => favoriteFlight.findAll();

exports.editFavoriteFlightById = async (id, payload) => {
    await favoriteFlight.update(payload, {
        where: {
            id,
        },
    });

    const data = await favoriteFlight.findOne({
        where: {
            id,
        },
    });

    if (!data) {
        throw new Error(`Favorite Flight is not found!`);
    }

    return data;
};

exports.deleteFavoriteFlightById = async (id) => {
    const foundFavoriteFlight = await favoriteFlight.findOne({
        where: {
            id,
        },
    });

    if (!foundFavoriteFlight) {
        throw new Error(`Favorite Flight is not found!`);
    }

    // Delete the favorite flight
    await favoriteFlight.destroy({
        where: {
            id,
        },
    });
};
