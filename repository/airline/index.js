const path = require("path");
const crypto = require("crypto");
const { uploadToCloudinary } = require("../../helper/cloudinary");
const { airline } = require("../../models");

exports.createAirline = async (payload) => {
    if (payload.image) {
        // upload image to cloudinary
        const { image } = payload;

        // make unique filename -> 213123128uasod9as8djas
        image.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        // Process to upload image
        const imageUpload = await uploadToCloudinary(image);
        payload.image = imageUpload.secure_url;
    }

    const data = await airline.create(payload);
    return data;
};

exports.getAirlines = () => {
    const data = airline.findAll();
    return data;
};

exports.getAirlineById = (id) => {
    const data = airline.findOne({
        where: {
            id,
        },
    });

    return data;
};

exports.updateAirlineById = async (id, payload) => {
    if (payload.image) {
        // upload image to cloudinary
        const { image } = payload;

        // make unique filename -> 213123128uasod9as8djas
        image.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        // Process to upload image
        const imageUpload = await uploadToCloudinary(image);
        payload.image = imageUpload.secure_url;
    }

    const data = await airline.update(payload, {
        where: {
            id,
        },
    });

    return data;
};

exports.deleteAirlineById = (id) => {
    const data = airline.destroy({
        where: {
            id,
        },
    });

    return data;
};
